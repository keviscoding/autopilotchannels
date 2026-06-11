import { Figure, ViewVelocity } from './illustrations';

export default function Module04() {
  return (
    <article className="lesson">
      <header className="lesson__head">
        <span className="lesson__eyebrow">Module 4</span>
        <h1>Testing without fooling yourself</h1>
        <p className="lesson__lede">
          Testing is where most people optimise the wrong number and draw confident, wrong conclusions. The fix
          is knowing which signal actually tells you a video is alive, and having the patience to not test before
          there's anything to read.
        </p>
      </header>

      {/* 4.1 */}
      <section className="lesson__section">
        <h2>Click rate lies. Watch view velocity instead.</h2>
        <p>
          A/B testing on YouTube mostly means swapping a thumbnail or title when a video underperforms. The
          obvious metric to judge it by is click-through rate, and it's the wrong one. CTR is a ratio: clicks
          divided by impressions. A ratio can look excellent while the video reaches almost no one, because a
          high percentage of a tiny number is still tiny.
        </p>
        <p>
          You'll see a video sitting at 14% CTR, conclude the thumbnail is great, and leave it. Meanwhile the
          video is flat. The number you actually care about is view velocity: how fast the view graph is
          climbing over time. That slope tells you whether the video is accelerating or dead. CTR can't, because
          two videos with identical 14% CTR can have completely different velocities.
        </p>
        <Figure caption="Identical click rate, opposite outcomes. The ratio hides what the slope of the view graph makes obvious.">
          <ViewVelocity />
        </Figure>
        <p>
          So the swap signal is the shape of the graph, not the percentage. When velocity dies and the line goes
          flat, that's when a new thumbnail can do something, and when you have little to lose by trying. When
          the graph is still rising, or a bump is building, you leave it alone. Touching a video that's still
          climbing just resets its momentum.
        </p>
        <p className="lesson__compress">
          A high click rate on a flat graph is a good ratio of nothing. Watch the slope, not the percentage.
        </p>
      </section>

      {/* 4.2 */}
      <section className="lesson__section">
        <h2>A young channel has nothing to test yet. Be patient on purpose.</h2>
        <p>
          The instinct on a new channel is to react to every flat video by swapping the thumbnail. Resist it.
          Videos take time to move: often a week, frequently two or three, sometimes far longer. The same
          back-loaded shape from Module 1 shows up at the level of a single video. A flat video is not
          necessarily a dead video. It might just be sitting before its spike.
        </p>
        <p>
          You're probably itching to optimise, because optimising feels productive. But early on you don't have
          enough signal to optimise against. Reacting to an absence of data is just noise. On a young channel,
          give a thumbnail roughly a month before you touch it, and spend the energy you'd waste swapping on the
          move that actually compounds: publishing the next video.
        </p>
        <p className="lesson__compress">
          Early on you don't have enough signal to test. Publish more before you optimise what's there.
        </p>
      </section>

      {/* 4.3 */}
      <section className="lesson__section">
        <h2>When to swap, and when to walk away.</h2>
        <p>
          On an established channel with a video that has genuinely flat-lined for a week or two, swapping the
          thumbnail is a cheap experiment. Make the change, watch whether velocity responds, repeat if you like.
          But there's a ceiling on this. Past a point, resuscitating a dead video costs more attention than it
          returns, and a new video is the better use of the same hour.
        </p>
        <p>
          That's the real discipline here: knowing when optimisation stops paying and creation starts. Testing is
          a tool, not a hobby. Use it on the flat-liners, then get back to making.
        </p>
        <p className="lesson__compress">
          Swap when it's truly flat. But a new video usually beats reviving a dead one.
        </p>
      </section>

      <footer className="lesson__foot">
        <p className="lesson__foot-label">Carry these out of the module</p>
        <ol>
          <li>Judge a video by view velocity, the slope of its view graph, not by CTR.</li>
          <li>Swap when the graph flat-lines. Leave it while it's still climbing.</li>
          <li>On a young channel, publish more before you optimise. A flat video may be pre-spike.</li>
        </ol>
      </footer>
    </article>
  );
}
