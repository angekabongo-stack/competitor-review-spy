import { SequenceEmail, wrap, h1, h2, p, stat, cta, quote, twoCol, BASE_URL, REPLY_URL } from './shared';

export const FACEBOOK_LEADS_SEQUENCE: SequenceEmail[] = [
  {
    day: 0,
    subject: "You showed up. Most business owners don't.",
    html: wrap(`
      ${h1("You showed up. Most don't.")}
      ${p("You saw an ad about Google reviews. You read it. You opted in.")}
      ${p("That already puts you ahead of the business owner who scrolled past, told themselves they'd deal with it later, and went back to running their business blind.")}
      ${p("So let me respect your time and be direct.")}
      ${h2("Here's what's actually at stake.")}
      ${p("Right now, your top competitor is either building a Google review advantage you don't have — or they're sitting on the same blindspot you are.")}
      ${p("Both scenarios are worth knowing.")}
      ${p("If they're ahead: you need to know by how much, and where to close the gap.")}
      ${p("If they're not: you have a window to move first. Those windows don't stay open.")}
      ${stat("41%", "Average Google review response rate for local businesses — the easiest benchmark to beat in most markets")}
      ${p("Over the next couple of weeks, I'm going to share exactly how other business owners used that gap to their advantage.")}
      ${p("Real stories. Real numbers. No fluff.")}
      ${p("And if you want to skip ahead and just see your own data:")}
      ${cta("See your competitor's actual numbers — $9 →", BASE_URL + "/analyze")}
      ${p("Live Google data. 60 seconds. No subscription.")}
    `),
  },
  {
    day: 3,
    subject: "She cut her ad spend in half and ranked #1. No tricks.",
    html: wrap(`
      ${h1("No ads. Just data. And one $9 decision.")}
      ${p("Sarah runs a women's clothing boutique in Kitchener, Ontario.")}
      ${p("In 2024, she was spending $800 a month on Facebook ads and still watching the competitor two doors down take more of her customers every month.")}
      ${p("She ran a Competitor Review Spy report as a last resort. She expected to feel validated — to see that her competitor was sloppy, inconsistent, behind.")}
      ${p("Instead, she saw this:")}
      ${twoCol(
        { label: "Competitor response rate", value: "11%", color: "#FF3232" },
        { label: "Sarah's response rate", value: "8%", color: "#FF3232" }
      )}
      ${p("Both terrible. Both leaving the exact same advantage on the table.")}
      ${p("But here's what Sarah understood that most business owners miss:")}
      ${p("If nobody in her category was responding, the first one to start would own it.")}
      ${p("Sarah cut her ad spend in half. She took that energy and put it into one thing: responding to every Google review within 24 hours.")}
      ${quote(
        "I stopped paying for visibility and started earning it. Within 90 days I was ranking in the top 3 for 'women's clothing Kitchener' — without a single dollar in ads.",
        "Sarah M., Kitchener ON"
      )}
      ${stat("#1", "Google Maps ranking (was page 3)")}
      ${stat("91%", "Response rate (was 8%)")}
      ${stat("$400/month", "Saved on ad spend")}
      ${p("The first move was knowing where she stood. One $9 report.")}
      ${p("Same opportunity might be sitting wide open in your market right now.")}
      ${cta("Get your $9 spy report →", BASE_URL + "/analyze")}
    `),
  },
  {
    day: 7,
    subject: "The metric your competitors hope you never track.",
    html: wrap(`
      ${h1("The metric that changes everything.")}
      ${p("Most business owners obsess over star ratings.")}
      ${p('"If I could just get to 4.5..."')}
      ${p("The star rating isn't what's moving Google Maps rankings in 2026.")}
      ${h2("It's response rate.")}
      ${p("There's a threshold — 90% — where something measurable and documented happens:")}
      ${stat("+23%", "More Google Maps profile views")}
      ${stat("+18%", "More direction requests")}
      ${stat("3x", "More likely to turn a negative review into a positive outcome")}
      ${p("The average local business sits at 41%.")}
      ${p("That gap — from 41% to 90% — is your entire competitive opportunity in local search right now.")}
      ${h2("Here's what most people get wrong:")}
      ${p("They think they need more reviews. They don't.")}
      ${p("They need a higher response rate on the reviews they already have.")}
      ${p("A business with 50 reviews and a 92% response rate will consistently outrank a business with 300 reviews and a 30% response rate. Across industries. Across markets.")}
      ${p("Your competitor might be at 89% and pulling ahead while you read this. Or they might be at 23% and handing you the entire market.")}
      ${p("The $9 report tells you which one it is. Live Google data.")}
      ${cta("Find out where they actually stand — $9 →", BASE_URL + "/analyze")}
      ${p("60 seconds to run. No subscription. Just the data.")}
    `),
  },
  {
    day: 12,
    subject: "He almost didn't run the report. His Friday nights changed because he did.",
    html: wrap(`
      ${h1("He almost didn't run it.")}
      ${p("Carlos owns a Brazilian steakhouse in downtown Toronto.")}
      ${p("Business was fine. Reviews were decent. 4.3 stars, about 150 Google reviews. Steady traffic.")}
      ${p('"Fine" is a dangerous place to be. Fine means you don\'t look too closely.')}
      ${p("His business partner convinced him to run a Competitor Review Spy report on the Mediterranean place two doors down. Carlos expected validation. He expected to feel better about himself.")}
      ${p("He didn't.")}
      ${quote(
        "Their response rate was 88%. Mine was 26%. I'd been proud of my 4.3 stars — but they had a 4.4 and a response rate triple mine. I understood immediately why they had a 45-minute wait on Friday nights and I had empty tables.",
        "Carlos D., Toronto ON"
      )}
      ${h2("What happened next:")}
      ${p("Carlos started responding to every review. Every single one — 1-star, 5-star, everything in between.")}
      ${p("Within 90 days he hit 85% response rate. Google Maps profile views were up 31%.")}
      ${p("Friday wait times at Carlos's restaurant? Now 30 minutes.")}
      ${p("The $9 he spent on the report was the most leveraged $9 of his year.")}
      ${p("His competitor still has more reviews. They're still ranked below him.")}
      ${p("Because he shows up and they don't.")}
      ${p("What will yours reveal?")}
      ${cta("Get your $9 spy report →", BASE_URL + "/analyze")}
    `),
  },
  {
    day: 17,
    subject: "I'm going to be straight with you.",
    html: wrap(`
      ${h1("No pitch. Just this.")}
      ${p("You've been getting these emails for a couple of weeks.")}
      ${p("You've read the stories. You've seen the stats. You know the premise.")}
      ${p("So I'm not going to pretend you haven't seen the pitch.")}
      ${h2("Here it is, plainly:")}
      ${p("Competitor Review Spy is a $9 tool.")}
      ${p("It pulls live data from Google and shows you — side by side — exactly how your business compares to your top competitors on review count, average rating, response rate, and monthly velocity.")}
      ${p("It takes 60 seconds to run.")}
      ${p("It gives you data you can't get anywhere else, because it's specific to your business and your market, pulled in real time.")}
      ${p("And then it tells you exactly what to do about what it finds.")}
      ${p("No subscription. No recurring charge. One report, one decision.")}
      ${p("If that's worth $9 to you right now:")}
      ${cta("Get my competitor report — $9 →", BASE_URL + "/analyze")}
      ${p("If it's not — genuinely, no hard feelings. You know where to find us when the moment is right.")}
      ${p("Either way, you now know what response rate means for your Google rankings. That part was always free.")}
      ${p("And when you're ready to start responding automatically — like the businesses in these emails did:")}
      ${cta("Try ReviewReply AI →", REPLY_URL)}
      ${p("Thank you for being here.")}
      ${p("— The Competitor Review Spy team")}
    `),
  },
];
