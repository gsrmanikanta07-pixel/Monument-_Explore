export default function Home() {
  return (
    <main className="min-h-screen bg-stone-950 text-white">

      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6">
        <h1 className="text-2xl font-bold">
          Monument Explorer
        </h1>

        <div className="flex gap-6 text-sm text-stone-300">

          <a
            href="/explore"
            className="transition hover:text-amber-400"
          >
            Explore
          </a>

          <a
            href="/visits"
            className="transition hover:text-amber-400"
          >
            My Visits
          </a>

          <a
            href="#how-it-works"
            className="transition hover:text-amber-400"
          >
            How It Works
          </a>

        </div>
      </nav>

      {/* Hero Section */}
      <a
        href="/explore"
        className="block"
      >
        <section className="flex min-h-[75vh] cursor-pointer flex-col items-center justify-center px-6 text-center transition hover:bg-stone-900/30">

          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-amber-400">
            Discover the stories behind history
          </p>

          <h2 className="max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
            Every monument has a story.
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300">
            Explore historical monuments through AI-powered recognition,
            verified history, interactive storytelling, and more.
          </p>

          <span className="mt-10 rounded-full bg-amber-500 px-8 py-4 font-semibold text-stone-950 transition hover:bg-amber-400">
            Explore a Monument
          </span>

        </section>
      </a>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="border-t border-stone-800 px-6 py-24"
      >

        <div className="mx-auto max-w-6xl">

          <div className="text-center">

            <p className="text-sm uppercase tracking-[0.3em] text-amber-400">
              Simple. Interactive. Educational.
            </p>

            <h2 className="mt-4 text-4xl font-bold">
              How It Works
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-stone-400">
              Discover the history of a monument in just a few simple steps.
            </p>

          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-4">

            <div className="rounded-2xl border border-stone-800 bg-stone-900 p-6">

              <div className="text-4xl">📸</div>

              <h3 className="mt-5 text-xl font-bold">
                1. Upload a Photo
              </h3>

              <p className="mt-3 leading-7 text-stone-400">
                Upload an image of a historical monument from your device.
              </p>

            </div>

            <div className="rounded-2xl border border-stone-800 bg-stone-900 p-6">

              <div className="text-4xl">🔍</div>

              <h3 className="mt-5 text-xl font-bold">
                2. Identify
              </h3>

              <p className="mt-3 leading-7 text-stone-400">
                Our AI-powered system identifies the monument from the image.
              </p>

            </div>

            <div className="rounded-2xl border border-stone-800 bg-stone-900 p-6">

              <div className="text-4xl">🏛️</div>

              <h3 className="mt-5 text-xl font-bold">
                3. Explore History
              </h3>

              <p className="mt-3 leading-7 text-stone-400">
                Learn about the monument, its history, location, and timeline.
              </p>

            </div>

            <div className="rounded-2xl border border-stone-800 bg-stone-900 p-6">

              <div className="text-4xl">🔊</div>

              <h3 className="mt-5 text-xl font-bold">
                4. Listen & Ask
              </h3>

              <p className="mt-3 leading-7 text-stone-400">
                Listen to narration and ask questions about the monument.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Call To Action */}
      <section className="px-6 py-24 text-center">

        <h2 className="text-4xl font-bold">
          Ready to discover history?
        </h2>

        <p className="mt-4 text-stone-400">
          Upload a monument image and begin your journey.
        </p>

        <a
          href="/explore"
          className="mt-8 inline-block rounded-full bg-amber-500 px-8 py-4 font-semibold text-stone-950 transition hover:bg-amber-400"
        >
          Start Exploring
        </a>

      </section>

      {/* Statistics Section */}
      <section className="border-t border-stone-800 px-6 py-24">

        <div className="mx-auto max-w-6xl">

          <div className="text-center">

            <p className="text-sm uppercase tracking-[0.3em] text-amber-400">
              Monument Explorer
            </p>

            <h2 className="mt-4 text-4xl font-bold">
              Monument Explorer at a Glance
            </h2>

            <p className="mt-4 text-stone-400">
              Bringing history closer through technology.
            </p>

          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-4">

            <div className="rounded-2xl border border-stone-700 bg-stone-900 p-8 text-center">
              <h3 className="text-5xl font-bold text-amber-400">
                100+
              </h3>
              <p className="mt-3 text-stone-300">
                Historical Monuments
              </p>
            </div>

            <div className="rounded-2xl border border-stone-700 bg-stone-900 p-8 text-center">
              <h3 className="text-5xl font-bold text-amber-400">
                AI
              </h3>
              <p className="mt-3 text-stone-300">
                Smart Recognition
              </p>
            </div>

            <div className="rounded-2xl border border-stone-700 bg-stone-900 p-8 text-center">
              <h3 className="text-5xl font-bold text-amber-400">
                🔊
              </h3>
              <p className="mt-3 text-stone-300">
                Audio Narration
              </p>
            </div>

            <div className="rounded-2xl border border-stone-700 bg-stone-900 p-8 text-center">
              <h3 className="text-5xl font-bold text-amber-400">
                💬
              </h3>
              <p className="mt-3 text-stone-300">
                Interactive Q&amp;A
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-stone-800 px-6 py-8 text-center text-sm text-stone-500">
        © 2026 Monument Explorer. Discover. Learn. Explore.
      </footer>

    </main>
  );
}