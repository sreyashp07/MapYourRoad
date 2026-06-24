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
    c: "#5c6444",
  },
  {
    title: "Track progress",
    body: "Mark nodes done and watch your roadmap come alive as you learn.",
    c: "#c08552",
  },
  {
    title: "Share & explore",
    body: "Publish your roadmaps and discover paths others have charted.",
    c: "#7d8a4f",
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
    <section ref={root} className="px-4 py-28 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="features-heading font-display text-ink max-w-xl text-4xl font-bold tracking-tight sm:text-5xl">
          A calmer way to learn anything.
        </h2>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="feature-card sb-border sb-shadow bg-cream rounded-3xl p-8"
            >
              <span
                className="sb-border inline-block h-12 w-12 rounded-2xl"
                style={{ backgroundColor: f.c }}
              />
              <h3 className="font-display text-ink mt-5 text-2xl font-semibold">
                {f.title}
              </h3>
              <p className="text-ink/65 mt-2">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
