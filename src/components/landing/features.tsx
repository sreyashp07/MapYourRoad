"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    title: "Build visually",
    body: "Drag topics onto an infinite canvas and wire them into dependencies. Your path takes shape as fast as you can think it — no rigid templates, no friction.",
    c: "#5c6444",
  },
  {
    title: "Track progress",
    body: "Flip each node from to-do to done and watch your road light up. A live progress bar and satisfying completion effects keep the momentum going.",
    c: "#c08552",
  },
  {
    title: "Share & explore",
    body: "Publish a roadmap with one click and let others follow your path. Browse maps the community has charted across every field.",
    c: "#7d8a4f",
  },
  {
    title: "Enrich every node",
    body: "Open any topic to attach notes, links, and resources. Each node becomes a focused little study hub you'll actually come back to.",
    c: "#a8c64a",
  },
  {
    title: "Any domain",
    body: "Frontend, machine learning, system design, security, or your own research direction — if it can be learned, it can be mapped here.",
    c: "#5c6444",
  },
  {
    title: "Yours to own",
    body: "Keep maps private while you draft, or open them to the world. You decide what's shared and what stays your personal blueprint.",
    c: "#c08552",
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
        stagger: 0.12,
        ease: "power3.out",
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="px-4 py-28 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="features-heading font-display text-ink max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          A calmer way to learn anything.
        </h2>
        <p className="text-ink/60 mt-4 max-w-xl text-lg">
          Everything you need to turn a subject into a path you can see, follow,
          and finish.
        </p>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="feature-card sb-border sb-shadow bg-cream cursor-default rounded-3xl p-8 transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[7px_7px_0_0_rgba(32,35,26,0.9)]"
            >
              <span
                className="sb-border inline-block h-12 w-12 rounded-2xl"
                style={{ backgroundColor: f.c }}
              />
              <h3 className="font-display text-ink mt-5 text-2xl font-semibold">
                {f.title}
              </h3>
              <p className="text-ink/65 mt-2 leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
