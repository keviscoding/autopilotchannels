const testimonialVideos = [
  { name: 'Theo', result: 'went from 0 to Monetized', url: 'https://www.youtube.com/embed/yOWLd09wWDM' },
  { name: 'Fahad', result: 'went from 0 to Monetized in 30 days', url: 'https://www.youtube.com/embed/oxBIrQxAsVs' },
  { name: 'Anton', result: 'went from 0 to 100K subs in 30 days', url: 'https://www.youtube.com/embed/z83xvrZG8fE' },
  { name: 'Pluto', result: 'went from 0 to $5.4K/month in 90 days', url: 'https://www.youtube.com/embed/8vrwgWtYaP0' },
  { name: 'Sasha', result: 'got Monetized in 17 days & made $3K in its first month', url: 'https://www.youtube.com/embed/1cC40iO-xuo' },
];

const testimonialImages = [
  { src: '/yoav-ai-sora.jpg', alt: 'Yoav — All AI generated with Sora' },
  { src: '/momo-monetized.jpg', alt: 'Momo — Monetized in 4 videos' },
  { src: '/momo-results.jpg', alt: 'Momo — Results' },
  { src: '/nhan-viewhunt.jpg', alt: 'Nhan — Followed the system' },
  { src: '/robin-viewhunt.jpg', alt: 'Robin — Followed the system' },
  { src: '/abd-viewhunt.jpg', alt: 'Abd — Followed the system' },
];

const LandingPage = () => {
  const scrollToCTA = () => {
    document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="px-5 pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600 mb-4">
            Skip the grind. Start earning.
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 mb-6">
            Get a YouTube Channel That's{' '}
            <span className="text-brand-600">Already Making Money</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-10">
            Instead of grinding for a year before you earn a penny, start with a pre-monetised channel and a dead-simple plan to grow it. No filming yourself. No tech skills. No guesswork.
          </p>
          <button
            onClick={scrollToCTA}
            className="inline-block bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg transition-colors duration-200"
          >
            Get Your Channel
          </button>
        </div>
      </section>

      {/* Problem */}
      <section className="px-5 py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
            The problem nobody talks about
          </h2>
          <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
            <p>
              Everyone says YouTube is the dream — passive income, freedom, be your own boss. What they don't say is how brutal the <strong className="text-gray-900">beginning</strong> is.
            </p>
            <p>
              You post into the void for months. The algorithm ignores you. You can't even get <em>paid</em> until you hit thresholds that feel impossibly far away. Most people give up long before they ever see a penny.
            </p>
            <p>
              <strong className="text-gray-900">HeadStartChannels removes that entire chapter.</strong> You start at the part where it already works.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-5 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-lg font-semibold mb-2">Pick your niche</h3>
              <p className="text-gray-600">Choose from a curated list of proven, profitable niches that work for faceless channels.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-lg font-semibold mb-2">Get your channel</h3>
              <p className="text-gray-600">Receive a pre-monetised YouTube channel that's already past the hardest hurdle — ready to earn from day one.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-lg font-semibold mb-2">Follow the plan</h3>
              <p className="text-gray-600">A simple, step-by-step playbook tells you exactly what to upload and when. No experience needed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="px-5 py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-900">
            What's included
          </h2>
          <ul className="space-y-5 text-lg text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-brand-600 font-bold text-xl mt-0.5">✓</span>
              <span><strong className="text-gray-900">A pre-monetised YouTube channel</strong> — already past the requirements, already eligible to earn ad revenue.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brand-600 font-bold text-xl mt-0.5">✓</span>
              <span><strong className="text-gray-900">Your niche, your choice</strong> — pick from a vetted list of niches proven to generate income with faceless content.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brand-600 font-bold text-xl mt-0.5">✓</span>
              <span><strong className="text-gray-900">Day-one playbook</strong> — step-by-step plan for what to upload, how to stay consistent, and how to grow. Plain English, no jargon.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brand-600 font-bold text-xl mt-0.5">✓</span>
              <span><strong className="text-gray-900">Templates & onboarding</strong> — never stare at a blank screen. Everything's laid out so you can start immediately.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brand-600 font-bold text-xl mt-0.5">✓</span>
              <span><strong className="text-gray-900">Private community (optional)</strong> — a paid group of people doing exactly this, for accountability, Q&A, and support.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Social proof - videos */}
      <section className="px-5 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-900">
            Real people, real results
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            These aren't actors. They're ordinary people who followed the system.
          </p>
          <div className="space-y-10">
            {testimonialVideos.map((t) => (
              <div key={t.name}>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                  {t.name} {t.result}
                </h3>
                <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                  <iframe
                    src={t.url}
                    title={`${t.name} testimonial`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof - screenshots */}
      <section className="px-5 py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-900">
            More student wins
          </h2>
          <div className="space-y-6">
            {testimonialImages.map((img) => (
              <div key={img.src} className="rounded-lg overflow-hidden border border-gray-200 bg-white">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About the founder */}
      <section className="px-5 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
            Who's behind this
          </h2>
          <div className="text-lg text-gray-600 leading-relaxed space-y-4">
            <p>
              <strong className="text-gray-900">Kei</strong> has spent years inside the mechanics of what actually makes YouTube channels work. He runs real faceless channels across different niches, reverse-engineers viral patterns, and has coached real beginners to their first profitable channels.
            </p>
            <p>
              This isn't theory — it's the distilled, simplified version of a system that already has a track record. HeadStartChannels exists because he watched too many good people quit during the hardest part of the journey, and decided to remove that part entirely.
            </p>
            <p className="text-gray-500 text-base">
              Operated by CreativeTube Ltd (UK).
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="px-5 py-16 bg-brand-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
            The mission
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
            Turn 1,000 ordinary people into profitable YouTubers — before GTA 6 even drops.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section id="get-started" className="px-5 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Ready to skip the grind?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Get your pre-monetised channel and start earning from day one. One payment, no subscriptions, no hidden fees.
          </p>
          <div className="mb-6">
            <span className="text-4xl font-extrabold text-gray-900">$500</span>
            <span className="text-gray-500 ml-2">one-time</span>
          </div>
          <a
            href="https://headstartchannels.com/apply"
            className="inline-block bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-10 py-4 rounded-lg transition-colors duration-200"
          >
            Get Started
          </a>
          <p className="text-sm text-gray-500 mt-4">
            Questions? Email <a href="mailto:kei@headstartchannels.com" className="underline hover:text-gray-700">kei@headstartchannels.com</a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-5 py-8 border-t border-gray-200">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2026 HeadStartChannels · CreativeTube Ltd
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="/terms" className="hover:text-gray-700">Terms</a>
            <a href="/privacy" className="hover:text-gray-700">Privacy</a>
            <a href="mailto:kei@headstartchannels.com" className="hover:text-gray-700">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
