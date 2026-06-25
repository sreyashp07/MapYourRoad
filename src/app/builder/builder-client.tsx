"use client";

import { useRef, useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
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

type SaveState = "idle" | "unsaved" | "saving" | "saved" | "error";

interface Props {
  title: string;
  userName: string;
  roadmapId?: string;
  initialNodes?: RNode[];
  initialEdges?: REdge[];
}

export function BuilderClient({
  title,
  userName,
  roadmapId,
  initialNodes,
  initialEdges,
}: Props) {
  const graphRef = useRef<GraphSnapshot | null>(null);
  const [savedId, setSavedId] = useState<string | undefined>(roadmapId);
  const [roadmapTitle, setRoadmapTitle] = useState(title);
  const [state, setState] = useState<SaveState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  // poll the live graph for changes to flip to "unsaved"
  const lastSnapshot = useRef<string>("");
  useEffect(() => {
    const interval = setInterval(() => {
      const g = graphRef.current;
      if (!g) return;
      const snap = JSON.stringify(g);
      if (lastSnapshot.current === "") {
        lastSnapshot.current = snap;
        return;
      }
      if (snap !== lastSnapshot.current) {
        lastSnapshot.current = snap;
        setState((s) => (s === "saving" ? s : "unsaved"));
      }
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const handleSave = () => {
    const graph = graphRef.current;
    if (!graph) return;
    const payload = {
      nodes: graph.nodes as unknown[],
      edges: graph.edges as unknown[],
    };

    startTransition(async () => {
      setState("saving");
      const res = savedId
        ? await updateRoadmap(savedId, roadmapTitle, payload)
        : await createRoadmap(roadmapTitle, payload);

      if (res.ok) {
        setState("saved");
        lastSnapshot.current = JSON.stringify(graph);
        if (!savedId && res.id) {
          setSavedId(res.id);
          router.replace(`/builder?id=${res.id}`);
        }
      } else {
        setState("error");
        setErrorMsg(res.error ?? "Save failed");
      }
    });
  };

  const indicator = {
    idle: { dot: "#8a8f78", label: "Ready" },
    unsaved: { dot: "#c08552", label: "Unsaved changes" },
    saving: { dot: "#d6ef7e", label: "Saving…" },
    saved: { dot: "#a8c64a", label: "All changes saved" },
    error: { dot: "#e06b6b", label: errorMsg || "Save failed" },
  }[state];

  return (
    <div className="flex h-screen flex-col bg-[#141414]">
      <header className="flex shrink-0 items-center justify-between gap-4 border-b border-[#2c3122] px-5 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/dashboard"
            className="font-display shrink-0 rounded-lg border border-[#3a3f2e] px-2.5 py-1.5 text-sm font-semibold text-[#fdf9f0]/70 transition hover:border-[#a8c64a] hover:text-[#fdf9f0]"
          >
            ←
          </Link>
          <input
            value={roadmapTitle}
            onChange={(e) => {
              setRoadmapTitle(e.target.value);
              setState("unsaved");
            }}
            className="font-display max-w-xs min-w-0 truncate rounded-lg bg-transparent px-1 text-base font-semibold text-[#fdf9f0] transition outline-none hover:bg-[#1c1f17] focus:bg-[#1c1f17]"
          />
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden items-center gap-2 sm:flex">
            <span
              className="h-2 w-2 rounded-full transition-colors"
              style={{ backgroundColor: indicator.dot }}
            />
            <span className="text-xs text-[#fdf9f0]/55">{indicator.label}</span>
          </span>
          <span className="hidden text-xs text-[#fdf9f0]/35 md:inline">
            {userName}
          </span>
          <Button
            onClick={handleSave}
            disabled={pending || state === "saving"}
            size="sm"
            className="rounded-lg bg-[#a8c64a] font-semibold text-[#141414] hover:bg-[#b6d94f]"
          >
            {state === "saving"
              ? "Saving…"
              : savedId
                ? "Save changes"
                : "Save roadmap"}
          </Button>
        </div>
      </header>

      <div className="min-h-0 flex-1">
        <RoadmapCanvas
          title={roadmapTitle}
          initialNodes={initialNodes}
          initialEdges={initialEdges}
          graphRef={graphRef}
        />
      </div>
    </div>
  );
}
