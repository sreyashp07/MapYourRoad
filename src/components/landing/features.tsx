"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    title: "Build visually",
    body: "Drag topics onto an infinite canvas and connect them into a path that actually makes sense.",
    c: "#7aa874",
  },
  {
    title: "Track progress",
    body: "Mark nodes as done and watch your roadmap come alive as you learn.",
    c: "#e08a8a",
  },
  {
    title: "Share & explore",
    body: "Publish your roadmaps and discover paths others have charted.",
    c: "#8487c9",
  },
];

export function Features() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".features-heading", {
        scrollTrigger: { trigger: ".features-heading", start: "top 85%" },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });
      gsap.from(".feature-card", {
        scrollTrigger: { trigger: root.current, start: "top 75%" },
        y: 44,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="features-heading font-display max-w-xl text-4xl font-bold tracking-tight text-[#1a1a1a] sm:text-5xl">
          A calmer way to learn anything.
        </h2>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="feature-card rounded-3xl border border-black/5 bg-white/70 p-8 shadow-sm backdrop-blur"
            >
              <span
                className="inline-block h-10 w-10 rounded-2xl"
                style={{ backgroundColor: f.c }}
              />
              <h3 className="font-display mt-5 text-2xl font-semibold text-[#1a1a1a]">
                {f.title}
              </h3>
              <p className="mt-2 text-black/60">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
