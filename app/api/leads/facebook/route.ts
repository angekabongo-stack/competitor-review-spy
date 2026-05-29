import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendBrevoEmail } from '@/lib/brevo';
import { getPoolEmail } from '@/lib/email-sequences/facebook-pool';

export async function POST(req: NextRequest) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const email = (body.email ?? '').trim().toLowerCase();
  const name = (body.name ?? '').trim() || email.split('@')[0];

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
  }

  // Skip duplicates silently
  const { data: existing } = await supabase
    .from('facebook_leads')
    .select('id')
    .eq('email', email)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ ok: true });
  }

  const { error: insertError } = await supabase.from('facebook_leads').insert({
    email,
    name,
    source: 'facebook_ad',
    last_scheduled_index: -1,
  });

  if (insertError) {
    console.error('facebook lead insert error:', insertError.message);
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  // Send welcome email immediately (index 0 = first story)
  const welcome = getPoolEmail(0);
  await sendBrevoEmail(email, name, welcome.subject, welcome.html);

  // Mark index 0 as scheduled so Sunday cron starts from index 1
  await supabase
    .from('facebook_leads')
    .update({ last_scheduled_index: 0 })
    .eq('email', email);

  return NextResponse.json({ ok: true });
}
