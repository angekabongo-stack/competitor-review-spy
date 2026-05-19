import type { Metadata } from 'next';
import Link from 'next/link';
import SampleReport from '@/components/SampleReport';
import LeadCaptureForm from './LeadCaptureForm';

export const metadata: Metadata = {
  title: 'See How Your Competitor Beats You on Google Reviews',
  description:
    'Side-by-side Google review comparison. Response rate, review count, star rating. $9 one-time report.',
  robots: { index: false, follow: false },
};

const STATS = [
  {
    number: '2.7',
    unit: ' days',
    label: 'Average time businesses take to respond to a Google review',
  },
  {
    number: '68%',
    unit: '',
    label: 'Of businesses never respond to their negative reviews',
  },
  {
    number: '+23%',
    unit: '',
    label: 'More Google Maps views for businesses at 90%+ response rate',
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Enter URLs',
    body: "Paste your Google Business URL and your top competitor's.",
  },
  {
    step: '02',
    title: 'Pay $9',
    body: 'One-time. No subscriptions. No surprises.',
  },
  {
    step: '03',
    title: 'Get Your Report',
    body: 'Side-by-side live Google data. Results in minutes.',
  },
];

export default function SpyReportPage() {
  return (
    <main className="min-h-screen bg-bg">
      {/* Grid background */}
      <div
        className="fixed inset-0 bg-grid-pattern bg-grid-sm opacity-100 pointer-events-none"
        aria-hidden="true"
      />

      {/* Minimal nav — logo only, no distracting links */}
      <nav className="relative z-10 border-b border-cream-border px-6 py-4 flex items-center justify-center">
        <span className="font-heading text-red-accent tracking-widest text-xl">REVIEW SPY</span>
      </nav>

      {/* Hero + email capture */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-red-accent/10 border border-red-accent/30 rounded-full px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-red-accent animate-pulse" />
          <span className="text-red-accent text-xs font-semibold uppercase tracking-widest">
            Live Google Data
          </span>
        </div>

        <h1 className="font-heading text-cream text-[clamp(2.4rem,7vw,5rem)] leading-none tracking-wide mb-6">
          The business ranking above you
          <br />
          <span className="text-red-accent">isn&apos;t better.</span>
          <br />
          They just show up.
        </h1>

        <p className="text-cream-muted text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          In 60 seconds, see exactly how your competitor&apos;s Google review strategy compares to
          yours — response rate, review count, star rating, and more.
        </p>

        <LeadCaptureForm />

        <p className="mt-4 text-cream-muted text-xs">
          No spam. Unsubscribe anytime. Full report available for $9.
        </p>
      </section>

      {/* Stats */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-cream-faint border border-cream-border rounded-xl p-6 text-center"
            >
              <div className="font-heading text-red-accent text-5xl tracking-wide">
                {stat.number}
                <span className="text-3xl">{stat.unit}</span>
              </div>
              <p className="text-cream-muted text-sm mt-3 leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story proof */}
      <section className="relative z-10 max-w-2xl mx-auto px-6 py-8">
        <div className="bg-cream-faint border border-red-accent/20 rounded-xl p-8">
          <p className="text-cream-muted text-xs uppercase tracking-widest mb-4">Real result</p>
          <p className="text-cream text-lg leading-relaxed mb-6 italic">
            &ldquo;I ran a $9 report on my top competitor. I expected to feel better about
            myself.&rdquo;
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div className="bg-bg rounded-lg p-4 border border-cream-border">
              <p className="text-cream-muted mb-2 text-xs uppercase tracking-widest">Their stats</p>
              <p className="text-green-positive font-semibold">94% response rate</p>
              <p className="text-green-positive font-semibold">211 reviews</p>
              <p className="text-green-positive font-semibold">&lt; 24h reply time</p>
            </div>
            <div className="bg-bg rounded-lg p-4 border border-cream-border">
              <p className="text-cream-muted mb-2 text-xs uppercase tracking-widest">My stats</p>
              <p className="text-red-accent font-semibold">38% response rate</p>
              <p className="text-red-accent font-semibold">67 reviews</p>
              <p className="text-red-accent font-semibold">11 day avg reply</p>
            </div>
          </div>
          <p className="text-cream-muted text-sm leading-relaxed">
            Same service area. Same price range. Same star rating. Different Google Maps ranking.
            Now I know exactly what I&apos;m up against.
          </p>
        </div>
      </section>

      {/* Sample report */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        <h2 className="font-heading text-4xl md:text-5xl text-cream tracking-wide mb-2 text-center">
          Here&apos;s what you&apos;ll get
        </h2>
        <p className="text-cream-muted text-center mb-8">Real metrics. No fluff.</p>
        <SampleReport />
      </section>

      {/* How it works */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <h2 className="font-heading text-4xl md:text-5xl text-cream tracking-wide mb-12 text-center">
          How it works
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {HOW_IT_WORKS.map(({ step, title, body }) => (
            <div
              key={step}
              className="relative bg-cream-faint border border-cream-border rounded-xl p-6"
            >
              <span className="font-heading text-7xl text-cream-border absolute -top-3 right-4 leading-none select-none">
                {step}
              </span>
              <h3 className="font-heading text-2xl text-red-accent tracking-wider mb-2">{title}</h3>
              <p className="text-cream-muted text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 border-t border-cream-border py-20 text-center px-6">
        <h2 className="font-heading text-5xl md:text-6xl text-cream tracking-wide mb-4">
          Stop guessing. Start knowing.
        </h2>
        <p className="text-cream-muted mb-10 max-w-xl mx-auto">
          Your competitors aren&apos;t waiting for you to figure it out.
        </p>
        <Link
          href="/analyze"
          className="inline-flex items-center gap-3 bg-red-accent hover:bg-red-hover text-white font-heading text-2xl tracking-widest px-10 py-5 rounded-lg transition-all duration-150 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,50,50,0.4)]"
        >
          Get my report
          <span className="bg-white/20 rounded px-2 py-0.5 text-base font-body font-bold">$9</span>
        </Link>
        <p className="mt-4 text-cream-muted text-xs">No subscription. Instant access after payment.</p>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-cream-border px-6 py-6 text-center">
        <p className="text-cream-muted text-xs">
          © {new Date().getFullYear()} Competitor Review Spy ·{' '}
          <a
            href="https://reviewreplyai.ca"
            className="hover:text-red-accent transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            ReviewReplyAI
          </a>
        </p>
      </footer>
    </main>
  );
}
