import { Figure, BackCalculation } from './illustrations';

export default function Module06() {
  return (
    <article className="lesson">
      <header className="lesson__head">
        <span className="lesson__eyebrow">Module 6</span>
        <h1>Goals, the why, and reconnaissance</h1>
        <p className="lesson__lede">
          Strategy is just three things done honestly: a target you can convert into actions, a reason strong
          enough to carry you through the flat part, and a habit of reading what your competition already proved.
          Skip any one and you drift.
        </p>
      </header>

      <section className="lesson__section">
        <h2>Set the target as a number, then back-calculate the inputs.</h2>
        <p>
          "Grow the channel" is not a goal. It can't be reverse-engineered into anything you do on Monday. So
          start with a number: the net revenue you actually want per month. Then work backward. Revenue divided
          by RPM, times a thousand, gives the views you need. Views divided by your per-video average gives the
          number of uploads you have to plan for. Now the goal is a quantity of work, not a feeling.
        </p>
        <Figure caption="A target becomes a plan only when you run it backward into views and uploads. This is the difference between a goal and a wish.">
          <BackCalculation />
        </Figure>
        <p>
          Targets for click rate and retention are worth writing down too, but treat them as direction, not
          gospel. The point of the exercise is the chain: revenue, views, uploads. Once you can see it, you know
          exactly what this month has to contain.
        </p>
        <p className="lesson__compress">
          A goal you can't convert into views and uploads isn't a goal, it's a wish.
        </p>
      </section>

      <section className="lesson__section">
        <h2>The why generates the how. Without it you quit at the flat part.</h2>
        <p>
          Most courses skip this because it sounds soft. It isn't. The operators who last are the ones with a
          reason behind the number, because a strong enough why nearly produces the how on its own. The reason
          can be anything that's real to you. What matters is that you keep it in front of you while you work,
          because that's what carries you across the flat part from Module 1, where the work is high and the
          payoff hasn't arrived.
        </p>
        <p>
          Then trace the chain backward, the same way you did the number. To hit the revenue, you scale. To
          scale, you need a working format. To find the format, you need the niche. To pick the niche, you set
          the budget. Underneath it all sits the why. And while you map it, plan your failures in: assume that
          somewhere you'll have to scrap a channel and restart. If failure is already in the plan, it stops being
          a crisis when it shows up. It's just the next step you expected.
        </p>
        <p className="lesson__compress">
          Decide why before how, and plan to fail on schedule, so neither surprises you.
        </p>
      </section>

      <section className="lesson__section">
        <h2>Reconnaissance is cheap insurance. Study the competition on a routine.</h2>
        <p>
          Once you have your niche and format, do the due diligence most people skip. Subscribe to every channel
          in the niche. Reverse-engineer their best titles back into search queries to surface competitors you'd
          otherwise miss. Then keep a weekly routine: check what's working for them and what's dying. Their public
          performance is a stream of free experiments you didn't have to run or pay for.
        </p>
        <p>
          Go one step further when a niche matters to you: reach out to established people in it. A short, honest
          message asking to connect lands more often than you'd think, and one conversation with someone ahead of
          you can hand you information that would otherwise cost months of mistakes. You're not above asking. The
          person who asks is the one who skips the stupid errors.
        </p>
        <p className="lesson__compress">
          Your competitors already ran the experiments. Read their results before you pay to repeat them.
        </p>
      </section>

      <footer className="lesson__foot">
        <p className="lesson__foot-label">Carry these out of the module</p>
        <ol>
          <li>Turn the target into a number, then back-calculate views and uploads from it.</li>
          <li>Anchor the number to a real why, and write failure into the plan in advance.</li>
          <li>Study the competition weekly. Their results are free experiments.</li>
        </ol>
      </footer>
    </article>
  );
}
