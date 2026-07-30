"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Shuffle, ArrowRight } from "lucide-react";
import {
  interviewCategories,
  interviewQuestions,
  type InterviewCategory,
} from "@/lib/interview";
import { cn } from "@/lib/utils";

type Mode = "bank" | "simulator";

export function InterviewPrep() {
  const [mode, setMode] = useState<Mode>("bank");

  return (
    <div>
      <div className="mb-8 inline-flex rounded-lg border border-border p-1">
        {(["bank", "simulator"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={cn(
              "rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
              mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {m === "bank" ? "Question bank" : "Simulator"}
          </button>
        ))}
      </div>

      {mode === "bank" ? <QuestionBank /> : <Simulator />}
    </div>
  );
}

function QuestionBank() {
  const [category, setCategory] = useState<InterviewCategory | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  const questions = useMemo(
    () => interviewQuestions.filter((q) => !category || q.category === category),
    [category],
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setCategory(null)}
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
            !category ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-muted",
          )}
        >
          All
        </button>
        {interviewCategories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              category === c ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-muted",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <ul className="mt-6 space-y-3">
        {questions.map((q) => {
          const isOpen = open === q.id;
          return (
            <li key={q.id} className="rounded-xl border border-border bg-card">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : q.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-medium">{q.question}</span>
                <span className="flex shrink-0 items-center gap-2">
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                    {q.category}
                  </span>
                  <ChevronDown
                    className={cn("h-4 w-4 text-muted-foreground transition-transform", isOpen && "rotate-180")}
                  />
                </span>
              </button>
              {isOpen && (
                <p className="border-t border-border px-5 py-4 text-sm text-muted-foreground">{q.answer}</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Simulator() {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [order, setOrder] = useState(() => interviewQuestions.map((_, i) => i));

  const q = interviewQuestions[order[index]];

  function next() {
    setRevealed(false);
    setIndex((i) => (i + 1) % order.length);
  }

  function shuffle() {
    const shuffled = [...order];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setOrder(shuffled);
    setIndex(0);
    setRevealed(false);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Question {index + 1} of {order.length}
        </span>
        <button
          type="button"
          onClick={shuffle}
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 font-medium transition-colors hover:bg-muted"
        >
          <Shuffle className="h-3.5 w-3.5" /> Shuffle
        </button>
      </div>

      <div className="mt-4 rounded-xl border border-border bg-card p-6">
        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
          {q.category}
        </span>
        <p className="mt-3 text-lg font-medium">{q.question}</p>

        {revealed ? (
          <div className="mt-4 rounded-lg border border-primary/30 bg-primary/5 p-4 text-sm text-foreground/90">
            {q.answer}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="mt-4 rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            Show model answer
          </button>
        )}
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={next}
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Next question
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
