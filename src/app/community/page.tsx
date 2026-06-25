import Link from "next/link";
import { auth } from "@/auth";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { MiniPreview } from "@/components/community/mini-preview";
import { PREBUILT } from "@/features/community/prebuilt";

export const metadata = { title: "Community" };

export default async function CommunityPage() {
  const session = await auth();
  const loggedIn = !!session?.user;

  return (
    <>
      <Navbar />
      <main className="bg-cream px-4 pt-32 pb-24 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-olive text-sm font-medium">Community</p>
          <h1 className="font-display text-ink mt-1 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
            Ready-made roadmaps to start from.
          </h1>
          <p className="text-ink/60 mt-3 max-w-xl">
            Curated learning paths with a preview of the canvas.{" "}
            {loggedIn
              ? "Open one to start mapping."
              : "Sign in to open and customize any of them."}
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PREBUILT.map((r) => (
              <div
                key={r.slug}
                className="border-ink/10 bg-cream/90 flex flex-col rounded-3xl border p-6 shadow-[0_8px_30px_-16px_rgba(60,69,48,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_44px_-16px_rgba(60,69,48,0.5)]"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: r.color }}
                  />
                  <span className="border-ink/12 bg-cream text-ink rounded-full border px-3 py-1 text-xs font-medium">
                    {r.category}
                  </span>
                </div>
                <h3 className="font-display text-ink mt-4 text-xl font-semibold">
                  {r.title}
                </h3>
                <p className="text-ink/60 mt-1 text-sm">{r.description}</p>

                <div className="border-ink/8 bg-cream-deep/30 mt-4 rounded-2xl border p-3">
                  <MiniPreview topics={r.topics} color={r.color} />
                </div>

                <p className="text-ink/45 mt-3 text-xs">
                  {r.topics.length} topics
                </p>

                <div className="border-ink/10 mt-4 border-t pt-4">
                  {loggedIn ? (
                    <Link
                      href={`/builder?title=${encodeURIComponent(r.title)}`}
                      className="bg-olive text-cream hover:bg-olive-deep inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition"
                    >
                      Open in builder →
                    </Link>
                  ) : (
                    <Link
                      href="/login"
                      className="border-ink/15 bg-cream text-ink hover:border-olive/50 inline-flex w-full items-center justify-center rounded-xl border px-4 py-2.5 text-sm font-semibold transition"
                    >
                      Sign in to explore →
                    </Link>
                  )}
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
