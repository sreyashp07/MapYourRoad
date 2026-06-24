"use client";

import Link from "next/link";
import { useActionState } from "react";
import { authenticate } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export default function LoginPage() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#faf8f3] px-6">
      <div className="w-full max-w-sm rounded-3xl border border-black/5 bg-white/70 p-8 shadow-sm backdrop-blur">
        <h1 className="text-2xl font-semibold tracking-tight">
          Sign in to {siteConfig.shortName}
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Welcome back. Continue building your roadmaps.
        </p>
        <form action={formAction} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-black/30"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-black/30"
            />
          </div>
          {errorMessage && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isPending}
          >
            {isPending ? "Signing in…" : "Sign in"}
          </Button>
        </form>
        <p className="text-muted-foreground mt-4 text-center text-sm">
          No account?{" "}
          <Link href="/register" className="font-medium underline">
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}
