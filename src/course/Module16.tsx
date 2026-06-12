import { Figure, ThumbnailTitleCombo } from './illustrations';

export default function Module16() {
  return (
    <article className="lesson">
      <header className="lesson__head">
        <span className="lesson__eyebrow">Module 16</span>
        <h1>Crafting compelling titles</h1>
        <p className="lesson__lede">
          The title is the smaller half of a pair, and treating it as the star is a common, costly mistake. Its
          job is narrow and specific: take the curiosity the thumbnail created and close the click.
        </p>
      </header>

      <section className="lesson__section">
        <h2>The title serves the thumbnail, not the other way around.</h2>
        <p>
          Write the title against the finished thumbnail, never before it. The thumbnail brings the viewer in; the
          title adds the context that sells. So when you brainstorm, look at the actual thumbnail and ask what
          context would make it irresistible, rather than writing a title and forcing a thumbnail to match. The
          thumbnail leads; the title supports.
        </p>
        <Figure caption="The order matters. The thumbnail does the pulling, the title does the closing, and you write the title to the image, not the image to the title.">
          <ThumbnailTitleCombo />
        </Figure>
        <p>
          Keep it short: a maximum of around sixty to seventy characters, and ideally shorter, with simple words a
          glance can read. Don't agonise over keywords. One clear keyword is plenty, especially early on. A title
          stuffed with terms reads worse and closes fewer clicks than a short, sharp one.
        </p>
        <p className="lesson__compress">
          Write the title to the thumbnail. Its only job is to add the context that closes the click.
        </p>
      </section>

      <section className="lesson__section">
        <h2>Never ship your first title. Generate ten and test the pair.</h2>
        <p>
          The best title is almost never the first one you think of. So don't ship the first one. For every video,
          write ten variations, by hand or with an AI prompted to riff on your topic, then judge them paired with
          the thumbnail, because a title that reads fine alone can fall flat against the image, and vice versa.
        </p>
        <p>
          Test the pair, don't guess it. A preview tool lets you see the thumbnail and title together as they'll
          appear in the feed, and a thumbnail-review community will tell you which combination actually pulls. The
          habit is simple: many variations, judged as a pair, chosen on feedback rather than instinct.
        </p>
        <p className="lesson__compress">
          Your first title is a draft. Write ten, then judge them paired with the thumbnail, never alone.
        </p>
      </section>

      <footer className="lesson__foot">
        <p className="lesson__foot-label">Carry these out of the module</p>
        <ol>
          <li>Write the title to the thumbnail; keep it short, simple, and one keyword is enough.</li>
          <li>Generate at least ten variations and judge them paired with the thumbnail.</li>
          <li>Test the combination with a preview tool or a review community, don't trust your first instinct.</li>
        </ol>
      </footer>
    </article>
  );
}
