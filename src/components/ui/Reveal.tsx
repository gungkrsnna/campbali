"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fades + lifts its content in the first time it scrolls into view.
 * Users who prefer reduced motion see it immediately.
 */
export function Reveal({
  delay = 0,
  className = "",
  children,
}: {
  /** Milliseconds, for staggering siblings. */
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-[opacity,translate] duration-1000 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
        visible ? "translate-y-0 opacity-100" : "motion-safe:translate-y-6 motion-safe:opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
