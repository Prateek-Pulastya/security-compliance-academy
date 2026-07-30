/**
 * Interview question bank. Model answers are concise talking points, not
 * exhaustive — the goal is to prompt understanding, not memorization.
 */

export type InterviewCategory = "GRC" | "Cloud" | "AppSec" | "AI Security";

export type InterviewQuestion = {
  id: string;
  category: InterviewCategory;
  question: string;
  answer: string;
};

export const interviewCategories: InterviewCategory[] = ["GRC", "Cloud", "AppSec", "AI Security"];

export const interviewQuestions: InterviewQuestion[] = [
  {
    id: "grc-1",
    category: "GRC",
    question: "What is the difference between a policy, a standard, and a procedure?",
    answer:
      "A policy states intent and high-level rules; a standard specifies mandatory requirements to meet the policy; a procedure gives step-by-step instructions to implement the standard.",
  },
  {
    id: "grc-2",
    category: "GRC",
    question: "Explain the difference between SOC 2 Type I and Type II.",
    answer:
      "Type I assesses control design at a point in time; Type II also tests operating effectiveness over a period (typically 3–12 months).",
  },
  {
    id: "grc-3",
    category: "GRC",
    question: "What is residual risk?",
    answer:
      "The risk that remains after controls (risk treatment) have been applied. It should be formally accepted by an appropriate risk owner.",
  },
  {
    id: "cloud-1",
    category: "Cloud",
    question: "What is the shared responsibility model?",
    answer:
      "The cloud provider secures the infrastructure ('security of the cloud'); the customer secures their data, configuration, and access ('security in the cloud'). The split shifts with the service model (IaaS/PaaS/SaaS).",
  },
  {
    id: "cloud-2",
    category: "Cloud",
    question: "How do you enforce least privilege in AWS IAM?",
    answer:
      "Grant only required actions on specific resource ARNs, use roles over long-lived keys, apply permission boundaries and SCPs, and review access with tools like IAM Access Analyzer.",
  },
  {
    id: "cloud-3",
    category: "Cloud",
    question: "What is the purpose of a VPC security group vs. a network ACL?",
    answer:
      "Security groups are stateful, instance-level allow rules; network ACLs are stateless, subnet-level rules that can allow and deny. They provide layered network controls.",
  },
  {
    id: "appsec-1",
    category: "AppSec",
    question: "What is the difference between authentication and authorization?",
    answer:
      "Authentication verifies who you are; authorization determines what you are allowed to do. A system needs both, in that order.",
  },
  {
    id: "appsec-2",
    category: "AppSec",
    question: "How do you prevent SQL injection?",
    answer:
      "Use parameterized queries / prepared statements, validate and constrain input, apply least-privilege database accounts, and avoid building queries by string concatenation.",
  },
  {
    id: "appsec-3",
    category: "AppSec",
    question: "What is threat modeling and when do you do it?",
    answer:
      "A structured way to find design weaknesses early — model the system, enumerate threats (e.g. STRIDE), and decide mitigations. Do it during design and revisit on significant changes.",
  },
  {
    id: "ai-1",
    category: "AI Security",
    question: "What is prompt injection and why is it hard to fully prevent?",
    answer:
      "Attacker-controlled text that manipulates model behavior. It is hard to fully prevent because the model cannot reliably distinguish trusted instructions from untrusted data; defense is layered (least-privilege tools, output filtering, human-in-the-loop).",
  },
  {
    id: "ai-2",
    category: "AI Security",
    question: "Name two risks from the OWASP LLM Top 10.",
    answer:
      "Examples include prompt injection (LLM01) and sensitive information disclosure — plus insecure output handling, supply-chain, and excessive agency.",
  },
  {
    id: "ai-3",
    category: "AI Security",
    question: "What does NIST AI RMF add beyond traditional security frameworks?",
    answer:
      "It frames AI-specific risk across Govern, Map, Measure, and Manage, addressing trustworthiness concerns such as fairness, transparency, and safety in addition to security.",
  },
];
