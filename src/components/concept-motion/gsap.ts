"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Single place that registers GSAP plugins for concept D.
gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };

/** True when the visitor asked the OS for less motion. */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// "Ready" = the intro preloader has lifted (or was skipped). Remembered, so a
// component that mounts later (or React re-running effects in dev) still sees it.
let ready = false;
const READY_EVENT = "motion:ready";

export function markReady() {
  ready = true;
  // Next task, outside the caller's GSAP context: animations started by
  // listeners must not belong to (and be reverted with) the preloader.
  setTimeout(() => window.dispatchEvent(new Event(READY_EVENT)));
}

/** Runs `cb` once the page is ready; returns an unsubscribe function. */
export function onReady(cb: () => void) {
  if (ready) {
    cb();
    return () => {};
  }
  window.addEventListener(READY_EVENT, cb, { once: true });
  return () => window.removeEventListener(READY_EVENT, cb);
}
