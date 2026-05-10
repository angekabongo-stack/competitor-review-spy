const SAMPLE = [
  {
    name: 'Your Business',
    isYou: true,
    reviews: 48,
    rating: 4.2,
    response: 12,
    perMonth: 2,
    fiveStar: 58,
  },
  {
    name: 'Main Competitor',
    isYou: false,
    reviews: 214,
    rating: 4.7,
    response: 89,
    perMonth: 11,
    fiveStar: 76,
  },
  {
    name: 'Local Rival',
    isYou: false,
    reviews: 97,
    rating: 4.5,
    response: 64,
    perMonth: 5,
    fiveStar: 70,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-yellow-400 text-sm">
      {'★'.repeat(Math.round(rating))}
      {'☆'.repeat(5 - Math.round(rating))}
      <span className="text-cream-muted ml-1">{rating.toFixed(1)}</span>
    </span>
  );
}

export default function SampleReport() {
  return (
    <div className="relative">
      {/* Blur overlay indicating this is a sample */}
      <div className="absolute -inset-px rounded-xl border border-red-accent/40 pointer-events-none z-10" />

      <div className="bg-cream-faint rounded-xl overflow-hidden border border-cream-border">
        <div className="px-5 py-3 border-b border-cream-border flex items-center justify-between">
          <span className="font-heading text-red-accent tracking-widest text-sm">
            SAMPLE REPORT
          </span>
          <span className="text-cream-muted text-xs">
            Your report will use real data
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm comparison-table">
            <thead>
              <tr className="border-b border-cream-border">
                {['Business', 'Reviews', 'Avg Rating', 'Response %', '/month', '5-Star %'].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-red-accent font-body font-semibold text-xs uppercase tracking-widest whitespace-nowrap"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {SAMPLE.map((row) => (
                <tr
                  key={row.name}
                  className={`border-b border-cream-border/50 transition-colors ${
                    row.isYou ? 'bg-red-accent/5' : ''
                  }`}
                >
                  <td className="px-4 py-3 font-semibold whitespace-nowrap">
                    {row.name}
                    {row.isYou && (
                      <span className="ml-2 text-[10px] bg-red-accent text-white px-1.5 py-0.5 rounded uppercase tracking-wide">
                        You
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-cream-muted">
                    {row.reviews.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <StarRating rating={row.rating} />
                  </td>
                  <td
                    className={`px-4 py-3 font-semibold ${
                      !row.isYou && row.response > SAMPLE[0].response
                        ? 'text-red-accent'
                        : 'text-green-positive'
                    }`}
                  >
                    {row.response}%
                  </td>
                  <td className="px-4 py-3 text-cream-muted">{row.perMonth}</td>
                  <td
                    className={`px-4 py-3 font-semibold ${
                      !row.isYou && row.fiveStar > SAMPLE[0].fiveStar
                        ? 'text-red-accent'
                        : 'text-green-positive'
                    }`}
                  >
                    {row.fiveStar}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Gap alert callout */}
        <div className="p-4 border-t border-cream-border bg-red-accent/5">
          <p className="text-sm text-cream-muted">
            <span className="text-red-accent font-semibold">Gap detected:</span>{' '}
            Main Competitor has{' '}
            <span className="text-cream font-semibold">166 more reviews</span> than you
            and responds to{' '}
            <span className="text-cream font-semibold">77% more</span> of their
            reviews. Your report will show the exact gap and how to close it.
          </p>
        </div>
      </div>
    </div>
  );
}
