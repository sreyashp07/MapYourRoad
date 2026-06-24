import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-6 py-4">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-black/5 bg-white/70 px-5 py-2.5 backdrop-blur">
        <Link
          href="/"
          className="font-display text-lg font-bold text-[#1a1a1a]"
        >
          {siteConfig.shortName}
        </Link>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">Sign in</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/register">Get started</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
