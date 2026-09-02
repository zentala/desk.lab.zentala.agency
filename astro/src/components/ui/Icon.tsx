import { Archive, ArrowUpRight, Boxes, CircleHelp, Factory, FileCheck2, Laptop, Milestone, Ruler, Scale, type LucideIcon } from 'lucide-react';
const icons: Record<string, LucideIcon> = { archive: Archive, app: Laptop, board: Boxes, enclosure: Factory, evidence: Ruler, next: Milestone, open: CircleHelp, external: ArrowUpRight, context: FileCheck2, alternatives: Scale };
export default function Icon({ name, size = 20, label }: { name: string; size?: number; label?: string }) {
  const Component = icons[name] ?? CircleHelp;
  return <Component size={size} aria-hidden={label ? undefined : true} aria-label={label} strokeWidth={1.7} />;
}
