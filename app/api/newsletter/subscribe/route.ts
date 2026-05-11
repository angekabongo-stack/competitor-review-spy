import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM = process.env.RESEND_FROM_EMAIL ?? 'noreply@competitor-review-spy.com';

export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const { error } = await supabase
      .from('newsletter_subscribers')
      .upsert({ email, source: source ?? 'crs-blog' }, { onConflict: 'email,source' });

    if (error && !error.message.includes('duplicate')) {
      return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
    }

    // Send welcome email
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: 'Your first review tip is inside 📊',
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:40px 24px;background:#080808;color:#F5F2EB">
          <h1 style="color:#FF3232;font-size:28px;text-transform:uppercase;letter-spacing:2px;margin:0 0 8px">Welcome!</h1>
          <p style="color:rgba(245,242,235,0.7);margin:0 0 24px">Thanks for subscribing to Competitor Review Spy tips.</p>
          <h2 style="color:#F5F2EB;font-size:18px;margin:0 0 12px">Your first tip: Response rate moves rankings</h2>
          <p style="color:rgba(245,242,235,0.7);line-height:1.7;margin:0 0 24px">
            Google has confirmed that responding to reviews improves local search visibility. Yet most small businesses respond to fewer than 30% of their reviews.<br><br>
            The businesses ranking at the top of Google Maps typically respond to 70–85% of reviews — including negative ones. Start there.
          </p>
          <a href="https://competitor-review-spy.com/analyze" style="display:inline-block;background:#FF3232;color:white;text-decoration:none;padding:12px 24px;border-radius:6px;font-weight:700;font-size:14px;text-transform:uppercase;letter-spacing:1px">
            Compare your reviews to competitors →
          </a>
          <p style="color:rgba(245,242,235,0.3);font-size:11px;margin-top:32px">
            Unsubscribe anytime — reply "unsubscribe" to this email.
          </p>
        </div>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('newsletter subscribe error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
