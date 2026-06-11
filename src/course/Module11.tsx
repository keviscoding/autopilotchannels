import { Figure, ReHookCurve } from './illustrations';

export default function Module11() {
  return (
    <article className="lesson">
      <header className="lesson__head">
        <span className="lesson__eyebrow">Module 11</span>
        <h1>Scripts: structure, hook, and re-hook</h1>
        <p className="lesson__lede">
          The script is the spine of the video; everything else hangs off it. You don't need to be a great writer
          to get this right. You need to understand three mechanics: where structure comes from, what the hook is
          actually for, and why attention has to be re-earned over and over.
        </p>
      </header>

      <section className="lesson__section">
        <h2>Don't write a script. Reverse-engineer one.</h2>
        <p>
          The instinct is to hand a writer a topic and let them write. Don't. First go to your biggest competitor,
          open their most-watched video, and dissect its structure. How does it open, fast hook or slow? What
          question does it ask? How does it hold attention after the hook, and what's the rhythm of clip versus
          voiceover? You're extracting the skeleton of something that already held an audience.
        </p>
        <p>
          Turn that into a structure template, give it to your writer, and compare every script they return
          against it so you don't drift off the pattern that works. If the structure stops performing, change it,
          but change it on purpose, not by accident. Early on, the template is a guardrail against your own
          improvisation.
        </p>
        <p className="lesson__compress">
          Before anyone writes a word, copy the skeleton of something that already held attention.
        </p>
      </section>

      <section className="lesson__section">
        <h2>The hook has exactly two jobs.</h2>
        <p>
          The hook is the first ten to twenty seconds, and it does two things, no more. First, it reaffirms the
          click: the viewer arrived with an expectation from your title and thumbnail, and the hook has to confirm
          that what was promised is actually coming. Break that promise and they leave immediately. Second, it
          deepens the intrigue: it takes the curiosity that earned the click and raises it, by asking a sharper
          question, showing spectacle, or withholding a specific piece of information they now need.
        </p>
        <p>
          That's the whole function. The hook isn't an introduction; it's a conversion. It turns a fragile click
          into a decision to stay.
        </p>
        <p className="lesson__compress">
          The hook isn't the start of the video. It's the part that decides whether the rest gets watched.
        </p>
      </section>

      <section className="lesson__section">
        <h2>A script is a Wikipedia article re-hooked. Re-earn attention at every turn.</h2>
        <p>
          Here's the most common script failure: a great hook, then a long, flat Wikipedia article. The writer
          nails the opening, then relaxes into reciting facts. A YouTube script is literally a Wikipedia article
          restructured, and the restructuring is the whole job. The tool is the re-hook.
        </p>
        <p>
          Every time the script moves to a new subject, treat that subject as its own mini-video: give it a fresh
          hook, raise new stakes, tell a small story, then move on, and do it again at the next subject, seamlessly.
          Attention doesn't carry across a transition for free; it decays, and a topic change is exactly where you
          lose people. The re-hook is how you climb back up at each seam instead of bleeding out across the video.
        </p>
        <Figure caption="Without re-hooks, attention decays steadily to nothing. With a fresh hook at each new subject, it climbs back up at every seam.">
          <ReHookCurve />
        </Figure>
        <p className="lesson__compress">
          Attention doesn't carry over between sections. Re-hook at every seam or you lose them in the gap.
        </p>
      </section>

      <section className="lesson__section">
        <h2>The scriptwriter is the director. Write around the clips.</h2>
        <p>
          One workflow rule fixes a lot of bad videos: the scriptwriter finds the clips, footage, and sources, and
          writes the script around them, rather than the editor going on a goose chase to match footage to finished
          words. The script should also carry edit notes. If the line is about a tweet, the writer links the tweet
          so the editor drops it on screen, instead of the voice reading it aloud. Visual where visual is better,
          voice where voice is better.
        </p>
        <p>
          The mental model is a film set. The scriptwriter is the director who decides what the video does; the
          editor stitches it together; the voice is the actor performing the lines. When the director also chooses
          the shots, the whole thing tightens, and the redundant voiceover disappears.
        </p>
        <p className="lesson__compress">
          The script isn't words for a voice to read. It's a director's plan for what the screen does.
        </p>
      </section>

      <footer className="lesson__foot">
        <p className="lesson__foot-label">Carry these out of the module</p>
        <ol>
          <li>Build the structure by dissecting a competitor's most-watched video, then hold the writer to it.</li>
          <li>The hook reaffirms the click and deepens intrigue. Re-hook at every new subject.</li>
          <li>The scriptwriter directs: find the clips, write around them, and leave edit notes.</li>
        </ol>
      </footer>
    </article>
  );
}
