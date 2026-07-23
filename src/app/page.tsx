export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Willy&apos;s Academy
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Learn, play, and grow through Chess and Go
        </p>
      </div>

      <div className="flex gap-4">
        <div className="rounded-lg border border-gray-200 p-6 text-center">
          <span className="text-4xl" role="img" aria-label="Chess">
            &#9823;
          </span>
          <p className="mt-2 font-medium">Chess</p>
        </div>
        <div className="rounded-lg border border-gray-200 p-6 text-center">
          <span className="text-4xl" role="img" aria-label="Go">
            &#9899;
          </span>
          <p className="mt-2 font-medium">Go</p>
        </div>
      </div>

      <p className="max-w-md text-center text-sm text-gray-500">
        Platform under construction &mdash; Phase 1: Foundation
      </p>
    </main>
  );
}
