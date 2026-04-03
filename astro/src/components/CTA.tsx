import Section from './ui/Section';

export default function CTA() {
  return (
    <Section>
      <div className="rounded-2xl bg-ink px-6 py-8 text-white shadow-soft md:flex md:items-center md:justify-between md:px-10">
        <div className="max-w-2xl">
          <h3 className="text-2xl font-semibold">Want to build on these findings?</h3>
          <p className="mt-3 text-sm text-white/70">
            Explore the repo, critique the approach, or propose a protocol draft with the community.
          </p>
        </div>
        <div className="mt-6 md:mt-0">
          <a href="https://github.com/zentala/open-smart-desk" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5">
            View GitHub
          </a>
        </div>
      </div>
    </Section>
  );
}
