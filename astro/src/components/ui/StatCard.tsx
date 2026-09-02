type Props = {
  label: string;
  value: string;
};

export default function StatCard({ label, value }: Props) {
  return <div className="rounded-2xl border border-report-divider bg-report-surface p-5"><div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{label}</div><div className="mt-3 text-xl font-semibold text-gray-100">{value}</div></div>;
}
