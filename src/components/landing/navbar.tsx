import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6">
      <nav className="sb-border sb-shadow mx-auto flex max-w-6xl items-center justify-between rounded-2xl bg-cream px-5 py-3">
        <Link href="/" className="font-display text-xl font-bold text-ink">
          {siteConfig.shortName}
        </Link>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">Sign in</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="sb-border rounded-xl bg-olive text-cream hover:bg-olive-deep"
          >
            <Link href="/register">Get started</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
