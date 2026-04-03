type Tone = 'success' | 'danger' | 'learn';

type Props = {
  tone: Tone;
  title: string;
  items: string[];
};

const toneStyles: Record<Tone, string> = {
  success: 'border-emerald-200 bg-emerald-50/70',
  danger: 'border-rose-200 bg-rose-50/70',
  learn: 'border-sky-200 bg-sky-50/70',
};

export default function InfoCard({ tone, title, items }: Props) {
  return (
    <div className={`card border ${toneStyles[tone]}`}>
      <div className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-ink/60">{title}</div>
      <ul className="space-y-2 text-sm text-ink/80">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-1 h-2 w-2 flex-none rounded-full bg-ink/40" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
