import React from 'react';

type Currency = 'USD' | 'PLN';

type Part = {
  name: string;
  img: string;
  url?: string;
  priceValue?: number;
  currency?: Currency;
};

export default function HardwareAppendix() {
  const parts: Part[] = [
    {
      name: 'Raspberry Pi 4 model B (4GB)',
      img: 'https://www.mouser.pl/images/riotboard/lrg/RPI4-MODBP-8GB-BULK_DSL.JPG',
      url: 'https://www.raspberrypi.org/products/raspberry-pi-4-model-b/?variant=raspberry-pi-4-model-b-4gb',
      priceValue: 90,
      currency: 'USD',
    },
    {
      name: 'Raspberry Pi Zero W 512MB RAM - WiFi + BT 4.1',
      img: 'https://cdn3.botland.com.pl/49150-pdt_540/raspberry-pi-zero-w-512mb-ram-wifi-bt-41.jpg',
      url: 'https://botland.com.pl/moduly-i-zestawy-raspberry-pi-zero/8330-raspberry-pi-zero-w-512mb-ram-wifi-bt-41-5904422311513.html',
      priceValue: 21,
      currency: 'USD',
    },
    {
      name: 'Waveshare RPi Relay Board (11638)',
      img: 'https://cdn1.botland.com.pl/107181/rpi-relay-board-3-przekazniki-nakladka-dla-raspberry-pi-waveshare-11638.jpg',
      url: 'https://www.waveshare.com/rpi-relay-board.htm',
      priceValue: 16,
      currency: 'USD',
    },
    {
      name: 'Laser meter VL53L0X',
      img: 'https://a.allegroimg.com/s720/11a56e/cf29467c47b9bbbc1236ff01ba76/Czujnik-odleglosci-VL53L0X-ToF-dokladny-do-2m',
      url: 'https://www.amazon.com/Gowoops-VL53L0X-Breakout-GY-VL53L0XV2-Distance/dp/B07F3RH7TC/',
      priceValue: 10,
      currency: 'USD',
    },
    {
      name: 'Motion sensor PIR HC-SR501',
      img: 'https://cdn3.botland.com.pl/60765-large_default/czujnik-ruchu-pir-hc-sr501-zielony.jpg',
      url: 'https://components101.com/hc-sr501-pir-sensor',
      priceValue: 3,
      currency: 'USD',
    },
    {
      name: 'Power supply EPS-35-5 (5V, 6A)',
      img: 'https://cdn-reichelt.de/bilder/web/artikel_ws/D400/EPS-35.jpg',
      url: 'https://www.reichelt.com/pl/en/power-supply-5-v-6-a-eps-35-5-p170940.html',
      priceValue: 17,
      currency: 'USD',
    },
    {
      name: 'Power supply AC-DC 5V, 2A',
      img: 'images/H221d5e0c0a714b4797efeeab160bc71fy.jpg',
      url: 'https://pl.aliexpress.com/item/10000159007917.html?spm=a2g0o.order_list.order_list_main.244.21ef1c24OHwaqb&gatewayAdapt=glo2pol',
      priceValue: 5,
      currency: 'USD',
    },
    {
      name: 'SP2112/S4 female panel socket',
      img: 'https://ce8dc832c.cloudimg.io/v7/_cdn_/33/9D/50/00/0/383283_1.jpg?width=640&height=480&wat=1&wat_url=_tme-wrk_%2Ftme_new.png&wat_scale=100p&ci_sign=695351e97009a463e94182a54a2d0adc88dcf921',
      url: 'https://www.tme.eu/pl/en/details/sp2112_s4/weipu-connectors/weipu/',
      priceValue: 5,
      currency: 'USD',
    },
    {
      name: 'SP2110/P4II male plug',
      img: 'https://ce8dc832c.cloudimg.io/v7/_cdn_/2D/AA/50/00/0/371410_1.jpg?width=640&height=480&wat=1&wat_url=_tme-wrk_%2Ftme_new.png&wat_scale=100p&ci_sign=d1c6726914132fd1fb1c161bcc0c8ffeba112f6a',
      url: 'https://www.tme.eu/pl/en/details/sp2110_p4/weipu-connectors/weipu/sp2110-p4-ii-1n/',
      priceValue: 5,
      currency: 'USD',
    },
    {
      name: '4x low nut M3 (black, oxidized, 3mm height)',
      img: 'https://b.allegroimg.com/s1440/01c0f6/85b088054fa4a82202db2198a1fb/Nakretka-Nakretki-niska-czarna-oksyda-M3-10szt-Liczba-sztuk-w-opakowaniu-10-szt',
      url: 'https://allegro.pl/oferta/nakretka-nakretki-niska-czarna-oksyda-m3-10szt-6904944393',
      priceValue: 1,
      currency: 'USD',
    },
    {
      name: '6x spherical screw M3x8 (black, hex socket)',
      img: 'https://f.allegroimg.com/original/0147d7/a00b1e824bd1ad95a4ab0e45c0ff/Sruba-kulista-czarna-M3x8-gniazdo-imbus-10szt',
      url: 'https://allegro.pl/oferta/sruba-kulista-czarna-m3x8-gniazdo-imbus-10szt-5315915867',
      priceValue: 1,
      currency: 'USD',
    },
    {
      name: 'C14 male panel socket',
      img: 'https://ce8dc832c.cloudimg.io/v7/_cdn_/28/2C/50/00/0/377474_1.jpg?width=640&height=480&wat=1&wat_url=_tme-wrk_%2Ftme_new.png&wat_scale=100p&ci_sign=83445eaa0056afaffd43356c316aeddfd9c0fd9a',
      url: 'https://www.tme.eu/pl/details/6100.3200/zlacza-iec-60320/schurter/',
      priceValue: 2,
      currency: 'USD',
    },
    {
      name: 'C13 female cable',
      img: 'https://ce8dc832c.cloudimg.io/v7/_cdn_/69/9C/B0/00/1/772502_1.jpg?width=640&height=480&wat=1&wat_url=_tme-wrk_%2Ftme_new.png&wat_scale=100p&ci_sign=f82814d709a215ee5bb31709f8ae5a769a52d8d2',
      url: 'https://www.tme.eu/pl/details/ak-pc-01a/kable-zasil-komputerowe-i-uniwersalne/akyga/',
      priceValue: 3,
      currency: 'USD',
    },
    {
      name: 'microSD card 32GB',
      img: 'https://dronavista.pl/21621/karta-pamieci-sandisk-extreme-microsdhc-32gb.jpg',
    },
    {
      name: 'Plexi laser-cut enclosure (set)',
      img: 'images/plexi-cutted.jpg',
      url: 'enclosure/v1/plexi_5mm_40x20cm.dxf',
      priceValue: 35,
      currency: 'PLN',
    },
  ];

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
    <section className="container py-2 hardware">
      <h2>Hardware Appendix</h2>
      <p>RPi4 + 4‑relay board + PIR + ToF laser sensor + laser‑cut plexi enclosure</p>
      <div className="mb-5">
        <div className="parts-header">
          <h3>Detailed parts list</h3>
          <div className="parts-total">
            <span>Total:</span>
            <strong>{formatCurrency(totals.USD, 'USD')}</strong>
            <strong>{formatCurrency(totals.PLN, 'PLN')}</strong>
          </div>
        </div>
        <div className="card card-body">
          <div className="parts-grid">
            {parts.map((part) => (
              <div className="parts-row" key={part.name}>
                <img className="parts-thumb" src={part.img} alt={part.name} loading="lazy" />
                <div className="parts-name">{part.name}</div>
                <div className="parts-buy">
                  {part.url ? (
                    <a href={part.url} className="btn btn-buy btn-sm" target="_blank" rel="noreferrer">
                      Buy{part.priceValue && part.currency && (
                        <span className="badge text-bg-secondary ms-2">
                          {formatCurrency(part.priceValue, part.currency)}
                        </span>
                      )}
                    </a>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <ul style={{ listStyleType: 'square' }}>
            <li>
              plexi laser cutted enclousre: <a href="enclosure/v1/plexi_5mm_40x20cm.dxf">plexi_5mm_40x20cm.dxf</a> &{' '}
              <a href="enclosure/v1/plexi_smoked_graphite_3mm_9x13.5cm.dxf">plexi_dymiona_grafit_3mm_9x13.5cm.dxf</a>
            </li>
          </ul>
        </div>
      </div>

      <h3>Control Unit</h3>
      <h4>v0.1</h4>
      <div className="row">
        <div className="col">
          <figure className="figure">
            <img src="images/plexi-cutted.jpg" className="figure-img img-fluid rounded" alt="Plexi Cutted" />
            <figcaption className="figure-caption">Ordered online, CNC laser cutted plexiglass for the housing.</figcaption>
          </figure>
        </div>
        <div className="col">
          <figure className="figure">
            <img src="images/wiring.jpg" className="figure-img img-fluid rounded" alt="Wiring" />
            <figcaption className="figure-caption">First assembly of Control Unit...</figcaption>
          </figure>
        </div>
        <div className="col">
          <figure className="figure">
            <img src="images/wiring-explained.jpg" className="figure-img img-fluid rounded" alt="Wiring Explained" />
            <figcaption className="figure-caption">..described what's inside.</figcaption>
          </figure>
        </div>
      </div>
      <p>I don't recommend this housing design. No air flow provided, so electronics is overheating. Must be redesigned.</p>
      <h4>v0.1.1</h4>
      <p>In this version I just replaced power supply with smaller one.</p>
      <div className="row">
        <div className="col">
          <figure className="figure">
            <img src="images/20230628_032916.jpg" className="figure-img img-fluid rounded" alt="Control Unit" />
            <figcaption className="figure-caption">Control Unit</figcaption>
          </figure>
        </div>
        <div className="col">
          <figure className="figure">
            <img
              src="images/20230628_033107.jpg"
              className="figure-img img-fluid rounded"
              alt="4-pin plug and socket for motor control"
            />
            <figcaption className="figure-caption">4-pin plug and socket for motor control (+230V UP, +230V DOWN, Neutral, GND)</figcaption>
          </figure>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <figure className="figure">
            <img
              src="images/20230628_033525.jpg"
              className="figure-img img-fluid rounded"
              alt="Control Unit with PIR sensor (movement detector)"
            />
            <figcaption className="figure-caption">Control Unit with PIR sensor (movement detector)</figcaption>
          </figure>
        </div>
        <div className="col">
          <figure className="figure">
            <img
              src="images/20230628_033548.jpg"
              className="figure-img img-fluid rounded"
              alt="Inside of control unit (v2 with smaller power supply)"
            />
            <figcaption className="figure-caption">Inside of control unit (v2 with smaller power supply)</figcaption>
          </figure>
        </div>
      </div>
      <p>In next version I plan to replace PRi4 with RPi0. I am just not sure if VS Studio SSH Remote will support it.</p>

      <h3>User Panel</h3>
      <p>
        I have never finished this component. Elements doesn't fit enclosure - not enough space to connect electronic
        components together. PCB and 3D printed enclosure are required remodeling.
      </p>
      <div className="row">
        <div className="col">
          <figure className="figure">
            <img src="images/20230628_033806.jpg" className="figure-img img-fluid rounded" alt="User Panel" />
          </figure>
        </div>
        <div className="col">
          <figure className="figure">
            <img src="images/20230628_043425.jpg" className="figure-img img-fluid rounded" alt="User Panel" />
          </figure>
        </div>
      </div>
      <p>Netherless I have planned to use:</p>
      <ul>
        <li>ATMega / ATTiny as microcontroller that will send and receive commands from RPi via USB-UART</li>
        <li>shift register to handle 7-segment display, that would show some simple messages (eg. <code>err</code>) and current height</li>
        <li>4 buttons: <code>UP</code>, <code>DOWN</code>, <code>MEM 1</code> &amp; <code>MEM 2</code></li>
        <li>buzzer (not on the photo)</li>
      </ul>
    </section>
  );
}
