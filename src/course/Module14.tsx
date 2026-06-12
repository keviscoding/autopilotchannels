import { Figure, StoryToVirality } from './illustrations';

export default function Module14() {
  return (
    <article className="lesson">
      <header className="lesson__head">
        <span className="lesson__eyebrow">Module 14</span>
        <h1>The art of storytelling</h1>
        <p className="lesson__lede">
          Virality looks random. It isn't. Underneath most of it is storytelling, and storytelling works on a
          mechanism you can actually operate: a story makes the viewer feel satisfied, and satisfaction is the
          exact signal the algorithm reads and rewards.
        </p>
      </header>

      <section className="lesson__section">
        <h2>Stories aren't decoration. They're how the brain accepts information.</h2>
        <p>
          Humans have told stories since before writing. The brain processes a story differently from plain
          information; it's how we absorb complex ideas and how we pass them on. That's why a fact gets forgotten
          and a story gets finished and shared. The irreducible unit is three parts: a character, a conflict, and
          a resolution. Structure a video around those and it already has the bones of something people watch to
          the end.
        </p>
        <p className="lesson__compress">
          Information gets forgotten. A story gets finished, and finishing is the signal that spreads it.
        </p>
      </section>

      <section className="lesson__section">
        <h2>The elements that make a story hold.</h2>
        <p>
          A few elements decide whether a story grips. A character the viewer can relate to. Conflict, which is
          the actual engine; it creates the tension that drives the thing forward, and you should add it on
          purpose. A clear plot with a beginning, middle, and end, because a video without that shape is just
          confusing. An immersive scenario, where you set the scene enough that the viewer is inside the
          situation, which is what builds the emotional connection.
        </p>
        <p>
          Then dialogue, which on a faceless channel means putting other voices in: a podcast clip, an interview,
          the actual person you're discussing, so it isn't one narrator the whole way. Pacing that neither drags
          nor rushes. And surprises, plot twists that the viewer didn't see coming, which is what makes a video
          memorable and, in short form especially, what makes it spread.
        </p>
        <p className="lesson__compress">
          Conflict is the engine. Without something at stake, there's nothing to keep watching for.
        </p>
      </section>

      <section className="lesson__section">
        <h2>Four structures you can drop onto any topic.</h2>
        <p>
          You don't invent structure. You pour your topic into one that already works. Four cover most videos.
          The hero's journey: a flawed character goes through trials and comes out changed, the zero-to-hero arc
          you'd use for the story of a person. The three-act: plant a problem, explore it and the possible
          solutions, then land a resolution, the shape behind every "X is destroying society" video. The inverted
          pyramid: start from one small fact or statistic and branch outward into a broad video, which is how you
          rescue a great piece of packaging that sits on a thin topic. And the montage: clips strung along a
          single narrative, which is what a compilation actually is.
        </p>
        <p className="lesson__compress">
          You don't invent structure. You pour your topic into one that already works.
        </p>
      </section>

      <section className="lesson__section">
        <h2>Build characters with agency, because growth is what the algorithm rewards.</h2>
        <p>
          A strong character is built from three things. A backstory, which explains who they are. Flaws, which
          come out of that backstory and are what make them human and relatable, because a perfect character is a
          boring one; nothing can go wrong for them. And a goal, because a character with no mission is dead
          weight. Together, those three give a character agency: they act on the story instead of standing in it.
        </p>
        <p>
          Now the part that connects all of this to your views. The character has to show growth, visible
          progress toward the goal across the video. We're wired to want to see a flawed character overcome the
          odds, and when they finally reach the goal, the viewer feels satisfied. That satisfaction is dopamine,
          and dopamine-level satisfaction is one of the strongest signals YouTube's algorithm reads. A satisfied
          viewer behaves in ways the algorithm interprets as "this was good," and it pushes the video wider.
        </p>
        <Figure caption="This is the whole mechanism. Story creates satisfaction, satisfaction is a signal, and the signal is what the algorithm rewards with reach.">
          <StoryToVirality />
        </Figure>
        <p>
          So storytelling and virality aren't two topics. Storytelling causes virality, because it manufactures
          the exact viewer satisfaction the algorithm is built to detect and amplify.
        </p>
        <p className="lesson__compress">
          A character's growth is what satisfies the viewer, and viewer satisfaction is the signal the algorithm spreads.
        </p>
      </section>

      <footer className="lesson__foot">
        <p className="lesson__foot-label">Carry these out of the module</p>
        <ol>
          <li>Build every video on character, conflict, and resolution; conflict is the engine.</li>
          <li>Pour your topic into a proven structure: hero's journey, three-act, inverted pyramid, or montage.</li>
          <li>Give characters backstory, flaws, a goal, and visible growth, because growth is what satisfies viewers and satisfies the algorithm.</li>
        </ol>
      </footer>
    </article>
  );
}
