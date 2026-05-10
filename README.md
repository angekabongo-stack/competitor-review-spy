# Competitor Review Spy

A $9 one-time tool that lets small business owners compare their Google reviews against up to 3 competitors — built with Next.js 14, Stripe, Google Places API, Supabase, and Resend.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS (Bebas Neue + DM Sans)
- **Payments**: Stripe Checkout ($9 one-time)
- **Data**: Google Places API
- **Database**: Supabase (PostgreSQL)
- **Email**: Resend (immediate + 48h follow-up)

---

## Setup

### 1. Clone & install

```bash
git clone <repo>
cd competitor-review-spy
npm install
```

### 2. Environment variables

Copy `.env.local.example` to `.env.local` and fill in each value:

```bash
cp .env.local.example .env.local
```

| Variable | Where to get it |
|---|---|
| `STRIPE_SECRET_KEY` | [Stripe Dashboard → Developers → API Keys](https://dashboard.stripe.com/apikeys) |
| `STRIPE_WEBHOOK_SECRET` | Created when you register the webhook (see below) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard (publishable key) |
| `GOOGLE_PLACES_API_KEY` | [Google Cloud Console → APIs & Services → Credentials](https://console.cloud.google.com/) |
| `SUPABASE_URL` | Supabase project settings → API |
| `SUPABASE_ANON_KEY` | Supabase project settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase project settings → API (keep secret) |
| `RESEND_API_KEY` | [Resend Dashboard → API Keys](https://resend.com/api-keys) |
| `RESEND_FROM_EMAIL` | A verified sender address in Resend |
| `NEXT_PUBLIC_BASE_URL` | Your deployment URL (e.g. `https://competitorreviewspy.com`) |

### 3. Google Places API

Enable these APIs in Google Cloud Console:
- **Places API** (legacy) — for `findplacefromtext` and `details`

### 4. Supabase — create the table

Run this SQL in your Supabase SQL editor:

```sql
create table analyses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  stripe_session_id text,
  email text not null,
  industry text,
  status text default 'pending_payment',
  business_url text not null,
  competitor_urls text[] not null,
  business_data jsonb,
  competitors_data jsonb,
  follow_up_sent boolean default false
);

create unique index on analyses(stripe_session_id)
  where stripe_session_id is not null;
```

### 5. Stripe webhook

#### Local development
```bash
stripe listen --forward-to localhost:3000/api/webhook
```
Copy the webhook signing secret shown and set it as `STRIPE_WEBHOOK_SECRET`.

#### Production
In the Stripe Dashboard add a webhook endpoint:
- **URL**: `https://yourdomain.com/api/webhook`
- **Events**: `checkout.session.completed`

### 6. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## User flow

1. **Landing page** (`/`) — explains the product, shows sample report, CTA
2. **Analyze page** (`/analyze`) — user enters their Google Business URL + up to 3 competitors + industry + email
3. **Stripe Checkout** — $9 one-time payment
4. **Results page** (`/results?session_id=…`) — side-by-side comparison, gap analysis, upgrade CTA to [reviewreplyai.ca](https://reviewreplyai.ca)

Immediately after payment:
- Results email sent via Resend
- Follow-up email scheduled 48 h later with review-growth tips

---

## Deployment

Deploy to Vercel in one command:

```bash
vercel --prod
```

Add all environment variables in the Vercel dashboard under **Settings → Environment Variables**.

---

## License

MIT
