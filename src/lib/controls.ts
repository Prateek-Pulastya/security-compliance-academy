/**
 * Control catalog for the interactive Control Explorer. Each control lists how
 * it maps across frameworks and cloud services. Illustrative and simplified —
 * always confirm against the authoritative standard text.
 */

export type ControlMapping = { framework: string; reference: string; note: string };

export type Control = {
  id: string;
  name: string;
  category: string;
  summary: string;
  mappings: ControlMapping[];
};

export const controls: Control[] = [
  {
    id: "access-control",
    name: "Access Control",
    category: "Identity & Access",
    summary: "Grant the least privilege necessary, authenticated and authorized.",
    mappings: [
      { framework: "ISO/IEC 27001", reference: "A.5.15–A.5.18", note: "Access control policy, provisioning, privileged access, review." },
      { framework: "NIST CSF 2.0", reference: "PR.AA", note: "Identities and credentials managed; access authorized and enforced." },
      { framework: "SOC 2", reference: "CC6.1–CC6.3", note: "Restrict logical access to authorized users (least privilege)." },
      { framework: "GDPR", reference: "Art. 32(1)(b)", note: "Ongoing confidentiality and controlled access to personal data." },
      { framework: "CIS Controls v8", reference: "Controls 5 & 6", note: "Account and access-control management." },
      { framework: "AWS", reference: "IAM", note: "Identity/resource policies, roles, permission boundaries." },
      { framework: "Azure", reference: "RBAC + Entra ID", note: "Scoped role assignments." },
      { framework: "Kubernetes", reference: "RBAC", note: "Roles / RoleBindings bind subjects to permissions." },
    ],
  },
  {
    id: "encryption",
    name: "Encryption / Cryptography",
    category: "Data Protection",
    summary: "Protect data in transit and at rest with strong, well-managed cryptography.",
    mappings: [
      { framework: "ISO/IEC 27001", reference: "A.8.24", note: "Use of cryptography and key management." },
      { framework: "NIST CSF 2.0", reference: "PR.DS", note: "Data-at-rest and in-transit protection." },
      { framework: "SOC 2", reference: "CC6.1, CC6.7", note: "Encryption to restrict access and protect data in transit." },
      { framework: "GDPR", reference: "Art. 32(1)(a)", note: "Pseudonymisation and encryption of personal data." },
      { framework: "AWS", reference: "KMS / TLS", note: "Envelope encryption; ACM for TLS certificates." },
      { framework: "Azure", reference: "Key Vault", note: "Managed keys, secrets, and certificates." },
    ],
  },
  {
    id: "logging-monitoring",
    name: "Logging & Monitoring",
    category: "Detection",
    summary: "Record security-relevant events and monitor for anomalies.",
    mappings: [
      { framework: "ISO/IEC 27001", reference: "A.8.15–A.8.16", note: "Logging and monitoring activities." },
      { framework: "NIST CSF 2.0", reference: "DE.CM", note: "Continuous monitoring for anomalies and events." },
      { framework: "SOC 2", reference: "CC7.2", note: "Detect and respond to security events." },
      { framework: "CIS Controls v8", reference: "Control 8", note: "Audit log management." },
      { framework: "AWS", reference: "CloudTrail / GuardDuty", note: "API audit trail and threat detection." },
      { framework: "Azure", reference: "Monitor / Defender", note: "Platform logs and threat protection." },
    ],
  },
  {
    id: "vulnerability-management",
    name: "Vulnerability Management",
    category: "Threat & Vulnerability",
    summary: "Continuously identify, prioritize, and remediate vulnerabilities.",
    mappings: [
      { framework: "ISO/IEC 27001", reference: "A.8.8", note: "Management of technical vulnerabilities." },
      { framework: "NIST CSF 2.0", reference: "ID.RA", note: "Vulnerabilities identified and risk assessed." },
      { framework: "SOC 2", reference: "CC7.1", note: "Detect and evaluate configuration and vulnerability changes." },
      { framework: "CIS Controls v8", reference: "Control 7", note: "Continuous vulnerability management." },
      { framework: "AWS", reference: "Inspector", note: "Automated vulnerability scanning." },
    ],
  },
  {
    id: "backup-recovery",
    name: "Backup & Recovery",
    category: "Resilience",
    summary: "Maintain and test backups to recover from incidents and outages.",
    mappings: [
      { framework: "ISO/IEC 27001", reference: "A.8.13", note: "Information backup." },
      { framework: "NIST CSF 2.0", reference: "RC.RP", note: "Recovery plan executed to restore systems." },
      { framework: "SOC 2", reference: "A1.2", note: "Availability: backup and recovery of data." },
      { framework: "DORA", reference: "ICT resilience", note: "Backup and restoration to meet resilience objectives." },
      { framework: "AWS", reference: "Backup / snapshots", note: "Centralized, policy-based backups." },
    ],
  },
  {
    id: "network-security",
    name: "Network Security",
    category: "Infrastructure",
    summary: "Segment networks and control traffic at trust boundaries.",
    mappings: [
      { framework: "ISO/IEC 27001", reference: "A.8.20–A.8.22", note: "Network security, segregation, and controls." },
      { framework: "NIST CSF 2.0", reference: "PR.IR", note: "Network integrity protected (segmentation)." },
      { framework: "CIS Controls v8", reference: "Control 12", note: "Network infrastructure management." },
      { framework: "AWS", reference: "VPC / Security Groups", note: "Subnets, security groups, NACLs." },
      { framework: "Kubernetes", reference: "NetworkPolicy", note: "Pod-level ingress/egress rules." },
    ],
  },
];

/** Distinct framework/service names across all controls, for filtering. */
export function allFrameworks(): string[] {
  const set = new Set<string>();
  for (const c of controls) for (const m of c.mappings) set.add(m.framework);
  return Array.from(set).sort();
}

/** Compliance frameworks used as columns in the coverage matrix (excludes cloud services). */
export const coverageFrameworks = [
  "ISO/IEC 27001",
  "NIST CSF 2.0",
  "SOC 2",
  "GDPR",
  "CIS Controls v8",
  "DORA",
] as const;

/** The mapping reference for a control under a framework, or null if unmapped. */
export function coverageRef(control: Control, framework: string): string | null {
  return control.mappings.find((m) => m.framework === framework)?.reference ?? null;
}
