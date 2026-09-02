type Tone = 'success' | 'danger' | 'learn';

type Props = {
  tone: Tone;
  title: string;
  items: string[];
};

const toneStyles: Record<Tone, string> = { success: 'border-status-in-use/40', danger: 'border-red-400/40', learn: 'border-status-planned/40' };

export default function InfoCard({ tone, title, items }: Props) {
  return <div className={'rounded-2xl border bg-report-surface p-6 ' + toneStyles[tone]}><h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-300">{title}</h3><ul className="mt-4 space-y-3 text-sm leading-6 text-muted">{items.map((item) => <li key={item} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />{item}</li>)}</ul></div>;
}
