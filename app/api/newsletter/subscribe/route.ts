import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM = process.env.RESEND_FROM_EMAIL ?? 'noreply@competitor-review-spy.com';

async function addToBrevo(email: string, source: string) {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_LEADS_LIST_ID;
  if (!apiKey || !listId) return;
  await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: { 'api-key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      listIds: [parseInt(listId)],
      attributes: { SOURCE: source },
      updateEnabled: true,
    }),
  }).catch(() => {/* non-fatal — log in production monitoring */});
}

const WELCOME_EMAILS: Record<string, { subject: string; html: string }> = {
  'fb-ad': {
    subject: 'Your free Google review preview is inside',
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:40px 24px;background:#080808;color:#F5F2EB">
        <h1 style="color:#FF3232;font-size:28px;text-transform:uppercase;letter-spacing:2px;margin:0 0 8px">Here's your preview.</h1>
        <p style="color:rgba(245,242,235,0.7);margin:0 0 24px">The average business takes 2.7 days to respond to a Google review. Their competitor? 4 hours.</p>
        <h2 style="color:#F5F2EB;font-size:18px;margin:0 0 12px">What the data actually shows:</h2>
        <ul style="color:rgba(245,242,235,0.7);line-height:2;padding-left:20px;margin:0 0 24px">
          <li>68% of businesses never respond to negative reviews</li>
          <li>90%+ response rate = 23% more Google Maps profile views</li>
          <li>Responding in 4 hours makes a negative review 3x more likely to get upgraded</li>
        </ul>
        <p style="color:rgba(245,242,235,0.7);line-height:1.7;margin:0 0 24px">
          You don't have to guess where you stand vs your top competitor.<br><br>
          For $9, you get a full side-by-side breakdown — response rate, review count, star rating, and more. Live Google data. No guessing.
        </p>
        <a href="https://competitor-review-spy.com/analyze" style="display:inline-block;background:#FF3232;color:white;text-decoration:none;padding:14px 28px;border-radius:6px;font-weight:700;font-size:14px;text-transform:uppercase;letter-spacing:1px">
          Get my $9 competitor report →
        </a>
        <p style="color:rgba(245,242,235,0.3);font-size:11px;margin-top:32px">
          Unsubscribe anytime — reply "unsubscribe" to this email.
        </p>
      </div>`,
  },
  default: {
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
  },
};

export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const resolvedSource = source ?? 'crs-blog';

    // Store in Supabase — non-fatal if table missing or duplicate
    const { error: dbError } = await supabase
      .from('newsletter_subscribers')
      .upsert({ email, source: resolvedSource }, { onConflict: 'email,source' });
    if (dbError) console.warn('newsletter_subscribers upsert:', dbError.message);

    // Add to Brevo for fb-ad leads so Brevo automation sequences can take over
    if (resolvedSource === 'fb-ad') {
      await addToBrevo(email, resolvedSource);
    }

    const { subject, html } = WELCOME_EMAILS[resolvedSource] ?? WELCOME_EMAILS.default;
    await resend.emails.send({ from: FROM, to: email, subject, html });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('newsletter subscribe error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
