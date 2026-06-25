"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { createRoadmap, updateRoadmap } from "@/features/roadmaps/actions";
import type { GraphSnapshot } from "@/features/canvas/roadmap-canvas";
import type {
  RoadmapNode as RNode,
  RoadmapEdge as REdge,
} from "@/types/roadmap";

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

interface Props {
  title: string;
  roadmapId?: string;
  initialNodes?: RNode[];
  initialEdges?: REdge[];
}

export function BuilderClient({
  title,
  roadmapId,
  initialNodes,
  initialEdges,
}: Props) {
  const graphRef = useRef<GraphSnapshot | null>(null);
  const [savedId, setSavedId] = useState<string | undefined>(roadmapId);
  const [status, setStatus] = useState<string>("");
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const handleSave = () => {
    const graph = graphRef.current;
    if (!graph) return;
    const payload = {
      nodes: graph.nodes as unknown[],
      edges: graph.edges as unknown[],
    };

    startTransition(async () => {
      setStatus("Saving…");
      const res = savedId
        ? await updateRoadmap(savedId, title, payload)
        : await createRoadmap(title, payload);

      if (res.ok) {
        setStatus("Saved ✓");
        if (!savedId && res.id) {
          setSavedId(res.id);
          // reflect the id in the URL without a full reload
          router.replace(`/builder?id=${res.id}`);
        }
        setTimeout(() => setStatus(""), 2000);
      } else {
        setStatus(res.error ?? "Save failed");
      }
    });
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 items-center justify-end gap-3 border-b border-[#2c3122] bg-[#141414] px-5 py-2.5">
        {status && <span className="text-xs text-[#fdf9f0]/60">{status}</span>}
        <Button
          onClick={handleSave}
          disabled={pending}
          size="sm"
          className="rounded-lg bg-[#a8c64a] font-semibold text-[#141414] hover:bg-[#b6d94f]"
        >
          {pending ? "Saving…" : savedId ? "Save changes" : "Save roadmap"}
        </Button>
      </div>
      <div className="min-h-0 flex-1">
        <RoadmapCanvas
          title={title}
          initialNodes={initialNodes}
          initialEdges={initialEdges}
          graphRef={graphRef}
        />
      </div>
    </div>
  );
}
