interface SeedTopic {
  label: string;
  description: string;
}
interface SeedRoadmap {
  title: string;
  description: string;
  category: string;
  topics: SeedTopic[];
}

export const SEED_ROADMAPS: SeedRoadmap[] = [
  {
    title: "Frontend Engineering",
    description: "From HTML fundamentals to production-grade React apps.",
    category: "Web",
    topics: [
      { label: "HTML & CSS", description: "Semantic markup, flexbox, grid." },
      { label: "JavaScript", description: "ES6+, async, the DOM." },
      { label: "Git & GitHub", description: "Version control workflows." },
      { label: "TypeScript", description: "Static typing for JS." },
      { label: "React", description: "Components, hooks, state." },
      { label: "Next.js", description: "SSR, routing, server components." },
      { label: "Testing", description: "Unit and integration tests." },
      { label: "Performance", description: "Bundle size, Core Web Vitals." },
    ],
  },
  {
    title: "Machine Learning",
    description: "Math foundations through deploying real models.",
    category: "AI",
    topics: [
      { label: "Linear Algebra", description: "Vectors, matrices, operations." },
      { label: "Statistics", description: "Distributions, inference." },
      { label: "Python & NumPy", description: "The ML toolkit." },
      { label: "Linear Regression", description: "Your first model." },
      { label: "Gradient Descent", description: "How models learn." },
      { label: "Neural Networks", description: "Layers, activation, backprop." },
      { label: "Model Evaluation", description: "Metrics, cross-validation." },
      { label: "Deployment", description: "Serving models in production." },
    ],
  },
  {
    title: "DSA Mastery",
    description: "Crack interviews with structured problem-solving.",
    category: "CS",
    topics: [
      { label: "Arrays & Strings", description: "Two pointers, sliding window." },
      { label: "Hashing", description: "Maps, sets, frequency counts." },
      { label: "Recursion", description: "Base cases, call stacks." },
      { label: "Binary Search", description: "On arrays and answers." },
      { label: "Trees", description: "Traversals, BSTs." },
      { label: "Graphs", description: "BFS, DFS, shortest paths." },
      { label: "Dynamic Programming", description: "Memoization, tabulation." },
      { label: "Greedy", description: "Local optimal choices." },
    ],
  },
  {
    title: "System Design",
    description: "Design scalable, reliable distributed systems.",
    category: "Backend",
    topics: [
      { label: "Networking", description: "HTTP, TCP, DNS basics." },
      { label: "Databases", description: "SQL vs NoSQL, indexing." },
      { label: "Caching", description: "Redis, CDN, cache strategies." },
      { label: "Load Balancing", description: "Distributing traffic." },
      { label: "Message Queues", description: "Async processing." },
      { label: "Sharding", description: "Horizontal data partitioning." },
      { label: "CAP Theorem", description: "Consistency tradeoffs." },
      { label: "Observability", description: "Logs, metrics, tracing." },
    ],
  },
  {
    title: "Deep Learning",
    description: "Neural networks from perceptrons to transformers.",
    category: "AI",
    topics: [
      { label: "Perceptrons", description: "The building block." },
      { label: "Backpropagation", description: "Training via gradients." },
      { label: "CNNs", description: "Vision and convolutions." },
      { label: "RNNs & LSTMs", description: "Sequences and memory." },
      { label: "Attention", description: "Weighing what matters." },
      { label: "Transformers", description: "The modern architecture." },
      { label: "Fine-tuning", description: "Adapting pretrained models." },
    ],
  },
  {
    title: "DevOps & Cloud",
    description: "Ship and operate software reliably at scale.",
    category: "Ops",
    topics: [
      { label: "Linux & Shell", description: "The operator's toolkit." },
      { label: "Docker", description: "Containerizing apps." },
      { label: "CI/CD", description: "Automated pipelines." },
      { label: "Kubernetes", description: "Orchestration at scale." },
      { label: "Infrastructure as Code", description: "Terraform basics." },
      { label: "Monitoring", description: "Alerts and dashboards." },
    ],
  },
  {
    title: "Cybersecurity",
    description: "Defend systems and think like an attacker.",
    category: "Security",
    topics: [
      { label: "Networking Security", description: "Firewalls, VPNs." },
      { label: "Cryptography", description: "Hashing, encryption." },
      { label: "Web Security", description: "OWASP Top 10." },
      { label: "Authentication", description: "OAuth, JWT, sessions." },
      { label: "Penetration Testing", description: "Finding weaknesses." },
      { label: "Incident Response", description: "When things go wrong." },
    ],
  },
];
