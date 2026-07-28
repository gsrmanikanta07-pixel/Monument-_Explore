export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-950">

      <div className="text-center">

        <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-stone-700 border-t-amber-400"></div>

        <h2 className="mt-8 text-3xl font-bold text-white">
          Monument Explorer
        </h2>

        <p className="mt-3 text-stone-400">
          Loading...
        </p>

      </div>

    </main>
  );
}