import { SequenceEmail, wrap, h1, h2, p, stat, cta, quote, twoCol, BASE_URL, REPLY_URL } from './shared';

export const LEADS_SEQUENCE: SequenceEmail[] = [
  {
    day: 2,
    subject: '68% of businesses are handing you free customers',
    html: wrap(`
      ${h1('68%. Read that twice.')}
      ${p('68% of businesses never respond to their negative Google reviews.')}
      ${p('Not a slow response. Not a bad response. Zero response.')}
      ${p('Every unanswered 1-star review is a customer who walked away twice — once when they had the bad experience, and again when the business said nothing.')}
      ${p('Meanwhile, the business that responds professionally to that same type of review?')}
      ${p('They get the next 10 customers who read that thread. Because people don\'t choose the business with perfect reviews. They choose the one that looks most accountable.')}
      ${h2('The question you should be asking:')}
      ${p('Is your competitor in the 68% — or are they already cleaning up your missed opportunities?')}
      ${p('A $9 Competitor Review Spy report tells you exactly where they stand. Response rate, review count, star rating. Side by side. Live Google data.')}
      ${cta('Find out which side they\'re on — $9 →', BASE_URL + '/analyze')}
      ${p('Stop guessing. Start knowing.')}
    `),
  },
  {
    day: 4,
    subject: 'I ran a $9 spy report. I wasn\'t ready for what I found.',
    html: wrap(`
      ${h1('The $9 wake-up call')}
      ${p('This is a story a lot of business owners tell us.')}
      ${p('They run a Competitor Review Spy report expecting to feel validated. They expect to see their competitor is sloppy, inconsistent, or behind.')}
      ${p('Instead, they get a wake-up call.')}
      ${quote('Their response rate: 94%. Mine: 38%. Their review count: 211. Mine: 67. Their average response time: under 24 hours. Mine: 11 days. Same service area. Same price range. Same star rating. Different Google Maps ranking. Now I understand why.')}
      ${p('The $9 didn\'t hurt. The data did.')}
      ${p('But that\'s the point. Data you can\'t see is a problem you can\'t fix. Data you CAN see is a problem with a clear starting line.')}
      ${h2('Where do you stand?')}
      ${p('You don\'t have to guess. One report. $9. 60 seconds to run.')}
      ${cta('Get my competitor report →', BASE_URL + '/analyze')}
      ${p('Side-by-side. Live Google data. No guessing.')}
    `),
  },
  {
    day: 7,
    subject: 'Your competitor has been responding to reviews all week',
    html: wrap(`
      ${h1('While you\'ve been reading...')}
      ${p('Your top competitor has responded to every review that came in this week.')}
      ${p('Or they haven\'t. And that gap is your opportunity.')}
      ${p('The only way to know is to look. And looking costs $9.')}
      ${stat('2.7 days', 'Average time businesses take to respond to a Google review')}
      ${stat('4 hours', 'What the top-ranked businesses in most categories average')}
      ${p('That 2.7-day gap isn\'t just about reputation. It\'s a ranking signal. Google reads response speed as an indicator of business quality. Fast responder = active business = higher placement.')}
      ${p('You could be the fast responder in your market. But you need to know where you stand first.')}
      ${cta('See where you stand vs your competitor — $9 →', BASE_URL + '/analyze')}
      ${p('No subscription. Instant results. Live Google data.')}
    `),
  },
  {
    day: 10,
    subject: 'How Sarah went from page 3 to the top 3 without spending on ads',
    html: wrap(`
      ${h1('No ads. No tricks. Just data.')}
      ${p('Sarah owns a women\'s clothing boutique in Kitchener, Ontario. In 2024, she was spending $800/month on Facebook ads and still losing customers to a competitor two storefronts down.')}
      ${p('She ran a Competitor Review Spy report as a last resort.')}
      ${twoCol(
        { label: 'Competitor response rate', value: '11%', color: '#FF3232' },
        { label: 'Sarah\'s response rate', value: '8%', color: '#FF3232' }
      )}
      ${p('Both terrible. Both leaving the same advantage on the table.')}
      ${p('Sarah cut her ad budget in half and invested that energy into one thing: responding to every review within 24 hours. She used ReviewReply AI to keep the responses professional and consistent.')}
      ${quote('I stopped paying for visibility and started earning it. Within 90 days, I was ranking in the top 3 for "women\'s clothing Kitchener" without a single dollar in ads.', 'Sarah M., Kitchener ON')}
      ${stat('Top 3', 'Google Maps ranking (was page 3)')}
      ${stat('91%', 'Response rate (was 8%)')}
      ${stat('$400/month', 'Saved on ad spend')}
      ${p('The first step was knowing where she stood. One $9 report.')}
      ${cta('Get your $9 spy report →', BASE_URL + '/analyze')}
    `),
  },
  {
    day: 14,
    subject: 'The 90% club nobody in local SEO talks about',
    html: wrap(`
      ${h1('There\'s a threshold that changes everything.')}
      ${p('It\'s 90%.')}
      ${p('Businesses that respond to 90% or more of their Google reviews unlock something most businesses never experience:')}
      ${stat('+23%', 'More Google Maps profile views')}
      ${stat('+18%', 'More direction requests')}
      ${stat('3x', 'More likely to convert a negative review to a positive one')}
      ${p('The average business sits at 41%. That means crossing 90% puts you in the top tier of your market — regardless of how many reviews you have or what your star rating is.')}
      ${h2('Here\'s what most people get wrong:')}
      ${p('They think they need more reviews. They don\'t. They need a higher response rate on the reviews they already have.')}
      ${p('A business with 50 reviews and a 92% response rate will outrank a business with 300 reviews and a 30% response rate. This has been documented across dozens of local markets.')}
      ${p('Your competitor might already know this. Or they might be sitting at 41% and leaving the door wide open for you.')}
      ${cta('Find out — $9 spy report →', BASE_URL + '/analyze')}
    `),
  },
  {
    day: 17,
    subject: 'Your competitor just checked their spy report. Did you?',
    html: wrap(`
      ${h1('The invisible war in your market.')}
      ${p('Right now, in your city, in your category, one of your competitors is paying closer attention to this stuff than you are.')}
      ${p('They know their response rate. They know yours. They know the gap. And they\'re using it.')}
      ${p('Every time a potential customer reads their 1-star review and sees a professional response — and then looks at your 1-star review and sees nothing — they make a decision. It doesn\'t feel like a decision. It feels like a feeling. But it\'s data.')}
      ${quote('You can\'t fix a gap you don\'t know exists.', 'The entire point of this email')}
      ${p('You signed up for a free preview of your review score. You saw the data. But seeing the data and acting on it are two different things.')}
      ${p('One $9 report shows you exactly where the gap is. Then you know exactly what to fix.')}
      ${cta('Get my $9 competitor report →', BASE_URL + '/analyze')}
    `),
  },
  {
    day: 21,
    subject: 'A restaurant owner\'s $9 decision that changed his year',
    html: wrap(`
      ${h1('He almost didn\'t run the report.')}
      ${p('Carlos runs a Brazilian steakhouse in downtown Toronto. Business was fine. Reviews were decent. He had a 4.3 average and about 150 Google reviews.')}
      ${p('"Fine" is a dangerous place to be. Fine means you don\'t look too closely.')}
      ${p('His business partner convinced him to run a Competitor Review Spy report on the Mediterranean place two doors down. Carlos expected to feel better about himself.')}
      ${quote('I saw their response rate was 88%. Mine was 26%. I\'d been proud of my 4.3 stars, but they had a 4.4 and a response rate triple mine. I immediately understood why they had a 45-minute wait on Fridays and I had empty tables.', 'Carlos D., Toronto ON')}
      ${h2('What happened next:')}
      ${p('Carlos started responding to every review. Within 90 days, he reached 85% response rate. Google Maps views increased by 31%. Friday wait times? Now 30 minutes at Carlos\'s restaurant too.')}
      ${p('The $9 he spent on the report was the most leveraged $9 of his year.')}
      ${cta('Get your $9 spy report →', BASE_URL + '/analyze')}
      ${p('What will yours reveal?')}
    `),
  },
  {
    day: 25,
    subject: 'Google just made your response rate 10x more important',
    html: wrap(`
      ${h1('The algorithm didn\'t wait for you.')}
      ${p('Google\'s 2026 review policy updates have been doing one thing consistently: making authentic review behavior matter more than ever.')}
      ${p('Fake reviews are being removed at record rates. Incentivized reviews are being flagged. Star ratings are becoming noisier.')}
      ${p('What can\'t be faked? A sustained, high response rate over 12-24 months. That\'s a behavioral signal — it tells Google this is a real business, run by real people, who genuinely care about their customers.')}
      ${stat('90%', 'Response rate threshold that triggers measurable ranking increases')}
      ${stat('41%', 'Where the average business currently sits')}
      ${p('The businesses building this habit today are laying a foundation their competitors can\'t shortcut their way around. Once you have 18 months of consistent, high-quality responses in Google\'s data, you\'re almost impossible to displace.')}
      ${p('Where does your competitor stand on this metric right now?')}
      ${cta('See for yourself — $9 →', BASE_URL + '/analyze')}
    `),
  },
  {
    day: 28,
    subject: 'Still thinking about it? Here\'s what 28 days costs.',
    html: wrap(`
      ${h1('28 days of not knowing.')}
      ${p('You signed up to get a preview of your Google review score almost a month ago.')}
      ${p('If you haven\'t run the full report yet, here\'s what you\'ve missed:')}
      ${p('→ Every review your competitor responded to while you went silent<br>→ Every ranking signal they built while you stayed at 41% response rate<br>→ Every customer who chose them because their 1-star had a response and yours didn\'t')}
      ${p('This isn\'t meant to make you feel bad. It\'s meant to make the cost of waiting real.')}
      ${p('$9 is less than a coffee order. One report takes 60 seconds. The data it gives you is worth more than any marketing tip, SEO guide, or business book you\'ll read this year.')}
      ${p('Because it\'s specific to your business, your competitor, your market.')}
      ${cta('Get my report — $9 →', BASE_URL + '/analyze')}
      ${p('Stop guessing. Start knowing.')}
    `),
  },
  {
    day: 32,
    subject: 'How Mike beat 3 bigger competitors with one $9 report',
    html: wrap(`
      ${h1('3 competitors. 1 report. 1 strategy.')}
      ${p('Mike runs an HVAC company in Winnipeg. He was competing against three larger companies — all with more trucks, more staff, more reviews.')}
      ${p('He ran a Competitor Review Spy report on all three.')}
      ${p('What he found was startling:')}
      ${twoCol(
        { label: 'Competitors avg response rate', value: '24%', color: '#FF3232' },
        { label: 'Mike\'s response rate', value: '19%', color: '#FF3232' }
      )}
      ${p('They were all terrible. But they were bigger.')}
      ${quote('I realized size didn\'t matter if nobody was responding. I could be the most responsive HVAC company in Winnipeg faster than any of them could — because none of them were even trying.', 'Mike T., Winnipeg MB')}
      ${h2('Mike\'s 6-month results:')}
      ${stat('96%', 'His response rate (was 19%)')}
      ${stat('#1, #2, #3', 'Where his company now ranks for key HVAC searches')}
      ${stat('+89%', 'Revenue increase year-over-year')}
      ${p('The $9 report told him exactly where the opportunity was. He just had to take it.')}
      ${cta('See your opportunity — $9 →', BASE_URL + '/analyze')}
    `),
  },
  {
    day: 35,
    subject: 'The math that makes response rate = revenue',
    html: wrap(`
      ${h1('Let\'s talk numbers.')}
      ${p('Business owners often think about Google reviews as a reputation issue. But it\'s actually a revenue issue. Here\'s the math:')}
      ${h2('Scenario A: You\'re at 41% response rate (industry average)')}
      ${p('→ Google Maps ranking: middle of the pack<br>→ Profile views: baseline<br>→ Calls from Maps: baseline<br>→ Annual revenue from Google: baseline')}
      ${h2('Scenario B: You\'re at 90%+ response rate')}
      ${p('→ +23% Google Maps profile views (documented)<br>→ +18% direction requests<br>→ Higher click-through rate (active business signal)<br>→ Negative reviews more likely to be resolved')}
      ${p('For a business doing $300K/year where 30% of customers come from Google Maps — that 23% increase in profile views translates to roughly $20,000–$30,000 in additional annual revenue.')}
      ${p('From responding to reviews faster.')}
      ${p('The question isn\'t whether this is worth doing. The question is whether your competitor is already doing it and pulling ahead of you right now.')}
      ${cta('Find out — $9 spy report →', BASE_URL + '/analyze')}
    `),
  },
  {
    day: 38,
    subject: 'Unpopular opinion: by 2027, this beats your star rating',
    html: wrap(`
      ${h1('The metric that\'s taking over.')}
      ${p('Here\'s an unpopular opinion that\'s becoming harder to argue with:')}
      ${p('By 2027, your Google review response rate will matter more than your star rating for local search rankings.')}
      ${p('Here\'s the case:')}
      ${p('Star ratings are increasingly unreliable. Fake reviews, incentivized posts, and review gating have polluted the signal. Google knows this and is actively removing fraudulent reviews at record rates.')}
      ${p('What can\'t be easily gamed? A sustained, high response rate over 12-24 months. That\'s a behavioral signal that takes real time to build. You can\'t buy it overnight.')}
      ${p('The businesses starting to build this habit now — in 2026 — will own local search in 2028. The ones waiting? They\'ll be trying to catch up against a lead that compounds every month.')}
      ${quote('Your star rating tells customers how good you are. Your response rate tells Google how real you are.', 'The difference that matters')}
      ${cta('See where you stand vs your competitor →', BASE_URL + '/analyze')}
    `),
  },
  {
    day: 42,
    subject: 'For agency owners: the $9 tool that saves client relationships',
    html: wrap(`
      ${h1('Your client just asked the question you dread.')}
      ${p('"Why does our competitor rank above us on Google Maps?"')}
      ${p('Most agencies answer with guesswork. "It\'s probably their backlink profile." "Their website is more optimized." "They might have more reviews."')}
      ${p('Guesswork isn\'t a strategy. And clients who get guesswork start looking for agencies who have answers.')}
      ${h2('The $9 answer:')}
      ${p('A Competitor Review Spy report gives you a live, side-by-side breakdown of your client\'s Google review performance vs their top competitor. Response rate, review count, star rating — all of it.')}
      ${p('Pull it up in the meeting. Walk through it. Show them exactly where the gap is.')}
      ${p('That\'s not an agency that guesses. That\'s an agency that has data.')}
      ${stat('$9', 'Cost per report')}
      ${stat('$250–500/month', 'What you can charge for monthly competitive monitoring')}
      ${stat('Priceless', 'The client retention value of having the answer')}
      ${cta('Get your first agency report — $9 →', BASE_URL + '/analyze')}
    `),
  },
  {
    day: 46,
    subject: 'Last warning: your competitor is building a moat you can\'t cross',
    html: wrap(`
      ${h1('There\'s a point of no return.')}
      ${p('In local search, response rate advantages compound. Once a competitor establishes a 90%+ response rate and holds it for 6-12 months, the ranking advantage they build becomes extremely difficult to overcome without matching — and sustaining — their effort.')}
      ${p('It\'s not like a backlink gap you can close with a sprint. It\'s a behavioral signal built over hundreds of individual responses, over months.')}
      ${p('If your competitor is at 6 months of 90% response rate and you\'re at 0 — you need 6 months of your own just to get to even. And they\'ll be at 12 months by then.')}
      ${p('This is why acting early matters more than acting perfectly.')}
      ${p('A mediocre response sent today is worth more than a perfect response planned for next week.')}
      ${p('And a $9 report that shows you exactly how far the gap has grown is worth more than another month of guessing.')}
      ${cta('Check the gap — $9 →', BASE_URL + '/analyze')}
    `),
  },
  {
    day: 50,
    subject: 'How a cleaning company 4x\'d their Google leads in one quarter',
    html: wrap(`
      ${h1('The most boring business. The most dramatic turnaround.')}
      ${p('Rachel runs a residential cleaning company in Calgary. 8 employees. Bread-and-butter service. Nothing fancy.')}
      ${p('She had 43 Google reviews, a 4.5 average, and a 12% response rate.')}
      ${p('Her biggest competitor? 280 reviews, 4.6 average, 9% response rate.')}
      ${p('Rachel ran a Competitor Review Spy report and realized something that changed her entire strategy:')}
      ${quote('Nobody in my category was responding to reviews. Not the big company, not the boutique services, not anyone. It was a total vacuum. I just had to fill it.', 'Rachel K., Calgary AB')}
      ${h2('What Rachel did in Q1 2025:')}
      ${p('She responded to every review — existing and new — using ReviewReply AI. Professional, specific, warm. Never templated.')}
      ${stat('4x', 'Increase in Google Maps leads in one quarter')}
      ${stat('93%', 'Her response rate at end of quarter')}
      ${stat('#1', 'Google Maps ranking for "house cleaning Calgary"')}
      ${p('Her competitor still has 6x her review count. They\'re still ranked below her.')}
      ${p('Because she shows up and they don\'t.')}
      ${cta('See your version of this opportunity — $9 →', BASE_URL + '/analyze')}
    `),
  },
  {
    day: 54,
    subject: 'One stat. One decision. One $9 investment.',
    html: wrap(`
      ${h1('Make it simple.')}
      ${p('You\'ve been on this list for 54 days. You\'ve seen the stories, the stats, the case studies.')}
      ${p('Let\'s make this as simple as possible:')}
      ${stat('41%', 'Average response rate — where most of your competitors are right now')}
      ${stat('90%', 'Where the top businesses in your market are, or are heading')}
      ${p('The gap between those two numbers is the entire game. Everything else — star ratings, review count, SEO, ads — is secondary to this one metric in local search right now.')}
      ${p('$9 shows you exactly where your specific competitor sits on that spectrum.')}
      ${p('Not an industry average. Not a guess. Their actual response rate, right now, today.')}
      ${p('One decision. $9. 60 seconds.')}
      ${cta('Get my spy report →', BASE_URL + '/analyze')}
    `),
  },
  {
    day: 57,
    subject: 'Still with us? Here\'s something we haven\'t shared yet.',
    html: wrap(`
      ${h1('For the ones still paying attention.')}
      ${p('You\'ve been with us for almost two months. You\'ve read the stories, the stats, the case studies.')}
      ${p('If you haven\'t run a spy report yet, I genuinely want to know why. Reply to this email — I read every response.')}
      ${p('But if you\'re still here because you\'re thinking about it — here\'s the one thing I haven\'t said directly yet:')}
      ${p('The businesses who run the report and see good news feel relieved and get complacent.')}
      ${p('The businesses who run the report and see bad news feel uncomfortable — and then get to work.')}
      ${p('Both outcomes are valuable. But the second one is what changes businesses.')}
      ${p('Which one do you think you\'ll get?')}
      ${cta('Find out — $9 →', BASE_URL + '/analyze')}
      ${p('And if you\'re ready to start responding like the top businesses in your market:')}
      ${cta('Try ReviewReply AI →', REPLY_URL)}
    `),
  },
  {
    day: 60,
    subject: 'Final email: the businesses that acted vs the ones that didn\'t',
    html: wrap(`
      ${h1('Two months. One decision.')}
      ${p('This is the last email in this series. We\'ve shared everything we know about Google review response rates, local search rankings, and what separates the businesses at the top from the ones left wondering why.')}
      ${p('Here\'s the honest summary:')}
      ${p('The businesses that ran the spy report and acted on the data — they\'re building an advantage that compounds every month. Their response rate is climbing. Their rankings are moving. Their competitors are starting to notice.')}
      ${p('The businesses that read the emails and didn\'t act — they\'re still at 41%. And the window to get ahead of the curve without fighting uphill is quietly closing.')}
      ${p('There\'s no trick here. No secret tactic. Just one metric — response rate — and the discipline to improve it.')}
      ${h2('If you do one thing today:')}
      ${cta('Run your $9 spy report →', BASE_URL + '/analyze')}
      ${p('See exactly where your competitor stands. See exactly where you stand. Then decide what to do with that information.')}
      ${p('And if you\'re ready to close the gap automatically:')}
      ${cta('Try ReviewReply AI →', REPLY_URL)}
      ${p('Thank you for being on this list. Whatever you decide — we\'re rooting for you.')}
    `),
  },
];
