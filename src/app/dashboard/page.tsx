import { auth, signOut } from "@/auth";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { StartRoadmap } from "@/components/dashboard/start-roadmap";
import { RoadmapCard } from "@/components/dashboard/roadmap-card";
import { listRoadmaps } from "@/features/roadmaps/actions";

export const metadata = { title: "Dashboard" };

const TEMPLATES = [
  { title: "Frontend", c: "#5c6444" },
  { title: "Machine Learning", c: "#c08552" },
  { title: "DSA", c: "#7d8a4f" },
  { title: "System Design", c: "#a8c64a" },
];

export default async function DashboardPage() {
  const session = await auth();
  const name = session?.user?.name ?? "there";
  const roadmaps = await listRoadmaps();

  return (
    <div className="bg-cream min-h-screen">
      <header className="border-ink/15 border-b-[1.5px] px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Logo href="/dashboard" />
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <Button
              type="submit"
              variant="outline"
              size="sm"
              className="sb-border bg-cream rounded-xl"
            >
              Sign out
            </Button>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <p className="text-olive text-sm font-medium">Welcome back, {name}</p>
        <h1 className="font-display text-ink mt-1 text-4xl font-bold tracking-tight sm:text-5xl">
          Your roadmaps
        </h1>

        <div className="sb-border sb-shadow-lg bg-cream mt-10 rounded-3xl p-8">
          <h2 className="font-display text-ink text-2xl font-semibold">
            Start a new roadmap
          </h2>
          <p className="text-ink/60 mt-1">
            Name it, then build your path on the canvas.
          </p>
          <StartRoadmap templates={TEMPLATES} />
        </div>

        <div className="mt-12">
          <h2 className="font-display text-ink text-xl font-semibold">
            Recent
          </h2>
          {roadmaps.length === 0 ? (
            <div className="sb-border bg-cream-deep/40 mt-4 rounded-3xl border-dashed p-10 text-center">
              <p className="text-ink/60">
                No roadmaps yet. Create one above to see it here.
              </p>
            </div>
          ) : (
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {roadmaps.map((r) => (
                <RoadmapCard
                  key={r.id}
                  id={r.id}
                  title={r.title}
                  total={r.total}
                  done={r.done}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
