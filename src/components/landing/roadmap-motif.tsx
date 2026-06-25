"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const NODES = [
  { x: 70, y: 80, c: "#5c6444" },
  { x: 240, y: 50, c: "#c08552" },
  { x: 400, y: 110, c: "#7d8a4f" },
  { x: 130, y: 210, c: "#a8c64a" },
  { x: 320, y: 200, c: "#5c6444" },
  { x: 460, y: 260, c: "#c08552" },
  { x: 220, y: 330, c: "#7d8a4f" },
  { x: 380, y: 380, c: "#a8c64a" },
  { x: 90, y: 380, c: "#5c6444" },
];

const PATHS = [
  "M70 80 Q155 45 240 50",
  "M240 50 Q330 70 400 110",
  "M70 80 Q90 150 130 210",
  "M240 50 Q280 130 320 200",
  "M400 110 Q450 180 460 260",
  "M130 210 Q225 205 320 200",
  "M320 200 Q400 230 460 260",
  "M130 210 Q165 280 220 330",
  "M320 200 Q280 270 220 330",
  "M220 330 Q300 360 380 380",
  "M130 210 Q100 300 90 380",
  "M90 380 Q155 360 220 330",
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
        stagger: 0.12,
      }).from(
        ".motif-node",
        {
          scale: 0,
          transformOrigin: "center",
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(2.2)",
        },
        "-=0.9"
      );

      gsap.to(".motif-node", {
        y: "+=8",
        duration: 2.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.3, from: "random" },
      });
    },
    { scope: ref }
  );

  return (
    <svg
      ref={ref}
      viewBox="0 0 540 440"
      className="h-full w-full max-w-[560px]"
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
            r="19"
            fill="#f4f1e8"
            stroke="#20231a"
            strokeWidth="2"
          />
          <circle cx={n.x} cy={n.y} r="7" fill={n.c} />
        </g>
      ))}
    </svg>
  );
}
