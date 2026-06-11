import { Figure, AccountSecurity } from './illustrations';

export default function Module07() {
  return (
    <article className="lesson">
      <header className="lesson__head">
        <span className="lesson__eyebrow">Module 7</span>
        <h1>Setting up the channel without leaving holes</h1>
        <p className="lesson__lede">
          This is the operational module: naming, accounts, settings. Most of it is quick. But a few of these
          choices are not cosmetic, they decide whether your channel is secure and whether its comment section
          works for you or against you. Those are the ones worth understanding, not just doing.
        </p>
      </header>

      <section className="lesson__section">
        <h2>Name it for the niche, on an account that exists only to create it.</h2>
        <p>
          For the name, ask an AI for twenty options tied to your niche and pick a clean one or two-word name
          that signals the topic. That part is easy. The part that matters is the account underneath it.
        </p>
        <p>
          Create a fresh Google account used for nothing else, no signups, no daily email, only for creating
          YouTube channels, and make a Brand account rather than uploading on a personal profile. The reason is
          isolation, and it pays off in the next section. Verify a phone number while you're here, because
          without it you can't upload custom thumbnails or go live. If you've burned through too many accounts,
          a digital SIM or SMS service handles verification.
        </p>
        <p className="lesson__compress">
          The name signals the niche. The account exists to be isolated.
        </p>
      </section>

      <section className="lesson__section">
        <h2>The settings that matter, and the ones that don't.</h2>
        <p>
          Set the channel to not made for kids once, at the account level, so you're not toggling it on every
          upload. Set currency to US dollars if you want to compare your numbers against others. Country of
          residence has no meaningful effect, leave it.
        </p>
        <p>
          Don't pour effort into descriptions and tags. They're secondary signals: YouTube only leans on them
          when your title, thumbnail, and the video itself give it nothing to work with. Fill them in lightly and
          move on. The energy belongs in the things that actually decide reach, which the rest of this course is
          about.
        </p>
        <p className="lesson__compress">
          Tags and descriptions are the fallback signal. Don't spend real time on a fallback.
        </p>
      </section>

      <section className="lesson__section">
        <h2>Two settings that quietly protect you.</h2>
        <p>
          First, security. Set the channel up on that dedicated creation account, then add your everyday email as
          a Manager and log out of the creation account for good. Now your daily email, the one exposed to
          everything you do online, only has manager access. If your machine is ever compromised, an attacker
          reaches a manager, not the owner. The owner account sits dark and untouched.
        </p>
        <Figure caption="The owner account is created, then logged out and left alone. You operate through a manager invite, so the account most exposed to attack can't hand over ownership.">
          <AccountSecurity />
        </Figure>
        <p>
          Second, the comment section. Hold comments for review and approve a batch, say the first fifty, per
          video, keeping the genuine ones and filtering pure negativity. This isn't about ego. A new viewer reads
          the comments and is influenced by them. A top comment calling the video clickbait measurably raises the
          rate at which people click away. You're not faking praise; you're stopping a handful of bad-faith
          comments from poisoning everyone who arrives after them.
        </p>
        <p className="lesson__compress">
          Isolate the owner account, and curate the comments, because both quietly move outcomes you'd otherwise ignore.
        </p>
      </section>

      <section className="lesson__section">
        <h2>Branding is for the sponsor as much as the viewer.</h2>
        <p>
          Keep the logo and banner simple, clean, and recognisable. The job of a logo is not to be clever; it's to
          be instantly identifiable, so a viewer connects this video to your channel and a brand sees something
          it would be comfortable paying to sit beside. Clean branding does double duty: recognition for viewers,
          and credibility for the sponsorships that become real money later.
        </p>
        <p className="lesson__compress">
          A logo's job is recognition, not cleverness. Clean branding earns both viewers and sponsors.
        </p>
      </section>

      <footer className="lesson__foot">
        <p className="lesson__foot-label">Carry these out of the module</p>
        <ol>
          <li>Build on an isolated creation account; operate through a manager invite so the owner stays dark.</li>
          <li>Set not-made-for-kids and currency; ignore tags and descriptions as the fallback they are.</li>
          <li>Curate comments to protect new viewers' first impression, and keep branding clean and recognisable.</li>
        </ol>
      </footer>
    </article>
  );
}
