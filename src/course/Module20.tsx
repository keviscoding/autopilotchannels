import { Figure, PaymentRails } from './illustrations';

export default function Module20() {
  return (
    <article className="lesson">
      <header className="lesson__head">
        <span className="lesson__eyebrow">Module 20</span>
        <h1>Managing finances and admin</h1>
        <p className="lesson__lede">
          Unglamorous, and the thing that quietly sinks people who ignore it. Paying a global team and keeping
          clean records isn't hard, but the defaults matter: the wrong payment rail can freeze your business, and
          missing paperwork can cost you at tax time.
        </p>
      </header>

      <section className="lesson__section">
        <h2>Pay through the rails that don't freeze your money.</h2>
        <p>
          You're paying freelancers across countries, so the payment rail is part of your infrastructure. Wise is
          the default, reliable, low fees, fast, and already used by most freelancers, with the occasional bug or
          slow transfer. PayPal works too, instant and everywhere, but carries a real risk: it can freeze
          thousands of dollars for up to 180 days without a clear reason, which can freeze your whole operation,
          and its exchange and transfer fees are steep. Remitly is a backup, useful when Wise or PayPal is blocked
          in a freelancer's country, though it leans more personal than business.
        </p>
        <Figure caption="Wise for the bulk of payments, PayPal with eyes open, Remitly as the fallback. Reliability beats convenience when your team's livelihood runs through it.">
          <PaymentRails />
        </Figure>
        <p className="lesson__compress">
          The best payment rail isn't the fastest one. It's the one that won't freeze your business for 180 days.
        </p>
      </section>

      <section className="lesson__section">
        <h2>Run admin simple, and demand an invoice for every payment.</h2>
        <p>
          Keep the system simple and free; you don't need software. Set a rhythm: the team sends invoices before
          the 1st of each month, and you pay between the 1st and the 7th. That window gives you playroom, so a
          sick day or a trip doesn't break anyone's expectations, and everyone knows exactly when to expect money.
        </p>
        <p>
          The non-negotiable: every payment needs an invoice attached. Many freelancers don't have their own, so
          teach them, a free tool like invoicegenerator.com works, with your company details, theirs, and a line
          per video. You need this because when you scale, those documented expenses are what you deduct from your
          taxes; payments with no invoice are money you can't account for. Store invoices in a Drive folder by
          month, and track everything in one simple spreadsheet: who, how much, which rail, and whether it's been
          reviewed and paid, with channel revenue alongside so you can see net at a glance.
        </p>
        <p className="lesson__compress">
          Every payment needs an invoice, or it's money you can't deduct and a business you can't scale.
        </p>
      </section>

      <footer className="lesson__foot">
        <p className="lesson__foot-label">Carry these out of the module</p>
        <ol>
          <li>Default to Wise; use PayPal carefully; keep Remitly as a backup.</li>
          <li>Invoices before the 1st, payment by the 7th, with playroom built in.</li>
          <li>Require an invoice for every payment and track it all in one simple sheet.</li>
        </ol>
      </footer>
    </article>
  );
}
