import Section from './ui/Section';
import SectionHeader from './ui/SectionHeader';

export default function Licensing() {
  return (
    <Section>
      <SectionHeader
        title="Licensing"
        kicker="Open HSP"
        lead="Open Smart Desk follows an Open HSP model: hardware, software, and printables are public for remixing."
      />
      <div className="card">
        <p className="text-sm text-ink/70">
          <strong>Open Smart Desk</strong> is an <strong>Open HSP</strong> initiative where everything is open on{' '}
          <a
            href="https://github.com/zentala/open-smart-desk/blob/master/LICENSE.md"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-ink underline decoration-ink/40"
          >
            GPL-3.0 License
          </a>
          .
        </p>
        <ul className="mt-4 space-y-2 text-sm text-ink/70">
          <li><strong>H</strong> (Hardware) stands for projects of electronic boards which you can print yourself.</li>
          <li><strong>S</strong> (Software) stands for ready-to-use firmware you can use on printed hardware.</li>
          <li><strong>P</strong> (Printables) stands for cases and other plastic elements you can print on a 3D printer and use with our hardware.</li>
        </ul>
        <p className="mt-4 text-sm text-ink/70">
          With all elements in place, you can assemble a complete device. You can use it as-is or fork and
          modify it for your needs.
        </p>
      </div>
    </Section>
  );
}
