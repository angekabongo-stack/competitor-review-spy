'use client';
import { useState } from 'react';

export default function NewsletterSignup({ source = 'crs-blog' }: { source?: string }) {
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
        body: JSON.stringify({ email, source }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-positive/10 border border-green-positive/30 rounded-xl p-5 text-center">
        <p className="text-green-positive font-semibold text-sm">✓ You're in!</p>
        <p className="text-cream-muted text-xs mt-1">Check your inbox for your first review tip.</p>
      </div>
    );
  }

  return (
    <div className="bg-cream-faint border border-cream-border rounded-xl p-5">
      <h3 className="font-heading text-lg text-cream tracking-wide mb-1">Weekly Review Tips</h3>
      <p className="text-cream-muted text-xs mb-4">Practical advice for getting and managing Google reviews.</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-bg border border-cream-border rounded-lg px-3 py-2.5 text-cream text-sm placeholder:text-cream-muted/40 focus:outline-none focus:border-red-accent"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-red-accent hover:bg-red-hover text-white font-semibold text-sm py-2.5 rounded-lg transition-colors disabled:opacity-60"
        >
          {status === 'loading' ? 'Subscribing…' : 'Get weekly tips'}
        </button>
        {status === 'error' && (
          <p className="text-red-accent text-xs">Something went wrong. Try again.</p>
        )}
      </form>
    </div>
  );
}
