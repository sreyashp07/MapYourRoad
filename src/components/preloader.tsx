"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useAppDispatch } from "@/store/hooks";
import { setAppReady } from "@/store/slices/ui-slice";
import { NetworkWeb } from "@/components/landing/network-web";

type Shape = "circle" | "square" | "diamond" | "triangle";

interface Field {
  label: string;
  left: number;
  top: number;
  shape: Shape;
  color: string;
}

const FIELDS: Field[] = [
  {
    label: "Machine Learning",
    left: 7,
    top: 11,
    shape: "circle",
    color: "#a8c64a",
  },
  { label: "Backend", left: 40, top: 8, shape: "square", color: "#d6ef7e" },
  {
    label: "Deep Learning",
    left: 73,
    top: 12,
    shape: "diamond",
    color: "#c08552",
  },
  { label: "Research", left: 5, top: 40, shape: "triangle", color: "#d6ef7e" },
  { label: "DevOps", left: 87, top: 38, shape: "circle", color: "#a8c64a" },
  { label: "Frontend", left: 8, top: 74, shape: "square", color: "#c08552" },
  {
    label: "System Design",
    left: 62,
    top: 82,
    shape: "diamond",
    color: "#a8c64a",
  },
  { label: "DSA", left: 82, top: 72, shape: "circle", color: "#d6ef7e" },
  { label: "Security", left: 6, top: 90, shape: "diamond", color: "#a8c64a" },
  { label: "Cloud", left: 44, top: 92, shape: "triangle", color: "#c08552" },
  { label: "Databases", left: 28, top: 86, shape: "circle", color: "#d6ef7e" },
  {
    label: "Data Science",
    left: 88,
    top: 88,
    shape: "square",
    color: "#a8c64a",
  },
];

function ShapeIcon({ shape, color }: { shape: Shape; color: string }) {
  if (shape === "triangle") {
    return (
      <span
        style={{
          width: 0,
          height: 0,
          borderLeft: "7px solid transparent",
          borderRight: "7px solid transparent",
          borderBottom: `12px solid ${color}`,
        }}
      />
    );
  }
  const base = "inline-block h-3 w-3";
  const cls =
    shape === "circle"
      ? `${base} rounded-full`
      : shape === "diamond"
        ? `${base} rotate-45 rounded-[2px]`
        : `${base} rounded-[3px]`;
  return <span className={cls} style={{ backgroundColor: color }} />;
}

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

      gsap.fromTo(
        ".pl-field",
        { autoAlpha: 0, y: 10 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.1,
          ease: "power2.out",
          stagger: { each: 0.12, from: "random" },
        }
      );
      gsap.to(".pl-field", {
        y: "-=16",
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.2, from: "random" },
      });

      tl.to(counter, {
        v: 100,
        duration: 2.4,
        ease: "power1.inOut",
        onUpdate: () => setPct(Math.round(counter.v)),
      })
        .to(
          ".pl-marker",
          { left: "100%", xPercent: -50, duration: 2.4, ease: "power1.inOut" },
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
      <div className="absolute inset-0 opacity-50">
        <NetworkWeb />
      </div>

      <div className="pointer-events-none absolute inset-0">
        {FIELDS.map((f) => (
          <div
            key={f.label}
            className="pl-field absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2"
            style={{ left: `${f.left}%`, top: `${f.top}%` }}
          >
            <ShapeIcon shape={f.shape} color={f.color} />
            <span className="font-display text-cream/75 text-base font-semibold whitespace-nowrap sm:text-lg">
              {f.label}
            </span>
          </div>
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
          {/* sleek glowing marker (replaces the car) */}
          <div
            className="pl-marker absolute -top-1.5 left-0 h-5 w-5 rounded-full"
            style={{
              background:
                "radial-gradient(circle, #ffffff 0%, #d6ef7e 45%, #a8c64a 100%)",
              boxShadow: "0 0 18px 5px rgba(168,198,74,0.7)",
            }}
          />
        </div>

        <div className="font-display text-cream mt-5 text-center text-2xl font-bold">
          {pct}%
        </div>
      </div>
    </div>
  );
}
