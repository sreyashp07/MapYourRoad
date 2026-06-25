import Link from "next/link";
import { auth } from "@/auth";
import { getRoadmap } from "@/features/roadmaps/actions";
import { BuilderClient } from "./builder-client";
import type {
  RoadmapNode as RNode,
  RoadmapEdge as REdge,
} from "@/types/roadmap";

export const metadata = { title: "Builder" };

export default async function BuilderPage({
  searchParams,
}: {
  searchParams: Promise<{ title?: string; id?: string }>;
}) {
  const session = await auth();
  const name = session?.user?.name ?? "you";
  const { title, id } = await searchParams;

  let roadmapTitle = title?.trim() || "Untitled roadmap";
  let initialNodes: RNode[] | undefined;
  let initialEdges: REdge[] | undefined;

  if (id) {
    const existing = await getRoadmap(id);
    if (existing) {
      roadmapTitle = existing.title;
      initialNodes = existing.nodes as RNode[];
      initialEdges = existing.edges as REdge[];
    }
  }

  return (
    <div className="flex h-screen flex-col bg-[#141414]">
      <header className="flex shrink-0 items-center justify-between border-b border-[#2c3122] px-5 py-3">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="font-display text-sm font-semibold text-[#fdf9f0]/70 hover:text-[#fdf9f0]"
          >
            ← Dashboard
          </Link>
          <span className="text-[#fdf9f0]/30">/</span>
          <span className="font-display text-sm font-semibold text-[#fdf9f0]">
            {roadmapTitle}
          </span>
        </div>
        <span className="text-xs text-[#fdf9f0]/40">Building as {name}</span>
      </header>

      <div className="min-h-0 flex-1">
        <BuilderClient
          title={roadmapTitle}
          roadmapId={id}
          initialNodes={initialNodes}
          initialEdges={initialEdges}
        />
      </div>
    </div>
  );
}
