"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

/**
 * Animates the React Flow canvas on mount:
 *  - edges "draw" themselves via stroke-dashoffset
 *  - nodes pop in with a staggered scale
 * Returns replay() to run it again on demand.
 */
export function useCanvasIntro(deps: unknown[] = []) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playedRef = useRef(false);

  const play = useCallback(() => {
    const root = containerRef.current;
    if (!root) return;

    const nodes = root.querySelectorAll(".react-flow__node");
    const edgePaths = root.querySelectorAll<SVGPathElement>(
      ".react-flow__edge-path"
    );

    if (!nodes.length && !edgePaths.length) return;

    const tl = gsap.timeline();

    // nodes pop in
    tl.fromTo(
      nodes,
      { scale: 0.4, autoAlpha: 0 },
      {
        scale: 1,
        autoAlpha: 1,
        duration: 0.5,
        ease: "back.out(1.8)",
        stagger: 0.07,
        transformOrigin: "center center",
      }
    );

    // edges draw like ink
    edgePaths.forEach((p) => {
      const len = p.getTotalLength?.() ?? 200;
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      tl.to(
        p,
        { strokeDashoffset: 0, duration: 0.7, ease: "power2.out" },
        "-=0.45"
      );
    });
  }, []);

  useEffect(() => {
    // wait a tick so React Flow has rendered nodes/edges to the DOM
    const t = setTimeout(() => {
      if (!playedRef.current) {
        playedRef.current = true;
        play();
      }
    }, 120);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { containerRef, replay: play };
}
