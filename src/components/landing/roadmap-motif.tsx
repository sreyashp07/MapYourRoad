"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const NODES = [
  { x: 60, y: 70, c: "#5c6444" },
  { x: 210, y: 46, c: "#c08552" },
  { x: 330, y: 120, c: "#7d8a4f" },
  { x: 120, y: 180, c: "#a8c64a" },
  { x: 280, y: 230, c: "#5c6444" },
  { x: 190, y: 310, c: "#c08552" },
];

const PATHS = [
  "M60 70 Q135 38 210 46",
  "M210 46 Q295 70 330 120",
  "M60 70 Q80 130 120 180",
  "M210 46 Q255 130 280 230",
  "M120 180 Q205 195 280 230",
  "M280 230 Q230 280 190 310",
  "M120 180 Q140 250 190 310",
];

export function RoadmapMotif() {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const paths = gsap.utils.toArray<SVGPathElement>(".motif-path");
      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        delay: 0.6,
      });
      tl.to(".motif-path", {
        strokeDashoffset: 0,
        duration: 0.9,
        stagger: 0.16,
      }).from(
        ".motif-node",
        {
          scale: 0,
          transformOrigin: "center",
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(2.2)",
        },
        "-=0.7"
      );

      gsap.to(".motif-node", {
        y: "+=7",
        duration: 2.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.35, from: "random" },
      });
    },
    { scope: ref }
  );

  return (
    <svg
      ref={ref}
      viewBox="0 0 390 360"
      className="h-full w-full max-w-[440px]"
      fill="none"
    >
      {PATHS.map((d, i) => (
        <path
          key={i}
          className="motif-path"
          d={d}
          stroke="#5c6444"
          strokeOpacity="0.5"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      ))}
      {NODES.map((n, i) => (
        <g key={i} className="motif-node">
          <circle
            cx={n.x}
            cy={n.y}
            r="17"
            fill="#f4f1e8"
            stroke="#20231a"
            strokeWidth="2"
          />
          <circle cx={n.x} cy={n.y} r="6" fill={n.c} />
        </g>
      ))}
    </svg>
  );
}
