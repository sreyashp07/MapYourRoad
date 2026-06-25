"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { StartRoadmap } from "./start-roadmap";
import { RoadmapCard } from "./roadmap-card";

interface Roadmap {
  id: string;
  title: string;
  total: number;
  done: number;
}
interface Template {
  title: string;
  c: string;
}

export function DashboardClient({
  name,
  roadmaps,
  templates,
}: {
  name: string;
  roadmaps: Roadmap[];
  templates: Template[];
}) {
  const root = useRef<HTMLDivElement>(null);
  const totalRoadmaps = roadmaps.length;
  const totalTopics = roadmaps.reduce((s, r) => s + r.total, 0);
  const totalDone = roadmaps.reduce((s, r) => s + r.done, 0);

  const [greeting, setGreeting] = useState("Welcome back");
  const [stats, setStats] = useState({ r: 0, t: 0, d: 0 });

  useGSAP(
    () => {
      const h = new Date().getHours();
      setGreeting(
        h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening"
      );

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".dash-greet", { y: 22, autoAlpha: 0, duration: 0.6 })
        .from(
          ".dash-stat",
          { y: 24, autoAlpha: 0, duration: 0.6, stagger: 0.1 },
          "-=0.3"
        )
        .from(".dash-start", { y: 24, autoAlpha: 0, duration: 0.6 }, "-=0.2")
        .from(".dash-recent", { y: 24, autoAlpha: 0, duration: 0.6 }, "-=0.3");

      const c = { r: 0, t: 0, d: 0 };
      gsap.to(c, {
        r: totalRoadmaps,
        t: totalTopics,
        d: totalDone,
        duration: 1.1,
        ease: "power1.out",
        onUpdate: () =>
          setStats({
            r: Math.round(c.r),
            t: Math.round(c.t),
            d: Math.round(c.d),
          }),
      });
    },
    { scope: root }
  );

  const STAT_CARDS = [
    { label: "Roadmaps", value: stats.r, c: "#5c6444" },
    { label: "Topics mapped", value: stats.t, c: "#7d8a4f" },
    { label: "Topics completed", value: stats.d, c: "#a8c64a" },
  ];

  return (
    <main ref={root} className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="dash-greet">
        <p className="text-olive text-sm font-medium">
          {greeting}, {name}
        </p>
        <h1 className="font-display text-ink mt-1 text-4xl font-bold tracking-tight sm:text-5xl">
          Your roadmaps
        </h1>
      </div>

      {/* stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {STAT_CARDS.map((s) => (
          <div
            key={s.label}
            className="dash-stat border-ink/10 bg-cream/85 rounded-3xl border p-6 shadow-[0_8px_30px_-16px_rgba(60,69,48,0.3)] backdrop-blur"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: s.c }}
              />
              <p className="text-ink/55 text-sm">{s.label}</p>
            </div>
            <p className="font-display text-ink mt-2 text-4xl font-bold">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* start a new roadmap */}
      <div className="dash-start border-ink/10 bg-cream/90 mt-10 rounded-3xl border p-8 shadow-[0_10px_40px_-18px_rgba(60,69,48,0.4)] backdrop-blur">
        <h2 className="font-display text-ink text-2xl font-semibold">
          Start a new roadmap
        </h2>
        <p className="text-ink/60 mt-1">
          Name it, then build your path on the canvas.
        </p>
        <StartRoadmap templates={templates} />
      </div>

      {/* recent */}
      <div className="dash-recent mt-12">
        <h2 className="font-display text-ink text-xl font-semibold">Recent</h2>
        {roadmaps.length === 0 ? (
          <div className="border-ink/20 bg-cream/60 mt-4 rounded-3xl border border-dashed p-12 text-center">
            <p className="text-ink/60">
              No roadmaps yet — create one above and it’ll appear here.
            </p>
          </div>
        ) : (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {roadmaps.map((r) => (
              <RoadmapCard
                key={r.id}
                id={r.id}
                title={r.title}
                total={r.total}
                done={r.done}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
