"use client";

const TESTIMONIALS = [
  {
    name: "Aarav Mehta",
    role: "CS undergrad, BITS",
    text: "Finally saw how DSA topics actually connect instead of a flat list. Mapped my whole semester in an evening.",
  },
  {
    name: "Sofia Rossi",
    role: "ML Engineer",
    text: "I use it to plan research reading. Seeing prerequisites as a graph changed how I sequence papers.",
  },
  {
    name: "Daniel Okafor",
    role: "Bootcamp grad",
    text: "Built my frontend roadmap, tracked each node, and landed my first dev role. The progress glow is weirdly motivating.",
  },
  {
    name: "Mei Lin",
    role: "Self-taught dev",
    text: "The node notes mean I don't lose links anymore. Each topic is its own little study hub now.",
  },
  {
    name: "Priya Nair",
    role: "PhD student",
    text: "Charted my entire thesis background as a map. Sharing it with my advisor made supervision so much clearer.",
  },
  {
    name: "Lucas Berg",
    role: "System Design learner",
    text: "The drag-to-connect builder feels like sketching on a whiteboard, but it actually saves. Love it.",
  },
];

function Card({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <div className="sb-border sb-shadow bg-cream w-[340px] shrink-0 rounded-3xl p-6">
      <p className="text-ink/80">“{t.text}”</p>
      <div className="mt-5 flex items-center gap-3">
        <span className="sb-border bg-olive font-display text-cream flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold">
          {t.name.charAt(0)}
        </span>
        <div>
          <p className="font-display text-ink text-sm font-semibold">
            {t.name}
          </p>
          <p className="text-ink/55 text-xs">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const row = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="overflow-hidden py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-ink max-w-xl text-4xl font-bold tracking-tight sm:text-5xl">
          Loved by curious learners.
        </h2>
        <p className="text-ink/50 mt-3 text-sm">
          Sample stories — illustrative of how people use MapYourRoad.
        </p>
      </div>

      <div className="group relative mt-14 flex gap-6 overflow-hidden">
        <div className="animate-marquee flex gap-6 group-hover:[animation-play-state:paused]">
          {row.map((t, i) => (
            <Card key={`a-${i}`} t={t} />
          ))}
        </div>
        <div
          className="animate-marquee flex gap-6 group-hover:[animation-play-state:paused]"
          aria-hidden
        >
          {row.map((t, i) => (
            <Card key={`b-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
