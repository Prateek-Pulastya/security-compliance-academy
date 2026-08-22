import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { ControlMappingView } from "@/components/control-mapping-view";
import { allFrameworks } from "@/lib/controls";
import { getControls } from "@/lib/controls-data";

export const metadata: Metadata = {
  title: "Control Mapping",
  description:
    "Interactive control explorer: see how each security control maps across ISO 27001, NIST CSF, SOC 2, GDPR, CIS Controls, and cloud services.",
};

export default function ControlMappingPage() {
  const controls = getControls();
  return (
    <>
      <PageHeader
        eyebrow="Control Explorer"
        title="One control, every framework"
        description="The core idea of the academy: technical controls, mapped to the frameworks that require them, each mapping confidence-graded. Search or filter to explore."
      />
      <Container className="py-12">
        <ControlMappingView controls={controls} frameworks={allFrameworks(controls)} />
        <p className="mt-8 text-xs text-muted-foreground">
          Sourced from the{" "}
          <a href="https://github.com/Prateek-Pulastya/security-compliance-academy/tree/main/data/controls" className="text-primary hover:underline">
            crosswalk dataset
          </a>
          . Mappings are confidence-graded; always consult the authoritative standard text.
        </p>
      </Container>
    </>
  );
}
