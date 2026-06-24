import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-ink/15 bg-cream border-t-[1.5px] px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <span className="font-display text-ink text-lg font-bold">
          {siteConfig.shortName}
        </span>
        <nav className="text-ink/70 flex items-center gap-6 text-sm">
          <Link href="/explore" className="hover:text-ink">
            Explore
          </Link>
          <Link href="/about" className="hover:text-ink">
            About
          </Link>
          <Link href="/login" className="hover:text-ink">
            Sign in
          </Link>
        </nav>
        <span className="text-ink/50 text-sm">
          © {new Date().getFullYear()} {siteConfig.shortName}
        </span>
      </div>
    </footer>
  );
}
