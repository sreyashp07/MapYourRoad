import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { UpvoteButton } from "@/components/community/upvote-button";
import { SeedButton } from "@/components/community/seed-button";
import { listPublicRoadmaps } from "@/features/community/actions";

export const metadata = { title: "Explore" };

const CAT_COLOR: Record<string, string> = {
  Web: "#5c6444",
  AI: "#c08552",
  CS: "#7d8a4f",
  Backend: "#a8c64a",
  Ops: "#c08552",
  Security: "#5c6444",
  General: "#7d8a4f",
};

export default async function ExplorePage() {
  const roadmaps = await listPublicRoadmaps();

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
            Real learning paths shared by people. Upvote the ones you find
            useful.
          </p>

          {roadmaps.length === 0 ? (
            <div className="border-ink/20 bg-cream-deep/40 mt-12 rounded-3xl border border-dashed p-12 text-center">
              <p className="text-ink/60">
                No public roadmaps yet. Load the starter set to populate
                Explore:
              </p>
              <div className="mt-5 flex justify-center">
                <SeedButton />
              </div>
            </div>
          ) : (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {roadmaps.map((r) => {
                const c = CAT_COLOR[r.category] ?? "#5c6444";
                return (
                  <div
                    key={r.id}
                    className="border-ink/10 bg-cream/90 flex flex-col rounded-3xl border p-6 shadow-[0_8px_30px_-16px_rgba(60,69,48,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_44px_-16px_rgba(60,69,48,0.5)]"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{ backgroundColor: c }}
                      />
                      <span className="border-ink/12 bg-cream text-ink rounded-full border px-3 py-1 text-xs font-medium">
                        {r.category}
                      </span>
                    </div>
                    <h3 className="font-display text-ink mt-4 text-xl font-semibold">
                      {r.title}
                    </h3>
                    <p className="text-ink/60 mt-1 line-clamp-2 text-sm">
                      {r.description}
                    </p>
                    <p className="text-ink/45 mt-3 text-xs">
                      {r.topics} topics · by {r.ownerName}
                    </p>
                    <div className="border-ink/10 mt-5 flex items-center justify-between border-t pt-4">
                      <UpvoteButton
                        id={r.id}
                        initial={r.upvotes}
                        hasUpvoted={r.hasUpvoted}
                      />
                      <span className="text-ink/40 text-xs">
                        community pick
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
