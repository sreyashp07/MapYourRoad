"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export interface ExploreItem {
  title: string;
  tag: string;
  c: string;
  topics: string[];
}

const ARROW = "\u2192";
const CROSS = "\u00d7";

export function ExploreGrid({ items }: { items: ExploreItem[] }) {
  const [active, setActive] = useState<ExploreItem | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((s) => (
          <button
            key={s.title}
            type="button"
            onClick={() => setActive(s)}
            className="group border-ink/10 bg-cream/90 cursor-pointer rounded-3xl border p-6 text-left shadow-[0_8px_30px_-16px_rgba(60,69,48,0.3)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_44px_-16px_rgba(60,69,48,0.45)]"
          >
            <div className="flex items-center justify-between">
              <span
                className="inline-flex h-10 w-10 rounded-xl"
                style={{ backgroundColor: s.c }}
              />
              <span className="border-ink/12 bg-cream text-ink rounded-full border px-3 py-1 text-xs font-medium">
                {s.tag}
              </span>
            </div>
            <h3 className="font-display text-ink mt-4 text-xl font-semibold">
              {s.title}
            </h3>
            <p className="text-ink/55 mt-1 text-sm">{s.topics.length} topics</p>
            <span className="text-olive mt-4 inline-flex items-center gap-1 text-sm font-medium">
              {"View topics " + ARROW}
            </span>
          </button>
        ))}
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <div className="explore-backdrop bg-ink/40 absolute inset-0 backdrop-blur-sm" />
          <div
            className="explore-panel border-ink/10 bg-cream relative flex max-h-[85vh] w-full max-w-lg flex-col rounded-3xl border p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex h-12 w-12 rounded-2xl"
                  style={{ backgroundColor: active.c }}
                />
                <div>
                  <h3 className="font-display text-ink text-2xl font-bold">
                    {active.title}
                  </h3>
                  <p className="text-ink/55 text-sm">
                    {active.tag} {"\u00b7"} {active.topics.length} topics
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="border-ink/15 text-ink/60 hover:bg-cream-deep rounded-full border px-2.5 py-1 text-sm transition"
              >
                {CROSS}
              </button>
            </div>
            <div className="mt-6 min-h-0 flex-1 overflow-y-auto pr-1">
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {active.topics.map((t, i) => (
                  <li
                    key={t}
                    className="explore-topic border-ink/8 bg-cream-deep/30 flex items-center gap-2.5 rounded-xl border px-3 py-2.5"
                    style={{ animationDelay: i * 0.03 + "s" }}
                  >
                    <span
                      className="text-cream flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[11px] font-bold"
                      style={{ backgroundColor: active.c }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-ink text-sm font-medium">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href={"/builder?title=" + encodeURIComponent(active.title)}
              className="bg-olive text-cream hover:bg-olive-deep mt-6 inline-flex w-full shrink-0 items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition"
            >
              {"Start this roadmap " + ARROW}
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
