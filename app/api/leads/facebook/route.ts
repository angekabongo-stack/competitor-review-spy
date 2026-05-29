import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendBrevoEmail } from '@/lib/brevo';
import { FACEBOOK_LEADS_SEQUENCE } from '@/lib/email-sequences/facebook-leads';

function nextFridayMidnightUTC(): Date {
  const now = new Date();
  const dayOfWeek = now.getUTCDay(); // 0=Sun ... 5=Fri ... 6=Sat
  const daysUntilFriday = dayOfWeek === 5 ? 7 : (5 - dayOfWeek + 7) % 7;
  const friday = new Date(now);
  friday.setUTCDate(now.getUTCDate() + daysUntilFriday);
  friday.setUTCHours(0, 0, 0, 0);
  return friday;
}

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.LEADS_API_SECRET;
  if (!secret) return true; // dev: skip auth if env not set
  const auth = req.headers.get('x-api-secret');
  return auth === secret;
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const email = (body.email ?? '').trim().toLowerCase();
  const name = (body.name ?? body.full_name ?? '').trim() || email.split('@')[0];

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
  }

  // Check for duplicate
  const { data: existing } = await supabase
    .from('facebook_leads')
    .select('id')
    .eq('email', email)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ ok: true, duplicate: true });
  }

  const nextSendAt = nextFridayMidnightUTC();

  // Store lead
  const { error: insertError } = await supabase.from('facebook_leads').insert({
    email,
    name,
    source: body.source ?? 'facebook_ad',
    sequence_step: 0,
    next_send_at: nextSendAt.toISOString(),
  });

  if (insertError) {
    console.error('facebook lead insert error:', insertError.message);
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  // Send day-0 welcome email immediately via Brevo
  const welcomeEmail = FACEBOOK_LEADS_SEQUENCE.find((e) => e.day === 0);
  if (welcomeEmail) {
    await sendBrevoEmail(email, name, welcomeEmail.subject, welcomeEmail.html);

    // Mark day 0 as sent, set next_send_at for day 3 email
    const day3 = FACEBOOK_LEADS_SEQUENCE.find((e) => e.day === 3);
    const next = day3
      ? new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
      : null;

    await supabase
      .from('facebook_leads')
      .update({ sequence_step: 1, last_sent_day: 0, next_send_at: next })
      .eq('email', email);
  }

  return NextResponse.json({ ok: true });
}
