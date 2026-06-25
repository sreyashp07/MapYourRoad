"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { seedCommunity } from "@/features/community/seed-action";

export function SeedButton() {
  const [pending, startTransition] = useTransition();
  const [msg, setMsg] = useState("");
  const router = useRouter();

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() =>
          startTransition(async () => {
            const res = await seedCommunity();
            setMsg(res.ok ? "Done!" : (res.error ?? "Failed"));
            router.refresh();
          })
        }
        disabled={pending}
        className="border-ink/15 bg-cream text-ink/70 hover:border-olive/50 rounded-full border px-4 py-2 text-sm font-medium"
      >
        {pending ? "Seeding…" : "Load sample roadmaps"}
      </button>
      {msg && <span className="text-ink/50 text-sm">{msg}</span>}
    </div>
  );
}
