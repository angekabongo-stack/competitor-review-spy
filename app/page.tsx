import Link from 'next/link';
import SampleReport from '@/components/SampleReport';

const PAIN_POINTS = [
  'How many more reviews does your top competitor have?',
  'Are they responding to reviews while you go dark?',
  'Is their rating climbing while yours flatlines?',
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Enter URLs', body: 'Paste your Google Business URL and up to 3 competitors.' },
  { step: '02', title: 'Pay $9', body: 'One-time. No subscriptions. No surprises.' },
  { step: '03', title: 'Get Your Report', body: 'Side-by-side data pulls live from Google. Results in your inbox in minutes.' },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-bg">
      {/* Nav */}
      <nav className="border-b border-cream-border px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <span className="font-heading text-red-accent tracking-widest text-xl">
          REVIEW SPY
        </span>
        <Link
          href="/analyze"
          className="text-sm font-semibold text-cream-muted hover:text-cream transition-colors"
        >
          Get Report →
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Grid background */}
        <div
          className="absolute inset-0 bg-grid-pattern bg-grid-sm opacity-100"
          aria-hidden="true"
        />
        {/* Red glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-accent/10 blur-[120px] rounded-full"
          aria-hidden="true"
        />

        <div className="relative max-w-5xl mx-auto px-6 pt-24 pb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-red-accent/10 border border-red-accent/30 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-red-accent animate-pulse" />
            <span className="text-red-accent text-xs font-semibold uppercase tracking-widest">
              Live Google Data
            </span>
          </div>

          <h1 className="font-heading text-cream text-[clamp(2.8rem,8vw,6rem)] leading-none tracking-wide mb-6">
            Are your competitors
            <br />
            <span className="text-red-accent">beating you</span> on
            <br />
            Google reviews?
          </h1>

          <p className="text-cream-muted text-lg md:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
            Get a full side-by-side comparison: total reviews, average rating,
            response rate, and 5-star percentage — for you and up to 3 rivals.
          </p>

          <p className="text-cream-muted text-sm mb-10">
            One-time report. Real data. Results in minutes.
          </p>

          <Link
            href="/analyze"
            className="inline-flex items-center gap-3 bg-red-accent hover:bg-red-hover text-white font-heading text-2xl tracking-widest px-10 py-5 rounded-lg transition-all duration-150 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,50,50,0.4)] active:scale-100"
          >
            Spy on my competitors
            <span className="bg-white/20 rounded px-2 py-0.5 text-base font-body font-bold">
              $9
            </span>
          </Link>

          <p className="mt-4 text-cream-muted text-xs">
            No subscription. Instant access after payment.
          </p>
        </div>
      </section>

      {/* Pain points */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <div className="grid gap-4">
          {PAIN_POINTS.map((point) => (
            <div
              key={point}
              className="flex items-start gap-4 bg-cream-faint border border-cream-border rounded-lg px-5 py-4"
            >
              <span className="text-red-accent text-lg mt-0.5">?</span>
              <p className="text-cream-muted text-[15px] leading-snug">{point}</p>
            </div>
          ))}
        </div>
        <p className="text-center mt-6 text-cream font-semibold">
          Now you can answer all three — in one $9 report.
        </p>
      </section>

      {/* Sample report */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="font-heading text-4xl md:text-5xl text-cream tracking-wide mb-2 text-center">
          Here&apos;s what you&apos;ll get
        </h2>
        <p className="text-cream-muted text-center mb-8">
          Real metrics. No fluff. No upsells buried in the data.
        </p>
        <SampleReport />
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-6 py-16">
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
              <h3 className="font-heading text-2xl text-red-accent tracking-wider mb-2">
                {title}
              </h3>
              <p className="text-cream-muted text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-cream-border py-20 text-center px-6">
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
          Get my report — $9
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-cream-border px-6 py-8 text-center">
        <p className="text-cream-muted text-xs">
          © {new Date().getFullYear()} Competitor Review Spy · Powered by{' '}
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
