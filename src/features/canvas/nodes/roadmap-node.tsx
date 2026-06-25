"use client";

import { memo, useState, useEffect, useRef } from "react";
import { Handle, Position, useReactFlow, type NodeProps } from "@xyflow/react";
import gsap from "gsap";
import type { RoadmapNode } from "@/types/roadmap";

const STATUS_RING: Record<string, string> = {
  todo: "#8a8f78",
  "in-progress": "#c08552",
  done: "#a8c64a",
};
const STATUS_LABEL: Record<string, string> = {
  todo: "To do",
  "in-progress": "In progress",
  done: "Done",
};

function RoadmapNodeComponent({ id, data, selected }: NodeProps<RoadmapNode>) {
  const ring = STATUS_RING[data.status] ?? STATUS_RING.todo;
  const { updateNodeData } = useReactFlow();
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(data.label);
  const inputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const prevStatus = useRef(data.status);

  useEffect(() => setVal(data.label), [data.label]);
  useEffect(() => {
    if (editing) inputRef.current?.select();
  }, [editing]);

  // celebratory pop when transitioning to "done"
  useEffect(() => {
    if (
      prevStatus.current !== "done" &&
      data.status === "done" &&
      cardRef.current
    ) {
      gsap.fromTo(
        cardRef.current,
        { scale: 1 },
        {
          scale: 1.08,
          duration: 0.18,
          yoyo: true,
          repeat: 1,
          ease: "power2.out",
        }
      );
    }
    prevStatus.current = data.status;
  }, [data.status]);

  const commit = () => {
    setEditing(false);
    const v = val.trim();
    if (v && v !== data.label) updateNodeData(id, { label: v });
    else setVal(data.label);
  };

  return (
    <div
      ref={cardRef}
      className="group relative max-w-[240px] min-w-[180px] rounded-2xl px-4 py-3"
      style={{
        background: "#1c1f17",
        border: `2px solid ${selected ? "#a8c64a" : "#3a3f2e"}`,
        boxShadow: selected
          ? "0 0 0 3px rgba(168,198,74,0.25), 4px 4px 0 0 #000"
          : "4px 4px 0 0 #000",
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!h-2.5 !w-2.5 !border-2 !border-[#1c1f17] !bg-[#a8c64a]"
      />

      <div className="flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: ring }}
        />
        {editing ? (
          <input
            ref={inputRef}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === "Enter") commit();
              if (e.key === "Escape") {
                setVal(data.label);
                setEditing(false);
              }
            }}
            className="nodrag font-display w-full rounded border border-[#a8c64a] bg-[#141414] px-1.5 py-0.5 text-base font-semibold text-[#fdf9f0] outline-none"
          />
        ) : (
          <p
            onDoubleClick={() => setEditing(true)}
            className="font-display text-base leading-tight font-semibold text-[#fdf9f0]"
            title="Double-click to rename"
          >
            {data.label}
          </p>
        )}
      </div>

      {data.description ? (
        <p className="mt-1.5 line-clamp-2 text-xs text-[#fdf9f0]/55">
          {data.description}
        </p>
      ) : null}

      <span
        className="mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium"
        style={{ backgroundColor: `${ring}22`, color: ring }}
      >
        {STATUS_LABEL[data.status] ?? "To do"}
      </span>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-2.5 !w-2.5 !border-2 !border-[#1c1f17] !bg-[#a8c64a]"
      />
    </div>
  );
}

export const RoadmapNode = memo(RoadmapNodeComponent);
