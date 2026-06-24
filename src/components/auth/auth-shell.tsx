"use client";

import { NetworkWeb } from "@/components/landing/network-web";
import { Logo } from "@/components/brand/logo";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="sb-grid relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16">
      <NetworkWeb />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="aurora aurora-live top-[-10%] left-[-10%] h-[480px] w-[480px]"
          style={{
            background: "radial-gradient(circle,#b6d94f,transparent 68%)",
          }}
        />
        <div
          className="aurora aurora-live right-[-5%] bottom-[-15%] h-[460px] w-[460px]"
          style={{
            background: "radial-gradient(circle,#7d8a4f,transparent 68%)",
            animationDelay: "-4s",
          }}
        />
      </div>

      <div className="relative w-full max-w-sm">
        <div className="mb-6 flex justify-center">
          <Logo animated />
        </div>
        <div className="sb-border sb-shadow-lg bg-cream/85 rounded-3xl p-8 backdrop-blur-md">
          {children}
        </div>
      </div>
    </main>
  );
}
