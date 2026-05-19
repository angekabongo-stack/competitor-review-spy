'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const INDUSTRIES = [
  'Restaurant / Food & Beverage',
  'Retail',
  'Healthcare / Medical',
  'Professional Services',
  'Home Services',
  'Automotive',
  'Beauty / Wellness / Spa',
  'Hospitality / Hotel',
  'Real Estate',
  'Legal',
  'Fitness',
  'Other',
];

interface FormState {
  business_url: string;
  competitor_1: string;
  competitor_2: string;
  competitor_3: string;
  industry: string;
  email: string;
}

const EMPTY: FormState = {
  business_url: '',
  competitor_1: '',
  competitor_2: '',
  competitor_3: '',
  industry: '',
  email: '',
};

function isValidUrl(val: string) {
  try {
    new URL(val);
    return true;
  } catch {
    return false;
  }
}

function isValidEmail(val: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}

export default function AnalyzePage() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Pre-fill email from spy-report landing page redirect
  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setForm((prev) => ({ ...prev, email: emailParam }));
    }
  }, [searchParams]);

  function update(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setError('');
    };
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Validate
    if (!isValidUrl(form.business_url)) {
      setError('Please enter a valid Google Business URL for your business.');
      return;
    }
    if (!isValidUrl(form.competitor_1)) {
      setError('Please enter a valid URL for Competitor 1.');
      return;
    }
    if (form.competitor_2 && !isValidUrl(form.competitor_2)) {
      setError('Competitor 2 URL is invalid. Leave it blank or fix the URL.');
      return;
    }
    if (form.competitor_3 && !isValidUrl(form.competitor_3)) {
      setError('Competitor 3 URL is invalid. Leave it blank or fix the URL.');
      return;
    }
    if (!form.industry) {
      setError('Please select your industry.');
      return;
    }
    if (!isValidEmail(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    const competitor_urls = [form.competitor_1, form.competitor_2, form.competitor_3].filter(
      Boolean
    );

    setLoading(true);
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_url: form.business_url,
          competitor_urls,
          industry: form.industry,
          email: form.email,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.checkoutUrl) {
        setError(data.error ?? 'Something went wrong. Please try again.');
        setLoading(false);
        return;
      }

      window.location.href = data.checkoutUrl;
    } catch {
      setError('Network error — please check your connection and try again.');
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-bg">
      {/* Nav */}
      <nav className="border-b border-cream-border px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="font-heading text-red-accent tracking-widest text-xl">
          REVIEW SPY
        </Link>
        <span className="text-cream-muted text-sm">$9 one-time · no subscription</span>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h1 className="font-heading text-5xl md:text-6xl text-cream tracking-wide mb-3">
            Enter your URLs
          </h1>
          <p className="text-cream-muted text-base">
            Paste the Google Maps / Google Business URLs below. We&apos;ll pull live
            review data and generate your report instantly after payment.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Your business */}
          <div>
            <label className="block text-sm font-semibold text-cream mb-2">
              Your Google Business URL{' '}
              <span className="text-red-accent">*</span>
            </label>
            <input
              type="url"
              placeholder="https://www.google.com/maps/place/your-business/..."
              value={form.business_url}
              onChange={update('business_url')}
              required
              className="w-full bg-cream-faint border border-cream-border rounded-lg px-4 py-3 text-cream placeholder:text-cream-muted focus:outline-none focus:border-red-accent transition-colors text-sm"
            />
            <p className="text-cream-muted text-xs mt-1">
              Tip: search your business on Google Maps and copy the URL from the browser bar.
            </p>
          </div>

          {/* Competitors */}
          <div className="border border-cream-border rounded-xl p-5 space-y-4">
            <h2 className="font-semibold text-cream text-sm uppercase tracking-widest">
              Competitors <span className="text-red-accent">*</span>
            </h2>

            {[
              { field: 'competitor_1' as const, label: 'Competitor 1', required: true },
              { field: 'competitor_2' as const, label: 'Competitor 2', required: false },
              { field: 'competitor_3' as const, label: 'Competitor 3', required: false },
            ].map(({ field, label, required }) => (
              <div key={field}>
                <label className="block text-sm text-cream-muted mb-1.5">
                  {label}{' '}
                  {required ? (
                    <span className="text-red-accent">*</span>
                  ) : (
                    <span className="text-cream-muted">(optional)</span>
                  )}
                </label>
                <input
                  type="url"
                  placeholder="https://www.google.com/maps/place/competitor/..."
                  value={form[field]}
                  onChange={update(field)}
                  className="w-full bg-cream-faint border border-cream-border rounded-lg px-4 py-3 text-cream placeholder:text-cream-muted focus:outline-none focus:border-red-accent transition-colors text-sm"
                />
              </div>
            ))}
          </div>

          {/* Industry */}
          <div>
            <label className="block text-sm font-semibold text-cream mb-2">
              Industry <span className="text-red-accent">*</span>
            </label>
            <select
              value={form.industry}
              onChange={update('industry')}
              required
              className="w-full bg-bg border border-cream-border rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-red-accent transition-colors text-sm appearance-none"
              style={{ colorScheme: 'dark' }}
            >
              <option value="" className="bg-bg text-cream-muted">Select your industry…</option>
              {INDUSTRIES.map((ind) => (
                <option key={ind} value={ind} className="bg-bg text-cream">
                  {ind}
                </option>
              ))}
            </select>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-cream mb-2">
              Your email <span className="text-red-accent">*</span>
            </label>
            <input
              type="email"
              placeholder="you@yourbusiness.com"
              value={form.email}
              onChange={update('email')}
              required
              className="w-full bg-cream-faint border border-cream-border rounded-lg px-4 py-3 text-cream placeholder:text-cream-muted focus:outline-none focus:border-red-accent transition-colors text-sm"
            />
            <p className="text-cream-muted text-xs mt-1">
              Your report and a follow-up with growth tips will be sent here.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-accent/10 border border-red-accent/40 rounded-lg px-4 py-3">
              <p className="text-red-accent text-sm">{error}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-accent hover:bg-red-hover disabled:opacity-60 disabled:cursor-not-allowed text-white font-heading text-2xl tracking-widest py-5 rounded-lg transition-all duration-150 hover:shadow-[0_0_30px_rgba(255,50,50,0.35)] active:scale-[0.99] flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Setting up checkout…
              </>
            ) : (
              <>
                Get my report
                <span className="bg-white/20 rounded px-2.5 py-0.5 text-base font-body font-bold">
                  $9
                </span>
              </>
            )}
          </button>

          <p className="text-center text-cream-muted text-xs">
            Secure payment via Stripe · One-time charge · No subscription
          </p>
        </form>
      </div>
    </main>
  );
}
