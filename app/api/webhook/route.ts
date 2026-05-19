import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';
import { fetchPlaceData } from '@/lib/google-places';
import { sendResultsEmail, sendFollowUpEmail } from '@/lib/resend';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature error:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const analysisId = session.metadata?.analysis_id;
    if (!analysisId) return NextResponse.json({ received: true });

    // Mark as paid
    const { data: record, error } = await supabase
      .from('analyses')
      .update({ status: 'paid', stripe_session_id: session.id })
      .eq('id', analysisId)
      .eq('status', 'pending_payment') // atomic guard — only update once
      .select()
      .single();

    if (error || !record) {
      // Already processed or error; skip silently
      return NextResponse.json({ received: true });
    }

    // Fetch Google Places data
    const [businessData, ...competitorsData] = await Promise.all([
      fetchPlaceData(record.business_url),
      ...record.competitor_urls.map((u: string) => fetchPlaceData(u)),
    ]);

    const filteredCompetitors = competitorsData.filter(Boolean);

    await supabase
      .from('analyses')
      .update({
        business_data: businessData,
        competitors_data: filteredCompetitors,
        status: 'data_fetched',
      })
      .eq('id', analysisId);

    // Send report emails
    if (businessData) {
      await sendResultsEmail(record.email, businessData, filteredCompetitors);
      await sendFollowUpEmail(record.email, businessData.name);

      await supabase
        .from('analyses')
        .update({ status: 'email_sent' })
        .eq('id', analysisId);
    }

    // Enroll buyer in 60-day nurture + ReviewReply AI upsell sequence (day 1)
    const firstEmailAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
    await supabase
      .from('email_sequences')
      .upsert(
        { email: record.email, list_type: 'buyers', next_send_at: firstEmailAt.toISOString() },
        { onConflict: 'email,list_type' }
      )
      .then(({ error }) => {
        if (error) console.warn('email_sequences enroll buyers:', error.message);
      });

    // Remove from leads sequence if they were a lead first
    await supabase
      .from('email_sequences')
      .update({ unsubscribed: true })
      .eq('email', record.email)
      .eq('list_type', 'leads');
  }

  return NextResponse.json({ received: true });
}
