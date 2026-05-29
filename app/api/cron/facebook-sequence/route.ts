import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { FACEBOOK_POOL } from '@/lib/email-sequences/facebook-pool';

function isAuthorized(req: NextRequest): boolean {
  const auth = req.headers.get('authorization');
  return auth === `Bearer ${process.env.CRON_SECRET}`;
}

// Returns the next Mon, Wed, Fri at 14:00 UTC after a Sunday run.
function upcomingSlots(): Date[] {
  const now = new Date();
  return [1, 3, 5].map((offset) => {
    const d = new Date(now);
    d.setUTCDate(now.getUTCDate() + offset);
    d.setUTCHours(14, 0, 0, 0);
    return d;
  });
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Fetch all active leads
  const { data: leads, error } = await supabase
    .from('facebook_leads')
    .select('id, email, name, last_scheduled_index')
    .eq('unsubscribed', false);

  if (error) {
    console.error('facebook-sequence cron error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!leads || leads.length === 0) {
    return NextResponse.json({ scheduled: 0, message: 'No active leads' });
  }

  const slots = upcomingSlots(); // [Mon, Wed, Fri] at 14:00 UTC
  let scheduled = 0;

  for (const lead of leads) {
    const startIndex = (lead.last_scheduled_index ?? -1) + 1;

    const rows = slots.map((sendAt, i) => ({
      lead_id: lead.id,
      email_index: (startIndex + i) % FACEBOOK_POOL.length,
      send_at: sendAt.toISOString(),
      status: 'pending',
    }));

    const { error: insertErr } = await supabase
      .from('facebook_scheduled_emails')
      .insert(rows);

    if (insertErr) {
      console.error(`schedule error for ${lead.email}:`, insertErr.message);
      continue;
    }

    // Advance last_scheduled_index by 3
    await supabase
      .from('facebook_leads')
      .update({ last_scheduled_index: startIndex + slots.length - 1 })
      .eq('id', lead.id);

    scheduled += slots.length;
  }

  return NextResponse.json({ leads: leads.length, scheduled });
}
