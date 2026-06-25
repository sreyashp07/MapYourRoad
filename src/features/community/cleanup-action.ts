"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/db/mongoose";
import Roadmap from "@/models/Roadmap";

const SEED_TITLES = [
  "Frontend Engineering",
  "Machine Learning",
  "DSA Mastery",
  "System Design",
  "Deep Learning",
  "DevOps & Cloud",
  "Cybersecurity",
];

// Removes the accidentally-seeded sample roadmaps from the current user.
export async function cleanupSeeded() {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, error: "Sign in first." };

  await dbConnect();
  const res = await Roadmap.deleteMany({
    owner: session.user.id,
    ownerName: "MapYourRoad Team",
    title: { $in: SEED_TITLES },
  });

  revalidatePath("/dashboard");
  return { ok: true, deleted: res.deletedCount ?? 0 };
}
