"use client";

import { useSyncExternalStore } from "react";

/**
 * A tiny localStorage-backed external store. Holds the parsed value in memory
 * as the source of truth (stable reference for useSyncExternalStore) and
 * persists writes to localStorage. Cross-tab updates are picked up via the
 * `storage` event.
 */
export type LocalStore<T> = {
  get: () => T;
  set: (next: T | ((prev: T) => T)) => void;
  subscribe: (cb: () => void) => () => void;
  serverValue: T;
};

export function createLocalStore<T>(key: string, initial: T): LocalStore<T> {
  let current: T = initial;
  const listeners = new Set<() => void>();

  if (typeof window !== "undefined") {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw != null) current = JSON.parse(raw) as T;
    } catch {
      /* ignore malformed storage */
    }
    window.addEventListener("storage", (e) => {
      if (e.key === key) {
        try {
          current = e.newValue ? (JSON.parse(e.newValue) as T) : initial;
        } catch {
          current = initial;
        }
        listeners.forEach((l) => l());
      }
    });
  }

  return {
    get: () => current,
    set: (next) => {
      current = typeof next === "function" ? (next as (p: T) => T)(current) : next;
      try {
        window.localStorage.setItem(key, JSON.stringify(current));
      } catch {
        /* storage may be unavailable */
      }
      listeners.forEach((l) => l());
    },
    subscribe: (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    serverValue: initial,
  };
}

/** Subscribe a component to a LocalStore. */
export function useLocalStore<T>(store: LocalStore<T>): T {
  return useSyncExternalStore(store.subscribe, store.get, () => store.serverValue);
}
