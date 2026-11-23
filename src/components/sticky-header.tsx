"use client";

import { useEffect, useState, type ReactNode } from "react";

export default function StickyHeader({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 0);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return <header className="header" data-scrolled={scrolled || undefined}>{children}</header>;
}
