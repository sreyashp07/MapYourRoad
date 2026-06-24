import type { Node, Edge } from "@xyflow/react";

export type NodeStatus = "todo" | "in-progress" | "done";

export interface RoadmapNodeData {
  label: string;
  description?: string;
  status: NodeStatus;
  [key: string]: unknown;
}

export type RoadmapNode = Node<RoadmapNodeData, "roadmapNode">;
export type RoadmapEdge = Edge;
