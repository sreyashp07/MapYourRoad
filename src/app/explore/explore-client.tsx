"use client";

import { useState } from "react";
import Link from "next/link";

export interface ExploreItem {
  title: string;
  tag: string;
  c: string;
  topics: string[];
}

const ARROW = "\u2192";

export function ExploreGrid({ items }: { items: ExploreItem[] }) {
  const [openTitle, setOpenTitle] = useState<string | null>(null);

  return (
    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((s) => {
        const isOpen = openTitle === s.title;
        return (
          <div
            key={s.title}
            className={`bg-cream/90 rounded-3xl border p-6 shadow-[0_8px_30px_-16px_rgba(60,69,48,0.3)] transition-all duration-300 ${
              isOpen
                ? "border-olive/40 shadow-[0_18px_44px_-16px_rgba(60,69,48,0.5)] sm:col-span-2 lg:col-span-1"
                : "border-ink/10 hover:-translate-y-1.5 hover:shadow-[0_18px_44px_-16px_rgba(60,69,48,0.45)]"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenTitle(isOpen ? null : s.title)}
              className="w-full text-left"
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
              <p className="text-ink/55 mt-1 text-sm">
                {s.topics.length} topics
              </p>
              <span className="text-olive mt-3 inline-flex items-center gap-1 text-sm font-medium">
                {isOpen ? "Hide topics" : "View topics " + ARROW}
              </span>
            </button>

            {isOpen ? (
              <div className="explore-expand border-ink/10 mt-4 border-t pt-4">
                <ul className="grid grid-cols-1 gap-2">
                  {s.topics.map((t, i) => (
                    <li
                      key={t}
                      className="explore-topic border-ink/8 bg-cream-deep/30 flex items-center gap-2.5 rounded-xl border px-3 py-2"
                      style={{ animationDelay: i * 0.025 + "s" }}
                    >
                      <span
                        className="text-cream flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[11px] font-bold"
                        style={{ backgroundColor: s.c }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-ink text-sm font-medium">{t}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={"/builder?title=" + encodeURIComponent(s.title)}
                  className="bg-olive text-cream hover:bg-olive-deep mt-4 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition"
                >
                  {"Start this roadmap " + ARROW}
                </Link>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
