"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useAppDispatch } from "@/store/hooks";
import { setAppReady } from "@/store/slices/ui-slice";

const FIELDS = [
  "Machine Learning",
  "Deep Learning",
  "Backend",
  "Frontend",
  "DSA",
  "System Design",
  "Research",
  "DevOps",
  "Databases",
  "Security",
  "Cloud",
  "Data Science",
];

export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const counter = { v: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          dispatch(setAppReady(true));
          setDone(true);
        },
      });

      gsap.to(".pl-field", {
        y: -26,
        opacity: 0.85,
        duration: 2.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.18, from: "random" },
      });

      tl.to(counter, {
        v: 100,
        duration: 2.4,
        ease: "power1.inOut",
        onUpdate: () => setPct(Math.round(counter.v)),
      })
        .to(
          ".pl-car",
          { left: "100%", xPercent: -100, duration: 2.4, ease: "power1.inOut" },
          0
        )
        .to(
          ".pl-fill",
          { width: "100%", duration: 2.4, ease: "power1.inOut" },
          0
        )
        .to(
          root.current,
          { yPercent: -100, duration: 0.8, ease: "power4.inOut" },
          "+=0.25"
        );
    },
    { scope: root }
  );

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #3f4530 0%, #5c6444 45%, #7d8a4f 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0">
        {FIELDS.map((f, i) => (
          <span
            key={f}
            className="pl-field font-display text-cream/15 absolute text-2xl font-bold"
            style={{
              left: `${((i * 31) % 86) + 5}%`,
              top: `${((i * 47) % 78) + 8}%`,
            }}
          >
            {f}
          </span>
        ))}
      </div>

      <div className="relative w-[min(560px,86vw)]">
        <h1 className="font-display text-cream text-center text-5xl font-bold tracking-tight sm:text-7xl">
          MapYourRoad
        </h1>

        <div className="bg-cream/20 relative mt-12 h-2 w-full rounded-full">
          <div
            className="pl-fill absolute top-0 left-0 h-full w-0 rounded-full"
            style={{ background: "linear-gradient(90deg,#a8c64a,#d6ef7e)" }}
          />
          <div className="absolute inset-0 flex items-center justify-around opacity-40">
            {Array.from({ length: 22 }).map((_, i) => (
              <span key={i} className="bg-cream h-[2px] w-3" />
            ))}
          </div>
          <div className="pl-car absolute -top-4 left-0 text-3xl">🏎️</div>
        </div>

        <div className="font-display text-cream mt-5 text-center text-2xl font-bold">
          {pct}%
        </div>
      </div>
    </div>
  );
}
