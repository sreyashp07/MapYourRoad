"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import type { RoadmapNode } from "@/types/roadmap";

export function ProgressBar({ nodes }: { nodes: RoadmapNode[] }) {
  const fillRef = useRef<HTMLDivElement>(null);
  const total = nodes.length;
  const done = nodes.filter((n) => n.data.status === "done").length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  useEffect(() => {
    if (fillRef.current) {
      gsap.to(fillRef.current, {
        width: `${pct}%`,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  }, [pct]);

  return (
    <div className="absolute bottom-4 left-1/2 z-10 w-[min(420px,80vw)] -translate-x-1/2">
      <div className="rounded-2xl border-2 border-[#3a3f2e] bg-[#1c1f17]/95 px-4 py-3 backdrop-blur">
        <div className="flex items-center justify-between">
          <span className="font-display text-xs font-semibold text-[#fdf9f0]">
            Progress
          </span>
          <span className="text-xs text-[#fdf9f0]/60">
            {done}/{total} done · {pct}%
          </span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#141414]">
          <div
            ref={fillRef}
            className="h-full w-0 rounded-full"
            style={{
              background: "linear-gradient(90deg,#7d8a4f,#a8c64a,#d6ef7e)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
