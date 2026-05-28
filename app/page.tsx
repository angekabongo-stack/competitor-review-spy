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

      {/* What you'll get */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="font-heading text-4xl md:text-5xl text-cream tracking-wide mb-2 text-center">
          Here&apos;s what you&apos;ll get
        </h2>
        <p className="text-cream-muted text-center mb-10">
          8 sections of live, real-data intelligence — built from your actual Google reviews.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {/* 1 */}
          <div className="bg-cream-faint border border-cream-border rounded-xl p-5">
            <div className="font-heading text-3xl text-red-accent mb-1">74</div>
            <p className="text-cream font-semibold text-sm mb-1">Review Health Score</p>
            <p className="text-cream-muted text-xs leading-relaxed">
              A single 0–100 score measuring response rate, star rating, review volume, and 5-star share.
            </p>
          </div>
          {/* 2 */}
          <div className="bg-cream-faint border border-cream-border rounded-xl p-5">
            <div className="flex gap-1 mb-2 flex-wrap">
              <span className="text-[10px] px-2 py-0.5 rounded border border-yellow-400/40 bg-yellow-400/10 text-yellow-400 font-semibold">#2 Response Rate</span>
              <span className="text-[10px] px-2 py-0.5 rounded border border-red-accent/40 bg-red-accent/10 text-red-accent font-semibold">#3 Star Rating</span>
            </div>
            <p className="text-cream font-semibold text-sm mb-1">Competitive Rank Badges</p>
            <p className="text-cream-muted text-xs leading-relaxed">
              See exactly where you rank vs. every competitor across 4 key review metrics.
            </p>
          </div>
          {/* 3 */}
          <div className="bg-cream-faint border border-cream-border rounded-xl p-5">
            <div className="flex gap-2 mb-2 text-xs">
              <span className="text-green-positive font-bold">4.7 ★</span>
              <span className="text-cream-muted">vs</span>
              <span className="text-red-accent font-bold">4.2 ★</span>
            </div>
            <p className="text-cream font-semibold text-sm mb-1">Side-by-Side Breakdown</p>
            <p className="text-cream-muted text-xs leading-relaxed">
              Full comparison table: reviews, avg rating, response rate, monthly velocity, and 5-star rate.
            </p>
          </div>
          {/* 4 */}
          <div className="bg-cream-faint border border-cream-border rounded-xl p-5">
            <div className="text-red-accent text-xs font-bold uppercase tracking-widest mb-2">3 unanswered ★★☆☆☆</div>
            <p className="text-cream font-semibold text-sm mb-1">Unanswered Negative Reviews</p>
            <p className="text-cream-muted text-xs leading-relaxed">
              Every low-star review you haven&apos;t replied to — with the exact text so you can act today.
            </p>
          </div>
          {/* 5 */}
          <div className="bg-cream-faint border border-cream-border rounded-xl p-5">
            <div className="font-heading text-2xl text-cream mb-1">12 replies → 90%</div>
            <p className="text-cream font-semibold text-sm mb-1">Catch-Up Calculator</p>
            <p className="text-cream-muted text-xs leading-relaxed">
              Exactly how many replies you need to hit the 90% threshold where Google Maps visibility jumps.
            </p>
          </div>
          {/* 6 */}
          <div className="bg-cream-faint border border-cream-border rounded-xl p-5">
            <div className="flex gap-3 mb-2">
              <span className="font-heading text-xl text-green-positive">+23%</span>
              <span className="font-heading text-xl text-green-positive">+18%</span>
            </div>
            <p className="text-cream font-semibold text-sm mb-1">Revenue Impact Estimate</p>
            <p className="text-cream-muted text-xs leading-relaxed">
              Projected uplift in profile views, direction requests, and monthly enquiries if you close the gap.
            </p>
          </div>
          {/* 7 */}
          <div className="bg-cream-faint border border-cream-border rounded-xl p-5">
            <div className="space-y-1 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-red-accent flex items-center justify-center text-[9px] text-white font-bold">1</span>
                <span className="text-cream-muted text-xs">Reply to 3 negative reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-yellow-400 flex items-center justify-center text-[9px] text-black font-bold">2</span>
                <span className="text-cream-muted text-xs">Ask top 10 customers for reviews</span>
              </div>
            </div>
            <p className="text-cream font-semibold text-sm mb-1">Priority Action Plan</p>
            <p className="text-cream-muted text-xs leading-relaxed">
              Up to 4 numbered steps ranked by urgency — critical, high, or medium — with a timeframe for each.
            </p>
          </div>
          {/* 8 */}
          <div className="bg-cream-faint border border-cream-border rounded-xl p-5">
            <div className="text-xs text-green-positive font-semibold uppercase tracking-widest mb-2">Next step</div>
            <p className="text-cream font-semibold text-sm mb-1">Gap Analysis + AI Reply CTA</p>
            <p className="text-cream-muted text-xs leading-relaxed">
              Where each gap costs you visibility and revenue — plus a direct link to automate replies with ReviewReplyAI.
            </p>
          </div>
        </div>

        {/* Sample data preview */}
        <p className="text-cream-muted text-xs text-center uppercase tracking-widest mb-4">Sample data preview</p>
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
