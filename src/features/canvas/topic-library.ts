import type { RoadmapNode, RoadmapEdge } from "@/types/roadmap";

export interface TemplateSeed {
  match: string[];
  starters: string[];
  suggestions: string[];
}

const TEMPLATES: TemplateSeed[] = [
  {
    match: ["dsa", "data structures", "algorithm"],
    starters: ["Arrays", "Strings", "Sorting"],
    suggestions: [
      "Linked Lists",
      "Stacks",
      "Queues",
      "Recursion",
      "Hashing",
      "Binary Search",
      "Trees",
      "Graphs",
      "Dynamic Programming",
      "Heaps",
      "Greedy",
      "Backtracking",
      "Tries",
      "Bit Manipulation",
    ],
  },
  {
    match: ["machine learning", "ml"],
    starters: ["Linear Algebra", "Python", "Statistics"],
    suggestions: [
      "Linear Regression",
      "Logistic Regression",
      "Decision Trees",
      "Gradient Descent",
      "Feature Engineering",
      "Neural Networks",
      "Overfitting",
      "Cross Validation",
      "SVMs",
      "Clustering",
      "PCA",
      "Model Evaluation",
    ],
  },
  {
    match: ["frontend", "front end", "web"],
    starters: ["HTML & CSS", "JavaScript", "Git & GitHub"],
    suggestions: [
      "TypeScript",
      "React",
      "State Management",
      "Tailwind CSS",
      "Next.js",
      "APIs & Fetch",
      "Accessibility",
      "Testing",
      "Performance",
      "Build Tools",
      "Routing",
      "Forms",
    ],
  },
  {
    match: ["system design", "backend"],
    starters: ["Networking Basics", "Databases", "APIs"],
    suggestions: [
      "Load Balancing",
      "Caching",
      "Sharding",
      "Message Queues",
      "Microservices",
      "Rate Limiting",
      "CAP Theorem",
      "Replication",
      "CDNs",
      "Consistency",
      "Scaling",
      "Observability",
    ],
  },
];

const GENERIC = {
  starters: ["Getting Started", "Core Concepts", "Practice"],
  suggestions: [
    "Fundamentals",
    "Tooling",
    "Best Practices",
    "Advanced Topics",
    "Projects",
    "Resources",
    "Deep Dive",
    "Review",
    "Patterns",
    "Pitfalls",
  ],
};

export function getTemplate(title: string): {
  starters: string[];
  suggestions: string[];
} {
  const t = title.toLowerCase();
  const found = TEMPLATES.find((tpl) => tpl.match.some((m) => t.includes(m)));
  return found
    ? { starters: found.starters, suggestions: found.suggestions }
    : GENERIC;
}

let idCounter = 0;
export const nextId = () => `node-${Date.now()}-${idCounter++}`;

export function buildStarterGraph(starters: string[]): {
  nodes: RoadmapNode[];
  edges: RoadmapEdge[];
} {
  const nodes: RoadmapNode[] = starters.map((label, i) => ({
    id: nextId(),
    type: "roadmapNode",
    position: { x: 0, y: i * 170 },
    data: { label, status: "todo" },
  }));

  const edges: RoadmapEdge[] = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    edges.push({
      id: `e-${nodes[i].id}-${nodes[i + 1].id}`,
      source: nodes[i].id,
      target: nodes[i + 1].id,
      type: "roadmapEdge",
    });
  }

  return { nodes, edges };
}
