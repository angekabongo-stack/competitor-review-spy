import { wrap, h1, h2, p, stat, cta, quote, twoCol, BASE_URL, REPLY_URL } from './shared';

export interface PoolEmail {
  subject: string;
  html: string;
}

// Order: story, nurture, sales — repeating. 9 total.
// Rotation index: 0=story1, 1=nurture1, 2=sales1, 3=story2, 4=nurture2, 5=sales2, 6=story3, 7=nurture3, 8=sales3

const STORY: PoolEmail[] = [
  {
    subject: "She cut her ad spend in half and ranked #1. No tricks.",
    html: wrap(`
      ${h1("No ads. Just data. And one $9 decision.")}
      ${p("Sarah runs a women's clothing boutique in Kitchener, Ontario.")}
      ${p("In 2024, she was spending $800 a month on Facebook ads and still watching the competitor two doors down take more of her customers every month.")}
      ${p("She ran a Competitor Review Spy report as a last resort. Expected to feel validated. Instead she saw this:")}
      ${twoCol(
        { label: "Competitor response rate", value: "11%", color: "#FF3232" },
        { label: "Sarah's response rate", value: "8%", color: "#FF3232" }
      )}
      ${p("Both terrible. But here's what Sarah understood: the first one to move would own it.")}
      ${p("She cut her ad spend in half and put that energy into one thing — responding to every Google review within 24 hours.")}
      ${quote("I stopped paying for visibility and started earning it. Within 90 days I was ranking in the top 3 for 'women's clothing Kitchener' — without a single dollar in ads.", "Sarah M., Kitchener ON")}
      ${stat("#1", "Google Maps ranking (was page 3)")}
      ${stat("91%", "Response rate (was 8%)")}
      ${stat("$400/month", "Saved on ad spend")}
      ${p("The first step was knowing where she stood. One $9 report.")}
      ${cta("Get your $9 spy report →", BASE_URL + "/analyze")}
    `),
  },
  {
    subject: "He almost didn't run the report. His Friday nights changed because he did.",
    html: wrap(`
      ${h1("He almost didn't run it.")}
      ${p("Carlos owns a Brazilian steakhouse in downtown Toronto.")}
      ${p("Business was fine. 4.3 stars, 150 reviews, steady traffic. Fine is a dangerous place to be — it means you don't look too closely.")}
      ${p("His business partner convinced him to run a Competitor Review Spy report on the Mediterranean place two doors down.")}
      ${p("Carlos expected to feel better about himself.")}
      ${quote("Their response rate was 88%. Mine was 26%. I'd been proud of my 4.3 stars — but they had a 4.4 and a response rate triple mine. I understood immediately why they had a 45-minute Friday wait and I had empty tables.", "Carlos D., Toronto ON")}
      ${h2("What happened next:")}
      ${p("Carlos started responding to every review. Every single one.")}
      ${p("Within 90 days he hit 85% response rate. Google Maps views up 31%. Friday wait times? Now 30 minutes at his place too.")}
      ${p("His competitor still has more reviews. They're ranked below him.")}
      ${p("Because he shows up and they don't.")}
      ${cta("Get your $9 spy report →", BASE_URL + "/analyze")}
    `),
  },
  {
    subject: "A cleaning company. 4x more Google leads. One quarter.",
    html: wrap(`
      ${h1("The most boring business. The most dramatic turnaround.")}
      ${p("Rachel runs a residential cleaning company in Calgary. 8 employees. Nothing fancy.")}
      ${p("43 Google reviews, 4.5 average, 12% response rate.")}
      ${p("Her biggest competitor had 280 reviews, 4.6 average, 9% response rate.")}
      ${p("Rachel ran a Competitor Review Spy report and realized something:")}
      ${quote("Nobody in my category was responding to reviews. Not the big company, not the boutique services, not anyone. It was a total vacuum. I just had to fill it.", "Rachel K., Calgary AB")}
      ${h2("What Rachel did in Q1 2025:")}
      ${p("She responded to every review — existing and new — using ReviewReply AI. Professional, specific, warm. Never templated.")}
      ${stat("4x", "Increase in Google Maps leads in one quarter")}
      ${stat("93%", "Her response rate at end of quarter")}
      ${stat("#1", "Google Maps ranking for 'house cleaning Calgary'")}
      ${p("Her competitor still has 6x her review count. They're still ranked below her.")}
      ${p("The $9 report showed her the vacuum. She just filled it.")}
      ${cta("See your version of this opportunity — $9 →", BASE_URL + "/analyze")}
    `),
  },
];

const NURTURE: PoolEmail[] = [
  {
    subject: "The metric your competitors hope you never track.",
    html: wrap(`
      ${h1("The metric that changes everything.")}
      ${p("Most business owners obsess over star ratings. 'If I could just get to 4.5...'")}
      ${p("The star rating isn't what's moving Google Maps rankings in 2026.")}
      ${h2("It's response rate.")}
      ${p("There's a threshold — 90% — where something measurable happens:")}
      ${stat("+23%", "More Google Maps profile views")}
      ${stat("+18%", "More direction requests")}
      ${stat("3x", "More likely to turn a negative review into a positive outcome")}
      ${p("The average local business sits at 41%.")}
      ${p("That gap — from 41% to 90% — is your entire competitive opportunity in local search right now.")}
      ${h2("Here's what most people get wrong:")}
      ${p("They think they need more reviews. They don't.")}
      ${p("A business with 50 reviews and 92% response rate will consistently outrank a business with 300 reviews and a 30% response rate.")}
      ${p("Your competitor might be at 89% and pulling ahead right now. Or they might be at 23% and handing you the entire market.")}
      ${p("The $9 report tells you which one it is.")}
      ${cta("Find out where they actually stand — $9 →", BASE_URL + "/analyze")}
    `),
  },
  {
    subject: "The math that makes response rate = revenue.",
    html: wrap(`
      ${h1("Let's talk numbers.")}
      ${p("Business owners think about Google reviews as a reputation issue. It's actually a revenue issue.")}
      ${h2("Scenario A: You're at 41% response rate (industry average)")}
      ${p("→ Google Maps ranking: middle of the pack<br>→ Profile views: baseline<br>→ Calls from Maps: baseline")}
      ${h2("Scenario B: You're at 90%+ response rate")}
      ${p("→ +23% Google Maps profile views (documented)<br>→ +18% direction requests<br>→ Higher click-through rate — Google treats you as an active, quality business")}
      ${p("For a business doing $300K/year where 30% of customers come from Google Maps — that 23% increase in profile views translates to roughly $20,000–$30,000 in additional annual revenue.")}
      ${p("From responding to reviews faster.")}
      ${p("The question isn't whether this is worth doing.")}
      ${p("The question is whether your competitor is already doing it and pulling ahead right now.")}
      ${cta("Find out — $9 spy report →", BASE_URL + "/analyze")}
    `),
  },
  {
    subject: "Your competitor is building a moat. You may not be able to see it yet.",
    html: wrap(`
      ${h1("There's a point of no return.")}
      ${p("In local search, response rate advantages compound.")}
      ${p("Once a competitor establishes a 90%+ response rate and holds it for 6–12 months, the ranking advantage becomes extremely difficult to overcome without matching — and sustaining — their effort.")}
      ${p("It's not like a backlink gap you can close with a sprint. It's a behavioral signal built over hundreds of individual responses, over months.")}
      ${p("If your competitor is at 6 months of 90% response rate and you're at 0 — you need 6 months of your own just to get to even. And they'll be at 12 months by then.")}
      ${p("This is why acting early matters more than acting perfectly.")}
      ${p("A mediocre response sent today is worth more than a perfect response planned for next week.")}
      ${p("And a $9 report that shows you exactly how far the gap has grown is worth more than another month of guessing.")}
      ${cta("Check the gap — $9 →", BASE_URL + "/analyze")}
      ${p("Live Google data. 60 seconds.")}
    `),
  },
];

const SALES: PoolEmail[] = [
  {
    subject: "I'm going to be straight with you.",
    html: wrap(`
      ${h1("No pitch. Just this.")}
      ${p("You've been getting these emails. You've read the stories. You've seen the stats.")}
      ${p("So I'm not going to pretend you haven't seen the pitch.")}
      ${h2("Here it is, plainly:")}
      ${p("Competitor Review Spy is a $9 tool.")}
      ${p("It pulls live data from Google and shows you — side by side — exactly how your business compares to your top competitors on review count, average rating, response rate, and monthly velocity.")}
      ${p("It takes 60 seconds to run. It gives you data specific to your business and your market, pulled in real time. Then it tells you exactly what to do about what it finds.")}
      ${p("No subscription. No recurring charge. One report, one decision.")}
      ${p("If that's worth $9 to you right now:")}
      ${cta("Get my competitor report — $9 →", BASE_URL + "/analyze")}
      ${p("If it's not — genuinely, no hard feelings. You know where to find us when the moment is right.")}
      ${p("And when you're ready to start responding automatically:")}
      ${cta("Try ReviewReply AI →", REPLY_URL)}
    `),
  },
  {
    subject: "What does 28 days of not knowing actually cost?",
    html: wrap(`
      ${h1("28 days of not knowing.")}
      ${p("Here's what you've missed while thinking about it:")}
      ${p("→ Every review your competitor responded to while you went silent<br>→ Every ranking signal they built while you stayed at 41% response rate<br>→ Every customer who chose them because their 1-star had a response and yours didn't")}
      ${p("This isn't meant to make you feel bad. It's meant to make the cost of waiting real.")}
      ${p("$9 is less than a coffee. One report takes 60 seconds. The data it gives you is worth more than any marketing tip, SEO guide, or business book you'll read this year.")}
      ${p("Because it's specific to your business, your competitor, your market.")}
      ${p("Not an industry average. Not a guess. Their actual response rate, right now, today.")}
      ${cta("Get my report — $9 →", BASE_URL + "/analyze")}
      ${p("Stop guessing. Start knowing.")}
    `),
  },
  {
    subject: "One stat. One decision. One $9 investment.",
    html: wrap(`
      ${h1("Make it simple.")}
      ${p("Let's cut through everything:")}
      ${stat("41%", "Average response rate — where most of your competitors are sitting right now")}
      ${stat("90%", "Where the top businesses in your market are heading")}
      ${p("The gap between those two numbers is the entire game.")}
      ${p("Everything else — star ratings, review count, SEO, ads — is secondary to this one metric in local search right now.")}
      ${p("$9 shows you exactly where your specific competitor sits on that spectrum.")}
      ${p("Not an industry average. Their actual response rate, today.")}
      ${p("One decision. $9. 60 seconds.")}
      ${cta("Get my spy report →", BASE_URL + "/analyze")}
      ${p("And if you want to close the gap automatically:")}
      ${cta("Try ReviewReply AI →", REPLY_URL)}
    `),
  },
];

// Final pool: story, nurture, sales — rotating. Total = 9.
export const FACEBOOK_POOL: PoolEmail[] = [
  STORY[0], NURTURE[0], SALES[0],
  STORY[1], NURTURE[1], SALES[1],
  STORY[2], NURTURE[2], SALES[2],
];

export function getPoolEmail(stepIndex: number): PoolEmail {
  return FACEBOOK_POOL[stepIndex % FACEBOOK_POOL.length];
}
