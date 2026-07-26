"use client";

import { useEffect, useState } from "react";

type TimelineEvent = {
  year: string;
  event: string;
};

type MonumentResult = {
  monument_name: string;
  location: string;
  year_built: string;
  description: string;
  history: string;
  timeline: TimelineEvent[];
};

export default function VisitsPage() {
  const [visits, setVisits] = useState<MonumentResult[]>([]);
  const [search, setSearch] = useState("");
  const [expandedVisit, setExpandedVisit] = useState<string | null>(null);

  useEffect(() => {
    const savedVisits = localStorage.getItem("monumentVisits");

    if (savedVisits) {
      setVisits(JSON.parse(savedVisits));
    }
  }, []);

  function removeVisit(monumentName: string) {
    const updatedVisits = visits.filter(
      (visit) => visit.monument_name !== monumentName
    );

    setVisits(updatedVisits);

    localStorage.setItem(
      "monumentVisits",
      JSON.stringify(updatedVisits)
    );

    if (expandedVisit === monumentName) {
      setExpandedVisit(null);
    }
  }

  function clearAllVisits() {
    setVisits([]);
    setExpandedVisit(null);
    localStorage.removeItem("monumentVisits");
  }

  function toggleHistory(monumentName: string) {
    if (expandedVisit === monumentName) {
      setExpandedVisit(null);
    } else {
      setExpandedVisit(monumentName);
    }
  }

  const filteredVisits = visits.filter((visit) =>
    visit.monument_name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-stone-950 px-6 py-10 text-white">

      <div className="mx-auto max-w-6xl">

        {/* Back to Home */}
        <a
          href="/"
          className="text-sm text-amber-400 transition hover:text-amber-300"
        >
          ← Back to Home
        </a>

        {/* Page Heading */}
        <div className="mt-10">

          <p className="text-sm uppercase tracking-[0.3em] text-amber-400">
            Your Journey
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            My Visits
          </h1>

          <p className="mt-3 text-stone-400">
            Keep track of the historical monuments you have explored.
          </p>

        </div>

        {/* Search and Clear All */}
        {visits.length > 0 && (
          <div className="mt-8">

            <input
              type="text"
              placeholder="Search your visited monuments..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              className="w-full rounded-xl border border-stone-700 bg-stone-900 px-5 py-4 text-white outline-none transition focus:border-amber-400"
            />

            <button
              type="button"
              onClick={clearAllVisits}
              className="mt-4 rounded-lg border border-red-500 px-5 py-3 text-sm text-red-400 transition hover:bg-red-500 hover:text-white"
            >
              Clear All Visits
            </button>

          </div>
        )}

        {/* Empty State */}
        {visits.length === 0 && (
          <div className="mt-12 rounded-2xl border border-stone-700 bg-stone-900 p-12 text-center">

            <div className="text-6xl">
              🏛️
            </div>

            <h2 className="mt-6 text-2xl font-bold">
              No visits yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-stone-400">
              Start exploring historical monuments and your discoveries
              will appear here.
            </p>

            <a
              href="/explore"
              className="mt-8 inline-block rounded-full bg-amber-500 px-8 py-4 font-semibold text-stone-950 transition hover:bg-amber-400"
            >
              Explore a Monument
            </a>

          </div>
        )}

        {/* No Search Results */}
        {visits.length > 0 && filteredVisits.length === 0 && (
          <div className="mt-12 rounded-2xl border border-stone-700 bg-stone-900 p-10 text-center">

            <div className="text-5xl">
              🔍
            </div>

            <h2 className="mt-4 text-2xl font-bold">
              No monuments found
            </h2>

            <p className="mt-3 text-stone-400">
              Try searching with a different monument name.
            </p>

          </div>
        )}

        {/* Visits */}
        {filteredVisits.length > 0 && (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {filteredVisits.map((visit, index) => (

              <div
                key={index}
                className="rounded-2xl border border-stone-700 bg-stone-900 p-6 transition hover:border-amber-400"
              >

                <p className="text-sm uppercase tracking-widest text-amber-400">
                  Monument Explored
                </p>

                <h2 className="mt-3 text-2xl font-bold">
                  {visit.monument_name}
                </h2>

                <p className="mt-4 text-stone-300">
                  📍 {visit.location}
                </p>

                <p className="mt-2 text-stone-300">
                  🏛️ Built in {visit.year_built}
                </p>

                <p className="mt-4 line-clamp-4 text-sm leading-6 text-stone-400">
                  {visit.description}
                </p>

                {/* Buttons */}
                <div className="mt-6 flex flex-wrap gap-3">

                  {/* View Full History */}
                  <button
                    type="button"
                    onClick={() =>
                      toggleHistory(visit.monument_name)
                    }
                    className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-stone-950 transition hover:bg-amber-400"
                  >
                    {expandedVisit === visit.monument_name
                      ? "Hide Full History"
                      : "View Full History"}
                  </button>

                  {/* Remove Visit */}
                  <button
                    type="button"
                    onClick={() =>
                      removeVisit(visit.monument_name)
                    }
                    className="rounded-lg border border-red-500 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500 hover:text-white"
                  >
                    Remove Visit
                  </button>

                </div>

                {/* Expanded History */}
                {expandedVisit === visit.monument_name && (
                  <div className="mt-6 border-t border-stone-700 pt-6">

                    <h3 className="text-lg font-bold text-amber-400">
                      Historical Background
                    </h3>

                    <p className="mt-3 leading-7 text-stone-300">
                      {visit.history}
                    </p>

                    <h3 className="mt-6 text-lg font-bold text-amber-400">
                      Historical Timeline
                    </h3>

                    <div className="mt-4 space-y-4">

                      {visit.timeline.map(
                        (item, timelineIndex) => (

                          <div
                            key={timelineIndex}
                            className="border-l-2 border-amber-500 pl-4"
                          >

                            <p className="font-bold text-amber-400">
                              {item.year}
                            </p>

                            <p className="mt-1 text-sm text-stone-300">
                              {item.event}
                            </p>

                          </div>

                        )
                      )}

                    </div>

                  </div>
                )}

              </div>

            ))}

          </div>
        )}

      </div>

    </main>
  );
}