import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendBrevoEmail } from '@/lib/brevo';
import { FACEBOOK_LEADS_SEQUENCE } from '@/lib/email-sequences/facebook-leads';

function isAuthorized(req: NextRequest): boolean {
  const auth = req.headers.get('authorization');
  return auth === `Bearer ${process.env.CRON_SECRET}`;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now = new Date();

  // Fetch leads with a pending email due now or in the past
  const { data: leads, error } = await supabase
    .from('facebook_leads')
    .select('*')
    .eq('unsubscribed', false)
    .eq('finished', false)
    .lte('next_send_at', now.toISOString());

  if (error) {
    console.error('facebook-sequence cron error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!leads || leads.length === 0) {
    return NextResponse.json({ sent: 0, message: 'No emails due' });
  }

  let sent = 0;
  let failed = 0;

  for (const lead of leads) {
    // Find the next unsent email in the sequence
    const nextEmail = FACEBOOK_LEADS_SEQUENCE.find(
      (e) => e.day > (lead.last_sent_day ?? -1)
    );

    if (!nextEmail) {
      await supabase
        .from('facebook_leads')
        .update({ finished: true, next_send_at: null })
        .eq('id', lead.id);
      continue;
    }

    try {
      await sendBrevoEmail(lead.email, lead.name ?? lead.email, nextEmail.subject, nextEmail.html);

      // Schedule the next email
      const afterThis = FACEBOOK_LEADS_SEQUENCE.find((e) => e.day > nextEmail.day);
      const daysUntilNext = afterThis ? afterThis.day - nextEmail.day : null;
      const nextSendAt = daysUntilNext
        ? new Date(Date.now() + daysUntilNext * 24 * 60 * 60 * 1000).toISOString()
        : null;

      await supabase
        .from('facebook_leads')
        .update({
          last_sent_day: nextEmail.day,
          last_sent_at: now.toISOString(),
          sequence_step: (lead.sequence_step ?? 0) + 1,
          next_send_at: nextSendAt,
          finished: nextSendAt === null,
        })
        .eq('id', lead.id);

      sent++;
    } catch (err) {
      console.error(`facebook-sequence: failed for ${lead.email}`, err);
      failed++;
    }
  }

  return NextResponse.json({ sent, failed, total: leads.length });
}
