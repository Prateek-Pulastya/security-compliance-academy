"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import type { Quiz as QuizType } from "@/lib/quizzes";
import { cn } from "@/lib/utils";

export function Quiz({ quiz }: { quiz: QuizType }) {
  const [answers, setAnswers] = useState<(number | null)[]>(() => quiz.questions.map(() => null));
  const [submitted, setSubmitted] = useState(false);

  const answeredAll = answers.every((a) => a !== null);
  const score = answers.filter((a, i) => a === quiz.questions[i].answer).length;

  function choose(qi: number, oi: number) {
    if (submitted) return;
    setAnswers((prev) => prev.map((a, i) => (i === qi ? oi : a)));
  }

  function reset() {
    setAnswers(quiz.questions.map(() => null));
    setSubmitted(false);
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold">{quiz.title}</h3>
        <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {quiz.topic}
        </span>
      </div>

      <ol className="mt-6 space-y-6">
        {quiz.questions.map((question, qi) => (
          <li key={qi}>
            <p className="font-medium">
              {qi + 1}. {question.q}
            </p>
            <div className="mt-3 grid gap-2">
              {question.options.map((opt, oi) => {
                const selected = answers[qi] === oi;
                const isCorrect = oi === question.answer;
                const showState = submitted && (selected || isCorrect);
                return (
                  <button
                    key={oi}
                    type="button"
                    onClick={() => choose(qi, oi)}
                    disabled={submitted}
                    className={cn(
                      "flex items-center justify-between gap-3 rounded-lg border px-4 py-2.5 text-left text-sm transition-colors",
                      !submitted && selected && "border-primary bg-primary/5",
                      !submitted && !selected && "border-border hover:bg-muted",
                      showState && isCorrect && "border-primary bg-primary/10",
                      submitted && selected && !isCorrect && "border-red-500/50 bg-red-500/10",
                      submitted && !selected && !isCorrect && "border-border opacity-70",
                    )}
                  >
                    <span>{opt}</span>
                    {showState && isCorrect && <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />}
                    {submitted && selected && !isCorrect && (
                      <XCircle className="h-4 w-4 shrink-0 text-red-500" />
                    )}
                  </button>
                );
              })}
            </div>
            {submitted && (
              <p className="mt-2 text-sm text-muted-foreground">{question.explanation}</p>
            )}
          </li>
        ))}
      </ol>

      <div className="mt-6 flex items-center gap-3">
        {!submitted ? (
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            disabled={!answeredAll}
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            Submit answers
          </button>
        ) : (
          <>
            <span className="text-sm font-medium">
              Score: {score}/{quiz.questions.length}
            </span>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              <RotateCcw className="h-4 w-4" /> Retry
            </button>
          </>
        )}
        {!submitted && !answeredAll && (
          <span className="text-xs text-muted-foreground">Answer all questions to submit.</span>
        )}
      </div>
    </div>
  );
}
