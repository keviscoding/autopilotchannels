import { Figure, AlgorithmLevels } from './illustrations';

export default function Module18() {
  return (
    <article className="lesson">
      <header className="lesson__head">
        <span className="lesson__eyebrow">Module 18</span>
        <h1>Understanding the algorithm</h1>
        <p className="lesson__lede">
          Every other module in this course is downstream of this one. The algorithm decides what gets seen, and
          once you understand the single thing it's trying to do, the rules of every other module stop feeling
          like tricks and start feeling like consequences.
        </p>
      </header>

      <section className="lesson__section">
        <h2>The algorithm is one thing: a satisfaction filter.</h2>
        <p>
          Picture the algorithm as a giant filter. Billions of videos go in; it throws out 99% and recommends the
          rest to the right viewers. It is built to do exactly one thing: predict audience satisfaction, how
          fulfilled a viewer feels after watching, and whether your video makes them come back to YouTube for
          more. Every metric you've heard of, click rate, watch time, session duration, comments, is just a proxy
          the algorithm uses to estimate that one quantity.
        </p>
        <p>
          This is why the whole course works. When you matched a proven niche, you were tapping a pool of viewers
          YouTube already knows are satisfied by that topic, so it happily routes them to you. When you mimicked a
          working format closely before innovating, you made it easy for YouTube to bridge a satisfied audience
          over to your channel. None of that is a hack. It's just feeding the filter what it's looking for.
        </p>
        <p className="lesson__compress">
          The algorithm doesn't reward views. It rewards satisfaction, and views are just what satisfaction produces.
        </p>
      </section>

      <section className="lesson__section">
        <h2>Think of it as a video game with a rising bar.</h2>
        <p>
          Each video is a player. To advance a level, it has to hit a satisfaction score with the audience it's
          shown to. Clear the bar and it's pushed to a bigger audience; miss it and the video dies and drops back
          to the lobby, to retry later, which is exactly why a video sometimes randomly takes off months or years
          after upload. The first level is your hardcore fans, who react strongly. Each level up reaches a broader,
          more casual, less engaged crowd, so the bar gets harder to clear as you climb.
        </p>
        <Figure caption="A video climbs by clearing a satisfaction bar at each level. The audience widens and cools as it rises, so the bar gets harder the further it goes.">
          <AlgorithmLevels />
        </Figure>
        <p>
          This reframes two earlier ideas precisely. Saturation isn't vague anymore: more competition simply means
          YouTube demands a higher satisfaction score to advance, which is why an unsaturated niche like court
          cases let videos climb on a low score while a crowded motivational niche demands an 80 or 90. And length
          is its own bracket, because YouTube compares average view duration among similar-length videos. If a
          niche is flooded with one-to-two-minute videos, you can compete by making thirty-minute ones, where the
          bar is lower because fewer people bother.
        </p>
        <p className="lesson__compress">
          Every video climbs levels against a rising bar. Saturation just raises the bar; a fresh niche lowers it.
        </p>
      </section>

      <section className="lesson__section">
        <h2>Implicit signals beat explicit ones, because most viewers are silent.</h2>
        <p>
          There are two kinds of signal. Explicit ones are deliberate: likes, comments, subscriptions, survey
          answers. Implicit ones are behavioural: click rate, what fraction they watched, whether they went to
          another of your videos or closed the app, how long their whole session ran. Here's the key fact: only
          about 20% of viewers ever give an explicit signal. The other 80% are ghosts who just watch. So YouTube
          leans far harder on implicit signals, because every single viewer produces them.
        </p>
        <p>
          One subtlety worth using: not all engagement is equal. A viewer who comments on everything tells YouTube
          little, because their comment is cheap. A normally-silent viewer who is moved enough to comment is a
          scarce, high-value signal. So content that makes a passive viewer break their silence is worth
          disproportionately more than content that farms easy engagement.
        </p>
        <p className="lesson__compress">
          Most of your audience never clicks like. The algorithm reads what they do, not what they say.
        </p>
      </section>

      <section className="lesson__section">
        <h2>CTR and retention are hidden averages. Don't trust the single number.</h2>
        <p>
          Click rate is an average of an average, and it hides the signal. Think of a company where eight people
          earn $30k, one earns $500k, and the "average salary" comes out to $93k, a number that describes nobody.
          CTR does the same thing: YouTube has the full distribution, you only get the misleading average, so
          decisions based on it go wrong. Judge packaging by views instead, because views let you change one
          variable, the thumbnail and title, and watch the response. If you swap the packaging and views don't
          move, the problem was never the packaging; it's the topic or the video.
        </p>
        <p>
          Average view percentage is the same trap. There is no universal "good" retention number; a 60% video
          can have 12,000 views while a 41% video has 4 million, because retention is dragged by impressions,
          audience, and topic. Don't read the number. Read the graph: the bumps are relative retention spikes that
          show what viewers loved or rewound to, and consistent dips across videos show you what to cut, a long
          intro, a dragging outro. Look for patterns you can actually see, never conclusions from a lone metric.
        </p>
        <p className="lesson__compress">
          An average hides the signal. Judge packaging by views, and read the retention graph's shape, not its number.
        </p>
      </section>

      <section className="lesson__section">
        <h2>The 80/20 rule is the whole emotional game.</h2>
        <p>
          Roughly 80% of your revenue will come from 20% of your videos. Most of what you publish will
          underperform, and a few will carry everything. That's not failure; it's the shape of the business, the
          same back-loaded curve from Module 1 seen across a library instead of across time. One video that makes
          $20,000 pays back a long stretch of misses in a single hit.
        </p>
        <p>
          So your analysis job is simple: find your top 20%, study exactly why they resonated, and make more like
          them. Don't be discouraged by the failures and don't average yourself into despair. Hunt the winners and
          repeat them.
        </p>
        <p className="lesson__compress">
          Most of your videos are supposed to fail. Your job is to study the few that don't and make more of them.
        </p>
      </section>

      <footer className="lesson__foot">
        <p className="lesson__foot-label">Carry these out of the module</p>
        <ol>
          <li>The algorithm only predicts satisfaction; every metric is a proxy for it.</li>
          <li>Videos climb levels against a rising bar; saturation raises it, fresh niches and length brackets lower it.</li>
          <li>Weight implicit signals, judge packaging by views and retention by graph shape, and farm your top 20%.</li>
        </ol>
      </footer>
    </article>
  );
}
