import { Figure, SystemDiagram, MultiplicativeDiagram, FlatPartDiagram } from './illustrations';

export default function Module01() {
  return (
    <article className="lesson">
      <header className="lesson__head">
        <span className="lesson__eyebrow">Module 1</span>
        <h1>How the game is actually shaped</h1>
        <p className="lesson__lede">
          Before you touch a niche, a title, or a single upload, you need the three facts that decide
          whether any of it works. Not motivation. The shape of the thing. Get these wrong and you will
          do everything else correctly and still lose.
        </p>
      </header>

      {/* 1.1 */}
      <section className="lesson__section">
        <h2>You are not learning to make videos. You are learning to run a system.</h2>
        <p>
          A faceless channel looks like one job. It is six. A topic has to be chosen. A title has to be
          written. A thumbnail has to be designed. A script has to be structured. A voice has to be
          recorded. An edit has to be cut. Every published video is the output of all six functions at
          once, and the viewer feels all six whether you did them well or not.
        </p>
        <Figure caption="Every video is the output of six functions running together. The viewer doesn't see six jobs. They see one result.">
          <SystemDiagram />
        </Figure>
        <p>
          You are probably about to make the mistake almost everyone makes: deciding you need to get good
          at one of these. Editing, usually. You don't. You need to get good enough at editing to tell a
          good edit from a bad one. That is a different skill, and the gap between them is where people
          lose their first year, grinding to become a craftsman at one function while the other five rot.
        </p>
        <p>
          Here is the mechanism. You cannot direct what you cannot evaluate. The moment you can look at a
          thumbnail and say <em>that's why this one gets clicked and that one doesn't</em>, you can hire
          someone better than you to make it, and you can tell whether they did. Competence across the
          whole stack beats mastery of one part, because competence lets you buy mastery where it counts.
          Mastery of one part just makes you a freelancer.
        </p>
        <p className="lesson__compress">
          You are not the craftsman. You are the director who can tell when the craft is wrong.
        </p>
      </section>

      {/* 1.2 */}
      <section className="lesson__section">
        <h2>Income is the output of a stack, and the stack multiplies.</h2>
        <p>
          People assume the functions add up, that a great script plus a weak thumbnail averages out to
          "pretty good." They don't add. They multiply. And anything multiplied by a weak number gets
          small fast.
        </p>
        <p>
          Trace one video through the funnel. The algorithm shows it to some people. Those are impressions. A
          fraction click. That's your thumbnail and title doing their job, or failing to. Of those who
          click, a fraction keep watching. That's your hook, script, and edit. Each stage gates the next.
          A brilliant script behind a dead thumbnail is never seen, because nobody clicked, so the script
          never gets the chance to be good.
        </p>
        <Figure caption="Same video, same script, same edit. The only change is the click rate. A 4x drop in one layer is a 4x drop in reach, before the algorithm even reacts.">
          <MultiplicativeDiagram />
        </Figure>
        <p>
          And it doesn't stop at the multiplication. The algorithm watches the early click rate and
          retention, decides the video is weak, and stops pushing it. So a low number in one layer doesn't
          just shrink the result once. It gets the whole video buried. The layers multiply, then the
          weakest one compounds downward.
        </p>
        <p>
          You're thinking: if the channel is already monetised, why does any of this matter? Because
          "monetised" means eligible to earn, not earning well. The channel you start with is an engine
          that's already turning over. The stack is whether you put fuel in it or flood it. The head start
          removes the cold-start grind: the year of posting into the void that makes most people quit
          before they ever qualify. It does not remove the skill curve. Anyone who tells you it does is
          setting you up to quit the first time a video flops.
        </p>
        <p className="lesson__compress">
          Find the weakest layer and fix that one. It's the only move that multiplies everything above it.
        </p>
      </section>

      {/* 1.3 */}
      <section className="lesson__section">
        <h2>The payoff is back-loaded. Your only job early is to still be here when it turns.</h2>
        <p>
          The income curve is not a slope. It is flat, flat, flat, then close to vertical. You publish and
          nothing happens. You publish again and nothing happens. Then one video clears the bar and returns
          everything at once. A month of losses paid back five times over by a single upload. That is not
          a story. It is the shape of the mechanism.
        </p>
        <Figure caption="The curve is flat for a long time, then steep. The quit point and the breakthrough sit on the same line, separated only by who was still publishing.">
          <FlatPartDiagram />
        </Figure>
        <p>
          Why this shape? Each video gets tested on a small audience. Most fail the test, so reach stays
          small. That's the flat part. But the channel is quietly accumulating signal the whole time:
          what your audience is, what works, what the algorithm can trust you with. When a video finally
          clears the bar, recommendation doesn't add viewers, it multiplies them. Results aren't released
          smoothly. They're stored up and dumped in a jump.
        </p>
        <p>
          The trap is that the flat part is indistinguishable from failure while you're standing in it. It
          looks identical whether you're three videos from a breakthrough or genuinely in the wrong niche.
          The people who "made it" and the people who quit were often doing the same quality of work. The
          only difference is that one of them was still publishing when the steep part arrived. Survivor
          bias is real, but what the survivors survived wasn't luck. It was running out of money or
          morale before the curve turned.
        </p>
        <p>
          That is the entire reason to cap your spend. Not caution for its own sake. Ruin removes you from
          the game before the exponential can pay out. The rule the numbers force on you:
        </p>
        <ul className="lesson__list">
          <li>Set a budget you can afford to lose entirely. Treat the whole thing as money that might not come back.</li>
          <li>Spend small while you're on the flat part. Roughly $600–$850 a month, two to three videos a week, is enough to learn and stay in the game.</li>
          <li>Do not scale your spend until the channel is at least breaking even. Once it covers its own costs, you can pour in as much as you want. The curve has turned.</li>
        </ul>
        <p>
          Put a real number on the shape so it stops being a metaphor. Improve 1% a day and you don't end
          the year 365% better. You end it about <strong>37x</strong> better, because each gain compounds
          on the last. And almost all of that 37x lands in the final stretch. The 1% you grind out in month
          one and the 1% you grind out in month six are the same effort. They pay out wildly differently
          only because of where they sit on the curve.
        </p>
        <p className="lesson__compress">
          The flat part and the steep part are the same work. The only real failure is not being there when it turns.
        </p>
      </section>

      <footer className="lesson__foot">
        <p className="lesson__foot-label">Carry these three out of the module</p>
        <ol>
          <li>You direct a system of six functions. You don't hand-make one of them.</li>
          <li>The functions multiply. Fix the weakest layer first.</li>
          <li>The payoff is back-loaded. Spend so you survive the flat part.</li>
        </ol>
      </footer>
    </article>
  );
}
