"use client";

import dynamic from "next/dynamic";

const RoadmapCanvas = dynamic(
  () => import("@/features/canvas/roadmap-canvas").then((m) => m.RoadmapCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-[#141414]">
        <span className="font-display text-lg text-[#fdf9f0]/60">
          Loading canvas…
        </span>
      </div>
    ),
  }
);

export function BuilderClient({ title }: { title: string }) {
  return <RoadmapCanvas title={title} />;
}
