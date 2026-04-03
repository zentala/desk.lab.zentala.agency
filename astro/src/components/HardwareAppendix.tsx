import Section from './ui/Section';
import SectionHeader from './ui/SectionHeader';
import FigureSwap from './ui/FigureSwap';
import { parts, type Currency } from '../data/parts';

export default function HardwareAppendix() {
  const totals = parts.reduce(
    (acc, part) => {
      if (!part.priceValue || !part.currency) return acc;
      acc[part.currency] += part.priceValue;
      return acc;
    },
    { USD: 0, PLN: 0 }
  );

  const formatCurrency = (value: number, currency: Currency) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(value);

  return (
    <Section>
      <SectionHeader
        title="Hardware Appendix"
        kicker="Bill of materials"
        lead="RPi4 + 4-relay board + PIR + ToF laser sensor + laser-cut plexi enclosure."
      />

      <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-xl">Detailed parts list</h3>
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-ink/60">
            <span>Total</span>
            <span className="badge">{formatCurrency(totals.USD, 'USD')}</span>
            <span className="badge">{formatCurrency(totals.PLN, 'PLN')}</span>
          </div>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {parts.map((part) => (
            <div
              key={part.name}
              className="flex items-center gap-4 rounded-xl border border-ink/10 bg-fog/40 px-3 py-2"
            >
              <div className="h-12 w-12 flex-none overflow-hidden rounded-lg border border-ink/10 bg-white">
                <img src={part.img} alt={part.name} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="flex-1 text-sm font-medium text-ink">{part.name}</div>
              <div className="flex flex-none items-center gap-2">
                {part.url ? (
                  <a
                    href={part.url}
                    className="inline-flex items-center rounded-full border border-ink/10 bg-white px-3 py-1 text-xs font-semibold text-ink transition hover:-translate-y-0.5"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Buy
                    {part.priceValue && part.currency && (
                      <span className="ml-2 rounded-full bg-ink/90 px-2 py-0.5 text-[10px] font-semibold text-white">
                        {formatCurrency(part.priceValue, part.currency)}
                      </span>
                    )}
                  </a>
                ) : (
                  <span className="text-xs text-ink/50">—</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <ul className="mt-6 list-disc pl-5 text-xs text-ink/60">
          <li>
            plexi laser cutted enclousre:{' '}
            <a href="enclosure/v1/plexi_5mm_40x20cm.dxf" className="underline">
              plexi_5mm_40x20cm.dxf
            </a>{' '}
            &{' '}
            <a href="enclosure/v1/plexi_smoked_graphite_3mm_9x13.5cm.dxf" className="underline">
              plexi_dymiona_grafit_3mm_9x13.5cm.dxf
            </a>
          </li>
        </ul>
      </div>

      <div className="mt-12">
        <h3 className="text-2xl">Control Unit</h3>
        <h4 className="mt-4 text-sm font-semibold uppercase tracking-[0.28em] text-ink/60">v0.1</h4>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <figure className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-soft">
            <img src="images/plexi-cutted.jpg" className="h-full w-full object-cover" alt="Plexi Cutted" />
            <figcaption className="px-4 py-3 text-xs text-ink/60">
              Ordered online, CNC laser cutted plexiglass for the housing.
            </figcaption>
          </figure>
          <FigureSwap
            baseSrc="images/wiring.jpg"
            hoverSrc="images/wiring-explained.jpg"
            alt="Wiring"
            caption="First assembly of Control Unit → hover to see wiring explained."
          />
        </div>
        <p className="mt-4 text-sm text-ink/70">
          I do not recommend this housing design. No air flow provided, so the electronics are overheating.
          It must be redesigned.
        </p>

        <h4 className="mt-8 text-sm font-semibold uppercase tracking-[0.28em] text-ink/60">v0.1.1</h4>
        <p className="mt-2 text-sm text-ink/70">In this version I just replaced power supply with smaller one.</p>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <figure className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-soft">
            <img src="images/20230628_032916.jpg" className="h-full w-full object-cover" alt="Control Unit" />
            <figcaption className="px-4 py-3 text-xs text-ink/60">Control Unit</figcaption>
          </figure>
          <figure className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-soft">
            <img
              src="images/20230628_033107.jpg"
              className="h-full w-full object-cover"
              alt="4-pin plug and socket for motor control"
            />
            <figcaption className="px-4 py-3 text-xs text-ink/60">
              4-pin plug and socket for motor control (+230V UP, +230V DOWN, Neutral, GND)
            </figcaption>
          </figure>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <figure className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-soft">
            <img
              src="images/20230628_033525.jpg"
              className="h-full w-full object-cover"
              alt="Control Unit with PIR sensor (movement detector)"
            />
            <figcaption className="px-4 py-3 text-xs text-ink/60">
              Control Unit with PIR sensor (movement detector)
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-soft">
            <img
              src="images/20230628_033548.jpg"
              className="h-full w-full object-cover"
              alt="Inside of control unit (v2 with smaller power supply)"
            />
            <figcaption className="px-4 py-3 text-xs text-ink/60">
              Inside of control unit (v2 with smaller power supply)
            </figcaption>
          </figure>
        </div>
        <p className="mt-4 text-sm text-ink/70">
          In next version I plan to replace PRi4 with RPi0. I am just not sure if VS Studio SSH Remote will support it.
        </p>

        <h3 className="mt-12 text-2xl">User Panel</h3>
        <p className="mt-3 text-sm text-ink/70">
          I have never finished this component. Elements do not fit the enclosure — not enough space to connect electronic
          components together. PCB and 3D printed enclosure are required remodeling.
        </p>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <figure className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-soft">
            <img src="images/20230628_033806.jpg" className="h-full w-full object-cover" alt="User Panel" />
          </figure>
          <figure className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-soft">
            <img src="images/20230628_043425.jpg" className="h-full w-full object-cover" alt="User Panel" />
          </figure>
        </div>
        <p className="mt-4 text-sm text-ink/70">Nevertheless I have planned to use:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-ink/70">
          <li>ATMega / ATTiny as microcontroller that will send and receive commands from RPi via USB-UART</li>
          <li>shift register to handle 7-segment display, that would show simple messages (eg. <code>err</code>) and current height</li>
          <li>4 buttons: <code>UP</code>, <code>DOWN</code>, <code>MEM 1</code> &amp; <code>MEM 2</code></li>
          <li>buzzer (not on the photo)</li>
        </ul>
      </div>
    </Section>
  );
}
