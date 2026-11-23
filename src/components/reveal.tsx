"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Reveal on scroll — per the animate skill:
 * - Only animate if it helps orientation (content arriving in view)
 * - Entrance uses ease-out, transform + opacity only, ~420ms
 * - Content is visible by default; JS adds .reveal-enhanced first,
 *   so no-JS / no-IntersectionObserver never hides content
 * - prefers-reduced-motion: show everything, no animation
 */
export default function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }
    el.classList.add("reveal-enhanced");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="reveal">
      {children}
    </div>
  );
}
