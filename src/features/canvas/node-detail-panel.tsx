"use client";

import { useEffect, useState } from "react";
import type { RoadmapNode, NodeStatus } from "@/types/roadmap";

interface Props {
  node: RoadmapNode | null;
  onClose: () => void;
  onUpdate: (id: string, data: Partial<RoadmapNode["data"]>) => void;
  onDelete: (id: string) => void;
}

const STATUSES: NodeStatus[] = ["todo", "in-progress", "done"];
const STATUS_LABEL: Record<NodeStatus, string> = {
  todo: "To do",
  "in-progress": "In progress",
  done: "Done",
};

export function NodeDetailPanel({ node, onClose, onUpdate, onDelete }: Props) {
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (node) {
      setLabel(node.data.label ?? "");
      setDescription(node.data.description ?? "");
      setNotes((node.data.notes as string) ?? "");
    }
  }, [node]);

  if (!node) return null;

  return (
    <div className="panel-enter absolute top-0 right-0 z-20 flex h-full w-full max-w-sm flex-col border-l-2 border-[#3a3f2e] bg-[#1c1f17] shadow-2xl">
      <div className="flex items-center justify-between border-b border-[#3a3f2e] px-5 py-4">
        <span className="font-display text-sm font-semibold text-[#fdf9f0]">
          Topic details
        </span>
        <button
          onClick={onClose}
          className="text-[#fdf9f0]/50 hover:text-[#fdf9f0]"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
        <div>
          <label className="text-xs font-medium text-[#fdf9f0]/60">Title</label>
          <input
            value={label}
            onChange={(e) => {
              setLabel(e.target.value);
              onUpdate(node.id, { label: e.target.value });
            }}
            className="mt-1.5 w-full rounded-lg border border-[#3a3f2e] bg-[#141414] px-3 py-2 text-sm text-[#fdf9f0] outline-none focus:border-[#a8c64a]"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-[#fdf9f0]/60">
            Description
          </label>
          <textarea
            value={description}
            rows={2}
            onChange={(e) => {
              setDescription(e.target.value);
              onUpdate(node.id, { description: e.target.value });
            }}
            className="mt-1.5 w-full resize-none rounded-lg border border-[#3a3f2e] bg-[#141414] px-3 py-2 text-sm text-[#fdf9f0] outline-none focus:border-[#a8c64a]"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-[#fdf9f0]/60">
            Status
          </label>
          <div className="mt-1.5 flex gap-1.5">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => onUpdate(node.id, { status: s })}
                className={`flex-1 rounded-lg border px-2 py-1.5 text-xs font-medium transition ${
                  node.data.status === s
                    ? "border-[#a8c64a] bg-[#a8c64a]/15 text-[#a8c64a]"
                    : "border-[#3a3f2e] text-[#fdf9f0]/60 hover:text-[#fdf9f0]"
                }`}
              >
                {STATUS_LABEL[s]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-[#fdf9f0]/60">
            Notes &amp; resources
          </label>
          <textarea
            value={notes}
            rows={6}
            placeholder="Write anything — links, notes, resources…"
            onChange={(e) => {
              setNotes(e.target.value);
              onUpdate(node.id, { notes: e.target.value });
            }}
            className="mt-1.5 w-full resize-none rounded-lg border border-[#3a3f2e] bg-[#141414] px-3 py-2 text-sm text-[#fdf9f0] outline-none focus:border-[#a8c64a]"
          />
        </div>
      </div>

      <div className="border-t border-[#3a3f2e] px-5 py-4">
        <button
          onClick={() => onDelete(node.id)}
          className="w-full rounded-lg border border-[#c08552]/50 px-3 py-2 text-sm font-medium text-[#c08552] hover:bg-[#c08552]/10"
        >
          Delete topic
        </button>
      </div>
    </div>
  );
}
