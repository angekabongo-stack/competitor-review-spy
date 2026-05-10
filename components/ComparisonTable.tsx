import type { BusinessAnalysis } from '@/lib/types';

function StarRating({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span>
      <span className="text-yellow-400">{'★'.repeat(full)}{'☆'.repeat(5 - full)}</span>
      <span className="text-cream-muted ml-1.5">{rating.toFixed(1)}</span>
    </span>
  );
}

function Pill({ value, better }: { value: string; better: boolean }) {
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
        better
          ? 'bg-green-positive/20 text-green-positive'
          : 'bg-red-accent/20 text-red-accent'
      }`}
    >
      {better ? '▲' : '▼'} {value}
    </span>
  );
}

interface Props {
  business: BusinessAnalysis;
  competitors: BusinessAnalysis[];
}

type MetricKey = 'total_reviews' | 'avg_rating' | 'response_rate' | 'reviews_per_month' | 'five_star_rate';

const METRICS: { key: MetricKey; label: string; unit: string; higherIsBetter: boolean }[] = [
  { key: 'total_reviews', label: 'Total Reviews', unit: '', higherIsBetter: true },
  { key: 'avg_rating', label: 'Avg Rating', unit: '/5', higherIsBetter: true },
  { key: 'response_rate', label: 'Response Rate', unit: '%', higherIsBetter: true },
  { key: 'reviews_per_month', label: 'Reviews / Month', unit: '', higherIsBetter: true },
  { key: 'five_star_rate', label: '5-Star Rate', unit: '%', higherIsBetter: true },
];

export default function ComparisonTable({ business, competitors }: Props) {
  const allBusinesses = [{ ...business, isYou: true }, ...competitors.map((c) => ({ ...c, isYou: false }))];

  return (
    <div className="overflow-x-auto rounded-xl border border-cream-border">
      <table className="w-full text-sm comparison-table min-w-[640px]">
        <thead>
          <tr className="border-b border-cream-border bg-cream-faint">
            <th className="px-5 py-4 text-left text-red-accent font-semibold text-xs uppercase tracking-widest">
              Metric
            </th>
            {allBusinesses.map((b) => (
              <th
                key={b.place_id}
                className="px-5 py-4 text-left text-xs uppercase tracking-widest"
              >
                <span
                  className={`font-semibold ${
                    b.isYou ? 'text-cream' : 'text-cream-muted'
                  }`}
                >
                  {b.name}
                </span>
                {b.isYou && (
                  <span className="ml-2 bg-red-accent text-white text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wide">
                    You
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {METRICS.map(({ key, label, unit, higherIsBetter }) => {
            const yourVal = business[key] as number;
            const maxCompVal = Math.max(...competitors.map((c) => c[key] as number));

            return (
              <tr key={key} className="border-b border-cream-border/40">
                <td className="px-5 py-4 text-cream-muted font-medium whitespace-nowrap">
                  {label}
                </td>

                {/* Your value */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    {key === 'avg_rating' ? (
                      <StarRating rating={yourVal} />
                    ) : (
                      <span className="font-semibold text-cream">
                        {typeof yourVal === 'number'
                          ? yourVal.toLocaleString()
                          : yourVal}
                        {unit}
                      </span>
                    )}
                    {higherIsBetter && yourVal > maxCompVal && (
                      <Pill value="Ahead" better={true} />
                    )}
                    {higherIsBetter && yourVal < maxCompVal && (
                      <Pill
                        value={`-${(
                          ((maxCompVal - yourVal) /
                            Math.max(maxCompVal, 1)) *
                          100
                        ).toFixed(0)}%`}
                        better={false}
                      />
                    )}
                  </div>
                </td>

                {/* Competitor values */}
                {competitors.map((comp) => {
                  const compVal = comp[key] as number;
                  const compIsAhead = higherIsBetter
                    ? compVal > yourVal
                    : compVal < yourVal;

                  return (
                    <td
                      key={comp.place_id}
                      className={`px-5 py-4 ${compIsAhead ? 'text-red-accent' : 'text-cream-muted'}`}
                    >
                      {key === 'avg_rating' ? (
                        <StarRating rating={compVal} />
                      ) : (
                        <span className="font-semibold">
                          {compVal.toLocaleString()}
                          {unit}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="px-5 py-3 border-t border-cream-border bg-cream-faint">
        <p className="text-xs text-cream-muted">
          Response rate and 5-star rate are estimated from a sample of recent reviews.
          Review velocity is estimated from sample timestamps.
        </p>
      </div>
    </div>
  );
}
