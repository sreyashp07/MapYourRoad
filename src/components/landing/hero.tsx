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
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.2,
      });
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
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="sb-grid relative flex min-h-screen items-center overflow-hidden px-4 pt-28 sm:px-6"
    >
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2">
        <div>
          <span className="hero-eyebrow sb-border inline-block rounded-full bg-cream-deep px-4 py-1.5 text-sm font-medium text-ink">
            Interactive learning roadmaps
          </span>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[0.92] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            <span className="block overflow-hidden">
              <span className="hero-line block">Map every</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block text-olive">step of your</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block">learning road.</span>
            </span>
          </h1>

          {/* running green light beam */}
          <div className="relative mt-7 h-[6px] w-44 overflow-hidden rounded-full bg-cream-deep">
            <div className="light-beam absolute inset-y-0 w-1/2" />
          </div>

          <p className="hero-sub mt-7 max-w-md text-lg text-ink/65">
            Turn any subject into a living map of nodes and connections. Build
            it, track it, share it.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="hero-cta sb-border sb-shadow rounded-xl bg-olive text-cream hover:bg-olive-deep"
            >
              <Link href="/register">Start building</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="hero-cta sb-border rounded-xl bg-cream"
            >
              <Link href="/login">Sign in</Link>
            </Button>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="sb-border sb-shadow-lg rounded-3xl bg-cream p-5">
            <RoadmapMotif />
          </div>
        </div>
      </div>
    </section>
  );
}
