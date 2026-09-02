type Props = {
  title: string;
  kicker?: string;
  lead?: string;
  align?: 'left' | 'center';
};

export default function SectionHeader({ title, kicker, lead, align = 'left' }: Props) {
  const alignment = align === 'center' ? 'text-center' : '';
  return <div className={'mb-10 ' + alignment}>
    {kicker && <div className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-green">{kicker}</div>}
    <h2 className="text-3xl text-gray-100 md:text-4xl">{title}</h2>
    {lead && <p className="mt-3 max-w-3xl text-base leading-7 text-muted">{lead}</p>}
  </div>;
}
