'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function LeadCaptureForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'fb-ad' }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="max-w-md mx-auto space-y-4">
        <div className="bg-green-positive/10 border border-green-positive/30 rounded-xl p-4 text-center">
          <p className="text-green-positive font-semibold text-sm">
            ✓ Check your inbox — your free preview is on its way.
          </p>
        </div>
        <Link
          href="/analyze"
          className="flex items-center justify-center gap-3 bg-red-accent hover:bg-red-hover text-white font-heading text-2xl tracking-widest px-10 py-5 rounded-lg transition-all duration-150 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,50,50,0.4)]"
        >
          Get the full report
          <span className="bg-white/20 rounded px-2 py-0.5 text-base font-body font-bold">$9</span>
        </Link>
        <p className="text-cream-muted text-xs text-center">No subscription. Instant access after payment.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
      <input
        type="email"
        required
        placeholder="Enter your email for a free preview"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full bg-cream-faint border border-cream-border rounded-lg px-4 py-3.5 text-cream text-base placeholder:text-cream-muted focus:outline-none focus:border-red-accent transition-colors"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-red-accent hover:bg-red-hover text-white font-heading text-2xl tracking-widest py-4 rounded-lg transition-all duration-150 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,50,50,0.4)] disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Sending…' : 'Get My Free Preview →'}
      </button>
      {status === 'error' && (
        <p className="text-red-accent text-xs text-center">Something went wrong. Try again.</p>
      )}
    </form>
  );
}
