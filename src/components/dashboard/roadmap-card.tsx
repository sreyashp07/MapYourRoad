"use client";

import Link from "next/link";
import { useTransition } from "react";
import { deleteRoadmap } from "@/features/roadmaps/actions";

interface Props {
  id: string;
  title: string;
  total: number;
  done: number;
}

export function RoadmapCard({ id, title, total, done }: Props) {
  const [pending, startTransition] = useTransition();
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className="sb-border sb-shadow group bg-cream relative rounded-3xl p-6 transition-transform hover:-translate-y-1">
      <Link href={`/builder?id=${id}`} className="block">
        <h3 className="font-display text-ink text-xl font-semibold">{title}</h3>
        <p className="text-ink/55 mt-1 text-sm">
          {total} topics · {done} done
        </p>
        <div className="bg-cream-deep mt-4 h-1.5 w-full overflow-hidden rounded-full">
          <div
            className="bg-olive h-full rounded-full"
            style={{ width: `${pct}%` }}
          />
        </div>
      </Link>
      <button
        onClick={() =>
          startTransition(async () => {
            await deleteRoadmap(id);
          })
        }
        disabled={pending}
        className="text-ink/40 hover:text-clay absolute top-4 right-4 text-xs opacity-0 transition group-hover:opacity-100"
        title="Delete roadmap"
      >
        {pending ? "…" : "Delete"}
      </button>
    </div>
  );
}
