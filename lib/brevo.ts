const BREVO_FROM_EMAIL = 'hello@competitor-review-spy.com';
const BREVO_FROM_NAME = 'Competitor Review Spy';

export async function sendBrevoEmail(
  to: string,
  toName: string,
  subject: string,
  htmlContent: string
): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.warn('BREVO_API_KEY not set — skipping email');
    return;
  }
  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: { name: BREVO_FROM_NAME, email: BREVO_FROM_EMAIL },
        to: [{ email: to, name: toName }],
        subject,
        htmlContent,
      }),
    });
    if (!res.ok) {
      console.error('Brevo send error:', await res.text());
    }
  } catch (err) {
    console.error('Brevo send error:', err);
  }
}

export async function sendWelcomeEmail(to: string, name?: string): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.warn('BREVO_API_KEY not set — skipping welcome email');
    return;
  }

  const displayName = name || to.split('@')[0];

  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: BREVO_FROM_NAME, email: BREVO_FROM_EMAIL },
        to: [{ email: to, name: displayName }],
        subject: 'Welcome to Competitor Review Spy — your report is on its way',
        htmlContent: welcomeEmailHtml(displayName),
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Brevo welcome email error:', err);
    }
  } catch (err) {
    console.error('Brevo send error:', err);
  }
}

function welcomeEmailHtml(name: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Welcome to Competitor Review Spy</title></head>
<body style="margin:0;padding:0;background:#080808;font-family:'DM Sans',Arial,sans-serif;color:#F5F2EB;">
  <div style="max-width:640px;margin:0 auto;padding:40px 24px;">
    <h1 style="font-size:28px;letter-spacing:2px;text-transform:uppercase;color:#FF3232;margin:0 0 8px;">
      Welcome, ${name}.
    </h1>
    <p style="color:rgba(245,242,235,0.7);margin:0 0 28px;font-size:15px;line-height:1.7;">
      Your account is live and your competitor report is being generated now. It will arrive in your inbox within minutes.
    </p>

    <div style="background:#111;border:1px solid rgba(245,242,235,0.12);border-radius:8px;padding:24px;margin-bottom:32px;">
      <h2 style="color:#F5F2EB;margin:0 0 16px;font-size:16px;text-transform:uppercase;letter-spacing:1px;">What happens next</h2>
      <ol style="color:rgba(245,242,235,0.7);margin:0;padding:0 0 0 20px;font-size:14px;line-height:2.2;">
        <li>Your Google review report arrives by email in minutes</li>
        <li>Log in to your dashboard to view all reports</li>
        <li>Use the gap analysis to prioritise what to fix first</li>
      </ol>
    </div>

    <a href="https://competitor-review-spy.com/login"
       style="display:inline-block;background:#FF3232;color:#F5F2EB;text-decoration:none;padding:14px 28px;border-radius:6px;font-weight:700;font-size:13px;letter-spacing:1px;text-transform:uppercase;">
      Go to Dashboard →
    </a>

    <p style="color:rgba(245,242,235,0.3);font-size:12px;margin-top:40px;">
      © ${new Date().getFullYear()} Competitor Review Spy · competitor-review-spy.com
    </p>
  </div>
</body>
</html>`;
}
