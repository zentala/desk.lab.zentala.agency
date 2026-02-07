const stats = [
  { label: 'W1 Cost', value: '~700 PLN / 200 USD' },
  { label: 'Core Lesson', value: 'UX > Hardware Complexity' },
  { label: 'Status', value: 'W1 archived, insights published' },
];

export default function Stats() {
  return (
    <section className="container my-4">
      <div className="row stats">
        {stats.map((item) => (
          <div className="col-md-4" key={item.label}>
            <div className="stat-card">
              <div className="stat-label">{item.label}</div>
              <div className="stat-value">{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
