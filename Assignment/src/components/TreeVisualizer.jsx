import React, { useEffect, useMemo, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Handle,
  Position,
} from "reactflow";
import dagre from "dagre";
import "reactflow/dist/style.css";
import "./TreeVisualizer.css";

const nodeWidth = 180;
const nodeHeight = 80;

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

// Auto-layout Left → Right
const getLayoutedElements = (nodes, edges) => {
  dagreGraph.setGraph({ rankdir: "LR", nodesep: 60, ranksep: 90 });

  nodes.forEach((node) =>
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
  );
  edges.forEach((edge) => dagreGraph.setEdge(edge.source, edge.target));
  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const pos = dagreGraph.node(node.id);
    node.position = {
      x: pos.x - nodeWidth / 2,
      y: pos.y - nodeHeight / 2,
    };
  });

  return { nodes, edges };
};

// Node Component
const CustomNode = ({ data }) => (
  <div
    className="p-3 rounded-xl shadow-md border text-left bg-white text-gray-800 min-w-[150px] max-w-[240px] overflow-hidden text-sm"
    style={{ borderColor: data.color }}
  >
    <Handle type="target" position={Position.Left} />
    <div className="font-semibold mb-1">{data.label}</div>
    {data.value && (
      <div className="text-xs text-gray-500 break-words whitespace-pre-wrap">
        {data.value}
      </div>
    )}
    <Handle type="source" position={Position.Right} />
  </div>
);

const nodeTypes = { custom: CustomNode };

const TreeVisualizer = ({ jsonData }) => {
  const [layout, setLayout] = useState({ nodes: [], edges: [] });

  useEffect(() => {
    if (!jsonData || typeof jsonData !== "object") return;

    let id = 1;
    const nodes = [];
    const edges = [];

    const traverse = (obj, parentId = null) => {
      if (typeof obj !== "object" || obj === null) return;

      const entries = Object.entries(obj);

      // Split primitives vs objects/arrays
      const primitives = entries.filter(([_, v]) => typeof v !== "object" || v === null);
      const nested = entries.filter(([_, v]) => typeof v === "object" && v !== null);

      // Group all primitive fields under "Basic Info"
      if (primitives.length) {
        const groupId = `${id++}`;
        nodes.push({
          id: groupId,
          type: "custom",
          data: { label: "Basic Info", value: "", color: "#3B82F6" },
          position: { x: 0, y: 0 },
        });
        if (parentId)
          edges.push({
            id: `e${parentId}-${groupId}`,
            source: parentId,
            target: groupId,
            animated: true,
            style: { stroke: "#94A3B8", strokeWidth: 2 },
          });

        primitives.forEach(([key, value]) => {
          const childId = `${id++}`;
          nodes.push({
            id: childId,
            type: "custom",
            data: { label: key, value: String(value), color: "#F59E0B" },
            position: { x: 0, y: 0 },
          });
          edges.push({
            id: `e${groupId}-${childId}`,
            source: groupId,
            target: childId,
            animated: true,
            style: { stroke: "#94A3B8", strokeWidth: 2 },
          });
        });
      }

      // Process nested objects/arrays
      nested.forEach(([key, value]) => {
        const nodeId = `${id++}`;
        const color = Array.isArray(value) ? "#10B981" : "#4F46E5";
        nodes.push({
          id: nodeId,
          type: "custom",
          data: {
            label: key,
            value: Array.isArray(value) ? value.join(", ") : "",
            color,
          },
          position: { x: 0, y: 0 },
        });
        if (parentId)
          edges.push({
            id: `e${parentId}-${nodeId}`,
            source: parentId,
            target: nodeId,
            animated: true,
            style: { stroke: "#94A3B8", strokeWidth: 2 },
          });

        if (!Array.isArray(value)) {
          traverse(value, nodeId);
        }
      });
    };

    // Root node
    const rootId = "root";
    nodes.push({
      id: rootId,
      type: "custom",
      data: { label: "root", color: "#6366F1" },
      position: { x: 0, y: 0 },
    });

    traverse(jsonData, rootId);
    setLayout(getLayoutedElements(nodes, edges));
  }, [jsonData]);

  return (
    <div className="w-full h-[calc(100vh-80px)] relative rounded-xl overflow-hidden">
      <ReactFlow
        nodes={layout.nodes}
        edges={layout.edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.2}
        maxZoom={1.5}
        className="bg-slate-900"
      >
        <Background color="#334155" gap={16} />
        <Controls
          position="bottom-left"
          showInteractive={false}
          style={{
            bottom: 10,
            left: 10,
            backgroundColor: "#1e293b",
            borderRadius: "12px",
            padding: "6px",
          }}
        />
      </ReactFlow>
    </div>
  );
};

export default TreeVisualizer;
