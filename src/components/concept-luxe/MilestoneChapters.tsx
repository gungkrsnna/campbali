"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";
import styles from "./MilestoneChapters.module.css";

type Milestone = { year: string; title: string; text: string };

const CHAPTER_DURATION_MS = 8000;

function subscribeMotionPreference(onChange: () => void) {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  preference.addEventListener("change", onChange);
  return () => preference.removeEventListener("change", onChange);
}

function allowsMotion() {
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function subscribeVisibility(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}

function pageIsVisible() {
  return document.visibilityState === "visible";
}

function serverSnapshot() {
  return false;
}

export function MilestoneChapters({
  milestones,
  controls,
}: {
  milestones: Milestone[];
  controls: Dictionary["story"]["timelineControls"];
}) {
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [inView, setInView] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const progressBar = useRef<HTMLSpanElement>(null);
  const elapsed = useRef(0);
  const yearButtons = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const motionAllowed = useSyncExternalStore(subscribeMotionPreference, allowsMotion, serverSnapshot);
  const pageVisible = useSyncExternalStore(subscribeVisibility, pageIsVisible, serverSnapshot);
  const running = motionAllowed && inView && pageVisible && milestones.length > 1;
  const selected = Math.max(0, Math.min(active, milestones.length - 1));

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio >= 0.25),
      { threshold: [0, 0.25] },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [milestones.length]);

  useEffect(() => {
    if (!running) return;
    const startedAt = performance.now();
    const carriedElapsed = elapsed.current;
    let frame: number;

    function tick(now: number) {
      elapsed.current = Math.min(carriedElapsed + now - startedAt, CHAPTER_DURATION_MS);
      if (progressBar.current) {
        progressBar.current.style.transform = `scaleX(${elapsed.current / CHAPTER_DURATION_MS})`;
      }
      if (elapsed.current >= CHAPTER_DURATION_MS) {
        elapsed.current = 0;
        setActive((current) => (current + 1) % milestones.length);
        return;
      }
      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running, selected, cycle, milestones.length]);

  if (milestones.length === 0) return null;

  const chapterNumber = String(selected + 1).padStart(2, "0");
  const total = String(milestones.length).padStart(2, "0");
  const panelId = `${baseId}-chapter`;
  const titleId = `${baseId}-title`;

  function selectChapter(index: number) {
    elapsed.current = 0;
    if (progressBar.current) progressBar.current.style.transform = "scaleX(0)";
    setActive(index);
    setCycle((current) => current + 1);
  }

  function onYearKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    switch (event.key) {
      case "ArrowRight": next = Math.min(index + 1, milestones.length - 1); break;
      case "ArrowLeft": next = Math.max(index - 1, 0); break;
      case "Home": next = 0; break;
      case "End": next = milestones.length - 1; break;
      default: return;
    }
    event.preventDefault();
    selectChapter(next);
    yearButtons.current[next]?.focus();
  }

  const navigationClass = "inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-medium text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-default disabled:opacity-30";

  return (
    <div ref={root} className="min-w-0">
      <div role="group" aria-label={controls.chooseYear} className="grid grid-cols-4 gap-2 sm:gap-6">
        {milestones.map((milestone, index) => (
          <button
            key={milestone.year}
            ref={(element) => { yearButtons.current[index] = element; }}
            type="button"
            aria-pressed={selected === index}
            aria-controls={panelId}
            onClick={() => selectChapter(index)}
            onKeyDown={(event) => onYearKeyDown(event, index)}
            className={`relative min-h-16 min-w-0 border-t-2 border-border px-1 py-3 text-left text-xs leading-relaxed transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:min-h-20 sm:text-sm ${
              selected === index ? "text-accent" : "text-muted hover:text-foreground"
            }`}
          >
            <span
              key={selected}
              ref={selected === index ? progressBar : undefined}
              aria-hidden
              className="pointer-events-none absolute -top-0.5 left-0 h-0.5 w-full origin-left bg-accent"
              style={{ transform: index < selected ? "scaleX(1)" : "scaleX(0)" }}
            />
            {milestone.year}
          </button>
        ))}
      </div>

      <div
        id={panelId}
        role="region"
        aria-labelledby={titleId}
        aria-live={running ? "off" : "polite"}
        aria-atomic="true"
        className="grid overflow-hidden border-y border-border bg-surface/40"
      >
        {milestones.map((milestone, index) => (
          <div
            key={milestone.year}
            aria-hidden={selected !== index}
            inert={selected !== index}
            data-active={selected === index}
            data-position={index < selected ? "before" : "after"}
            className={styles.chapter}
          >
            <div className="grid min-h-[25rem] content-center gap-7 px-5 py-8 sm:min-h-[22rem] sm:gap-10 sm:px-10 sm:py-12 md:min-h-[21rem] md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center lg:gap-16 lg:px-14 lg:py-14">
              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted">
                  {controls.chapter} {String(index + 1).padStart(2, "0")}
                </p>
                <p className={`mt-5 text-balance font-serif font-normal leading-[1.05] text-accent ${milestone.year.length > 7 ? "text-4xl sm:text-5xl lg:text-6xl" : "text-6xl sm:text-7xl lg:text-8xl"}`}>
                  {milestone.year}
                </p>
              </div>
              <div className="min-w-0">
                <h3 id={selected === index ? titleId : undefined} className="text-balance font-serif text-3xl font-normal leading-[1.15] sm:text-4xl lg:text-5xl">
                  {milestone.title}
                </h3>
                <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-muted sm:mt-6 sm:text-lg">
                  {milestone.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 sm:mt-6">
        <button type="button" disabled={selected === 0} onClick={() => selectChapter(selected - 1)} className={navigationClass}>
          <span aria-hidden>←</span>
          {controls.previous}
        </button>
        <p className="shrink-0 text-xs tracking-[0.15em] text-muted">
          <span className="text-accent">{chapterNumber}</span>
          <span className="mx-2 text-border">/</span>
          {total}
        </p>
        <button type="button" disabled={selected === milestones.length - 1} onClick={() => selectChapter(selected + 1)} className={navigationClass}>
          {controls.next}
          <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}
