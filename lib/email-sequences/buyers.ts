import { SequenceEmail, wrap, h1, h2, p, stat, cta, quote, twoCol, BASE_URL, REPLY_URL } from './shared';

export const BUYERS_SEQUENCE: SequenceEmail[] = [
  {
    day: 1,
    subject: 'Now that you see the gap — here\'s how to close it',
    html: wrap(`
      ${h1('You have the data. Now what?')}
      ${p('You ran your Competitor Review Spy report. You saw the numbers.')}
      ${p('Maybe you were ahead. Maybe — like most business owners — you found out your competitor has been quietly beating you on response rate, review volume, or reply speed.')}
      ${p('Either way, now you know. And data you can see is data you can act on.')}
      ${h2('The fastest way to close the gap:')}
      ${p('Responding to reviews is the single highest-leverage action you can take on Google right now. But most business owners either forget, delay, or write generic responses that sound like a robot.')}
      ${p('That\'s exactly what ReviewReply AI fixes. It generates polished, professional, on-brand review responses in under 5 seconds. No training. No templates. Just paste the review, hit generate, done.')}
      ${cta('Try ReviewReply AI Free →', REPLY_URL)}
      ${p('Your competitor is responding faster than you. You now have the tool to change that.')}
    `),
  },
  {
    day: 3,
    subject: 'How Maria turned a 2-star crisis into her best marketing month',
    html: wrap(`
      ${h1('The review that almost broke her business')}
      ${p('Maria runs a 12-table Italian restaurant in Hamilton, Ontario.')}
      ${p('In March 2025, a disgruntled customer left a 1-star review claiming they found a hair in their pasta. The review went on for three paragraphs. It was brutal.')}
      ${p('Maria\'s old response? Nothing. She didn\'t know what to say, so she said nothing.')}
      ${p('Three weeks later, she ran a Competitor Review Spy report on the restaurant across the street. Their response rate: 89%. Hers: 23%.')}
      ${quote('I didn\'t realize silence was the worst thing I could do. Every person who read that review saw my name and saw nothing back. It looked like I didn\'t care.', 'Maria R., Hamilton ON')}
      ${h2('What she did next:')}
      ${p('She started using ReviewReply AI to respond to every review — good, bad, and neutral — within 24 hours.')}
      ${p('Within 60 days:')}
      ${stat('89%', 'Response rate (up from 23%)')}
      ${stat('+31%', 'Increase in Google Maps profile views')}
      ${stat('4.6 → 4.8', 'Star rating improvement')}
      ${p('The 1-star review is still there. But her professional, empathetic response now sits beneath it. And she\'s gotten 44 new 5-star reviews since.')}
      ${cta('Start responding like Maria →', REPLY_URL)}
    `),
  },
  {
    day: 5,
    subject: 'The 90% club: what actually changes when you cross the threshold',
    html: wrap(`
      ${h1('90%. That\'s the number.')}
      ${p('There\'s a threshold in Google review management that most businesses never hit — and the ones who do see measurable results.')}
      ${p('When your response rate crosses 90%, something shifts:')}
      ${stat('+23%', 'More Google Maps profile views')}
      ${stat('+18%', 'More direction requests')}
      ${stat('3x', 'More likely to get a negative review upgraded after responding')}
      ${p('The average business sits at 41%. That means your competitors — almost all of them — are leaving this advantage on the table.')}
      ${h2('But here\'s the catch:')}
      ${p('Getting to 90% means responding to every review. Every. Single. One. Including the 2-star review from the person who complained your parking lot was "a bit dark."')}
      ${p('That\'s where most owners give up. It\'s time-consuming to write thoughtful, professional responses. So they respond to the easy ones and ignore the rest.')}
      ${p('ReviewReply AI removes that excuse. 5 seconds per review. Professional tone every time. No mental energy required.')}
      ${cta('Join the 90% club →', REPLY_URL)}
      ${p('You already know where you stand vs your competitor. Now you know exactly how to pull ahead.')}
    `),
  },
  {
    day: 7,
    subject: 'Your free trial expires soon — here\'s what you\'ll lose',
    html: wrap(`
      ${h1('Last call.')}
      ${p('You\'ve seen the data from your Competitor Review Spy report. You know the gap. You know what it costs to leave it open.')}
      ${p('ReviewReply AI turns your response rate from a liability into a competitive advantage — in 5 seconds per review.')}
      ${h2('What you get:')}
      ${p('→ AI-generated review responses that sound like you, not a bot<br>→ Responses for Google, Yelp, TripAdvisor, and more<br>→ No training, no templates, no time wasted<br>→ Unlimited responses — never ignore a review again')}
      ${p('The businesses that responded to 90%+ of their reviews in 2025 are the ones dominating their local market in 2026.')}
      ${p('Your competitor is either already there — or about to be.')}
      ${cta('Start my free trial →', REPLY_URL)}
      ${p('It takes 3 minutes to set up. The gap starts closing the moment you respond to your first review.')}
    `),
  },
  {
    day: 10,
    subject: 'What Google is actually rewarding in 2026 (it\'s not what most people think)',
    html: wrap(`
      ${h1('The algorithm changed. Did your strategy?')}
      ${p('Most small businesses are still optimizing for the wrong thing.')}
      ${p('They focus on star ratings. They buy review packages. They ask every customer for 5 stars. And Google — quietly, consistently — is devaluing all of it.')}
      ${h2('Here\'s what Google actually rewards right now:')}
      ${p('✓ Consistent response rate over time (behavioral signal)<br>✓ Fast replies to both positive and negative reviews<br>✓ Professional, relevant responses (not copy-paste templates)<br>✓ Recent review activity (not a burst from 2 years ago)')}
      ${p('These are signals that are nearly impossible to game. You can\'t buy a high response rate. You have to show up — every week, every review.')}
      ${p('The businesses who built this habit 12 months ago are now sitting on an asset their competitors can\'t shortcut their way around.')}
      ${p('The question isn\'t whether you should be doing this. The question is whether your competitor is already ahead of you.')}
      ${p('(You know the answer. You ran the report.)')}
      ${cta('Start building your unfakeable moat →', REPLY_URL)}
    `),
  },
  {
    day: 14,
    subject: 'From page 3 to #1 in 90 days: James\'s story',
    html: wrap(`
      ${h1('A plumber who outranked a franchise')}
      ${p('James runs a one-man plumbing operation in Mississauga. For three years, he competed against a regional franchise with 400+ reviews and a massive ad budget.')}
      ${p('He was on page 3 of Google Maps. They were #1.')}
      ${p('He ran a Competitor Review Spy report expecting the worst. What he found surprised him:')}
      ${twoCol(
        { label: 'Franchise response rate', value: '31%', color: '#FF3232' },
        { label: 'James\'s response rate', value: '28%', color: '#FF3232' }
      )}
      ${p('Same. They were just as bad as him.')}
      ${p('The franchise had more reviews. But neither of them were actually responding.')}
      ${quote('I realized I didn\'t need to beat them on reviews — I just needed to out-respond them. And they\'d set the bar so low, it wasn\'t even hard.', 'James T., Mississauga ON')}
      ${h2('What James did over the next 90 days:')}
      ${p('He responded to every single review using ReviewReply AI. Personal, fast, professional. The franchise? Still sitting at 31% response rate.')}
      ${stat('#1', 'Google Maps ranking in his service area (was page 3)')}
      ${stat('+67%', 'Increase in inbound calls')}
      ${stat('94%', 'His response rate today')}
      ${p('Same service area. Fewer reviews. But he showed up and they didn\'t.')}
      ${cta('Do what James did →', REPLY_URL)}
    `),
  },
  {
    day: 17,
    subject: 'The 4-hour rule (and why it\'s worth $40,000 a year)',
    html: wrap(`
      ${h1('4 hours changes everything')}
      ${p('Here\'s a stat that doesn\'t get talked about enough:')}
      ${stat('3x', 'More likely to get a negative review upgraded when you respond within 4 hours')}
      ${p('Think about what that means in real dollars.')}
      ${p('If you have 10 negative reviews per year, and you respond to all of them within 4 hours, roughly 3 of those reviewers will upgrade their rating. Three 1-stars that become 3-stars or better.')}
      ${p('A single star improvement on your Google profile can increase clicks by 25-30%. For a local business doing $200K/year, that\'s $40,000-$60,000 in additional revenue.')}
      ${p('From responding to reviews faster.')}
      ${h2('The problem:')}
      ${p('Most business owners don\'t see the 1-star come in for 2-3 days. By then, the reviewer has moved on, the emotion is gone, and the upgrade isn\'t happening.')}
      ${p('ReviewReply AI doesn\'t write faster. But it makes writing fast enough that you actually do it — in the moment, on your phone, before the reviewer forgets about you.')}
      ${cta('Respond in 4 hours, starting today →', REPLY_URL)}
    `),
  },
  {
    day: 21,
    subject: 'Three weeks in — and your competitor just responded to 47 reviews',
    html: wrap(`
      ${h1('The gap is real.')}
      ${p('It\'s been 3 weeks since you ran your Competitor Review Spy report.')}
      ${p('In that time, if your top competitor is maintaining a 90% response rate, they\'ve responded to every review that came in. And every one of those responses is a public signal to Google — and to your potential customers — that they\'re active, engaged, and accountable.')}
      ${p('If you haven\'t started systematically responding yet, the gap hasn\'t closed. It\'s widened.')}
      ${p('Not because they\'re better at what they do. Because they show up in the reviews section.')}
      ${h2('Here\'s the good news:')}
      ${p('This is one of the most correctable gaps in local SEO. It doesn\'t require more budget. It doesn\'t require a new website. It doesn\'t require hiring anyone.')}
      ${p('It requires showing up. ReviewReply AI makes showing up take 5 seconds per review.')}
      ${cta('Close the gap today →', REPLY_URL)}
      ${p('Your competitors aren\'t waiting. Neither should you.')}
    `),
  },
  {
    day: 25,
    subject: 'Quick check-in: have you run a follow-up report yet?',
    html: wrap(`
      ${h1('Where are you now?')}
      ${p('It\'s been 25 days since you first got your Competitor Review Spy report.')}
      ${p('Here\'s what we know happens in the first 30 days for most business owners who start systematically responding to reviews:')}
      ${p('→ Response rate jumps from 30–40% average to 70–85%<br>→ Google Maps profile views start trending up in week 3-4<br>→ At least one negative reviewer upgrades their rating')}
      ${p('But here\'s what we also know: if you haven\'t started yet, your competitor hasn\'t stopped.')}
      ${p('Run another $9 report. See if anything shifted. Compare your response rate now vs when you first checked.')}
      ${p('The data tells you exactly where you need to focus.')}
      ${cta('Run a follow-up report →', BASE_URL + '/analyze')}
      ${p('Or if you\'re ready to automate the entire process:')}
      ${cta('Try ReviewReply AI →', REPLY_URL)}
    `),
  },
  {
    day: 30,
    subject: '30 days. Here\'s what the top-performing businesses changed.',
    html: wrap(`
      ${h1('30-day check-in')}
      ${p('A month ago, you ran a competitor spy report and saw exactly where you stood vs your market.')}
      ${p('Here\'s what we\'ve seen from business owners who acted on that data in the first 30 days:')}
      ${quote('I went from responding to maybe 1 in 10 reviews to responding to all of them. My Google Maps ranking jumped two spots in the first month.', 'Restaurant owner, Vancouver BC')}
      ${quote('The moment I started responding to negative reviews professionally, I noticed the tone of the responses from customers changed too. People were more willing to give us another chance.', 'Auto shop owner, Calgary AB')}
      ${quote('I used to dread getting a 1-star. Now I actually look forward to them because I know I\'ll respond better than my competitor and it\'ll help my ranking.', 'Dentist, Toronto ON')}
      ${p('30 days is enough time to change your response rate from the industry average (41%) to the top tier (90%+).')}
      ${p('If you haven\'t started yet — today is still earlier than tomorrow.')}
      ${cta('Start responding like the top performers →', REPLY_URL)}
    `),
  },
  {
    day: 35,
    subject: 'How agency owner David built a $8K/month service using $9 reports',
    html: wrap(`
      ${h1('The agency play nobody talks about')}
      ${p('David runs a 6-person digital marketing agency in Ottawa. In 2024, he was losing clients because he couldn\'t answer a simple question:')}
      ${p('"Why does our competitor rank above us on Google Maps?"')}
      ${p('His answer used to be guesswork. Not anymore.')}
      ${quote('The first time I ran a Competitor Review Spy report for a client, I pulled it up in the meeting and walked through their competitor\'s response rate vs theirs. The client went silent for 30 seconds. Then they asked: how do we fix this? That\'s a retention conversation.', 'David M., Ottawa ON')}
      ${h2('What David built:')}
      ${p('He now runs spy reports for every new client as part of onboarding. And monthly competitive check-ins as an add-on service.')}
      ${stat('$9', 'Cost per competitor report')}
      ${stat('$250/month', 'What he charges clients for the monthly check-in service')}
      ${stat('32 clients', 'Currently on the monthly plan')}
      ${p('That\'s $8,000/month in recurring revenue from a $9 tool.')}
      ${p('If you\'re managing reviews for multiple locations or clients, the math gets interesting fast.')}
      ${cta('Run your next spy report →', BASE_URL + '/analyze')}
    `),
  },
  {
    day: 40,
    subject: 'The one habit that separates the #1 business from everyone else',
    html: wrap(`
      ${h1('It\'s not what you think.')}
      ${p('We\'ve analyzed the Google review profiles of hundreds of #1-ranked local businesses across Canada and the US.')}
      ${p('They don\'t all have the most reviews. They don\'t all have 5.0 ratings. They don\'t all have the biggest ad spend.')}
      ${p('But they all have one thing in common:')}
      ${stat('92%', 'Average response rate of businesses ranked #1 in their category on Google Maps')}
      ${p('They respond. To everything. Consistently.')}
      ${p('The 3-star review from someone who said the wait was too long. The 5-star from the loyal customer who\'s been coming for years. The 2-star from someone who had a bad day. All of them get a response.')}
      ${quote('I don\'t think of responding to reviews as reputation management anymore. I think of it as the cheapest marketing I do. Every response is a message to the next 1,000 people who look at my listing.', 'Lisa K., Restaurant owner, Toronto')}
      ${p('The habit isn\'t hard. But it needs to be consistent. That\'s what ReviewReply AI makes possible.')}
      ${cta('Build the habit →', REPLY_URL)}
    `),
  },
  {
    day: 45,
    subject: 'A shortcut your competitors haven\'t found yet',
    html: wrap(`
      ${h1('This is a window. It won\'t stay open.')}
      ${p('Right now, the majority of small businesses — your direct competitors included — are not systematically responding to their reviews.')}
      ${p('The average response rate is 41%. That means 59% of reviews go unanswered. That means the bar is low. And that means you can get to 90% faster than you think.')}
      ${p('In 6 months, this window gets smaller. As more businesses figure out that response rate moves rankings, the gap between the leaders and the laggards will widen — and the leaders will be much harder to catch.')}
      ${p('The businesses acting now are building a lead that compounds.')}
      ${h2('Here\'s what compounding looks like:')}
      ${p('Month 1: Start responding → response rate hits 80%<br>Month 2: Response rate hits 90%+ → Google Maps views increase<br>Month 3: More views → more calls → more customers → more reviews<br>Month 6: You\'re the business that everyone in your category is trying to catch')}
      ${cta('Start compounding →', REPLY_URL)}
      ${p('Run another spy report to see where things stand:')}
      ${cta('New spy report — $9 →', BASE_URL + '/analyze')}
    `),
  },
  {
    day: 50,
    subject: 'How a dental clinic outranked a corporate chain (with half the reviews)',
    html: wrap(`
      ${h1('David vs Goliath. Google edition.')}
      ${p('Dr. Chen runs a family dental practice in Burnaby, BC. Three blocks away, a Dentalcorp-affiliated clinic opened in 2023 with massive marketing spend, 300+ reviews, and a 4.7 average.')}
      ${p('Dr. Chen had 89 reviews and a 4.6 average.')}
      ${p('On paper, she was outmatched. But she ran a Competitor Review Spy report and found the corporate clinic\'s weakness:')}
      ${twoCol(
        { label: 'Corporate clinic response rate', value: '18%', color: '#FF3232' },
        { label: 'Dr. Chen\'s response rate', value: '22%', color: '#FF3232' }
      )}
      ${p('Both terrible. But she had a plan.')}
      ${quote('I decided to make responding to every single review my one unfair advantage. They have the budget, the brand, the volume. But nobody at a corporate clinic is going to personally respond to a review about a patient\'s experience. I am.', 'Dr. Chen, Burnaby BC')}
      ${h2('12 months later:')}
      ${stat('91%', 'Dr. Chen\'s response rate')}
      ${stat('#1', 'Google Maps ranking in Burnaby for "family dentist"')}
      ${stat('+54%', 'New patient inquiries year-over-year')}
      ${p('The corporate chain? Still at 22% response rate. Still spending thousands on ads to compensate.')}
      ${cta('Build your unfair advantage →', REPLY_URL)}
    `),
  },
  {
    day: 55,
    subject: 'Your competitor read an email like this one. Did they act?',
    html: wrap(`
      ${h1('The honest truth.')}
      ${p('At any given moment, your top competitor is receiving the same market signals you are.')}
      ${p('They\'re reading about response rates. They\'re seeing the same data about Google\'s 2026 algorithm changes. They\'re getting the same advice to respond faster and more consistently.')}
      ${p('The only question is: are they acting on it?')}
      ${p('And the answer — for most businesses — is no. Not because they don\'t want to. Because it\'s easier to read about it than to do it.')}
      ${p('But occasionally — maybe 1 in 10 competitors — they do act. They start responding. They hire someone. They set up a tool. And that\'s the one you have to worry about.')}
      ${p('Because once a competitor establishes a 90%+ response rate and holds it for 6 months, the ranking advantage compounds faster than you can catch up without matching their effort.')}
      ${p('The window to get ahead of that is now. Not next quarter.')}
      ${cta('Act today →', REPLY_URL)}
      ${cta('Check your competitor\'s current rate →', BASE_URL + '/analyze')}
    `),
  },
  {
    day: 60,
    subject: '60 days later. Here\'s what changed for businesses who acted.',
    html: wrap(`
      ${h1('60 days. That\'s all it takes.')}
      ${p('Two months ago, you ran a Competitor Review Spy report and saw exactly where you stood.')}
      ${p('Here\'s what 60 days looks like for business owners who used that data to change their behavior:')}
      ${quote('My response rate went from 19% to 94% in 60 days. My Google Maps ranking jumped from #4 to #1 in my neighborhood. I\'ve gotten more new customers this quarter than any quarter in the past two years.', 'Home services owner, Edmonton AB')}
      ${quote('I thought I needed more reviews to compete. Turns out I just needed to respond to the ones I had. My competitor has 3x my reviews and still ranks below me now.', 'Spa owner, Montreal QC')}
      ${p('60 days is enough time to go from the industry average to the top tier.')}
      ${p('If you haven\'t started yet — your window is still open. But it gets a little smaller every week your competitor keeps showing up and you don\'t.')}
      ${h2('Two things you can do right now:')}
      ${cta('Run a new spy report — see where you stand today →', BASE_URL + '/analyze')}
      ${cta('Start responding with ReviewReply AI →', REPLY_URL)}
      ${p('The businesses that win on Google in the next 12 months are the ones who start building the response rate habit today.')}
      ${p('Be one of them.')}
    `),
  },
];
