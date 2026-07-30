"use client";

import { createLocalStore, useLocalStore } from "./local-store";

export type BookmarkItem = { href: string; title: string; kind: string };

const completedStore = createLocalStore<Record<string, true>>("sca:completed", {});
const bookmarksStore = createLocalStore<BookmarkItem[]>("sca:bookmarks", []);

export function useCompleted() {
  const completed = useLocalStore(completedStore);
  return {
    completed,
    count: Object.keys(completed).length,
    isComplete: (href: string) => Boolean(completed[href]),
    toggle: (href: string) =>
      completedStore.set((prev) => {
        const next = { ...prev };
        if (next[href]) delete next[href];
        else next[href] = true;
        return next;
      }),
  };
}

export function useBookmarks() {
  const bookmarks = useLocalStore(bookmarksStore);
  return {
    bookmarks,
    isBookmarked: (href: string) => bookmarks.some((b) => b.href === href),
    toggle: (item: BookmarkItem) =>
      bookmarksStore.set((prev) =>
        prev.some((b) => b.href === item.href)
          ? prev.filter((b) => b.href !== item.href)
          : [...prev, item],
      ),
  };
}
