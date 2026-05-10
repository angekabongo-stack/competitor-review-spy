import type { BusinessAnalysis } from '@/lib/types';

interface GapCard {
  title: string;
  insight: string;
  severity: 'critical' | 'warning' | 'good';
  metric: string;
}

function buildGapCards(
  business: BusinessAnalysis,
  competitors: BusinessAnalysis[]
): GapCard[] {
  const cards: GapCard[] = [];
  const topComp = competitors.reduce((best, c) =>
    c.total_reviews > best.total_reviews ? c : best
  );

  // Review volume gap
  const reviewGap = topComp.total_reviews - business.total_reviews;
  if (reviewGap > 0) {
    const monthsToClose =
      business.reviews_per_month > 0
        ? Math.ceil(reviewGap / Math.max(business.reviews_per_month - topComp.reviews_per_month, 1))
        : null;

    cards.push({
      title: 'Review Volume Gap',
      insight: `${topComp.name} has ${reviewGap.toLocaleString()} more reviews than you. ${
        monthsToClose && monthsToClose > 0
          ? `At current pace, you'd need ~${monthsToClose} months to catch up — if they stopped growing today.`
          : 'They also accumulate reviews faster than you each month.'
      }`,
      severity: reviewGap > 100 ? 'critical' : 'warning',
      metric: `+${reviewGap.toLocaleString()} reviews`,
    });
  } else {
    cards.push({
      title: 'Review Volume',
      insight: `You lead ${topComp.name} by ${Math.abs(reviewGap).toLocaleString()} reviews. Keep the momentum to maintain your advantage.`,
      severity: 'good',
      metric: `+${Math.abs(reviewGap).toLocaleString()} ahead`,
    });
  }

  // Rating gap
  const topRatingComp = competitors.reduce((best, c) =>
    c.avg_rating > best.avg_rating ? c : best
  );
  const ratingGap = topRatingComp.avg_rating - business.avg_rating;
  if (ratingGap > 0.1) {
    cards.push({
      title: 'Rating Gap',
      insight: `${topRatingComp.name} averages ${topRatingComp.avg_rating.toFixed(1)}★ vs your ${business.avg_rating.toFixed(1)}★. A ${ratingGap.toFixed(1)}-star gap can mean ${Math.round(ratingGap * 10)}–${Math.round(ratingGap * 18)}% fewer clicks on your listing.`,
      severity: ratingGap > 0.5 ? 'critical' : 'warning',
      metric: `${ratingGap.toFixed(1)}★ behind`,
    });
  } else {
    cards.push({
      title: 'Rating',
      insight: `Your rating matches or beats the competition. Protecting this lead requires consistently requesting reviews after every positive interaction.`,
      severity: 'good',
      metric: `${business.avg_rating.toFixed(1)}★ rating`,
    });
  }

  // Response rate gap
  const topResponseComp = competitors.reduce((best, c) =>
    c.response_rate > best.response_rate ? c : best
  );
  const responseGap = topResponseComp.response_rate - business.response_rate;
  if (responseGap > 10) {
    cards.push({
      title: 'Response Rate Gap',
      insight: `${topResponseComp.name} responds to ${topResponseComp.response_rate}% of reviews; you respond to ${business.response_rate}%. Google rewards consistent responders with better local pack visibility.`,
      severity: responseGap > 30 ? 'critical' : 'warning',
      metric: `${responseGap}% behind`,
    });
  } else {
    cards.push({
      title: 'Response Rate',
      insight: `You're keeping up with — or beating — competitors on review responses. Keep this up; it signals trust to both Google and prospective customers.`,
      severity: 'good',
      metric: `${business.response_rate}% response rate`,
    });
  }

  // 5-star rate gap
  const top5StarComp = competitors.reduce((best, c) =>
    c.five_star_rate > best.five_star_rate ? c : best
  );
  const fiveStarGap = top5StarComp.five_star_rate - business.five_star_rate;
  if (fiveStarGap > 5) {
    cards.push({
      title: '5-Star Rate Gap',
      insight: `${top5StarComp.name} converts ${top5StarComp.five_star_rate}% of their reviews to 5 stars vs your ${business.five_star_rate}%. Timing your review requests right after a win dramatically improves this ratio.`,
      severity: fiveStarGap > 20 ? 'critical' : 'warning',
      metric: `${fiveStarGap}% gap`,
    });
  } else {
    cards.push({
      title: '5-Star Conversion',
      insight: `Your 5-star ratio is competitive. Focus on requesting reviews only from happy customers — quality of timing beats quantity of requests.`,
      severity: 'good',
      metric: `${business.five_star_rate}% 5-star`,
    });
  }

  return cards;
}

const severityStyles = {
  critical: {
    border: 'border-red-accent',
    bg: 'bg-red-accent/5',
    badge: 'bg-red-accent/20 text-red-accent',
    icon: '🔴',
  },
  warning: {
    border: 'border-yellow-500/60',
    bg: 'bg-yellow-500/5',
    badge: 'bg-yellow-500/20 text-yellow-400',
    icon: '🟡',
  },
  good: {
    border: 'border-green-positive/60',
    bg: 'bg-green-positive/5',
    badge: 'bg-green-positive/20 text-green-positive',
    icon: '🟢',
  },
};

export default function GapAnalysisCards({
  business,
  competitors,
}: {
  business: BusinessAnalysis;
  competitors: BusinessAnalysis[];
}) {
  const cards = buildGapCards(business, competitors);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {cards.map((card) => {
        const styles = severityStyles[card.severity];
        return (
          <div
            key={card.title}
            className={`rounded-xl border ${styles.border} ${styles.bg} p-5`}
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-cream text-sm">{card.title}</h3>
              <span className={`text-xs px-2 py-1 rounded font-semibold ${styles.badge}`}>
                {card.metric}
              </span>
            </div>
            <p className="text-cream-muted text-sm leading-relaxed">{card.insight}</p>
          </div>
        );
      })}
    </div>
  );
}
