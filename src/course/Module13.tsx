import { Figure, RetentionDrop } from './illustrations';

export default function Module13() {
  return (
    <article className="lesson">
      <header className="lesson__head">
        <span className="lesson__eyebrow">Module 13</span>
        <h1>Editing: where attention is won or lost</h1>
        <p className="lesson__lede">
          The edit is where a good script either becomes a video people finish or a video they leave. Most of
          editing quality comes down to a few mechanics about attention: where to spend your effort, what to stop
          using, and how to keep the thing from going flat.
        </p>
      </header>

      <section className="lesson__section">
        <h2>Spend 80% of your edit on the first 30 seconds.</h2>
        <p>
          Pull up any retention graph and you'll see the same thing: the steepest drop is right at the start.
          That's where you lose most of the people you'll ever lose. So that's where the effort belongs. Pouring
          80% of your editing attention into the first thirty seconds to a minute returns far more than polishing
          minute eight, because you're fixing the biggest leak in the funnel.
        </p>
        <Figure caption="The biggest losses happen in the first seconds. Fix that drop and most of the audience stays for the rest. That's why the open gets the bulk of your effort.">
          <RetentionDrop />
        </Figure>
        <p>
          There's a physical tell behind this. A lot of viewers open a video on their phone held vertically, half
          committed, ready to swipe. If your first thirty seconds hook them, they rotate the phone to landscape,
          and that rotation is a commitment: people who turn the phone almost always stay. The open isn't a
          warm-up. It's the moment they decide.
        </p>
        <p className="lesson__compress">
          The first 30 seconds decide the other ten minutes. Edit them like they're the whole video.
        </p>
      </section>

      <section className="lesson__section">
        <h2>Kill stock footage. Source like it matters.</h2>
        <p>
          Generic stock footage is a click-off trigger. Viewers recognise it instantly, read it as low effort,
          and leave. The fix is to source authentic footage from places with real texture: short clips from
          YouTube, movies and TV (kept brief, under roughly ten to fifteen seconds, with your own voiceover over
          a different subject, which keeps you inside fair use), news and podcast clips that put other voices in
          the video, Reddit for the unusual clip you can't find elsewhere, images with motion added in post, AI
          generation for scenes that don't exist, and custom animation when the budget allows.
        </p>
        <p>
          The bonus in that list is variety. News and podcast clips don't just replace stock; they add other
          voices, and a video with several people talking holds attention better than one voice reading for ten
          minutes straight.
        </p>
        <p className="lesson__compress">
          Stock footage tells the viewer you didn't try. Source from anywhere that looks real.
        </p>
      </section>

      <section className="lesson__section">
        <h2>Edit like music: pace, silence, and sound.</h2>
        <p>
          The thing that quietly kills retention is sameness. A video at one constant pace, with one constant
          wall of voiceover, flattens into background noise. The edit has to move like music. Open fast, hold it
          for the first twenty to thirty seconds, then vary the rhythm through the video so it feels like a
          roller coaster rather than a treadmill.
        </p>
        <p>
          Two underused tools do most of the work. Silence: drop the audio out for a beat to create suspense,
          because any change reclaims attention, and a video that never stops talking gives the viewer no signal
          for when to lean in. And sound: most automation videos lean on one generic background track, when
          switching the music and placing sound effects to accentuate moments can carry real emotion. Emotion is
          what holds people, and music is the cheapest way to manufacture it.
        </p>
        <p className="lesson__compress">
          Sameness is what loses people. Vary the pace, the sound, and the silence.
        </p>
      </section>

      <section className="lesson__section">
        <h2>Unify the edit with the story, and improve it 1% every video.</h2>
        <p>
          An editor who doesn't understand the script makes an edit that fights the voiceover, visuals pointing
          one way while the words point another. Get the editor and scriptwriter to actually talk, so the edit
          serves the story instead of decorating it. The video should feel like one thing, not a soundtrack
          stapled to unrelated footage.
        </p>
        <p>
          Then improve it relentlessly. Give specific feedback, point to the exact moment that drags and say why,
          criticise the work and never the person, and don't micromanage a re-render over a tiny spelling error
          that doesn't change the story. Follow up to check the feedback stuck in the next video, not just this
          one. This is the 1%-a-day compounding from Module 1, applied to your edits. Channels that skip it sit
          at the same quality for months.
        </p>
        <p className="lesson__compress">
          A good edit serves the story, not itself, and gets 1% better every time you ship.
        </p>
      </section>

      <footer className="lesson__foot">
        <p className="lesson__foot-label">Carry these out of the module</p>
        <ol>
          <li>Put 80% of your editing effort into the first 30 seconds; that's where the drop-off lives.</li>
          <li>Replace stock footage with authentic, varied sources and multiple voices.</li>
          <li>Vary pace, silence, and sound; unify edit with story; improve it 1% every video.</li>
        </ol>
      </footer>
    </article>
  );
}
