"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
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
  type Edge,
} from "@xyflow/react";
import { RoadmapNode } from "./nodes/roadmap-node";
import { RoadmapEdge } from "./edges/roadmap-edge";
import { SuggestionPanel } from "./suggestion-panel";
import { NodeDetailPanel } from "./node-detail-panel";
import { ProgressBar } from "./progress-bar";
import { getTemplate, buildStarterGraph, nextId } from "./topic-library";
import { useCanvasIntro } from "./use-canvas-intro";
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
  const [edgeMenu, setEdgeMenu] = useState<{
    id: string;
    x: number;
    y: number;
  } | null>(null);
  const { screenToFlowPosition } = useReactFlow();
  const { containerRef, replay } = useCanvasIntro([]);

  useEffect(() => {
    if (graphRef) graphRef.current = { nodes, edges };
  }, [nodes, edges, graphRef]);

  const selectedNode = useMemo(
    () => nodes.find((n) => n.id === selectedId) ?? null,
    [nodes, selectedId]
  );

  // Allow connections freely; only block self-loops and exact duplicates.
  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => {
        if (!params.source || !params.target) return eds;
        if (params.source === params.target) return eds;
        const duplicate = eds.some(
          (e) => e.source === params.source && e.target === params.target
        );
        if (duplicate) return eds;
        return addEdge({ ...params, type: "roadmapEdge" }, eds);
      });
    },
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
        const newEdge: REdge = {
          id: `e-${anchor.id}-${id}`,
          source: anchor.id,
          target: id,
          type: "roadmapEdge",
        };
        setEdges((eds) => [...eds, newEdge]);
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

  // Click an edge -> open a small themed delete prompt at the cursor.
  const onEdgeClick = useCallback(
    (event: React.MouseEvent, edge: Edge) => {
      event.stopPropagation();
      const bounds = containerRef.current?.getBoundingClientRect();
      setEdgeMenu({
        id: edge.id,
        x: event.clientX - (bounds?.left ?? 0),
        y: event.clientY - (bounds?.top ?? 0),
      });
    },
    [containerRef]
  );

  const confirmDeleteEdge = useCallback(() => {
    if (!edgeMenu) return;
    setEdges((eds) => eds.filter((e) => e.id !== edgeMenu.id));
    setEdgeMenu(null);
  }, [edgeMenu, setEdges]);

  return (
    <div
      ref={containerRef}
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

      <button
        onClick={replay}
        className="absolute top-4 right-4 z-10 rounded-xl border-2 border-[#3a3f2e] bg-[#1c1f17]/95 px-3 py-2 text-xs font-medium text-[#fdf9f0]/80 backdrop-blur transition hover:border-[#a8c64a] hover:text-[#fdf9f0]"
        title="Replay animation"
      >
        ↻ Replay
      </button>

      <ReactFlow<RNode, REdge>
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(_, node) => {
          setSelectedId(node.id);
          setEdgeMenu(null);
        }}
        onEdgeClick={onEdgeClick}
        onPaneClick={() => {
          setSelectedId(null);
          setEdgeMenu(null);
        }}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        proOptions={{ hideAttribution: true }}
        defaultEdgeOptions={{ type: "roadmapEdge" }}
        connectionLineStyle={{ stroke: "#a8c64a", strokeWidth: 2.5 }}
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

      {/* edge delete prompt */}
      {edgeMenu ? (
        <div
          className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
          style={{ left: edgeMenu.x, top: edgeMenu.y }}
        >
          <div className="flex items-center gap-2 rounded-xl border-2 border-[#3a3f2e] bg-[#1c1f17] px-3 py-2 shadow-xl">
            <span className="text-xs text-[#fdf9f0]/70">
              Delete connection?
            </span>
            <button
              onClick={confirmDeleteEdge}
              className="rounded-lg bg-[#c08552] px-2.5 py-1 text-xs font-semibold text-[#141414] hover:opacity-90"
            >
              Delete
            </button>
            <button
              onClick={() => setEdgeMenu(null)}
              className="rounded-lg border border-[#3a3f2e] px-2.5 py-1 text-xs text-[#fdf9f0]/70 hover:text-[#fdf9f0]"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}

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
