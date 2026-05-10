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

    // Send emails
    if (businessData) {
      await sendResultsEmail(record.email, businessData, filteredCompetitors);
      await sendFollowUpEmail(record.email, businessData.name);

      await supabase
        .from('analyses')
        .update({ status: 'email_sent' })
        .eq('id', analysisId);
    }
  }

  return NextResponse.json({ received: true });
}
