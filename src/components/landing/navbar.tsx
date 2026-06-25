import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6">
      <nav className="sb-border sb-shadow bg-cream/90 mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-5 py-3 backdrop-blur">
        <Logo />
        <div className="text-ink/70 hidden items-center gap-6 text-sm font-medium sm:flex">
          <Link href="/explore" className="hover:text-ink">
            Explore
          </Link>
          <Link href="/community" className="hover:text-ink">
            Community
          </Link>
          <Link href="/#testimonials" className="hover:text-ink">
            Testimonials
          </Link>
          <Link href="/about" className="hover:text-ink">
            About
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">Sign in</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="sb-border bg-olive text-cream hover:bg-olive-deep rounded-xl"
          >
            <Link href="/register">Get started</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
