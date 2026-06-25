"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/db/mongoose";
import Roadmap from "@/models/Roadmap";
import { slugify } from "@/lib/slug";

interface GraphPayload {
  nodes: unknown[];
  edges: unknown[];
}

export interface SaveResult {
  ok: boolean;
  id?: string;
  error?: string;
}

export async function createRoadmap(
  title: string,
  graph: GraphPayload
): Promise<SaveResult> {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, error: "Not authenticated." };

  await dbConnect();
  try {
    const doc = await Roadmap.create({
      title: title.trim() || "Untitled roadmap",
      slug: slugify(title),
      owner: session.user.id,
      nodes: graph.nodes,
      edges: graph.edges,
    });
    revalidatePath("/dashboard");
    return { ok: true, id: String(doc._id) };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export async function updateRoadmap(
  id: string,
  title: string,
  graph: GraphPayload
): Promise<SaveResult> {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, error: "Not authenticated." };

  await dbConnect();
  try {
    const doc = await Roadmap.findOneAndUpdate(
      { _id: id, owner: session.user.id },
      { title: title.trim(), nodes: graph.nodes, edges: graph.edges },
      { new: true }
    );
    if (!doc) return { ok: false, error: "Roadmap not found." };
    revalidatePath("/dashboard");
    return { ok: true, id: String(doc._id) };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export async function getRoadmap(id: string) {
  const session = await auth();
  if (!session?.user?.id) return null;

  await dbConnect();
  const doc = await Roadmap.findOne({
    _id: id,
    owner: session.user.id,
  }).lean<{
    _id: unknown;
    title: string;
    nodes: unknown[];
    edges: unknown[];
  }>();

  if (!doc) return null;
  return {
    id: String(doc._id),
    title: doc.title,
    nodes: doc.nodes ?? [],
    edges: doc.edges ?? [],
  };
}

export async function listRoadmaps() {
  const session = await auth();
  if (!session?.user?.id) return [];

  await dbConnect();
  const docs = await Roadmap.find({ owner: session.user.id })
    .sort({ updatedAt: -1 })
    .select("title nodes updatedAt")
    .lean
      { _id: unknown; title: string; nodes: unknown[]; updatedAt: Date }[]
    >();

  return docs.map((d) => {
    const nodes = (d.nodes ?? []) as { data?: { status?: string } }[];
    const done = nodes.filter((n) => n.data?.status === "done").length;
    return {
      id: String(d._id),
      title: d.title,
      total: nodes.length,
      done,
      updatedAt: d.updatedAt?.toISOString() ?? "",
    };
  });
}

export async function deleteRoadmap(id: string): Promise<SaveResult> {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, error: "Not authenticated." };

  await dbConnect();
  await Roadmap.deleteOne({ _id: id, owner: session.user.id });
  revalidatePath("/dashboard");
  return { ok: true };
}
