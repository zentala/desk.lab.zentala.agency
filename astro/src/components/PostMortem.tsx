export default function PostMortem() {
  return (
    <section className="container my-5 wrapper">
      <h2>W1 Post‑Mortem</h2>
      <div className="content">
        <p className="summary">
          Version 0.1 was a proof‑of‑concept. It <strong>worked mechanically</strong> but <strong>failed
          behaviorally</strong>. The project confirmed feasibility of desk digitization, yet it did not
          create a habit change loop. The bottleneck is UX, not hardware.
        </p>
        <div className="row mt-4">
          <div className="col-md-4">
            <div className="infobox success">
              <h3><i className="bi bi-check2-circle"></i> Worked</h3>
              <ul>
                <li>Desk height control via PC/phone commands.</li>
                <li>Reliable height measurement using a laser sensor.</li>
                <li>Admin panel with basic telemetry.</li>
                <li>Legacy desks can be digitized.</li>
              </ul>
            </div>
          </div>
          <div className="col-md-4">
            <div className="infobox danger">
              <h3><i className="bi bi-x-circle"></i> Failed</h3>
              <ul>
                <li>Plexi enclosure overheated the Raspberry Pi (no airflow).</li>
                <li>Relays occasionally stuck under motor load.</li>
                <li>PIR sensor produced false signals and was hard to calibrate.</li>
                <li>Outsourced LCD/button controller never shipped.</li>
                <li>Architecture optimized for my old desk (not universal).</li>
              </ul>
            </div>
          </div>
          <div className="col-md-4">
            <div className="infobox learn">
              <h3><i className="bi bi-lightbulb"></i> Learned</h3>
              <ul>
                <li>Separate modules (motor, sensing, presence, controls, decision engine).</li>
                <li>Move the “brain” to smart‑home/server layer.</li>
                <li>Protocol standardization is the real product.</li>
                <li>UX research beats hardware complexity.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
