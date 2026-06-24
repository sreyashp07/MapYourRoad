import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";

export const metadata = { title: "Explore" };

const SAMPLES = [
  { title: "Frontend Engineering", nodes: 28, tag: "Web", c: "#5c6444" },
  { title: "Machine Learning", nodes: 34, tag: "AI", c: "#c08552" },
  { title: "DSA Mastery", nodes: 42, tag: "CS", c: "#7d8a4f" },
  { title: "System Design", nodes: 21, tag: "Backend", c: "#a8c64a" },
  { title: "Deep Learning", nodes: 30, tag: "AI", c: "#5c6444" },
  { title: "DevOps & Cloud", nodes: 25, tag: "Ops", c: "#c08552" },
];

export default function ExplorePage() {
  return (
    <>
      <Navbar />
      <main className="bg-cream px-4 pt-32 pb-24 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-olive text-sm font-medium">Explore</p>
          <h1 className="font-display text-ink mt-1 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
            Roadmaps charted by the community.
          </h1>
          <p className="text-ink/60 mt-3 max-w-xl">
            A preview of what learning paths look like. Publishing and discovery
            go live with sharing.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SAMPLES.map((s) => (
              <div
                key={s.title}
                className="sb-border sb-shadow bg-cream rounded-3xl p-6"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="sb-border inline-flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: s.c }}
                  />
                  <span className="sb-border bg-cream-deep text-ink rounded-full px-3 py-1 text-xs font-medium">
                    {s.tag}
                  </span>
                </div>
                <h3 className="font-display text-ink mt-4 text-xl font-semibold">
                  {s.title}
                </h3>
                <p className="text-ink/55 mt-1 text-sm">{s.nodes} topics</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
