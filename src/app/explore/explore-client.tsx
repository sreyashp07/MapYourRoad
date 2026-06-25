"use client";

import { useState, useEffect } from "react";

export interface ExploreItem {
  title: string;
  tag: string;
  c: string;
  topics: string[];
}

export function ExploreGrid({ items }: { items: ExploreItem[] }) {
  const [active, setActive] = useState<ExploreItem | null>(null);

  // close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((s) => (
          <button
            key={s.title}
            onClick={() => setActive(s)}
            className="group cursor-pointer rounded-3xl border border-ink/10 bg-cream/90 p-6 text-left shadow-[0_8px_30px_-16px_rgba(60,69,48,0.3)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_44px_-16px_rgba(60,69,48,0.45)]"
          >
            <div className="flex items-center justify-between">
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: s.c }}
              />
              <span className="rounded-full border border-ink/12 bg-cream px-3 py-1 text-xs font-medium text-ink">
                {s.tag}
              </span>
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold text-ink">
              {s.title}
            </h3>
            <p className="mt-1 text-sm text-ink/55">{s.topics.length} topics</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-olive">
              View topics
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* fading modal */}
      {active && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          {/* backdrop */}
          <div className="explore-backdrop absolute inset-0 bg-ink/40 backdrop-blur-sm" />

          {/* panel */}
          <div
            className="explore-panel relative w-full max-w-lg rounded-3xl border border-ink/10 bg-cream p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: active.c }}
                />
                <div>
                  <h3 className="font-display text-2xl font-bold text-ink">
                    {active.title}
                  </h3>
                  <p className="text-sm text-ink/55">
                    {active.tag} · {active.topics.length} topics
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActive(null)}
                className="rounded-full border border-ink/15 px-2.5 py-1 text-sm text-ink/60 transition hover:bg-cream-deep"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 max-h-[55vh] overflow-y-auto pr-1">
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {active.topics.map((t, i) => (
                  <li
                    key={t}
                    className="explore-topic flex items-center gap-2.5 rounded-xl border border-ink/8 bg-cream-deep/30 px-3 py-2.5"
                    style={{ animationDelay: `${i * 0.03}s` }}
                  >
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[11px] font-bold text-cream"
                      style={{ backgroundColor: active.c }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium text-ink">{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            
              href={`/builder?title=${encodeURIComponent(active.title)}`}
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-olive px-4 py-3 text-sm font-semibold text-cream transition hover:bg-olive-deep"
            >
              Start this roadmap →
            </a>
          </div>
        </div>
      )}
    </>
  );
}
