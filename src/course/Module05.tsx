import { Figure, FormatComparison } from './illustrations';

export default function Module05() {
  return (
    <article className="lesson">
      <header className="lesson__head">
        <span className="lesson__eyebrow">Module 5</span>
        <h1>Formats are how you beat saturation</h1>
        <p className="lesson__lede">
          In Module 2 you learned saturation lives at the topic-and-format pair, not the topic. This is the
          payoff of that idea. The format you choose is the lever that lets you walk into a crowded topic and
          own an empty corner of it.
        </p>
      </header>

      <section className="lesson__section">
        <h2>Format is the lever. Change it and a crowded topic becomes empty.</h2>
        <p>
          A topic can be packed with competitors and still have wide-open space inside it, if no one is serving
          it in your format. That is how you create a new segment with no competition: take a format that's
          proven in one niche and transplant it to a topic that has never seen it. Compilations were everywhere
          in NBA content and nowhere in tennis. Move the format across, and you're not the hundredth tennis
          channel, you're the first tennis compilation channel. Same demand, no rivals.
        </p>
        <Figure caption="Four formats, four different cost and defensibility profiles. Pick the one whose moat you can actually build.">
          <FormatComparison />
        </Figure>
        <p className="lesson__compress">
          You don't beat a crowded topic by being better. You beat it by arriving in a format no one else is using.
        </p>
      </section>

      <section className="lesson__section">
        <h2>Compilations: high reward, but only safe when a person is clearly in them.</h2>
        <p>
          Compilations work only where there's a big, loyal fan base and enough clip material to draw from:
          sports, reality TV, podcasts, celebrities, events. You cannot make a science compilation. Where they
          fit, they can be very profitable, but they're high risk for one specific reason.
        </p>
        <p>
          Raw clips stitched together get demonetised within days, because YouTube reads them as stolen and
          low-effort. The fix is to put a human in the video: your own voiceover giving a take, real reactions,
          memes, sound effects, custom edits, and clean branding. That's the same monetisation mechanism from
          Module 3, applied to a format that's built almost entirely from other people's footage. Budget
          honestly too: a basic voiced compilation runs $50 to $60 and stays risky; a sustainable, well-branded
          one is $150 to $200 plus. You get what you pay for.
        </p>
        <p className="lesson__compress">
          A compilation is only safe when a person is clearly in it. Everything else is a clip thief waiting to be caught.
        </p>
      </section>

      <section className="lesson__section">
        <h2>Documentaries: versatile, demanding, and won by niching down.</h2>
        <p>
          Documentaries fit almost any topic, but the quality bar is high: you need retention, thumbnails, and
          real storytelling. The classic mistake is competing broad, launching "business documentaries" against
          established, polished channels. You'll lose, because you're fighting their strength.
        </p>
        <p>
          The move is to niche down hard. Not "sports" but Formula One. Not "history" but one war. Targeting a
          single fan base does two things at once: it creates the blue ocean, and it helps the algorithm. A
          tighter audience watches longer, average view duration climbs, and YouTube pushes a video with strong
          retention faster than a broad one competing against polished incumbents.
        </p>
        <p className="lesson__compress">
          Don't make the hundredth broad documentary. Make the first one for a fan base nobody's serving.
        </p>
      </section>

      <section className="lesson__section">
        <h2>Animation: a moat made of cost. Advanced players only.</h2>
        <p>
          Animation can pull enormous views, and its cost is the entire point. At roughly $500 a minute, it walls
          out everyone who can't afford to compete, which is most people. That's a real moat. But it only pays in
          high-RPM niches or at very large reach, and matching the animation type to your audience matters:
          older, high-RPM audiences want explainer animation, not character animation.
        </p>
        <p>
          Be honest about where you are. This is not a beginner move; it's where experienced operators park
          capital, often with the endgame of branding the channel and selling it. It's in this module so you
          understand the full spectrum, not so you start here.
        </p>
        <p className="lesson__compress">
          Animation's cost is the moat. It only pays if the RPM or the reach is big enough to clear it.
        </p>
      </section>

      <section className="lesson__section">
        <h2>Explainers: the cheap format with one weapon, speed.</h2>
        <p>
          Explainers are the simple videos anyone can produce. That's the problem: when everyone can make the
          same thing, the format gives you no moat at all. Your only edge is niche and timing, which means your
          only real weapon is speed.
        </p>
        <p>
          So if you run explainers, you have to be early to the trend and fast to scale. The moment one works,
          ramp your uploads before the wave of copycats arrives, because they will. Sleep on execution speed in
          this format and saturation buries you. Being first is the whole game.
        </p>
        <p className="lesson__compress">
          When the format has no moat, speed is the moat. Be early or be buried.
        </p>
      </section>

      <footer className="lesson__foot">
        <p className="lesson__foot-label">Carry these out of the module</p>
        <ol>
          <li>Transplant a proven format onto a topic that's never seen it. That's a new segment with no rivals.</li>
          <li>Match the format to a moat you can actually build: branding, niche depth, cost, or speed.</li>
          <li>Cheap formats compete on speed. Expensive ones compete on the wall their cost builds.</li>
        </ol>
      </footer>
    </article>
  );
}
