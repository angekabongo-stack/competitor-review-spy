import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';
import { fetchPlaceData } from '@/lib/google-places';
import { sendResultsEmail, sendFollowUpEmail } from '@/lib/resend';
import ComparisonTable from '@/components/ComparisonTable';
import GapAnalysisCards from '@/components/GapAnalysisCard';
import type { BusinessAnalysis, AnalysisRecord } from '@/lib/types';

interface Props {
  searchParams: { session_id?: string };
}

async function getOrFetchAnalysis(
  analysisId: string,
  record: AnalysisRecord
): Promise<{ business: BusinessAnalysis; competitors: BusinessAnalysis[] } | null> {
  // Data already fetched — return from DB
  if (record.business_data && record.competitors_data) {
    return {
      business: record.business_data,
      competitors: record.competitors_data,
    };
  }

  // Fetch from Google Places
  const [businessData, ...competitorDataResults] = await Promise.all([
    fetchPlaceData(record.business_url),
    ...record.competitor_urls.map((u) => fetchPlaceData(u)),
  ]);

  const competitorsData = competitorDataResults.filter(
    (c): c is BusinessAnalysis => c !== null
  );

  if (!businessData) return null;

  // Persist to Supabase
  await supabase
    .from('analyses')
    .update({
      business_data: businessData,
      competitors_data: competitorsData,
      status: 'data_fetched',
    })
    .eq('id', analysisId)
    .eq('status', 'paid'); // only update if webhook already marked it paid

  // Send emails (idempotent — webhook may also try, status guard prevents double send)
  const { data: updated } = await supabase
    .from('analyses')
    .update({ status: 'email_sent' })
    .eq('id', analysisId)
    .in('status', ['paid', 'data_fetched'])
    .select('status')
    .single();

  if (updated) {
    await sendResultsEmail(record.email, businessData, competitorsData);
    await sendFollowUpEmail(record.email, businessData.name);
  }

  return { business: businessData, competitors: competitorsData };
}

export default async function ResultsPage({ searchParams }: Props) {
  const sessionId = searchParams.session_id;

  if (!sessionId) {
    redirect('/');
  }

  // Verify Stripe payment
  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    notFound();
  }

  if (session.payment_status !== 'paid') {
    return (
      <main className="min-h-screen bg-bg flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-red-accent/40 border-t-red-accent rounded-full animate-spin mx-auto mb-6" />
          <h1 className="font-heading text-3xl text-cream mb-2">Payment pending…</h1>
          <p className="text-cream-muted text-sm">
            Please wait or check your Stripe confirmation email.
          </p>
        </div>
      </main>
    );
  }

  const analysisId = session.metadata?.analysis_id;
  if (!analysisId) notFound();

  // Load from Supabase
  const { data: record, error } = await supabase
    .from('analyses')
    .select('*')
    .eq('id', analysisId)
    .single();

  if (error || !record) notFound();

  // Update stripe_session_id if not yet stored (webhook may still be in flight)
  if (!record.stripe_session_id) {
    await supabase
      .from('analyses')
      .update({ stripe_session_id: sessionId, status: 'paid' })
      .eq('id', analysisId)
      .eq('status', 'pending_payment');
    record.status = 'paid';
  }

  const result = await getOrFetchAnalysis(analysisId, record as AnalysisRecord);

  if (!result) {
    return (
      <main className="min-h-screen bg-bg flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h1 className="font-heading text-4xl text-red-accent mb-4">
            Couldn&apos;t fetch business data
          </h1>
          <p className="text-cream-muted mb-6">
            We couldn&apos;t find your business on Google Places using the URL you provided.
            Please email us at{' '}
            <a href="mailto:support@competitorreviewspy.com" className="text-red-accent underline">
              support@competitorreviewspy.com
            </a>{' '}
            and we&apos;ll sort it out.
          </p>
          <Link href="/" className="text-cream-muted hover:text-cream text-sm underline">
            ← Back to home
          </Link>
        </div>
      </main>
    );
  }

  const { business, competitors } = result;

  return (
    <main className="min-h-screen bg-bg">
      {/* Nav */}
      <nav className="border-b border-cream-border px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="font-heading text-red-accent tracking-widest text-xl">
          REVIEW SPY
        </Link>
        <span className="text-cream-muted text-sm">
          Report for{' '}
          <span className="text-cream font-semibold">{business.name}</span>
        </span>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 bg-green-positive/10 border border-green-positive/30 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-positive" />
            <span className="text-green-positive text-xs font-semibold uppercase tracking-widest">
              Report Ready — emailed to {record.email}
            </span>
          </div>
          <h1 className="font-heading text-5xl md:text-6xl text-cream tracking-wide mb-2">
            Your Review Report
          </h1>
          <p className="text-cream-muted">
            {business.name} vs {competitors.map((c) => c.name).join(', ')} ·{' '}
            {record.industry}
          </p>
        </div>

        {/* Comparison Table */}
        <section>
          <h2 className="font-heading text-3xl text-cream tracking-wide mb-4">
            Side-by-Side Comparison
          </h2>
          <ComparisonTable business={business} competitors={competitors} />
        </section>

        {/* Gap Analysis */}
        <section>
          <h2 className="font-heading text-3xl text-cream tracking-wide mb-2">
            Gap Analysis
          </h2>
          <p className="text-cream-muted text-sm mb-5">
            Here&apos;s where you stand — and what it means for your visibility.
          </p>
          <GapAnalysisCards business={business} competitors={competitors} />
        </section>

        {/* Recent reviews sample */}
        {business.reviews_sample.length > 0 && (
          <section>
            <h2 className="font-heading text-3xl text-cream tracking-wide mb-4">
              Your Recent Reviews
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {business.reviews_sample.slice(0, 4).map((r, i) => (
                <div
                  key={i}
                  className="bg-cream-faint border border-cream-border rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-yellow-400 text-sm">
                      {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                    </span>
                    <span className="text-cream-muted text-xs">
                      {r.relative_time_description}
                    </span>
                  </div>
                  <p className="text-cream-muted text-sm leading-relaxed line-clamp-3">
                    {r.text || <em className="text-cream-muted/40">No text</em>}
                  </p>
                  <p className="text-cream-muted/50 text-xs mt-2">— {r.author_name}</p>
                  {r.has_response && (
                    <span className="mt-2 inline-block text-[10px] bg-green-positive/20 text-green-positive px-1.5 py-0.5 rounded uppercase tracking-wide">
                      Responded
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Upgrade CTA */}
        <section className="border border-red-accent/40 bg-red-accent/5 rounded-2xl p-8 md:p-10">
          <div className="max-w-2xl">
            <p className="text-red-accent text-xs font-semibold uppercase tracking-widest mb-3">
              Next step
            </p>
            <h2 className="font-heading text-4xl md:text-5xl text-cream tracking-wide mb-4">
              Close the gap — automatically
            </h2>
            <p className="text-cream-muted text-base leading-relaxed mb-6">
              The fastest way to improve your response rate and your review velocity is
              to respond to every review within minutes. ReviewReplyAI generates
              personalised, on-brand Google review replies for your business — so you
              never miss a review again.
            </p>
            <ul className="space-y-2 mb-8">
              {[
                'AI-written replies that sound like you, not a bot',
                'Responds within minutes of each new review',
                'Builds trust and boosts Google local ranking',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-cream-muted text-sm">
                  <span className="text-green-positive">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="https://reviewreplyai.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-accent hover:bg-red-hover text-white font-heading text-xl tracking-widest px-8 py-4 rounded-lg transition-all duration-150 hover:shadow-[0_0_30px_rgba(255,50,50,0.4)]"
            >
              Start with ReviewReplyAI →
            </a>
            <p className="text-cream-muted/40 text-xs mt-3">
              Free trial available · reviewreplyai.ca
            </p>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-cream-border px-6 py-8 mt-12 text-center">
        <p className="text-cream-muted/40 text-xs">
          © {new Date().getFullYear()} Competitor Review Spy · Questions?{' '}
          <a
            href="mailto:support@competitorreviewspy.com"
            className="hover:text-red-accent transition-colors"
          >
            support@competitorreviewspy.com
          </a>
        </p>
      </footer>
    </main>
  );
}
