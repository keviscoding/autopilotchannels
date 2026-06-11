import { Figure, VoiceDynamics } from './illustrations';

export default function Module12() {
  return (
    <article className="lesson">
      <header className="lesson__head">
        <span className="lesson__eyebrow">Module 12</span>
        <h1>Voice overs: directing attention with sound</h1>
        <p className="lesson__lede">
          The voice is the one element playing for the entire video, so a flat one quietly drains every minute of
          it. A voice over isn't read. It's performed, and the performance is a retention tool you control.
        </p>
      </header>

      <section className="lesson__section">
        <h2>Match the voice, then pace it to the content.</h2>
        <p>
          Start with fit: the voice artist has to match your target audience, the same way the script does. After
          that, the first lever is pacing, and it has to track what's happening on screen. Intense moments should
          slow down and stretch out, so the tension lands. A constant speed, the same clip-to-clip rhythm whether
          the moment is huge or small, is what turns an explainer into background noise. The pacing of the voice
          and the pacing of the video have to move together.
        </p>
        <p className="lesson__compress">
          A voice that reads at one speed flattens the video. Pace it to the moment.
        </p>
      </section>

      <section className="lesson__section">
        <h2>Tone is dynamics, and dynamics hold attention.</h2>
        <p>
          The fastest way to lose a viewer's ear is monotone. A good voice over moves: it lifts and gets louder to
          emphasise, and, just as importantly, it drops and softens, almost a whisper, when you want the viewer to
          lean in. People pay more attention when the voice goes quiet, not less. It's closer to directing music
          than reading a book, high energy to low energy and back, deliberately.
        </p>
        <Figure caption="A monotone line sits flat and the ear drifts off it. A dynamic delivery rises to emphasise and falls to draw the viewer in, and attention follows the movement.">
          <VoiceDynamics />
        </Figure>
        <p>
          If your voice artist isn't doing this already, coach them to. It's one of the cheapest levers on average
          view duration you have, because it costs nothing but direction and it works on every second of every video.
        </p>
        <p className="lesson__compress">
          A monotone voice reads the script. A dynamic one directs where the viewer looks and how long they stay.
        </p>
      </section>

      <footer className="lesson__foot">
        <p className="lesson__foot-label">Carry these out of the module</p>
        <ol>
          <li>Match the voice to the audience, then pace it to what's happening on screen.</li>
          <li>Kill monotone. Go loud to emphasise and soft to make the viewer lean in.</li>
          <li>Treat delivery as a retention lever, because it acts on every second of the video.</li>
        </ol>
      </footer>
    </article>
  );
}
