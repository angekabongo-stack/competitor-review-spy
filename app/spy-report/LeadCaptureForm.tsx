'use client';
import { useState } from 'react';

export default function LeadCaptureForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === 'loading') return;
    setStatus('loading');

    // Fire welcome email in background — non-blocking
    fetch('/api/newsletter/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source: 'fb-ad' }),
    }).catch(() => {});

    // Hard redirect so email is pre-filled on the report page
    window.location.href = `/analyze?email=${encodeURIComponent(email)}`;
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
        {status === 'loading' ? 'Taking you there…' : 'Get My Free Preview →'}
      </button>
      {status === 'error' && (
        <p className="text-red-accent text-xs text-center">Something went wrong. Try again.</p>
      )}
    </form>
  );
}
