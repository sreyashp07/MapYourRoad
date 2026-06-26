"use client";

import { BaseEdge, getBezierPath, type EdgeProps } from "@xyflow/react";

export function RoadmapEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
}: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <BaseEdge
      id={id}
      path={edgePath}
      markerEnd={markerEnd}
      style={{
        stroke: "#7d8a4f",
        strokeWidth: 2.5,
        strokeDasharray: "6 5",
        animation: "rf-dash 0.6s linear infinite",
      }}
    />
  );
}
