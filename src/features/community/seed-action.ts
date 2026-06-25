"use server";

import { dbConnect } from "@/lib/db/mongoose";
import Roadmap from "@/models/Roadmap";
import { auth } from "@/auth";
import { slugify } from "@/lib/slug";
import { SEED_ROADMAPS } from "./seed-data";

// One-time helper: publishes the sample roadmaps under the current user.
export async function seedCommunity() {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, error: "Sign in first." };

  await dbConnect();
  const existing = await Roadmap.countDocuments({ isPublic: true });
  if (existing >= SEED_ROADMAPS.length) {
    return { ok: true, message: "Already seeded." };
  }

  for (const r of SEED_ROADMAPS) {
    const nodes = r.topics.map((t, i) => ({
      id: `seed-${i}`,
      type: "roadmapNode",
      position: { x: (i % 2) * 220, y: i * 150 },
      data: {
        label: t.label,
        description: t.description,
        status: "todo",
      },
    }));
    const edges = r.topics.slice(1).map((_, i) => ({
      id: `seed-e-${i}`,
      source: `seed-${i}`,
      target: `seed-${i + 1}`,
      type: "roadmapEdge",
    }));

    await Roadmap.create({
      title: r.title,
      description: r.description,
      category: r.category,
      slug: slugify(r.title),
      owner: session.user.id,
      ownerName: "MapYourRoad Team",
      isPublic: true,
      upvotes: Math.floor(Math.random() * 90) + 10,
      nodes,
      edges,
    });
  }

  return { ok: true, message: "Seeded community roadmaps." };
}
