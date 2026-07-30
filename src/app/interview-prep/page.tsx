import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { InterviewPrep } from "@/components/interview-prep";

export const metadata: Metadata = {
  title: "Interview Prep",
  description:
    "Curated security interview questions with model answers across GRC, cloud, AppSec, and AI security — plus an interview simulator.",
};

export default function InterviewPrepPage() {
  return (
    <>
      <PageHeader
        eyebrow="Interview Prep"
        title="Land the security role"
        description="Curated questions with model answers across GRC, cloud, AppSec, and AI security. Browse the bank, or run the simulator for rapid-fire practice."
      />
      <Container className="py-12">
        <InterviewPrep />
      </Container>
    </>
  );
}
