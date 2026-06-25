"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { RoadmapMotif } from "./roadmap-motif";
import { NetworkWeb } from "./network-web";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.2,
      });
      tl.from(".hero-eyebrow", { y: 16, autoAlpha: 0, duration: 0.6 })
        .from(
          ".hero-line",
          {
            y: 44,
            autoAlpha: 0,
            filter: "blur(12px)",
            duration: 1,
            stagger: 0.14,
          },
          "-=0.2"
        )
        .from(".hero-sub", { y: 18, autoAlpha: 0, duration: 0.7 }, "-=0.5")
        .from(
          ".hero-cta",
          { y: 14, autoAlpha: 0, duration: 0.6, stagger: 0.1 },
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
      <NetworkWeb />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="aurora aurora-live top-[-12%] left-[-8%] h-[600px] w-[600px]"
          style={{
            background: "radial-gradient(circle, #b6d94f, transparent 68%)",
          }}
        />
        <div
          className="aurora aurora-live top-[0%] right-[-6%] h-[560px] w-[560px]"
          style={{
            background: "radial-gradient(circle, #7d8a4f, transparent 68%)",
            animationDelay: "-3s",
          }}
        />
        <div
          className="aurora aurora-live bottom-[-22%] left-[28%] h-[600px] w-[600px]"
          style={{
            background: "radial-gradient(circle, #d6ef7e, transparent 68%)",
            animationDelay: "-6s",
          }}
        />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 md:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <span className="hero-eyebrow sb-border bg-cream/80 text-ink inline-block rounded-full px-4 py-1.5 text-sm font-medium backdrop-blur">
            Interactive learning roadmaps
          </span>
          <h1 className="font-display text-ink mt-6 text-6xl leading-[1.02] font-bold tracking-tight sm:text-7xl lg:text-8xl">
            <span className="hero-line block pb-1">Map every</span>
            <span className="hero-line text-olive block pb-1">
              step of your
            </span>
            <span className="hero-line block pb-1">learning road.</span>
          </h1>

          <div className="bg-cream-deep relative mt-8 h-[6px] w-52 overflow-hidden rounded-full">
            <div className="light-beam absolute inset-y-0 w-1/2" />
          </div>

          <p className="hero-sub text-ink/70 mt-8 max-w-lg text-xl">
            Turn any subject into a living map of nodes and connections — from
            DSA to machine learning, system design, or research. Build it, track
            it, share it.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="hero-cta sb-border sb-shadow bg-olive text-cream hover:bg-olive-deep rounded-2xl px-7 text-base"
            >
              <Link href="/register">Start building</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="hero-cta sb-border bg-cream/80 rounded-2xl px-7 text-base backdrop-blur"
            >
              <Link href="/explore">Explore roadmaps</Link>
            </Button>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="sb-border sb-shadow-lg bg-cream/60 w-full max-w-2xl rounded-3xl p-6 backdrop-blur-md sm:p-8">
            <RoadmapMotif />
          </div>
        </div>
      </div>
    </section>
  );
}
