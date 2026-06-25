"use client";

import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  type Connection,
  type Node,
} from "@xyflow/react";
import { RoadmapNode } from "./nodes/roadmap-node";
import { RoadmapEdge } from "./edges/roadmap-edge";
import { SuggestionPanel } from "./suggestion-panel";
import { NodeDetailPanel } from "./node-detail-panel";
import { ProgressBar } from "./progress-bar";
import { getTemplate, buildStarterGraph, nextId } from "./topic-library";
import type {
  RoadmapNode as RNode,
  RoadmapEdge as REdge,
} from "@/types/roadmap";

const nodeTypes = { roadmapNode: RoadmapNode };
const edgeTypes = { roadmapEdge: RoadmapEdge };

export interface GraphSnapshot {
  nodes: RNode[];
  edges: REdge[];
}

interface CanvasProps {
  title: string;
  initialNodes?: RNode[];
  initialEdges?: REdge[];
  graphRef?: React.MutableRefObject<GraphSnapshot | null>;
}

function CanvasInner({
  title,
  initialNodes,
  initialEdges,
  graphRef,
}: CanvasProps) {
  const { suggestions } = useMemo(() => getTemplate(title), [title]);

  const seed = useMemo(() => {
    if (initialNodes && initialNodes.length) {
      return { nodes: initialNodes, edges: initialEdges ?? [] };
    }
    const { starters } = getTemplate(title);
    return buildStarterGraph(starters);
  }, [title, initialNodes, initialEdges]);

  const [nodes, setNodes, onNodesChange] = useNodesState<RNode>(seed.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<REdge>(seed.edges);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { screenToFlowPosition } = useReactFlow();

  // keep the page-level ref in sync with the live graph so Save can read it
  useEffect(() => {
    if (graphRef) graphRef.current = { nodes, edges };
  }, [nodes, edges, graphRef]);

  const selectedNode = useMemo(
    () => nodes.find((n) => n.id === selectedId) ?? null,
    [nodes, selectedId]
  );

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) => addEdge({ ...params, type: "roadmapEdge" }, eds)),
    [setEdges]
  );

  const addTopic = useCallback(
    (label: string, position?: { x: number; y: number }) => {
      const id = nextId();
      const anchor = nodes.find((n) => n.id === selectedId);
      const pos =
        position ??
        (anchor
          ? { x: anchor.position.x, y: anchor.position.y + 170 }
          : { x: Math.random() * 200, y: Math.random() * 200 });

      const newNode: RNode = {
        id,
        type: "roadmapNode",
        position: pos,
        data: { label, status: "todo" },
      };
      setNodes((nds) => [...nds, newNode]);

      if (anchor && !position) {
        setEdges((eds) =>
          addEdge(
            {
              source: anchor.id,
              target: id,
              type: "roadmapEdge",
            } as Connection,
            eds
          )
        );
      }
    },
    [nodes, selectedId, setNodes, setEdges]
  );

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const label = event.dataTransfer.getData("application/topic");
      if (!label) return;
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      addTopic(label, position);
    },
    [screenToFlowPosition, addTopic]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const updateNodeData = useCallback(
    (id: string, data: Partial<RNode["data"]>) => {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === id ? { ...n, data: { ...n.data, ...data } } : n
        )
      );
    },
    [setNodes]
  );

  const deleteNode = useCallback(
    (id: string) => {
      setNodes((nds) => nds.filter((n) => n.id !== id));
      setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
      setSelectedId(null);
    },
    [setNodes, setEdges]
  );

  return (
    <div
      className="relative h-full w-full"
      style={{ background: "#141414" }}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <SuggestionPanel
        suggestions={suggestions}
        onAdd={(label) => addTopic(label)}
        onDragStartTopic={() => {}}
      />

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(_, node: Node) => setSelectedId(node.id)}
        onPaneClick={() => setSelectedId(null)}
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

      <ProgressBar nodes={nodes} />

      <NodeDetailPanel
        node={selectedNode}
        onClose={() => setSelectedId(null)}
        onUpdate={updateNodeData}
        onDelete={deleteNode}
      />
    </div>
  );
}

export function RoadmapCanvas(props: CanvasProps) {
  return (
    <ReactFlowProvider>
      <CanvasInner {...props} />
    </ReactFlowProvider>
  );
}
