import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#faf8f3] px-6 text-center">
      <span className="text-muted-foreground rounded-full border border-black/5 bg-white/60 px-4 py-1.5 text-sm">
        Phase 3 · Authentication ready
      </span>
      <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
        {siteConfig.name}
      </h1>
      <p className="text-muted-foreground max-w-xl text-lg text-balance">
        {siteConfig.description}
      </p>
      <div className="flex items-center gap-3">
        <Button asChild size="lg">
          <Link href="/register">Get started</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/login">Sign in</Link>
        </Button>
      </div>
    </main>
  );
}
