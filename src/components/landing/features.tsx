"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    title: "Build visually",
    body: "Drag topics onto an infinite canvas and wire them into dependencies. Your path takes shape as fast as you can think it.",
    c: "#5c6444",
    letter: "B",
  },
  {
    title: "Track progress",
    body: "Flip each node from to-do to done and watch your road light up. A live progress bar keeps the momentum going.",
    c: "#c08552",
    letter: "T",
  },
  {
    title: "Share & explore",
    body: "Publish a roadmap and let others follow your path. Browse maps the community has charted across every field.",
    c: "#7d8a4f",
    letter: "S",
  },
  {
    title: "Enrich every node",
    body: "Open any topic to attach notes, links, and resources. Each node becomes a focused little study hub.",
    c: "#a8c64a",
    letter: "E",
  },
  {
    title: "Any domain",
    body: "Frontend, machine learning, system design, security, or your own research direction. If it can be learned, it can be mapped.",
    c: "#5c6444",
    letter: "A",
  },
  {
    title: "Yours to own",
    body: "Keep maps private while you draft, or open them to the world. Your road, your rules.",
    c: "#c08552",
    letter: "Y",
  },
];

export function Features() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".features-heading", {
        scrollTrigger: { trigger: ".features-heading", start: "top 90%" },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });
      gsap.fromTo(
        ".feature-card",
        { y: 44, opacity: 0 },
        {
          scrollTrigger: { trigger: root.current, start: "top 90%" },
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
        }
      );
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
              className="feature-card sb-border sb-shadow bg-cream cursor-default rounded-3xl p-8 opacity-100 transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[7px_7px_0_0_rgba(32,35,26,0.9)]"
            >
              <span
                className="sb-border font-display text-cream flex h-12 w-12 items-center justify-center rounded-2xl text-xl font-bold"
                style={{ backgroundColor: f.c }}
              >
                {f.letter}
              </span>
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
