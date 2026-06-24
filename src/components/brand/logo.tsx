"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { siteConfig } from "@/config/site";

export function Logo({
  animated = false,
  href = "/",
}: {
  animated?: boolean;
  href?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      if (!animated) return;
      const path = ref.current?.querySelector(
        ".logo-path"
      ) as SVGPathElement | null;
      if (path) {
        const len = path.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: len, strokeDashoffset: len },
          { strokeDashoffset: 0, duration: 1, ease: "power2.out" }
        );
      }
      gsap.from(".logo-node", {
        scale: 0,
        transformOrigin: "center",
        duration: 0.5,
        stagger: 0.12,
        ease: "back.out(2.5)",
        delay: 0.3,
      });
    },
    { scope: ref, dependencies: [animated] }
  );

  return (
    <Link ref={ref} href={href} className="inline-flex items-center gap-2.5">
      <span className="sb-border bg-olive flex h-9 w-9 items-center justify-center rounded-xl">
        <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none">
          <path
            className="logo-path"
            d="M7 22 Q12 10 16 16 Q20 22 25 10"
            stroke="#f4f1e8"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <circle className="logo-node" cx="7" cy="22" r="3" fill="#a8c64a" />
          <circle className="logo-node" cx="16" cy="16" r="3" fill="#d6ef7e" />
          <circle className="logo-node" cx="25" cy="10" r="3" fill="#c08552" />
        </svg>
      </span>
      <span className="font-display text-ink text-xl font-bold">
        {siteConfig.shortName}
      </span>
    </Link>
  );
}
