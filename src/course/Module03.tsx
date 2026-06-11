import { Figure, MonetizationSafety } from './illustrations';

export default function Module03() {
  return (
    <article className="lesson">
      <header className="lesson__head">
        <span className="lesson__eyebrow">Module 3</span>
        <h1>Protecting the asset, and committing</h1>
        <p className="lesson__lede">
          Your channel arrives monetised. That is the hardest part, already done for you. But monetisation is
          not a trophy you keep on a shelf. It is a state you can lose by feeding the channel the wrong content.
          This module is how you avoid breaking the thing you were handed, and how you stop deliberating and start.
        </p>
      </header>

      {/* 3.1 */}
      <section className="lesson__section">
        <h2>Monetisation is a state, not a switch. You can lose it.</h2>
        <p>
          People treat "monetised" as permanent. It isn't. YouTube continuously decides whether your content
          deserves ads, and there are two clean ways to lose that decision. Knowing them is mostly a list of
          things not to do.
        </p>
        <p>
          The first is reused or low-effort content. If your videos lean on raw copyrighted footage, or run with
          no voiceover, or look like quote-and-motivation slop, YouTube reads them one of two ways: unoriginal,
          or bot-made. Either reading ends in demonetisation. The mechanism is that YouTube is paying advertisers'
          money against your content, so it is actively looking for a reason to believe a human with judgment
          made it. Give it that reason or it assumes the worst.
        </p>
        <p>
          The second is restricted content. Cursing, violence, and anything touching war or police violence
          triggers limited ads or age restrictions, which quietly strangle a video's earnings even when it isn't
          removed. Verbal conflict survives. The moment it turns physical, especially with police or war footage,
          you get restricted or terminated fast.
        </p>
        <Figure caption="The same channel stays monetised or gets killed depending on the signal you feed it. The left column is what you add. The right column is what you avoid.">
          <MonetizationSafety />
        </Figure>
        <p>
          So the defence is simple and active: add your own voiceover, add context to any clip you use, and put
          real reaction and emotion into the video. That is the signal that says a person with a personality made
          this, not a script stitching clips. Your niche was chosen to sit clear of the danger zones. Your job is
          to not walk the channel into them.
        </p>
        <p className="lesson__compress">
          Monetised is a state, not a trophy. Feed it original, human signal or lose it.
        </p>
      </section>

      {/* 3.2 */}
      <section className="lesson__section">
        <h2>The danger nobody else survives can become your moat.</h2>
        <p>
          Here is the part that looks like a contradiction. The niches that are hardest to keep monetised are
          often the ones with the least competition, for exactly that reason. Most people get demonetised five or
          ten times, conclude it's impossible, and quit. If you are one of the few who solves the problem, the
          difficulty itself becomes the wall protecting you.
        </p>
        <p>
          That is the deeper mechanism behind a moat. It isn't always quality or budget. Sometimes it is simply
          surviving an obstacle that removes everyone else. A niche that punishes ninety-nine out of a hundred
          entrants is a niche with room, if you're the hundredth.
        </p>
        <p>
          Concede the obvious: this is not where you start. As a beginner working a channel that's already safely
          monetised, you do not go chasing risky niches to prove a point. But understand the principle, because it
          reframes difficulty. Difficulty is not only a cost. When it filters out your competition, it is an asset.
        </p>
        <p className="lesson__compress">
          The obstacle that makes most people quit is the one that protects you if you don't.
        </p>
      </section>

      {/* 3.3 */}
      <section className="lesson__section">
        <h2>Deciding is the skill. Rank, then commit on a deadline.</h2>
        <p>
          The most common way to fail at this stage is not a bad choice. It is no choice. People research formats
          and topics forever, because researching feels like progress and carries no risk of being wrong. It is
          the most comfortable way to never start.
        </p>
        <p>
          So make the decision a process with an end. Rank your options the way you'd grade them: gold, silver,
          bronze. Take only the gold ones and score them against what you already know matters. Does it fill a real
          gap? Is it clear of saturation? Can you innovate inside it? Can you stand to make it for months? Pick the
          best one, and commit on a fixed deadline. Two weeks, a month, whatever you set, but a date you hold.
        </p>
        <p>
          The deadline isn't motivation. It's a mechanism. It exists to break the loop where you watch from the
          sideline while other people start, telling yourself you're still preparing. For your channel, this
          applies to your first formats and your first uploads: decide what you're testing, then publish, instead
          of polishing a plan you never run.
        </p>
        <p className="lesson__compress">
          Research has a deadline. After it, the only move that pays is to start.
        </p>
      </section>

      <footer className="lesson__foot">
        <p className="lesson__foot-label">Carry these out of the module</p>
        <ol>
          <li>Monetisation can be lost. Feed the channel original, human content and avoid the restricted zones.</li>
          <li>Difficulty that makes others quit is a moat, not just a cost.</li>
          <li>Rank your options, set a deadline, and commit. The sideline is the only guaranteed loss.</li>
        </ol>
      </footer>
    </article>
  );
}
