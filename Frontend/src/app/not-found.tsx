export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-950 px-6 text-white">

      <div className="text-center">

        <h1 className="text-8xl font-bold text-amber-400">
          404
        </h1>

        <h2 className="mt-6 text-4xl font-bold">
          Page Not Found
        </h2>

        <p className="mt-4 max-w-md text-stone-400">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <a
          href="/"
          className="mt-8 inline-block rounded-full bg-amber-500 px-8 py-4 font-semibold text-stone-950 transition hover:bg-amber-400"
        >
          Back to Home
        </a>

      </div>

    </main>
  );
}