"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/db/mongoose";
import Roadmap from "@/models/Roadmap";

export interface ActionResult {
  ok: boolean;
  error?: string;
}

type LeanPublic = {
  _id: unknown;
  title: string;
  description: string;
  category: string;
  ownerName: string;
  upvotes: number;
  upvotedBy: unknown[];
  nodes: unknown[];
};

export async function togglePublish(
  id: string,
  makePublic: boolean
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, error: "Not authenticated." };

  await dbConnect();
  await Roadmap.findOneAndUpdate(
    { _id: id, owner: session.user.id },
    {
      isPublic: makePublic,
      ownerName: session.user.name ?? "Anonymous",
    }
  );
  revalidatePath("/dashboard");
  revalidatePath("/explore");
  return { ok: true };
}

export async function listPublicRoadmaps() {
  await dbConnect();
  const session = await auth();
  const uid = session?.user?.id;

  const docs = await Roadmap.find({ isPublic: true })
    .sort({ upvotes: -1, updatedAt: -1 })
    .select("title description category ownerName upvotes upvotedBy nodes")
    .limit(60)
    .lean<LeanPublic[]>();

  return docs.map((d) => {
    const nodes = (d.nodes ?? []) as { data?: { status?: string } }[];
    const upvotedBy = (d.upvotedBy ?? []).map((x) => String(x));
    return {
      id: String(d._id),
      title: d.title,
      description: d.description ?? "",
      category: d.category ?? "General",
      ownerName: d.ownerName || "Anonymous",
      upvotes: d.upvotes ?? 0,
      topics: nodes.length,
      hasUpvoted: uid ? upvotedBy.includes(uid) : false,
    };
  });
}

export async function toggleUpvote(id: string): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, error: "Sign in to upvote." };

  await dbConnect();
  const uid = session.user.id;
  const doc = await Roadmap.findById(id).select("upvotedBy");
  if (!doc) return { ok: false, error: "Not found." };

  const already = doc.upvotedBy.some((x: unknown) => String(x) === uid);
  await Roadmap.findByIdAndUpdate(
    id,
    already
      ? { $pull: { upvotedBy: uid }, $inc: { upvotes: -1 } }
      : { $addToSet: { upvotedBy: uid }, $inc: { upvotes: 1 } }
  );

  revalidatePath("/explore");
  return { ok: true };
}
