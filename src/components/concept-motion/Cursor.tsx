"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "./gsap";

/**
 * Custom cursor: a dot that tracks the pointer exactly and a ring that trails
 * behind it. Over links/buttons the ring grows; elements with
 * `data-cursor="Label"` show that label inside it. Only for fine pointers
 * (mouse/trackpad) and full motion; the native cursor is hidden only while
 * this runs (html.has-custom-cursor).
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [state, setState] = useState<"hidden" | "idle" | "hover" | "label">("hidden");

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || prefersReducedMotion()) return;
    const html = document.documentElement;
    html.classList.add("has-custom-cursor");

    let x = -100, y = -100, rx = -100, ry = -100, frame = 0;

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = (e.target as Element | null)?.closest?.("[data-cursor], a, button, summary, input, textarea");
      const text = target?.getAttribute("data-cursor") ?? "";
      setLabel(text);
      setState(text ? "label" : target ? "hover" : "idle");
    };
    const onLeave = () => setState("hidden");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      html.classList.remove("has-custom-cursor");
    };
  }, []);

  const ringSize = { hidden: "scale-0", idle: "scale-100", hover: "scale-[1.8]", label: "scale-[2.6]" }[state];

  return (
    // Difference blend keeps the plain ring visible on light and dark; the
    // labelled state is a solid accent disc instead (blending tints it oddly).
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-[100] ${state === "label" ? "" : "mix-blend-difference"}`}
    >
      <div ref={ring} className="absolute left-0 top-0">
        <div
          className={`-ml-5 -mt-5 grid h-10 w-10 place-items-center rounded-full border border-white transition-transform duration-300 ease-out ${ringSize} ${
            state === "label" ? "border-accent bg-accent" : ""
          }`}
        >
          <span className="text-[6px] font-semibold uppercase tracking-widest text-primary-foreground">{label}</span>
        </div>
      </div>
      <div ref={dot} className="absolute left-0 top-0">
        <div className={`-ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-white ${state === "hidden" || state === "label" ? "opacity-0" : ""}`} />
      </div>
    </div>
  );
}
