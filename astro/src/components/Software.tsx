import Section from './ui/Section';
import SectionHeader from './ui/SectionHeader';

export default function Software() {
  return (
    <Section>
      <SectionHeader
        title="Software"
        kicker="Stack"
        lead="I conducted experiments using both Node.js and Python. Python hit serious threading issues, so the Node.js version became the main prototype with a web interface that replicates the physical controller." 
      />
      <div className="grid gap-8 md:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-4 text-sm text-ink/70">
          <p>
            The Node.js branch processes laser meter data and can switch relays. It also exposes a basic
            admin panel for telemetry and manual control.
          </p>
          <p>
            The Python experiment stalled due to concurrency problems in the core loop.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="https://github.com/zentala/open-smart-desk" className="btn-primary">
              Node.js repo
            </a>
            <a href="https://github.com/zentala/open-smart-desk-python-experiment" className="btn-ghost">
              Python experiment
            </a>
          </div>
        </div>
        <figure className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-soft">
          <img src="images/web.png" className="h-full w-full object-cover" alt="Web interface of Open Smart Desk" />
          <figcaption className="px-4 py-3 text-xs text-ink/60">
            Web interface of Open Smart Desk.
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}
