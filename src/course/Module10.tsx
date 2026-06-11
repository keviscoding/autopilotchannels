import { Figure, TopicOutlier } from './illustrations';

export default function Module10() {
  return (
    <article className="lesson">
      <header className="lesson__head">
        <span className="lesson__eyebrow">Module 10</span>
        <h1>Choosing topics that are already proven</h1>
        <p className="lesson__lede">
          The niche decides the room you're in. The topic decides whether a specific video lives or dies. Most
          people pick topics on instinct and call the misses bad luck. They aren't luck. A good topic has a shape
          you can check before you ever publish.
        </p>
      </header>

      <section className="lesson__section">
        <h2>A good topic is proven, timely, and true all the way down.</h2>
        <p>
          Four things separate a topic that hits from one that flops. First, it matches your audience. The trap
          here is shiny-object syndrome: you see a topic crushing it in another niche, get excited, and import it
          to an audience that doesn't care. The performance you saw belonged to their audience, not yours.
        </p>
        <p>
          Second, it's interesting all the way down, not just on the surface. A title can promise something
          fascinating and then deliver a story everyone already knows. That gap is felt as disappointment, and
          disappointment is measured as people clicking away. The topic and the payoff under it both have to be
          good. Third, it's timely. Trends decay; a topic you execute a week late is a dead topic, which is why a
          fast workflow is a competitive weapon, not a nicety.
        </p>
        <p>
          Fourth, and most important, it's proven. People believe YouTube rewards originality. It doesn't reward
          you for it. Your job is not to invent the next new thing; it's to find what has already worked and do it
          again while it still works. A topic with a track record is a bet with evidence behind it. A topic you
          dreamed up is a bet with none.
        </p>
        <p className="lesson__compress">
          Originality is a tax YouTube doesn't pay you for. Base every topic on something that already worked.
        </p>
      </section>

      <section className="lesson__section">
        <h2>Topics obey supply and demand too. Read the outliers.</h2>
        <p>
          The market logic from Module 2 runs at the topic level as well. Demand shows up as an outlier: a topic
          that performs far above a channel's average, especially one that does it repeatedly. So when you research
          a channel, do not look at its recent uploads. Look at its most popular videos, and find the topics that
          spike again and again. That repetition is the audience telling you what it's starving for.
        </p>
        <Figure caption="Ignore a channel's recent uploads. Its most-popular videos reveal the topic that spikes every time it appears. That's demand.">
          <TopicOutlier />
        </Figure>
        <p>
          Then check the supply, the same way you did for niches. Search the exact title and see how many channels
          have already made it. The topic you want is one where almost anyone who touches it explodes, including
          small channels. If you find a topic that many people have tried and it consistently underperforms, that's
          a red flag, not a gap. Demand without a supply check is how you walk into a crowded topic thinking it's empty.
        </p>
        <p className="lesson__compress">
          Don't look at what a channel posted last. Look at what exploded, and whether it explodes for everyone.
        </p>
      </section>

      <section className="lesson__section">
        <h2>Transfer what's proven across adjacent niches.</h2>
        <p>
          The fastest way to a proven topic is to steal one from next door. Find a high-performer in an adjacent
          niche and transplant it. A video like "NBA high-IQ moments" works, and tennis is close enough to
          basketball, both sports, both the same kind of audience, that the same topic carries straight over. This
          is the topic-level version of the format transfer from Module 5, and it works for the same reason:
          you're importing proof instead of inventing from scratch.
        </p>
        <p>
          The closer the niches, the cleaner the transfer. You're not guessing whether the topic is interesting.
          Someone already proved it is. You're just moving it to an audience that hasn't been served it yet.
        </p>
        <p className="lesson__compress">
          A topic that won next door is a tested topic. Carry it over instead of inventing one.
        </p>
      </section>

      <section className="lesson__section">
        <h2>Where to mine topics, and the lever that makes any of them hit harder.</h2>
        <p>
          You don't need inspiration. You need sources. Mine proven topics from a channel's most-popular tab,
          search autofill suggestions, Answer the Public, the audience tab that shows what your viewers also watch,
          AI generation, trends on X, and your own past winners. Each is a place where demand has already left a
          mark.
        </p>
        <p>
          Then sharpen whatever you find with two levers. The first is negativity bias. Humans react harder to
          negative signals than positive ones, because the caveman who ignored the lion in the bush didn't pass on
          his genes. It's why news headlines are relentlessly negative. A topic framed around a threat, a failure,
          or a loss pulls harder than the same topic framed positively. The second is variation: do quick keyword
          research and pick the most-searched version of your topic. Among Messi and Ronaldo, one is searched more
          right now, and the same effort spent on the more-searched variant simply returns more.
        </p>
        <p className="lesson__compress">
          Mine proven topics from many places, then frame them negative and pick the most-searched variant.
        </p>
      </section>

      <footer className="lesson__foot">
        <p className="lesson__foot-label">Carry these out of the module</p>
        <ol>
          <li>Pick topics that fit your audience, deliver on the title, are timely, and have a track record.</li>
          <li>Read demand from repeating outliers in the most-popular tab, then verify the supply isn't crowded.</li>
          <li>Transfer proven topics from adjacent niches, frame for negativity bias, and optimise the variant.</li>
        </ol>
      </footer>
    </article>
  );
}
