import Link from "next/link";
import { auth } from "@/auth";
import { BuilderClient } from "./builder-client";

export const metadata = { title: "Builder" };

export default async function BuilderPage() {
  const session = await auth();
  const name = session?.user?.name ?? "you";

  return (
    <div className="flex h-screen flex-col bg-[#141414]">
      <header className="flex shrink-0 items-center justify-between border-b border-[#2c3122] px-5 py-3">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="font-display text-sm font-semibold text-[#fdf9f0]/70 hover:text-[#fdf9f0]"
          >
            ← Dashboard
          </Link>
          <span className="text-[#fdf9f0]/30">/</span>
          <span className="font-display text-sm font-semibold text-[#fdf9f0]">
            Untitled roadmap
          </span>
        </div>
        <span className="text-xs text-[#fdf9f0]/40">Building as {name}</span>
      </header>

      <div className="min-h-0 flex-1">
        <BuilderClient />
      </div>
    </div>
  );
}
