type Props = {
  title: string;
  kicker?: string;
  lead?: string;
  align?: 'left' | 'center';
};

export default function SectionHeader({ title, kicker, lead, align = 'left' }: Props) {
  return (
    <div className={`mb-8 ${align === 'center' ? 'text-center' : ''}`}>
      {kicker && <div className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-ink/60">{kicker}</div>}
      <h2 className="text-3xl md:text-4xl">{title}</h2>
      {lead && <p className="mt-3 max-w-3xl text-base text-ink/70">{lead}</p>}
    </div>
  );
}
