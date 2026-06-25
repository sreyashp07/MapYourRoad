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
    <BuilderClient
      title={roadmapTitle}
      userName={name}
      roadmapId={id}
      initialNodes={initialNodes}
      initialEdges={initialEdges}
    />
  );
}
