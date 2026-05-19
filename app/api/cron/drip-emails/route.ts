import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';
import { BUYERS_SEQUENCE, LEADS_SEQUENCE, type ListType } from '@/lib/email-sequences';

const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM = process.env.RESEND_FROM_EMAIL ?? 'noreply@competitor-review-spy.com';
const FROM_NAME = 'ReviewReply AI';

// Vercel Cron calls this with a secret to prevent abuse
function isAuthorized(req: NextRequest): boolean {
  const auth = req.headers.get('authorization');
  return auth === `Bearer ${process.env.CRON_SECRET}`;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now = new Date();

  // Fetch all active subscribers not yet finished with their sequence
  const { data: subscribers, error } = await supabase
    .from('email_sequences')
    .select('*')
    .eq('unsubscribed', false)
    .lte('next_send_at', now.toISOString());

  if (error) {
    console.error('drip-emails: fetch error', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!subscribers || subscribers.length === 0) {
    return NextResponse.json({ sent: 0, message: 'No emails due' });
  }

  let sent = 0;
  let failed = 0;

  for (const sub of subscribers) {
    const listType = sub.list_type as ListType;
    const sequence = listType === 'buyers' ? BUYERS_SEQUENCE : LEADS_SEQUENCE;

    // Find the next email in sequence after the last sent day
    const nextEmail = sequence.find((e) => e.day > (sub.last_sent_day ?? 0));

    if (!nextEmail) {
      // Sequence complete — mark finished
      await supabase
        .from('email_sequences')
        .update({ finished: true, next_send_at: null })
        .eq('id', sub.id);
      continue;
    }

    try {
      await resend.emails.send({
        from: `${FROM_NAME} <${FROM}>`,
        to: sub.email,
        subject: nextEmail.subject,
        html: nextEmail.html,
      });

      // Find the day after this one to schedule next send
      const afterThis = sequence.find((e) => e.day > nextEmail.day);
      const daysUntilNext = afterThis
        ? afterThis.day - nextEmail.day
        : null;

      const nextSendAt = daysUntilNext
        ? new Date(Date.now() + daysUntilNext * 24 * 60 * 60 * 1000).toISOString()
        : null;

      await supabase
        .from('email_sequences')
        .update({
          last_sent_day: nextEmail.day,
          last_sent_at: now.toISOString(),
          next_send_at: nextSendAt,
          finished: nextSendAt === null,
        })
        .eq('id', sub.id);

      sent++;
    } catch (err) {
      console.error(`drip-emails: failed for ${sub.email}`, err);
      failed++;
    }
  }

  return NextResponse.json({ sent, failed, total: subscribers.length });
}
