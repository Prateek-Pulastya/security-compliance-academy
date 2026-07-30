import {
  BookMarked,
  BrainCircuit,
  Cloud,
  FlaskConical,
  GitBranch,
  GitCompareArrows,
  LibraryBig,
  ListChecks,
  MessagesSquare,
  Milestone,
  Network,
  Newspaper,
  ShieldAlert,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

const registry: Record<string, LucideIcon> = {
  BookMarked,
  BrainCircuit,
  Cloud,
  FlaskConical,
  GitBranch,
  GitCompareArrows,
  LibraryBig,
  ListChecks,
  MessagesSquare,
  Milestone,
  Network,
  Newspaper,
  ShieldAlert,
  ShieldCheck,
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = registry[name] ?? ShieldCheck;
  return <Cmp className={className} aria-hidden="true" />;
}
