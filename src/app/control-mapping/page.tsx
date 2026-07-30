import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { ControlExplorer } from "@/components/control-explorer";
import { allFrameworks } from "@/lib/controls";

export const metadata: Metadata = {
  title: "Control Mapping",
  description:
    "Interactive control explorer: see how each security control maps across ISO 27001, NIST CSF, SOC 2, GDPR, CIS Controls, and cloud services.",
};

export default function ControlMappingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Control Explorer"
        title="One control, every framework"
        description="The core idea of the academy: technical controls, mapped to the frameworks and cloud services that require them. Search or filter to explore."
      />
      <Container className="py-12">
        <ControlExplorer frameworks={allFrameworks()} />
        <p className="mt-8 text-xs text-muted-foreground">
          Illustrative mappings for learning. References are simplified; always consult the
          authoritative standard text.
        </p>
      </Container>
    </>
  );
}
