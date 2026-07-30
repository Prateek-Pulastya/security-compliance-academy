"use client";

import { useState } from "react";
import type { Quiz as QuizType } from "@/lib/quizzes";
import { cn } from "@/lib/utils";
import { Quiz } from "./quiz";

export function QuizzesBrowser({ quizzes }: { quizzes: QuizType[] }) {
  const [activeSlug, setActiveSlug] = useState(quizzes[0]?.slug);
  const active = quizzes.find((q) => q.slug === activeSlug) ?? quizzes[0];

  if (!active) return null;

  return (
    <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
      <nav aria-label="Quizzes" className="flex flex-col gap-1 lg:sticky lg:top-24 lg:h-fit">
        {quizzes.map((q) => (
          <button
            key={q.slug}
            type="button"
            onClick={() => setActiveSlug(q.slug)}
            className={cn(
              "rounded-lg px-3 py-2 text-left text-sm transition-colors",
              q.slug === active.slug
                ? "bg-muted font-medium text-foreground"
                : "text-muted-foreground hover:bg-muted/60",
            )}
          >
            {q.title}
            <span className="block text-xs text-muted-foreground">
              {q.questions.length} questions
            </span>
          </button>
        ))}
      </nav>
      <div key={active.slug}>
        <Quiz quiz={active} />
      </div>
    </div>
  );
}
