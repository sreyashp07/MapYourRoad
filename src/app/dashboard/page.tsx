import { auth, signOut } from "@/auth";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { DashboardClient } from "@/components/dashboard/dashboard-client";
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
    <div className="bg-cream relative min-h-screen overflow-hidden">
      {/* soft soothing ambient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="aurora top-[-18%] left-[-12%] h-[520px] w-[520px]"
          style={{
            background: "radial-gradient(circle,#cfe3a8,transparent 70%)",
            opacity: 0.32,
          }}
        />
        <div
          className="aurora right-[-10%] bottom-[-22%] h-[560px] w-[560px]"
          style={{
            background: "radial-gradient(circle,#b6d94f,transparent 72%)",
            opacity: 0.25,
          }}
        />
      </div>

      <header className="border-ink/10 relative border-b px-4 py-4 backdrop-blur sm:px-6">
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
              className="border-ink/15 bg-cream/80 rounded-xl"
            >
              Sign out
            </Button>
          </form>
        </div>
      </header>

      <div className="relative">
        <DashboardClient
          name={name}
          roadmaps={roadmaps}
          templates={TEMPLATES}
        />
      </div>
    </div>
  );
}
