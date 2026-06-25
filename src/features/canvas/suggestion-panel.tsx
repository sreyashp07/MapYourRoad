"use client";

import { useState } from "react";

interface Props {
  suggestions: string[];
  onAdd: (label: string) => void;
  onDragStartTopic: (label: string) => void;
}

export function SuggestionPanel({
  suggestions,
  onAdd,
  onDragStartTopic,
}: Props) {
  const [custom, setCustom] = useState("");
  const [open, setOpen] = useState(true);

  const addCustom = () => {
    const v = custom.trim();
    if (!v) return;
    onAdd(v);
    setCustom("");
  };

  return (
    <div className="absolute top-3 left-3 z-10 w-48 sm:top-4 sm:left-4 sm:w-60">
      <div className="rounded-2xl border-2 border-[#3a3f2e] bg-[#1c1f17]/95 p-3 backdrop-blur">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between"
        >
          <span className="font-display text-sm font-semibold text-[#fdf9f0]">
            Add topics
          </span>
          <span className="text-[#fdf9f0]/50">{open ? "–" : "+"}</span>
        </button>

        {open && (
          <>
            <div className="mt-3 flex gap-1.5">
              <input
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCustom()}
                placeholder="Custom topic…"
                className="w-full rounded-lg border border-[#3a3f2e] bg-[#141414] px-2.5 py-1.5 text-xs text-[#fdf9f0] outline-none focus:border-[#a8c64a]"
              />
              <button
                onClick={addCustom}
                className="shrink-0 rounded-lg bg-[#a8c64a] px-2.5 text-sm font-bold text-[#141414] hover:bg-[#b6d94f]"
              >
                +
              </button>
            </div>

            <p className="mt-3 text-[10px] tracking-wide text-[#fdf9f0]/40 uppercase">
              Drag onto canvas or tap to add
            </p>

            <div className="mt-2 flex max-h-[260px] flex-wrap gap-1.5 overflow-y-auto sm:max-h-[320px]">
              {suggestions.map((s) => (
                <button
                  key={s}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("application/topic", s);
                    e.dataTransfer.effectAllowed = "move";
                    onDragStartTopic(s);
                  }}
                  onClick={() => onAdd(s)}
                  className="cursor-grab rounded-lg border border-[#3a3f2e] bg-[#141414] px-2.5 py-1 text-xs text-[#fdf9f0]/85 transition hover:border-[#a8c64a] hover:text-[#fdf9f0] active:cursor-grabbing"
                >
                  {s}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
