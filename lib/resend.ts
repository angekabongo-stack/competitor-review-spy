import { Resend } from 'resend';
import type { BusinessAnalysis } from './types';

const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM = process.env.RESEND_FROM_EMAIL ?? 'noreply@competitorreviewspy.com';

function starBar(rating: number): string {
  const filled = Math.round(rating);
  return '★'.repeat(filled) + '☆'.repeat(5 - filled);
}

function resultsEmailHtml(
  business: BusinessAnalysis,
  competitors: BusinessAnalysis[]
): string {
  const compRows = competitors
    .map(
      (c) => `
      <tr style="border-bottom:1px solid #222;">
        <td style="padding:12px 16px;color:#F5F2EB;font-weight:600;">${c.name}</td>
        <td style="padding:12px 16px;color:#aaa;text-align:center;">${c.total_reviews.toLocaleString()}</td>
        <td style="padding:12px 16px;color:#aaa;text-align:center;">${c.avg_rating.toFixed(1)} ${starBar(c.avg_rating)}</td>
        <td style="padding:12px 16px;color:#aaa;text-align:center;">${c.response_rate}%</td>
        <td style="padding:12px 16px;color:#aaa;text-align:center;">${c.five_star_rate}%</td>
      </tr>`
    )
    .join('');

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Your Competitor Review Report</title></head>
<body style="margin:0;padding:0;background:#080808;font-family:'DM Sans',Arial,sans-serif;color:#F5F2EB;">
  <div style="max-width:640px;margin:0 auto;padding:40px 24px;">
    <h1 style="font-size:32px;letter-spacing:2px;text-transform:uppercase;color:#FF3232;margin:0 0 8px;">
      Competitor Review Spy
    </h1>
    <p style="color:rgba(245,242,235,0.6);margin:0 0 32px;">Your Google review analysis is ready.</p>

    <h2 style="font-size:18px;color:#F5F2EB;margin:0 0 16px;">Your Business: ${business.name}</h2>
    <table style="width:100%;border-collapse:collapse;background:#111;border-radius:8px;overflow:hidden;margin-bottom:32px;">
      <thead>
        <tr style="background:#1a1a1a;">
          <th style="padding:12px 16px;text-align:left;color:#FF3232;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Business</th>
          <th style="padding:12px 16px;text-align:center;color:#FF3232;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Reviews</th>
          <th style="padding:12px 16px;text-align:center;color:#FF3232;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Rating</th>
          <th style="padding:12px 16px;text-align:center;color:#FF3232;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Response%</th>
          <th style="padding:12px 16px;text-align:center;color:#FF3232;font-size:11px;text-transform:uppercase;letter-spacing:1px;">5-Star%</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom:1px solid #222;background:#0f0f0f;">
          <td style="padding:12px 16px;color:#F5F2EB;font-weight:700;">${business.name} (YOU)</td>
          <td style="padding:12px 16px;color:#F5F2EB;text-align:center;font-weight:700;">${business.total_reviews.toLocaleString()}</td>
          <td style="padding:12px 16px;color:#F5F2EB;text-align:center;font-weight:700;">${business.avg_rating.toFixed(1)}</td>
          <td style="padding:12px 16px;color:#F5F2EB;text-align:center;font-weight:700;">${business.response_rate}%</td>
          <td style="padding:12px 16px;color:#F5F2EB;text-align:center;font-weight:700;">${business.five_star_rate}%</td>
        </tr>
        ${compRows}
      </tbody>
    </table>

    <div style="background:#1a0000;border:1px solid #FF3232;border-radius:8px;padding:24px;margin-bottom:32px;">
      <h3 style="color:#FF3232;margin:0 0 12px;font-size:16px;">Want more 5-star reviews on autopilot?</h3>
      <p style="color:rgba(245,242,235,0.8);margin:0 0 16px;font-size:14px;line-height:1.6;">
        ReviewReplyAI generates personalised, on-brand replies to every Google review — so you always respond within minutes, not days. More responses = more trust = more new customers.
      </p>
      <a href="https://reviewreplyai.ca" style="display:inline-block;background:#FF3232;color:#F5F2EB;text-decoration:none;padding:12px 24px;border-radius:4px;font-weight:700;font-size:14px;letter-spacing:1px;text-transform:uppercase;">
        Try ReviewReplyAI Free →
      </a>
    </div>

    <p style="color:rgba(245,242,235,0.3);font-size:12px;">
      You purchased this report at competitorreviewspy.com. Questions? Reply to this email.
    </p>
  </div>
</body>
</html>`;
}

function followUpEmailHtml(businessName: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>5 Tips to Beat Your Competitors on Google Reviews</title></head>
<body style="margin:0;padding:0;background:#080808;font-family:'DM Sans',Arial,sans-serif;color:#F5F2EB;">
  <div style="max-width:640px;margin:0 auto;padding:40px 24px;">
    <h1 style="font-size:28px;letter-spacing:2px;text-transform:uppercase;color:#FF3232;margin:0 0 8px;">
      5 Ways to Close the Review Gap
    </h1>
    <p style="color:rgba(245,242,235,0.6);margin:0 0 32px;">
      Hi ${businessName} — here are the highest-leverage moves to outrank your competitors on Google reviews.
    </p>

    ${[
      ['Ask at the right moment', 'Request a review immediately after a positive interaction — delivery, checkout, or service completion. Strike while the sentiment is hot.'],
      ['Text > email for review requests', 'SMS review requests convert at 3–5× the rate of email. Keep it short: "Hi [Name], glad we could help! Mind leaving us a quick Google review? [link]"'],
      ['Respond to every review within 24 h', 'Google\'s algorithm rewards businesses that engage with reviews. Responding also shows prospective customers you care — and turns neutral reviews into repeat business.'],
      ['Make it frictionless', 'Create a short.link or QR code directly to your Google review form. Put it on receipts, packaging, and your email signature.'],
      ['Turn 3-star reviews into 5-star ones', 'Reply privately to unhappy customers, resolve the issue, then gently ask if they\'d update their review. Many will.'],
    ]
      .map(
        ([title, body], i) => `
      <div style="border-left:3px solid #FF3232;padding:0 0 0 20px;margin:0 0 24px;">
        <h3 style="color:#F5F2EB;margin:0 0 8px;font-size:16px;">${i + 1}. ${title}</h3>
        <p style="color:rgba(245,242,235,0.7);margin:0;font-size:14px;line-height:1.7;">${body}</p>
      </div>`
      )
      .join('')}

    <div style="background:#1a0000;border:1px solid #FF3232;border-radius:8px;padding:24px;margin-top:32px;">
      <p style="color:#F5F2EB;margin:0 0 12px;font-weight:700;">Skip the manual work — automate review responses in minutes.</p>
      <a href="https://reviewreplyai.ca" style="display:inline-block;background:#FF3232;color:#F5F2EB;text-decoration:none;padding:12px 24px;border-radius:4px;font-weight:700;font-size:14px;letter-spacing:1px;text-transform:uppercase;">
        Start with ReviewReplyAI →
      </a>
    </div>

    <p style="color:rgba(245,242,235,0.3);font-size:12px;margin-top:32px;">
      You purchased a Competitor Review Spy report. Unsubscribe: reply "unsubscribe".
    </p>
  </div>
</body>
</html>`;
}

export async function sendResultsEmail(
  to: string,
  business: BusinessAnalysis,
  competitors: BusinessAnalysis[]
): Promise<void> {
  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject: `Your Competitor Review Report is Ready — ${business.name}`,
      html: resultsEmailHtml(business, competitors),
    });
  } catch (err) {
    console.error('sendResultsEmail error:', err);
  }
}

export async function sendFollowUpEmail(
  to: string,
  businessName: string
): Promise<void> {
  // Schedule 48 hours after now
  const scheduledAt = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();
  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject: `5 Ways to Close the Review Gap (follow-up from Competitor Review Spy)`,
      html: followUpEmailHtml(businessName),
      scheduledAt,
    } as Parameters<typeof resend.emails.send>[0]);
  } catch (err) {
    console.error('sendFollowUpEmail error:', err);
  }
}
