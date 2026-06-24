import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#faf8f3] px-6 text-center">
      <span className="text-muted-foreground rounded-full border border-black/5 bg-white/60 px-4 py-1.5 text-sm">
        Phase 3 · You are authenticated
      </span>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Welcome back{session?.user?.name ? `, ${session.user.name}` : ""}
      </h1>
      <p className="text-muted-foreground max-w-md">
        This page is protected by middleware. Sign out and reload it — you will
        be bounced to the login page.
      </p>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <Button type="submit" variant="outline" size="lg">
          Sign out
        </Button>
      </form>
    </main>
  );
}
