import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";

export const metadata = { title: "Explore" };

const SAMPLES = [
  { title: "Frontend Engineering", nodes: 28, tag: "Web", c: "#5c6444" },
  { title: "Backend Engineering", nodes: 31, tag: "Web", c: "#7d8a4f" },
  { title: "Machine Learning", nodes: 34, tag: "AI", c: "#c08552" },
  { title: "Deep Learning", nodes: 30, tag: "AI", c: "#5c6444" },
  { title: "DSA Mastery", nodes: 42, tag: "CS", c: "#7d8a4f" },
  { title: "System Design", nodes: 21, tag: "Backend", c: "#a8c64a" },
  { title: "DevOps & Cloud", nodes: 25, tag: "Ops", c: "#c08552" },
  { title: "Data Science", nodes: 33, tag: "AI", c: "#7d8a4f" },
  { title: "Cybersecurity", nodes: 27, tag: "Security", c: "#5c6444" },
  { title: "Mobile (React Native)", nodes: 19, tag: "Mobile", c: "#a8c64a" },
  { title: "Databases & SQL", nodes: 22, tag: "Data", c: "#c08552" },
  { title: "Blockchain Dev", nodes: 24, tag: "Web3", c: "#7d8a4f" },
  { title: "UI/UX Design", nodes: 18, tag: "Design", c: "#5c6444" },
  { title: "Game Development", nodes: 26, tag: "Games", c: "#a8c64a" },
  { title: "MLOps", nodes: 20, tag: "AI", c: "#c08552" },
  { title: "Research Methods", nodes: 23, tag: "Research", c: "#7d8a4f" },
  { title: "Cloud Architecture", nodes: 29, tag: "Ops", c: "#5c6444" },
  { title: "Data Engineering", nodes: 27, tag: "Data", c: "#7d8a4f" },
  { title: "Product Management", nodes: 17, tag: "Product", c: "#c08552" },
  { title: "Computer Networks", nodes: 24, tag: "CS", c: "#a8c64a" },
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
            A catalog of subjects you can map. Want a ready-made one? Check the
            Community page for prebuilt roadmaps.
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

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SAMPLES.map((s) => (
              <div
                key={s.title}
                className="group border-ink/10 bg-cream/90 rounded-3xl border p-6 shadow-[0_8px_30px_-16px_rgba(60,69,48,0.3)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_44px_-16px_rgba(60,69,48,0.45)]"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: s.c }}
                  />
                  <span className="border-ink/12 bg-cream text-ink rounded-full border px-3 py-1 text-xs font-medium">
                    {s.tag}
                  </span>
                </div>
                <h3 className="font-display text-ink mt-4 text-xl font-semibold">
                  {s.title}
                </h3>
                <p className="text-ink/55 mt-1 text-sm">{s.nodes} topics</p>
                <div className="bg-cream-deep mt-4 h-1.5 w-full overflow-hidden rounded-full">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${40 + (s.nodes % 5) * 12}%`,
                      backgroundColor: s.c,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
