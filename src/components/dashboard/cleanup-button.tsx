"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { cleanupSeeded } from "@/features/community/cleanup-action";

export function CleanupButton() {
  const [pending, startTransition] = useTransition();
  const [msg, setMsg] = useState("");
  const router = useRouter();

  return (
    <div className="border-clay/30 bg-clay/5 mb-6 flex items-center gap-3 rounded-2xl border px-4 py-3">
      <p className="text-ink/70 text-sm">
        Remove the sample roadmaps that were added by mistake?
      </p>
      <button
        onClick={() =>
          startTransition(async () => {
            const res = await cleanupSeeded();
            setMsg(res.ok ? `Removed ${res.deleted}` : (res.error ?? "Failed"));
            router.refresh();
          })
        }
        disabled={pending}
        className="bg-clay text-cream rounded-full px-4 py-1.5 text-sm font-semibold hover:opacity-90"
      >
        {pending ? "Cleaning…" : "Clean up"}
      </button>
      {msg && <span className="text-ink/50 text-sm">{msg}</span>}
    </div>
  );
}
