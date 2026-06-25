import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { ExploreGrid, type ExploreItem } from "./explore-client";

export const metadata = { title: "Explore" };

const ITEMS: ExploreItem[] = [
  {
    title: "Frontend Engineering",
    tag: "Web",
    c: "#5c6444",
    topics: [
      "HTML & CSS",
      "JavaScript",
      "Git & GitHub",
      "TypeScript",
      "React",
      "State Management",
      "Next.js",
      "Tailwind CSS",
      "APIs & Fetch",
      "Testing",
      "Accessibility",
      "Performance",
    ],
  },
  {
    title: "Backend Engineering",
    tag: "Web",
    c: "#7d8a4f",
    topics: [
      "HTTP & REST",
      "Node.js",
      "Express",
      "Databases",
      "Authentication",
      "ORMs",
      "Caching",
      "Background Jobs",
      "API Design",
      "Error Handling",
      "Logging",
      "Deployment",
    ],
  },
  {
    title: "Machine Learning",
    tag: "AI",
    c: "#c08552",
    topics: [
      "Linear Algebra",
      "Statistics",
      "Python & NumPy",
      "Pandas",
      "Linear Regression",
      "Logistic Regression",
      "Decision Trees",
      "Gradient Descent",
      "Feature Engineering",
      "Model Evaluation",
      "Clustering",
      "Deployment",
    ],
  },
  {
    title: "Deep Learning",
    tag: "AI",
    c: "#5c6444",
    topics: [
      "Perceptrons",
      "Backpropagation",
      "CNNs",
      "RNNs & LSTMs",
      "Attention",
      "Transformers",
      "Regularization",
      "Fine-tuning",
      "PyTorch",
      "GPUs & Training",
    ],
  },
  {
    title: "DSA Mastery",
    tag: "CS",
    c: "#7d8a4f",
    topics: [
      "Arrays",
      "Strings",
      "Hashing",
      "Recursion",
      "Linked Lists",
      "Stacks & Queues",
      "Binary Search",
      "Trees",
      "Graphs",
      "Dynamic Programming",
      "Greedy",
      "Backtracking",
      "Heaps",
      "Tries",
    ],
  },
  {
    title: "System Design",
    tag: "Backend",
    c: "#a8c64a",
    topics: [
      "Networking",
      "Databases",
      "Caching",
      "Load Balancing",
      "Message Queues",
      "Microservices",
      "Sharding",
      "Replication",
      "CAP Theorem",
      "Rate Limiting",
      "CDNs",
      "Observability",
    ],
  },
  {
    title: "DevOps & Cloud",
    tag: "Ops",
    c: "#c08552",
    topics: [
      "Linux & Shell",
      "Docker",
      "CI/CD",
      "Kubernetes",
      "Terraform",
      "AWS Basics",
      "Monitoring",
      "Secrets Management",
      "Networking",
    ],
  },
  {
    title: "Data Science",
    tag: "AI",
    c: "#7d8a4f",
    topics: [
      "Python",
      "Pandas",
      "Data Cleaning",
      "Visualization",
      "Statistics",
      "Hypothesis Testing",
      "SQL",
      "Feature Engineering",
      "ML Basics",
      "Storytelling",
    ],
  },
  {
    title: "Cybersecurity",
    tag: "Security",
    c: "#5c6444",
    topics: [
      "Networking Security",
      "Cryptography",
      "Web Security",
      "OWASP Top 10",
      "Authentication",
      "Penetration Testing",
      "Malware Analysis",
      "Incident Response",
      "Forensics",
    ],
  },
  {
    title: "Mobile (React Native)",
    tag: "Mobile",
    c: "#a8c64a",
    topics: [
      "JavaScript",
      "React",
      "React Native",
      "Navigation",
      "State",
      "Native Modules",
      "Animations",
      "Push Notifications",
      "App Store Deploy",
    ],
  },
  {
    title: "Databases & SQL",
    tag: "Data",
    c: "#c08552",
    topics: [
      "Relational Model",
      "SQL Queries",
      "Joins",
      "Indexing",
      "Normalization",
      "Transactions",
      "NoSQL",
      "Query Optimization",
      "Backups",
    ],
  },
  {
    title: "Blockchain Dev",
    tag: "Web3",
    c: "#7d8a4f",
    topics: [
      "Blockchain Basics",
      "Cryptography",
      "Smart Contracts",
      "Solidity",
      "Ethereum",
      "Web3.js",
      "Wallets",
      "DeFi",
      "Security",
    ],
  },
  {
    title: "UI/UX Design",
    tag: "Design",
    c: "#5c6444",
    topics: [
      "Design Principles",
      "Color & Type",
      "Layout & Grid",
      "Figma",
      "Wireframing",
      "Prototyping",
      "User Research",
      "Accessibility",
      "Design Systems",
    ],
  },
  {
    title: "Game Development",
    tag: "Games",
    c: "#a8c64a",
    topics: [
      "Game Loops",
      "C# / C++",
      "Unity Basics",
      "Physics",
      "Sprites & Animation",
      "Input",
      "Audio",
      "Level Design",
      "Publishing",
    ],
  },
  {
    title: "MLOps",
    tag: "AI",
    c: "#c08552",
    topics: [
      "ML Pipelines",
      "Experiment Tracking",
      "Model Registry",
      "CI/CD for ML",
      "Docker",
      "Kubernetes",
      "Monitoring",
      "Feature Stores",
      "Serving",
    ],
  },
  {
    title: "Research Methods",
    tag: "Research",
    c: "#7d8a4f",
    topics: [
      "Reading Papers",
      "Literature Review",
      "Hypotheses",
      "Experiment Design",
      "Statistics",
      "Reproducibility",
      "Writing",
      "Peer Review",
    ],
  },
  {
    title: "Cloud Architecture",
    tag: "Ops",
    c: "#5c6444",
    topics: [
      "Compute",
      "Storage",
      "Networking",
      "IAM",
      "Serverless",
      "Scaling",
      "High Availability",
      "Cost Optimization",
      "IaC",
    ],
  },
  {
    title: "Data Engineering",
    tag: "Data",
    c: "#7d8a4f",
    topics: [
      "SQL",
      "ETL Pipelines",
      "Airflow",
      "Spark",
      "Data Warehouses",
      "Streaming",
      "Data Modeling",
      "Quality",
      "Orchestration",
    ],
  },
  {
    title: "Product Management",
    tag: "Product",
    c: "#c08552",
    topics: [
      "Discovery",
      "User Research",
      "Roadmapping",
      "Prioritization",
      "Metrics",
      "A/B Testing",
      "Stakeholders",
      "Go-to-Market",
    ],
  },
  {
    title: "Computer Networks",
    tag: "CS",
    c: "#a8c64a",
    topics: [
      "OSI Model",
      "TCP/IP",
      "DNS",
      "HTTP/HTTPS",
      "Routing",
      "Switching",
      "Subnetting",
      "Firewalls",
      "Network Security",
    ],
  },
];

const TAGS = [
  "All",
  "Web",
  "AI",
  "CS",
  "Backend",
  "Security",
  "Data",
  "Design",
  "Ops",
  "Research",
];

export default function ExplorePage() {
  return (
    <>
      <Navbar />
      <main className="bg-cream px-4 pt-32 pb-24 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-olive text-sm font-medium">Explore</p>
          <h1 className="font-display text-ink mt-1 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
            Browse learning paths across every domain.
          </h1>
          <p className="text-ink/60 mt-3 max-w-xl">
            Click any field to see the topics inside it, then start mapping.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {TAGS.map((t, i) => (
              <span
                key={t}
                className={`cursor-default rounded-full border px-4 py-1.5 text-sm font-medium ${
                  i === 0
                    ? "border-olive bg-olive text-cream"
                    : "border-ink/12 bg-cream text-ink/70"
                }`}
              >
                {t}
              </span>
            ))}
          </div>

          <ExploreGrid items={ITEMS} />
        </div>
      </main>
      <Footer />
    </>
  );
}
