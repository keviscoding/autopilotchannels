import { Figure, FairUseAlternation } from './illustrations';

export default function Module21() {
  return (
    <article className="lesson">
      <header className="lesson__head">
        <span className="lesson__eyebrow">Module 21</span>
        <h1>Navigating YouTube's copyright system</h1>
        <p className="lesson__lede">
          Your channel arrives monetised and in a safe niche, so this module is mostly insurance: how the
          copyright machine works, how to stay clear of it, and exactly what to do if you ever get claimed or
          struck. The worst outcomes here are permanent, so the knowledge is worth more than it looks.
        </p>
      </header>

      <section className="lesson__section">
        <h2>How Content ID works, and what it can do to you.</h2>
        <p>
          When you upload, YouTube's AI fingerprints your video and compares it against a vast database of songs
          and copyrighted footage. If the match is above a threshold, you get a claim. From there the consequences
          escalate: the video gets demonetised with revenue going to the rights holder, or revenue gets split, or
          the video is blocked in some countries, or, worst of all, you get a copyright strike. Three strikes and
          the channel is deleted. A claimant can even request access to your analytics.
        </p>
        <p>
          Everything in this module is downstream of one fact: it's a matching machine. Staying safe means never
          handing it a clean, obvious match.
        </p>
        <p className="lesson__compress">
          Content ID is a matching machine. Everything you do to stay safe is about not matching too cleanly.
        </p>
      </section>

      <section className="lesson__section">
        <h2>Fair use is the shield. Make the work transformative.</h2>
        <p>
          Fair use is the legal doctrine that lets you use others' content under conditions, judged on four
          things: how transformative your use is, how much of the original you use, how it affects the original's
          commercial value, and the nature of the work. In practice, two moves carry most of the weight. Use as
          little copyrighted footage as you can, and frame what you do use as education or commentary. That's why
          documentary channels rarely get claimed: the content is genuinely analytical.
        </p>
        <p>
          The lever that makes footage transformative is your own opinion. Don't just narrate what happened; have
          the script analyse it and react to it. Telling the writer to add their honest take to each clip is what
          turns "playing someone's footage" into "commentary on someone's footage," and commentary is defensible.
          Flat, factual, Wikipedia-style narration over a clip is not.
        </p>
        <p className="lesson__compress">
          Footage with your judgment on top is commentary. Footage on its own is theft. The difference is fair use.
        </p>
      </section>

      <section className="lesson__section">
        <h2>Beat the fingerprint: alternate, diversify, disguise.</h2>
        <p>
          On top of the legal framing, there are concrete craft moves that keep the matching machine from locking
          onto you. The core one is alternation: roughly ten seconds of a clip, then fifteen seconds of your own
          footage, back and forth. And it has to be a real cutaway, to b-roll, a still frame, an animation, not
          the clip still playing in the background while you talk, because YouTube still detects that.
        </p>
        <Figure caption="Short clips broken up by longer stretches of your own footage. A genuine cutaway, not the clip running underneath your voice.">
          <FairUseAlternation />
        </Figure>
        <p>
          Stack more disruption on top: heavy edits, sound effects, and memes make a video transformative; slowing
          a clip down mismatches the fingerprint; pulling from many sources, and shuffling clips out of
          chronological order, makes it harder to match against any one original. Diversify the companies you draw
          from too, because using only one company's footage gets you specifically targeted. Get creative with
          sourcing, fan or athlete footage from Instagram is usually not copyrighted the way a parent company's
          broadcast is, which is how a Formula One channel survives by using drivers' and fans' clips instead of
          the official race feed. And if you ever need to pass Partner Programme review the hard way, put a hired
          spokesperson's face in the first minute; reviewers watch the opening, and a real face dramatically
          raises approval.
        </p>
        <p className="lesson__compress">
          Don't hand the machine a clean, continuous, single-source match. Break it, mix it, and put yourself in it.
        </p>
      </section>

      <section className="lesson__section">
        <h2>If you get claimed or struck, here's the playbook.</h2>
        <p>
          A claim and a strike are completely different in severity, and you treat them differently. For a claim,
          the cleanest fix is to trim out the segment. You can also dispute, but only when you're genuinely in the
          right; you can dispute once safely, and a second rejected dispute requires proof of legal action, so
          don't bluff without an MCN or lawyer behind you. A disputed video's revenue sits in escrow for around 28
          days until it's settled.
        </p>
        <p>
          A strike is the dangerous one, because three deletes the channel. Three options: file a counter-
          notification, knowing YouTube usually sides with the striker, so your odds are low; contact the striker
          directly and negotiate or even pay to have it removed, which works with small creators but not majors
          like Warner or Universal who never reply; or simply wait 90 days for a single strike to expire, while
          you private any other videos that could be struck and stacked toward termination.
        </p>
        <p className="lesson__compress">
          A claim costs you a video. Three strikes cost you the channel. Treat them with completely different urgency.
        </p>
      </section>

      <section className="lesson__section">
        <h2>Protect the asset before you need to, and recover if demonetised.</h2>
        <p>
          The best defence is structural. Don't run everything behind one account: a bucket structure, separate
          companies each with their own AdSense, means one termination doesn't take down the rest, and an MCN can
          offer similar protection. If you ever see strikes landing in real time, move fast and private every
          video with copyrighted content to stop the third one.
        </p>
        <p>
          If a channel gets demonetised, diagnose the reason. Reused content means make it genuinely transformative,
          fewer clips, more voice and edits, and reapply only after you've uploaded several videos in the new
          format, because reapplying unchanged just gets rejected again. Graphic content has to be cut. And if you
          were flagged as a low-effort bot, make a workflow review video showing your face and walking through
          your Trello, scripts, and editing timeline to prove a human makes this. For your channel, the point isn't
          to chase risky niches; it's to know exactly how to keep the safe asset you were handed, and how to bring
          it back if you ever push it too far.
        </p>
        <p className="lesson__compress">
          Don't put all your channels behind one account, and don't reapply unchanged. Prove you fixed it.
        </p>
      </section>

      <footer className="lesson__foot">
        <p className="lesson__foot-label">Carry these out of the module</p>
        <ol>
          <li>Content ID matches fingerprints; transformative, commentary-driven use is your legal shield.</li>
          <li>Alternate clips with real cutaways, diversify sources, and disguise the match.</li>
          <li>Trim or dispute claims; treat strikes as channel-ending; protect with structure and recover by proving you changed.</li>
        </ol>
      </footer>
    </article>
  );
}
