import { Figure, ProductionPipeline } from './illustrations';

export default function Module09() {
  return (
    <article className="lesson">
      <header className="lesson__head">
        <span className="lesson__eyebrow">Module 9</span>
        <h1>Running the team: simple systems, human signal</h1>
        <p className="lesson__lede">
          Hiring talent is half the job. The other half is the system they work inside and the way you talk to
          them, both of which decide whether good people produce good work or quietly stop trying. The surprising
          part is how simple the system should be.
        </p>
      </header>

      <section className="lesson__section">
        <h2>Keep the system simple, because complexity is fragility.</h2>
        <p>
          The whole production workflow can run on a chat app and a single board. A card per video moves through
          stages: topic, script, voice, edit, thumbnail, review, publish, archive. Each person finishes their
          stage, attaches their file to the card, and the next person gets pinged. That's it. The founder runs
          twenty-five channels on exactly this.
        </p>
        <Figure caption="One card per video, moving left to right. Nothing automated, nothing clever. Each handoff is a person pinging the next person.">
          <ProductionPipeline />
        </Figure>
        <p>
          People are surprised it isn't automated to death with tags, alerts, and bots. Here's the principle, and
          it's borrowed straight from engineering: the more complex a mechanism, the more places it can break.
          Every automation you add is another thing that fails silently and confuses the next new hire during
          onboarding. Simplicity is what lets you attach new talent fast. Keep the responsibility for the workflow
          on a manager or scheduler, not on the editors and writers, and leave the channels open so an idle team
          member can jump in when someone drops out. Add complexity only when simplicity genuinely stops scaling,
          which for most people is never.
        </p>
        <p className="lesson__compress">
          Every piece of automation you add is another piece that can break. Keep it boring until boring stops working.
        </p>
      </section>

      <section className="lesson__section">
        <h2>Your tone is an input to the video's quality.</h2>
        <p>
          This sounds like a mindset platitude. It's a mechanism. There is a person behind the Discord icon
          editing your video every day. Treat them harshly and they don't quit dramatically, they quietly
          withdraw: less effort, no honest feedback, the bare minimum. That shows up directly in the quality of
          your videos, which shows up in your views, which shows up in your revenue.
        </p>
        <p>
          Run it the other way and it compounds in your favour. Be genuinely friendly, celebrate the wins by
          sharing a screenshot of a video that popped, and give specific positive feedback when someone nails a
          hook or a thumbnail. People who like working with you try harder, and trying harder on a multiplicative
          stack lifts everything. Morale isn't separate from performance. It's one of the inputs.
        </p>
        <p className="lesson__compress">
          The person editing your video decides how hard they try. Your tone is the input to that decision.
        </p>
      </section>

      <section className="lesson__section">
        <h2>Communicate to be acted on: clear, agreed, responsive.</h2>
        <p>
          Most instructions fail because they're unreadable or unilateral. Fix both. Keep messages short and
          skimmable, bullets over paragraphs, no corporate jargon, two or three sentences someone can act on at a
          glance. A confusing message gets half-implemented.
        </p>
        <p>
          And stop imposing deadlines. Negotiate them. Tell the team what you'd like and ask if they can hit it;
          if they can't, settle on a date you both accept. A deadline someone agreed to gets hit far more often
          than one dropped on them, because now it's their commitment, not your demand. Be responsive when they
          have questions, signal clearly when you'll be unreachable, and get on a call instead of texting when
          something's actually complex. Listen to their feedback on the workflow and fix what's broken; the people
          doing the work see problems before you do.
        </p>
        <p className="lesson__compress">
          An imposed deadline is a wish. An agreed one is a commitment.
        </p>
      </section>

      <section className="lesson__section">
        <h2>Brief to transfer the vision. Sources do the heavy lifting.</h2>
        <p>
          For the first twenty to thirty videos, brief every script. An established team needs less, but early on
          a topic with no briefing is a guess. A good brief names the target audience, because someone writing for
          a sixty-year-old writes nothing like someone writing for a teenager. It sets the objective and, for
          documentaries especially, the key message. It states the tone and the length.
        </p>
        <p>
          But the single highest-leverage thing you can add, the one to do even if you skip everything else, is
          sources. Link the article or video the topic came from. Link a video whose style you want copied. A
          writer handed your sources produces a script many times better than one handed a bare title, because
          you've transferred your vision instead of hoping they guess it.
        </p>
        <p className="lesson__compress">
          A topic with no brief is a guess. A topic with sources is your vision, handed over.
        </p>
      </section>

      <section className="lesson__section">
        <h2>Train the team like a model. Feedback is the compounding input.</h2>
        <p>
          The team gets better the same way a model does: through a feedback loop run enough times. Create the
          video, publish it, read the results, give specific feedback, watch them incorporate it, repeat. The word
          that matters is specific. Don't say "make it better." Highlight the exact line in the script that drags
          and kills retention, and say why. Drop a timestamped comment on the edit. Vague feedback trains nothing.
        </p>
        <p>
          Around that loop, run regular check-ins, encourage the team to solve each other's problems so you're not
          the bottleneck on every question, and get everyone on a video call now and then so they're real people
          to each other, not just names. The more rounds of precise feedback you run, the better the team gets,
          and a better team is more views with no extra work from you.
        </p>
        <p className="lesson__compress">
          Your team is a model you train. Every piece of specific feedback compounds into the next video.
        </p>
      </section>

      <footer className="lesson__foot">
        <p className="lesson__foot-label">Carry these out of the module</p>
        <ol>
          <li>Run a dead-simple board-and-chat pipeline. Complexity is fragility.</li>
          <li>Treat people well and communicate to be acted on; tone and clarity move quality.</li>
          <li>Brief with sources, and train the team with specific feedback, round after round.</li>
        </ol>
      </footer>
    </article>
  );
}
