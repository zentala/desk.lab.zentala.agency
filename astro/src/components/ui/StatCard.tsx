type Props = {
  label: string;
  value: string;
};

export default function StatCard({ label, value }: Props) {
  return (
    <div className="card h-full">
      <div className="text-xs font-semibold uppercase tracking-[0.28em] text-ink/50">{label}</div>
      <div className="mt-3 text-2xl font-semibold text-ink">{value}</div>
    </div>
  );
}
