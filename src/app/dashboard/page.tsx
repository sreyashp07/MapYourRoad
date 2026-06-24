import Link from "next/link";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";

export default async function DashboardPage() {
  const session = await auth();
  const name = session?.user?.name ?? "there";

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
        <p className="text-olive text-sm font-medium">Dashboard</p>
        <h1 className="font-display text-ink mt-1 text-4xl font-bold tracking-tight sm:text-5xl">
          Welcome back, {name}.
        </h1>

        <div className="sb-border sb-shadow-lg bg-cream mt-10 rounded-3xl p-10 text-center">
          <div className="bg-olive/10 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl">
            <span className="border-olive h-6 w-6 rounded-full border-2" />
          </div>
          <h2 className="font-display text-ink mt-5 text-2xl font-semibold">
            No roadmaps yet
          </h2>
          <p className="text-ink/60 mx-auto mt-2 max-w-md">
            Your interactive canvas builder lands in the next update. For now,
            explore roadmaps others have charted.
          </p>
          <Button
            asChild
            size="lg"
            className="sb-border sb-shadow bg-olive text-cream hover:bg-olive-deep mt-6 rounded-xl"
          >
            <Link href="/explore">Explore roadmaps</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
