import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";

export const metadata = { title: "About" };

const STEPS = [
  {
    n: "01",
    title: "Name your road",
    body: "Pick any subject — frontend, ML, system design, your own research track — and give your roadmap a name.",
  },
  {
    n: "02",
    title: "Drop & connect topics",
    body: "Pull topics onto an infinite canvas and link them into dependencies. The path builds itself as you think.",
  },
  {
    n: "03",
    title: "Enrich every node",
    body: "Open any topic to add notes, resources, links, and bookmarks — so each node is a mini study hub.",
  },
  {
    n: "04",
    title: "Track & share",
    body: "Mark nodes done and watch your road light up. Publish it so others can follow your path.",
  },
];

const PRINCIPLES = [
  {
    title: "Visual over linear",
    body: "Knowledge branches. Your learning tool should too.",
  },
  {
    title: "Living, not static",
    body: "Progress is animated and felt, not buried in a checkbox.",
  },
  {
    title: "Yours to own",
    body: "Build private maps or share them with the world — your call.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-cream px-4 pt-32 pb-24 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <p className="text-olive text-sm font-medium">About</p>
          <h1 className="font-display text-ink mt-1 text-4xl leading-tight font-bold tracking-tight sm:text-6xl">
            Learning is a path, not a list.
          </h1>
          <div className="text-ink/70 mt-8 space-y-6 text-lg leading-relaxed">
            <p>
              Most learning resources hand you a flat checklist. But knowledge
              isn’t flat — topics branch, depend on each other, and connect in
              ways a list can never show. You end up memorizing an order instead
              of understanding a structure.
            </p>
            <p>
              <span className="text-ink font-semibold">MapYourRoad</span> turns
              any subject into a living map. Each topic is a node, each
              dependency an edge, laid out on an infinite canvas you build,
              track, and share — whether you’re learning web development,
              machine learning, system design, cybersecurity, or charting an
              original research direction.
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="mx-auto mt-20 max-w-6xl">
          <h2 className="font-display text-ink text-3xl font-bold tracking-tight sm:text-4xl">
            How it works
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="sb-border sb-shadow bg-cream rounded-3xl p-6"
              >
                <span className="font-display text-olive/40 text-3xl font-bold">
                  {s.n}
                </span>
                <h3 className="font-display text-ink mt-3 text-xl font-semibold">
                  {s.title}
                </h3>
                <p className="text-ink/60 mt-2 text-sm">{s.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Principles */}
        <div className="mx-auto mt-20 max-w-6xl">
          <h2 className="font-display text-ink text-3xl font-bold tracking-tight sm:text-4xl">
            What we believe
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <div
                key={p.title}
                className="sb-border bg-cream-deep/50 rounded-3xl p-6"
              >
                <h3 className="font-display text-ink text-xl font-semibold">
                  {p.title}
                </h3>
                <p className="text-ink/65 mt-2">{p.body}</p>
              </div>
            ))}
          </div>

          <Button
            asChild
            size="lg"
            className="sb-border sb-shadow bg-olive text-cream hover:bg-olive-deep mt-12 rounded-xl"
          >
            <Link href="/register">Start your map</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
