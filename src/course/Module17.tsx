import { Figure, AdPlacement } from './illustrations';

export default function Module17() {
  return (
    <article className="lesson">
      <header className="lesson__head">
        <span className="lesson__eyebrow">Module 17</span>
        <h1>Optimizing and publishing</h1>
        <p className="lesson__lede">
          At publish time most people fuss over the things that barely move the needle and ignore the few that
          quietly decide your revenue and reach. Here's where the effort actually belongs.
        </p>
      </header>

      <section className="lesson__section">
        <h2>Metadata is the fallback. Don't spend real effort on it.</h2>
        <p>
          The description and tags are secondary signals. On an established channel the description does almost
          nothing; on a new one it's a mild fallback YouTube consults only if it can't place your audience from
          the thumbnail, title, and the video itself, which are what it actually reads. So repeat the title in the
          description, add any links you need, and move on. Tags barely matter unless your entire strategy is
          ranking in search. Filling them in is fine; agonising over them is wasted time.
        </p>
        <p className="lesson__compress">
          Metadata is the fallback. Put your effort where the money and the session are.
        </p>
      </section>

      <section className="lesson__section">
        <h2>Place ads on cliffhangers, not in dead spots.</h2>
        <p>
          Where you place mid-roll ads changes how much you earn, through a simple behavioural mechanism. If a
          viewer is already a little bored and an ad interrupts, they leave. If they're gripped, mid-cliffhanger,
          desperate to see what happens next, an ad won't move them; they sit through it to get to the payoff. So
          place ads right before the most interesting moments, not in the lulls.
        </p>
        <Figure caption="Same ad, two placements. In a dull moment it pushes a wavering viewer out. Just before a payoff, they wait through it, and you get paid.">
          <AdPlacement />
        </Figure>
        <p>
          Run at least three per ten minutes, evenly spaced enough not to feel oppressive. And when YouTube asks
          you to rate the content, be honest but not over-cautious: truthful ratings build YouTube's trust in you,
          while checking every sensitive box needlessly just gets your ads limited.
        </p>
        <p className="lesson__compress">
          An ad in a dull moment loses the viewer. An ad before the payoff gets watched.
        </p>
      </section>

      <section className="lesson__section">
        <h2>Engineer the session, and match frequency to your format.</h2>
        <p>
          Add end screens, two suggested videos is plenty, because they drive binge-watching, and binge-watching
          is one of the strongest signals you can send. When a new viewer finishes your video and rolls into
          another on your channel, that session time reads as high satisfaction, and YouTube pushes the video
          wider. You're not just ending a video; you're extending a session.
        </p>
        <p>
          Match upload frequency to your format, your budget, and how reliably your videos hit. Low-effort
          compilations can run daily or four to five a week, leaning to quantity. Documentaries do well at two or
          three a week. Expensive formats like animation should be spaced out, because flooding uncertain bets in
          one week can drain your budget before one lands. Upload time mostly doesn't matter; aim for roughly 6pm
          US Central if you want a default, but a good video goes viral whenever you post it, and a bad one flops
          whenever you post it.
        </p>
        <p className="lesson__compress">
          Binge-watching is the signal. Link the next video, and post as often as your format can sustain quality.
        </p>
      </section>

      <section className="lesson__section">
        <h2>On testing, watch velocity, not click rate.</h2>
        <p>
          A note, because "optimising" tempts people into thumbnail-swapping too early. The full method is in
          Module 4, and the rule holds here: judge a video by view velocity, the slope of its view graph, not by
          CTR, and only swap a thumbnail once the graph has genuinely flat-lined. On a young channel, give it time
          before you touch it. Optimisation is a scalpel, not a fidget.
        </p>
        <p className="lesson__compress">
          Optimise on velocity and plateaus, not on click rate and impatience.
        </p>
      </section>

      <footer className="lesson__foot">
        <p className="lesson__foot-label">Carry these out of the module</p>
        <ol>
          <li>Don't over-invest in description and tags; they're a fallback signal.</li>
          <li>Place ads before payoffs, rate content honestly, and use end screens to extend the session.</li>
          <li>Match upload frequency to format and budget; test on velocity and plateaus, not CTR.</li>
        </ol>
      </footer>
    </article>
  );
}
