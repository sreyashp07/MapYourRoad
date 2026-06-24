"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registerUser } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";
import { AuthShell } from "@/components/auth/auth-shell";

const inputCls =
  "w-full rounded-xl border-[1.5px] border-ink/80 bg-cream px-3 py-2.5 text-sm text-ink outline-none transition focus:border-olive focus:ring-2 focus:ring-olive/30";

export default function RegisterPage() {
  const [errorMessage, formAction, isPending] = useActionState(
    registerUser,
    undefined
  );

  return (
    <AuthShell>
      <h1 className="font-display text-ink text-3xl font-bold tracking-tight">
        Create your account
      </h1>
      <p className="text-ink/60 mt-2 text-sm">
        Start mapping your learning journey.
      </p>
      <form action={formAction} className="mt-6 space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-ink text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputCls}
          />
        </div>
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
            minLength={6}
            autoComplete="new-password"
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
          {isPending ? "Creating account…" : "Create account"}
        </Button>
      </form>
      <p className="text-ink/60 mt-5 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-olive font-semibold underline">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
