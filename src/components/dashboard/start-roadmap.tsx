"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Template {
  title: string;
  c: string;
}

export function StartRoadmap({ templates }: { templates: Template[] }) {
  const [title, setTitle] = useState("");
  const router = useRouter();

  const start = (name: string) => {
    const finalName = name.trim();
    if (!finalName) return;
    router.push(`/builder?title=${encodeURIComponent(finalName)}`);
  };

  return (
    <div className="mt-6">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && start(title)}
          placeholder="e.g. My Machine Learning Path"
          className="sb-border bg-cream text-ink focus:border-olive focus:ring-olive/30 w-full rounded-xl px-4 py-3 transition outline-none focus:ring-2"
        />
        <Button
          onClick={() => start(title)}
          disabled={!title.trim()}
          size="lg"
          className="sb-border sb-shadow bg-olive text-cream hover:bg-olive-deep shrink-0 rounded-xl"
        >
          Start building →
        </Button>
      </div>

      <div className="mt-5">
        <p className="text-ink/50 text-sm">Or start from a template:</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {templates.map((t) => (
            <button
              key={t.title}
              onClick={() => start(t.title)}
              className="sb-border bg-cream text-ink flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5"
            >
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: t.c }}
              />
              {t.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
