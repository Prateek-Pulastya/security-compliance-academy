import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { QuizzesBrowser } from "@/components/quizzes-browser";
import { quizzes } from "@/lib/quizzes";

export const metadata: Metadata = {
  title: "Quizzes",
  description: "Check your understanding with short, interactive quizzes across the frameworks.",
};

export default function QuizzesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Quizzes"
        title="Check your understanding"
        description="Short, interactive quizzes with instant feedback and explanations."
      />
      <Container className="py-12">
        <QuizzesBrowser quizzes={quizzes} />
      </Container>
    </>
  );
}
