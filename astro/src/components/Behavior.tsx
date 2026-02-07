export default function Behavior() {
  return (
    <section className="container my-5 wrapper">
      <h2>Behavior System</h2>
      <div className="content">
        <p className="summary">
          The real challenge is behavioral UX. People disable annoying nudges. The system must feel
          helpful, not punitive.
        </p>
        <div className="row mt-4">
          <div className="col-md-6">
            <h3>Flow Loop</h3>
            <ol className="flow">
              <li>Detect prolonged sitting time.</li>
              <li>Deliver a gentle, contextual nudge.</li>
              <li>Escalate only if ignored.</li>
              <li>Reward compliance with points or streaks.</li>
              <li>Surface progress and recovery options.</li>
            </ol>
          </div>
          <div className="col-md-6">
            <h3>Design Constraints</h3>
            <ul>
              <li>Non‑intrusive UX over mechanical automation.</li>
              <li>Desktop tray app beats custom hardware buttons.</li>
              <li>Personalization: timing, tone, rewards.</li>
              <li>Short‑term wins before long‑term behavior change.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
