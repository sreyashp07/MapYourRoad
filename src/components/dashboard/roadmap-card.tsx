"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { deleteRoadmap } from "@/features/roadmaps/actions";
import { togglePublish } from "@/features/community/actions";

interface Props {
  id: string;
  title: string;
  total: number;
  done: number;
  isPublic: boolean;
}

export function RoadmapCard({ id, title, total, done, isPublic }: Props) {
  const [pending, startTransition] = useTransition();
  const [pub, setPub] = useState(isPublic);
  const pct = total ? Math.round((done / total) * 100) : 0;
  const R = 16;
  const CIRC = 2 * Math.PI * R;
  const offset = CIRC - (pct / 100) * CIRC;

  const flipPublish = () => {
    const next = !pub;
    setPub(next);
    startTransition(async () => {
      const res = await togglePublish(id, next);
      if (!res.ok) setPub(!next);
    });
  };

  return (
    <div className="group border-ink/10 bg-cream/90 hover:border-olive/30 relative rounded-3xl border p-6 shadow-[0_8px_30px_-14px_rgba(60,69,48,0.35)] backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_44px_-16px_rgba(60,69,48,0.5)]">
      <Link href={`/builder?id=${id}`} className="block">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-ink text-xl leading-tight font-semibold">
            {title}
          </h3>
          <div className="relative shrink-0">
            <svg
              width="46"
              height="46"
              viewBox="0 0 44 44"
              className="-rotate-90"
            >
              <circle
                cx="22"
                cy="22"
                r={R}
                fill="none"
                stroke="#e3ddcb"
                strokeWidth="4"
              />
              <circle
                cx="22"
                cy="22"
                r={R}
                fill="none"
                stroke="#5c6444"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={CIRC}
                strokeDashoffset={offset}
                className="transition-[stroke-dashoffset] duration-700 ease-out"
              />
            </svg>
            <span className="text-ink absolute inset-0 flex items-center justify-center text-[10px] font-bold">
              {pct}%
            </span>
          </div>
        </div>
        <p className="text-ink/55 mt-2 text-sm">
          {total} topics · {done} done
        </p>
      </Link>

      <div className="border-ink/10 mt-4 flex items-center justify-between border-t pt-4">
        <button
          onClick={flipPublish}
          disabled={pending}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
            pub
              ? "bg-olive text-cream"
              : "border-ink/15 bg-cream text-ink/70 hover:border-olive/50 border"
          }`}
        >
          {pub ? "● Shared to community" : "Share to community"}
        </button>
        <button
          onClick={() =>
            startTransition(async () => {
              await deleteRoadmap(id);
            })
          }
          disabled={pending}
          className="text-ink/35 hover:text-clay text-xs opacity-0 transition group-hover:opacity-100"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
