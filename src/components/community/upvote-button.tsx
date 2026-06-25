"use client";

import { useState, useTransition } from "react";
import { toggleUpvote } from "@/features/community/actions";

export function UpvoteButton({
  id,
  initial,
  hasUpvoted,
}: {
  id: string;
  initial: number;
  hasUpvoted: boolean;
}) {
  const [count, setCount] = useState(initial);
  const [active, setActive] = useState(hasUpvoted);
  const [pending, startTransition] = useTransition();

  const click = () => {
    const next = !active;
    setActive(next);
    setCount((c) => c + (next ? 1 : -1));
    startTransition(async () => {
      const res = await toggleUpvote(id);
      if (!res.ok) {
        setActive(!next);
        setCount((c) => c + (next ? -1 : 1));
      }
    });
  };

  return (
    <button
      onClick={click}
      disabled={pending}
      className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold transition ${
        active
          ? "border-olive bg-olive text-cream"
          : "border-ink/15 bg-cream text-ink hover:border-olive/50"
      }`}
    >
      <span className={active ? "scale-110" : ""}>▲</span>
      {count}
    </button>
  );
}
