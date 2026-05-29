'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FreePreviewPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/leads/facebook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase() }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Something went wrong');
      }

      setDone(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong — try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-bg flex items-center justify-center px-6 py-16">
      <div className="max-w-lg w-full">

        {done ? (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-green-positive/10 border border-green-positive/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-positive" />
              <span className="text-green-positive text-xs font-semibold uppercase tracking-widest">
                You&apos;re in
              </span>
            </div>
            <h1 className="font-heading text-5xl text-cream tracking-wide mb-4">
              Check your inbox.
            </h1>
            <p className="text-cream-muted text-base leading-relaxed mb-8">
              Your first breakdown lands shortly. Over the next few days we&apos;ll show you exactly what separates the top-ranked local businesses from everyone else.
            </p>
            <p className="text-cream-muted text-sm mb-6">
              Already know you want the full data on your competitor?
            </p>
            <Link
              href="/analyze"
              className="inline-block bg-red-accent hover:bg-red-hover text-white font-heading text-xl tracking-widest px-8 py-4 rounded-lg transition-all duration-150 hover:shadow-[0_0_30px_rgba(255,50,50,0.35)]"
            >
              Get my competitor report — $9 →
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <p className="text-red-accent text-xs font-semibold uppercase tracking-widest mb-3">
                Free breakdown
              </p>
              <h1 className="font-heading text-5xl md:text-6xl text-cream tracking-wide mb-4">
                Is your competitor outranking you on Google reviews?
              </h1>
              <p className="text-cream-muted text-base leading-relaxed">
                Enter your email and we&apos;ll send you a breakdown of what actually separates the top-ranked local businesses from everyone else — and exactly what you can do about it.
              </p>
            </div>

            {/* Social proof */}
            <div className="flex gap-6 mb-8">
              {[
                { number: '+23%', label: 'Google Maps views at 90% response rate' },
                { number: '$9', label: 'Full spy report — if you want the real data' },
              ].map(({ number, label }) => (
                <div key={number}>
                  <p className="font-heading text-3xl text-red-accent">{number}</p>
                  <p className="text-cream-muted text-xs leading-snug mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-cream-muted text-xs uppercase tracking-widest mb-1.5">
                  First name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane"
                  className="w-full bg-cream-faint border border-cream-border rounded-lg px-4 py-3 text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-red-accent transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-cream-muted text-xs uppercase tracking-widest mb-1.5">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@yourbusiness.com"
                  className="w-full bg-cream-faint border border-cream-border rounded-lg px-4 py-3 text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-red-accent transition-colors"
                />
              </div>

              {error && (
                <p className="text-red-accent text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-accent hover:bg-red-hover disabled:opacity-60 text-white font-heading text-2xl tracking-widest py-5 rounded-lg transition-all duration-150 hover:shadow-[0_0_30px_rgba(255,50,50,0.35)]"
              >
                {loading ? 'Sending…' : 'Get the free breakdown →'}
              </button>

              <p className="text-cream-muted text-xs text-center">
                No spam. Unsubscribe any time. We&apos;ll earn your attention or you leave.
              </p>
            </form>

            <div className="mt-10 pt-8 border-t border-cream-border">
              <p className="text-cream-muted text-xs text-center">
                Already seen enough?{' '}
                <Link href="/analyze" className="text-red-accent hover:underline">
                  Get the full $9 competitor report →
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
