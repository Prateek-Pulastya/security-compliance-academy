import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { StudyAssistant } from "@/components/study-assistant";

export const metadata: Metadata = {
  title: "Study Assistant",
  description:
    "Ask a question and get the most relevant academy content — a retrieval-based study assistant.",
};

export default function AssistantPage() {
  return (
    <>
      <PageHeader
        eyebrow="Study Assistant"
        title="Ask the academy"
        description="Ask a question in plain language and get the most relevant frameworks, controls, and sections — with links to read more."
      />
      <Container className="py-12">
        <div className="mx-auto max-w-2xl">
          <StudyAssistant />
        </div>
      </Container>
    </>
  );
}
