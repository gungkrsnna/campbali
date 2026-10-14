import { useSyncExternalStore } from "react";
import type { InquiryItem } from "./inquiry";

// The inquiry list lives in localStorage so it survives reloads and
// stays in sync across tabs. Read it with `useInquiryList()`.
// v2: items are keyed by SKU code (v1 used product slug).
const STORAGE_KEY = "campbali-inquiry-v2";
const EMPTY: InquiryItem[] = [];

const listeners = new Set<() => void>();
let cachedRaw: string | null = null;
let cachedItems: InquiryItem[] = EMPTY;

function read(): InquiryItem[] {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    return EMPTY;
  }
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedItems = raw ? (JSON.parse(raw) as InquiryItem[]) : EMPTY;
    } catch {
      cachedItems = EMPTY;
    }
  }
  return cachedItems;
}

function write(items: InquiryItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage unavailable (private mode etc.) — list just won't persist.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => e.key === STORAGE_KEY && listener();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useInquiryList() {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export const inquiry = {
  add(code: string, qty = 1) {
    const items = read();
    const existing = items.find((i) => i.code === code);
    write(
      existing
        ? items.map((i) => (i.code === code ? { ...i, qty: i.qty + qty } : i))
        : [...items, { code, qty }],
    );
  },
  setQty(code: string, qty: number) {
    write(
      read().map((i) => (i.code === code ? { ...i, qty: Math.max(1, qty) } : i)),
    );
  },
  remove(code: string) {
    write(read().filter((i) => i.code !== code));
  },
  clear() {
    write(EMPTY);
  },
};
