"use client";

import Link from "next/link";
import { useActionState } from "react";
import { authenticate } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";
import { AuthShell } from "@/components/auth/auth-shell";

const inputCls =
  "w-full rounded-xl border-[1.5px] border-ink/80 bg-cream px-3 py-2.5 text-sm text-ink outline-none transition focus:border-olive focus:ring-2 focus:ring-olive/30";

export default function LoginPage() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <AuthShell>
      <h1 className="font-display text-ink text-3xl font-bold tracking-tight">
        Welcome back
      </h1>
      <p className="text-ink/60 mt-2 text-sm">
        Sign in to keep building your roadmaps.
      </p>
      <form action={formAction} className="mt-6 space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-ink text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputCls}
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="password" className="text-ink text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className={inputCls}
          />
        </div>
        {errorMessage && <p className="text-clay text-sm">{errorMessage}</p>}
        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          className="sb-border sb-shadow bg-olive text-cream hover:bg-olive-deep w-full rounded-xl"
        >
          {isPending ? "Signing in…" : "Sign in"}
        </Button>
      </form>
      <p className="text-ink/60 mt-5 text-center text-sm">
        No account?{" "}
        <Link href="/register" className="text-olive font-semibold underline">
          Create one
        </Link>
      </p>
    </AuthShell>
  );
}
