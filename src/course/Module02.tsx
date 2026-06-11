import { Figure, SupplyDemandGap, SaturationCompare, RevenueFormula, MoatMatrix } from './illustrations';

export default function Module02() {
  return (
    <article className="lesson">
      <header className="lesson__head">
        <span className="lesson__eyebrow">Module 2</span>
        <h1>Reading the market</h1>
        <p className="lesson__lede">
          Your channel comes with a niche already chosen, because picking one is the single decision most
          beginners get wrong. This module is the lens we used to choose it. Learn to see the market the way
          we do and you can judge any topic, spot when to expand, and understand exactly what you're holding.
        </p>
      </header>

      {/* 2.1 */}
      <section className="lesson__section">
        <h2>YouTube is a market. You don't build demand. You find where it already outruns supply.</h2>
        <p>
          Treat YouTube as a market with two sides. Demand is what viewers already want to watch. Supply is
          the videos being made to serve it. A normal creator spends years on the wrong side of this:
          manufacturing demand for themselves, building a personal brand one subscriber at a time. That is
          slow because you are creating the want from nothing.
        </p>
        <p>
          The faceless play is the opposite. You don't create demand. You find demand that already exists and
          is underserved, and you fill the gap. The clearest signal of a gap is a channel that is weeks old,
          with almost no subscribers, sitting on a video with a million views. That distance between how new
          the channel is and how many views it pulled is demand leaking past supply. Nobody builds that fast
          on merit alone. They walked into a room that was already full of people waiting.
        </p>
        <Figure caption="When demand towers over supply, the gap is the opportunity. A brand-new channel pulling huge views is that gap made visible.">
          <SupplyDemandGap />
        </Figure>
        <p>
          You're probably wondering how you spot these without guessing. Two reliable signals. First, sort
          search by recent uploads and high view count, filter out shorts, and look for tiny channels with
          giant videos. Second, look for outlier formats inside one channel: a channel that normally does
          10,000 views, then does 1.8 million every time it touches one specific format. That repeating spike
          is the market telling you what it's starving for.
        </p>
        <p>
          Concede the cost honestly, because it's real. You give up the personal connection a built brand has.
          You are renting attention from a trend, not owning a relationship. That makes any single video less
          durable. It is the exact reason the rest of this course is about systems and repeatability rather
          than any one hit. You are not betting on a video. You are running a process that finds gaps faster
          than they close.
        </p>
        <p className="lesson__compress">
          You are not making people want something. You are finding what they already want and no one is serving.
        </p>
      </section>

      {/* 2.2 */}
      <section className="lesson__section">
        <h2>Demand without checking supply is a trap. Saturation has two layers.</h2>
        <p>
          People find demand, get excited, jump in, and the channel dies. The demand was real. They just
          never checked the supply side. Saturation is the supply side, and the mistake is treating it as one
          thing when it is two.
        </p>
        <p>
          Topic saturation and format saturation are different. Take Elon Musk. The topic is not saturated;
          people want Musk content endlessly. But the "Elon Musk reveals something" news format is brutally
          saturated, hundreds of channels doing the identical thing. A saturated format sitting on an
          unsaturated topic is not a dead end. It is an opening, if you bring a different format to the same
          demand: a compilation, a documentary, a story, instead of the news clip everyone else makes.
        </p>
        <Figure caption="The same niche read two ways. The left column is the buy signal. The right column means you arrived late.">
          <SaturationCompare />
        </Figure>
        <p>
          Here is the mechanism that ties it together, and it is the most useful single tell in this module.
          In an unsaturated niche, demand so far exceeds supply that ugly thumbnails and lazy stock-footage
          videos still pull millions of views. When you see bad videos winning, that is not embarrassing. That
          is the buy signal. It means the audience is so underserved they will take anything. The moment a
          niche requires real polish to get seen, the gap has already closed and you are competing on
          execution against people who got there first.
        </p>
        <p>
          One more tell: the age of the competition. If the big channels in a format have been grinding it for
          two or three years, it is picked over. If the winners all started in the last three months, the gap
          is fresh. The longer a format has been worked, the less room is left in it.
        </p>
        <p className="lesson__compress">
          When ugly videos win, there is room. When you need to be perfect to be seen, you are already late.
        </p>
      </section>

      {/* 2.3 */}
      <section className="lesson__section">
        <h2>A niche only counts if it pays. Two gates, in order.</h2>
        <p>
          Views are not income, and this is where excitement kills people. A niche can be packed with demand
          and still be worthless to you. Run it through two gates before it earns a minute of your attention.
        </p>
        <p>
          Gate one: are the channels actually monetised? A viral video on a channel that doesn't meet
          YouTube's earning requirements makes nothing. You can check in seconds with a browser extension that
          flags whether a channel is monetised. If the winners in a niche aren't monetised, the views are a
          mirage.
        </p>
        <p>
          Gate two: is the ceiling high enough to bother? You want the biggest channel in the niche clearing
          roughly $20,000 a month, and the niche as a whole comfortably beating $10,000. You don't guess this.
          You calculate it: monthly views divided by 1,000, times the niche's RPM, equals monthly revenue.
        </p>
        <Figure caption="Revenue is arithmetic, not optimism. Run the number before you fall for the views.">
          <RevenueFormula />
        </Figure>
        <p>
          For your channel, gate one is already passed. It's monetised. That's the part we handed you so you'd
          skip the months it takes to clear. What this gives you now is the ability to judge a topic or an
          expansion before you spend on it, and to read what your channel is actually capable of earning at
          its current reach.
        </p>
        <p className="lesson__compress">
          Views are not income. Monetised, times RPM, times reach, is income.
        </p>
      </section>

      {/* 2.4 */}
      <section className="lesson__section">
        <h2>The moat runs both ways. Easy for you to make, hard for the next person to copy.</h2>
        <p>
          Two forces decide whether a niche is worth holding, and they pull in opposite directions. The first
          is production difficulty against you. Some niches look beautiful and are traps: 3D animation can pull
          huge views, but it can cost $500 a minute to produce, which means you can't realistically make it.
          A niche you can't afford to produce is not your niche, no matter how good the numbers look.
        </p>
        <p>
          The second is defensibility against everyone else. If a niche is trivially easy to produce, it is
          also trivially easy for the next hundred people to flood. So the question is whether you can entrench:
          raise the quality ceiling, run multiple channels in the niche, own a format others can't easily copy.
        </p>
        <Figure caption="The target is the top-right: cheap enough that you can produce it consistently, defensible enough that a flood of copycats can't bury you.">
          <MoatMatrix />
        </Figure>
        <p>
          You're thinking these two pull against each other, and they do. The easiest niche to enter is the
          easiest to lose. The skill is finding the corner where production stays cheap for you while something
          else, quality, volume, or format, keeps the next person out.
        </p>
        <p className="lesson__compress">
          Pick what is cheap for you to make and expensive for the next person to chase.
        </p>
      </section>

      {/* 2.5 */}
      <section className="lesson__section">
        <h2>When there's no proof yet, manufacture it before you commit.</h2>
        <p>
          Sometimes you have an idea with no example channels to confirm it. Most people either gamble on it or
          abandon it. Both are wrong. You test it cheaply first, by borrowing traffic that already exists.
        </p>
        <ul className="lesson__list">
          <li>Find a one-off video on a big general channel that beat its own baseline. A fitness clip that outperforms everything else on a morning show is demand showing through.</li>
          <li>Look for a short-form outlier. If one format consistently beats an account's norm on TikTok or Reels, that's the same demand signal in miniature.</li>
          <li>Compare search volume in Google Trends against an established niche you know works. If your idea holds up against a proven one, the interest is there.</li>
        </ul>
        <p>
          Each of these is a way to read demand where the traffic already exists, so you risk nothing proving
          it. You are not predicting. You are finding fingerprints the demand already left somewhere else.
        </p>
        <p className="lesson__compress">
          Test demand where the traffic already is, before you pay to build your own.
        </p>
      </section>

      {/* 2.6 */}
      <section className="lesson__section">
        <h2>This is a search problem, not a luck problem. Run it like one.</h2>
        <p>
          The last failure isn't technique, it's mindset. People treat finding a niche like waiting for
          lightning. It's a search you run deliberately. Make scanning a habit, and give yourself a real time
          budget: two weeks to a month to land on one, not an open-ended hunt.
        </p>
        <p>
          And stop waiting for perfect. Every niche has a flaw; the perfect one is rare enough that chasing it
          is just a respectable way to never start. A niche that meets the criteria is a green light. You will
          learn more from running a good-enough niche than from researching a perfect one you never touch. Get
          close to ideal, then move.
        </p>
        <p className="lesson__compress">
          The perfect niche is a myth you hide behind. A good-enough one you actually start beats it every time.
        </p>
      </section>

      <footer className="lesson__foot">
        <p className="lesson__foot-label">Carry these out of the module</p>
        <ol>
          <li>Hunt gaps where demand already outruns supply. Don't build demand from zero.</li>
          <li>Check both layers of saturation. Ugly videos winning is the buy signal.</li>
          <li>Run the revenue math and the moat both ways before you commit.</li>
          <li>No proof yet? Borrow existing traffic to test it. Then start before it's perfect.</li>
        </ol>
      </footer>
    </article>
  );
}
