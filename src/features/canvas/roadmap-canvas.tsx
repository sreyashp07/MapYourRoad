"use client";

import { useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  addEdge,
  useNodesState,
  useEdgesState,
  type Connection,
} from "@xyflow/react";
import { RoadmapNode } from "./nodes/roadmap-node";
import { RoadmapEdge } from "./edges/roadmap-edge";
import type {
  RoadmapNode as RNode,
  RoadmapEdge as REdge,
} from "@/types/roadmap";

const nodeTypes = { roadmapNode: RoadmapNode };
const edgeTypes = { roadmapEdge: RoadmapEdge };

const initialNodes: RNode[] = [
  {
    id: "n1",
    type: "roadmapNode",
    position: { x: 0, y: 0 },
    data: {
      label: "HTML & CSS",
      status: "done",
      description: "Structure and styling fundamentals.",
    },
  },
  {
    id: "n2",
    type: "roadmapNode",
    position: { x: -120, y: 160 },
    data: {
      label: "JavaScript",
      status: "in-progress",
      description: "The language of the web.",
    },
  },
  {
    id: "n3",
    type: "roadmapNode",
    position: { x: 160, y: 160 },
    data: {
      label: "Git & GitHub",
      status: "todo",
      description: "Version control basics.",
    },
  },
  {
    id: "n4",
    type: "roadmapNode",
    position: { x: -120, y: 330 },
    data: {
      label: "React",
      status: "todo",
      description: "Component-based UI library.",
    },
  },
];

const initialEdges: REdge[] = [
  { id: "e1-2", source: "n1", target: "n2", type: "roadmapEdge" },
  { id: "e1-3", source: "n1", target: "n3", type: "roadmapEdge" },
  { id: "e2-4", source: "n2", target: "n4", type: "roadmapEdge" },
];

export function RoadmapCanvas() {
  const [nodes, , onNodesChange] = useNodesState<RNode>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<REdge>(initialEdges);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) => addEdge({ ...params, type: "roadmapEdge" }, eds)),
    [setEdges]
  );

  return (
    <div className="h-full w-full" style={{ background: "#141414" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        proOptions={{ hideAttribution: true }}
        defaultEdgeOptions={{ type: "roadmapEdge" }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={26}
          size={1.5}
          color="#2c3122"
        />
        <Controls
          className="!rounded-xl !border-2 !border-[#3a3f2e] !bg-[#1c1f17] [&_button]:!border-[#3a3f2e] [&_button]:!bg-[#1c1f17] [&_button]:!fill-[#fdf9f0] [&_button:hover]:!bg-[#2c3122]"
          showInteractive={false}
        />
        <MiniMap
          pannable
          zoomable
          maskColor="rgba(20,20,20,0.6)"
          nodeColor="#5c6444"
          className="!rounded-xl !border-2 !border-[#3a3f2e] !bg-[#1c1f17]"
        />
      </ReactFlow>
    </div>
  );
}
