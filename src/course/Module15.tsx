import { Figure, ThumbnailFunnel } from './illustrations';

export default function Module15() {
  return (
    <article className="lesson">
      <header className="lesson__head">
        <span className="lesson__eyebrow">Module 15</span>
        <h1>Designing thumbnails that get clicked</h1>
        <p className="lesson__lede">
          The thumbnail decides whether anyone presses play, which makes it the single highest-leverage image on
          your channel. And almost everyone studies the wrong thing about it: design polish, when the real lever
          is something much simpler.
        </p>
      </header>

      <section className="lesson__section">
        <h2>A good thumbnail triggers the audience. Everything else is secondary.</h2>
        <p>
          The instinct is to copy MrBeast: perfect lighting, perfect composition, expensive design. But those
          thumbnails are right for his channel, not for 99% of others. Look instead at a channel a month old
          pulling 1.3, 1.9, 2.5 million views per video with thumbnails most people would call bad: cluttered,
          simple, busy, hard to parse. They work anyway. So what are they actually doing?
        </p>
        <p>
          They trigger the target audience. That's the whole thing. Color theory and composition help the way a
          gym membership helps if you eat fast food three meals a day: not nothing, but not the real lever. The
          real lever is hitting the specific thing your audience can't scroll past. You find it by pattern, in the
          most-popular tab. On a tennis channel, videos showing people actually on the court crush videos of
          players standing around out of context. On a court-cases channel, the angry, emotional reactions, people
          screaming at injustice, go straight to the top. That emotional trigger, not the design, is why those
          thumbnails win.
        </p>
        <p className="lesson__compress">
          A thumbnail's job isn't to be well-designed. It's to hit the one thing your audience can't scroll past.
        </p>
      </section>

      <section className="lesson__section">
        <h2>The thumbnail funnel: attention, recognition, curiosity, combo.</h2>
        <p>
          A viewer crosses four steps before they click, and a good thumbnail wins each one. First, grab
          attention on a crowded homepage: bright solid colors, human faces, which we're wired to spot
          everywhere, even in clouds, and text, which we start reading automatically. Second, make it instantly
          recognizable, so in a glance they know what they're looking at, a tennis court, people playing, this is
          for me. Third, open a curiosity gap, something that makes them wonder what happens next or why that man
          is so angry.
        </p>
        <Figure caption="Four steps before the click. The thumbnail wins the first three; the title closes the fourth.">
          <ThumbnailFunnel />
        </Figure>
        <p>
          Fourth, the thumbnail and title are a one-two combo. The thumbnail brings them in; the title sells.
          Daily Dose of Internet does this perfectly: a bright, curious thumbnail pulls your eye, then the title,
          "they made a meatball from Wooly Mammoth," closes it. The thumbnail creates the question. The title
          answers just enough to make clicking irresistible.
        </p>
        <p className="lesson__compress">
          The thumbnail brings them in. The title closes them. Design the two as one move.
        </p>
      </section>

      <section className="lesson__section">
        <h2>When your style stalls, transfer one that's working elsewhere.</h2>
        <p>
          Start by matching your competitors' thumbnails; that's the safe opening move on a new channel. But when
          a channel won't get off the ground, stop iterating on the same style and innovate by transferring. Find
          a thumbnail style winning in another niche and bring it to yours. A format that crushes in one niche can
          be lifted onto tennis, NBA, Formula One, or any topic. It's the same transfer logic as formats and
          topics: you're importing something proven instead of guessing.
        </p>
        <p className="lesson__compress">
          Don't reinvent the thumbnail. Carry a proven one across from another niche.
        </p>
      </section>

      <section className="lesson__section">
        <h2>Optimise for readability: thirds, contrast, leading lines, negative space.</h2>
        <p>
          Once you have an interesting scenario, optimisation is just making it instantly readable. Four levers do
          it. The rule of thirds: place key elements on the intersections of a 3x3 grid so the eye is guided
          through the image left to right, like reading. Contrast: a bright subject against a dark background
          jumps out, an orange-clad inmate on black uniforms, contrasting text on its backdrop. Leading lines:
          compose so lines in the image point at the focus, a crowd along the sidelines steering the eye to the
          figure in the middle. And negative space: leave the background empty to make the subject larger than
          life, the way a single lonely figure in a video about the decline of friendship becomes magnetic
          precisely because there's nothing else there.
        </p>
        <p className="lesson__compress">
          Composition doesn't make a thumbnail good. It makes a good idea instantly readable, which is the same thing.
        </p>
      </section>

      <footer className="lesson__foot">
        <p className="lesson__foot-label">Carry these out of the module</p>
        <ol>
          <li>Find your audience's trigger in the most-popular tab, and design to it, not to design rules.</li>
          <li>Win the funnel: attention, recognition, curiosity gap, then the title combo.</li>
          <li>Transfer proven styles across niches, and use thirds, contrast, leading lines, and negative space for readability.</li>
        </ol>
      </footer>
    </article>
  );
}
