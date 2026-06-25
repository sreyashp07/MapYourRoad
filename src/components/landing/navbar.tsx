"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";

const LINKS = [
  { href: "/explore", label: "Explore" },
  { href: "/community", label: "Community" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 py-3 sm:px-6 sm:py-4">
      <nav className="sb-border sb-shadow bg-cream/90 mx-auto max-w-6xl rounded-2xl px-4 py-3 backdrop-blur sm:px-5">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="text-ink/70 hidden items-center gap-6 text-sm font-medium md:flex">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-ink">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="hidden items-center gap-2 md:flex">
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

          {/* mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="border-ink/15 flex h-9 w-9 items-center justify-center rounded-lg border md:hidden"
            aria-label="Toggle menu"
          >
            <span className="text-ink text-lg">
              {open ? "\u2715" : "\u2630"}
            </span>
          </button>
        </div>

        {open ? (
          <div className="border-ink/10 mt-3 flex flex-col gap-1 border-t pt-3 md:hidden">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-ink/75 hover:bg-cream-deep rounded-lg px-2 py-2 text-sm font-medium"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-ink/15 flex-1 rounded-xl"
              >
                <Link href="/login" onClick={() => setOpen(false)}>
                  Sign in
                </Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-olive text-cream hover:bg-olive-deep flex-1 rounded-xl"
              >
                <Link href="/register" onClick={() => setOpen(false)}>
                  Get started
                </Link>
              </Button>
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
