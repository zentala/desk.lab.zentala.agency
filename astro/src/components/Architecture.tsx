export default function Architecture() {
  return (
    <section className="container my-5 wrapper">
      <h2>Architecture</h2>
      <div className="content">
        <p className="summary">
          The system should be modular and vendor‑agnostic. Each function is a replaceable building
          block connected through a shared protocol.
        </p>
        <div className="module-grid">
          <div className="module-card">Motor Control</div>
          <div className="module-card">Height Sensing</div>
          <div className="module-card">Presence Sensing</div>
          <div className="module-card">Physical Controls</div>
          <div className="module-card">Decision Engine</div>
          <div className="module-card">Smart‑Home Hub</div>
        </div>
        <div className="protocol">
          <h3>Protocol First</h3>
          <ul>
            <li>Universal communication protocol enables interchangeable modules.</li>
            <li>mDNS / DNS‑SD discovery for plug‑and‑play desks (`desk.local`).</li>
            <li>Standardization makes desks native smart‑home devices.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
