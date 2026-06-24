"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { RoadmapMotif } from "./roadmap-motif";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-eyebrow", { y: 18, opacity: 0, duration: 0.6 })
        .from(
          ".hero-line",
          { yPercent: 120, opacity: 0, duration: 0.9, stagger: 0.12 },
          "-=0.2"
        )
        .from(".hero-sub", { y: 20, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(
          ".hero-cta",
          { y: 16, opacity: 0, duration: 0.6, stagger: 0.1 },
          "-=0.4"
        );

      gsap.to(".blob", {
        y: "+=26",
        x: "+=14",
        duration: 6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.9, from: "random" },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-20"
    >
      {/* floating pastel blobs */}
      <div className="blob absolute top-24 -left-20 h-72 w-72 rounded-full bg-[#cfe3d4] opacity-60 blur-3xl" />
      <div className="blob absolute top-40 right-[-60px] h-80 w-80 rounded-full bg-[#dfe2f7] opacity-60 blur-3xl" />
      <div className="blob absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#f6dcdc] opacity-50 blur-3xl" />

      {/* paper grain */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="2"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-2">
        <div>
          <span className="hero-eyebrow inline-block rounded-full border border-black/10 bg-white/60 px-4 py-1.5 text-sm text-black/60 backdrop-blur">
            Interactive learning roadmaps
          </span>
          <h1 className="font-display mt-6 text-5xl leading-[0.95] font-bold tracking-tight text-[#1a1a1a] sm:text-6xl lg:text-7xl">
            <span className="block overflow-hidden">
              <span className="hero-line block">Map every</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block">step of your</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block">learning road.</span>
            </span>
          </h1>
          <p className="hero-sub mt-6 max-w-md text-lg text-black/60">
            Turn any subject into a living map of nodes and connections. Build
            it, track it, share it.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <Button asChild size="lg" className="hero-cta">
              <Link href="/register">Start building</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="hero-cta">
              <Link href="/login">Sign in</Link>
            </Button>
          </div>
        </div>

        <div className="flex justify-center">
          <RoadmapMotif />
        </div>
      </div>
    </section>
  );
}
