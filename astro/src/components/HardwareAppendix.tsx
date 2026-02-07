export default function HardwareAppendix() {
  return (
    <section className="container py-2 hardware">
      <h2>Hardware Appendix</h2>
      <p>RPi4 + 4‑relay board + PIR + ToF laser sensor + laser‑cut plexi enclosure</p>
      <div className="mb-5">
        <h3>Detailed parts list</h3>
        <div className="card card-body">
          <div className="row">
            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="card mb-4" style={{ width: '100%' }}>
                <img
                  src="https://www.mouser.pl/images/riotboard/lrg/RPI4-MODBP-8GB-BULK_DSL.JPG"
                  className="card-img-top mt-2"
                  alt="Raspbery Pi 4 model B (4GB)"
                />
                <div className="card-body">
                  <h5 className="card-title">Raspbery Pi 4 model B (4GB)</h5>
                  <p className="card-text">This is a bit overkill. I am planning to use RPi0 in next version.</p>
                  <a
                    href="https://www.raspberrypi.org/products/raspberry-pi-4-model-b/?variant=raspberry-pi-4-model-b-4gb"
                    className="btn btn-primary stretched-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Buy <span className="badge text-bg-secondary">US$90</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="card mb-4" style={{ width: '100%' }}>
                <img
                  src="https://cdn3.botland.com.pl/49150-pdt_540/raspberry-pi-zero-w-512mb-ram-wifi-bt-41.jpg"
                  className="card-img-top mt-2"
                  alt="Raspberry Pi Zero W 512MB RAM - WiFi + BT 4.1"
                />
                <div className="card-body">
                  <h5 className="card-title">Raspberry Pi Zero W 512MB RAM - WiFi + BT 4.1</h5>
                  <p className="card-text">Cheaper replacement of RPi4. Still I am missing ETH port.</p>
                  <a
                    href="https://botland.com.pl/moduly-i-zestawy-raspberry-pi-zero/8330-raspberry-pi-zero-w-512mb-ram-wifi-bt-41-5904422311513.html"
                    className="btn btn-primary stretched-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Buy <span className="badge text-bg-secondary">US$21</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="card mb-4" style={{ width: '100%' }}>
                <img
                  src="https://cdn1.botland.com.pl/107181/rpi-relay-board-3-przekazniki-nakladka-dla-raspberry-pi-waveshare-11638.jpg"
                  className="card-img-top"
                  alt="Waveshare RPi Relay Board (11638)"
                />
                <div className="card-body">
                  <h5 className="card-title">Waveshare RPi Relay Board (11638)</h5>
                  <p className="card-text"></p>
                  <a
                    href="https://www.waveshare.com/rpi-relay-board.htm"
                    className="btn btn-primary stretched-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Buy <span className="badge text-bg-secondary">US$16</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="card mb-4" style={{ width: '100%' }}>
                <img
                  src="https://a.allegroimg.com/s720/11a56e/cf29467c47b9bbbc1236ff01ba76/Czujnik-odleglosci-VL53L0X-ToF-dokladny-do-2m"
                  className="card-img-top mt-2"
                  alt="Laser metter VL53L0X"
                />
                <div className="card-body">
                  <h5 className="card-title">Laser metter VL53L0X</h5>
                  <p className="card-text"></p>
                  <a
                    href="https://www.amazon.com/Gowoops-VL53L0X-Breakout-GY-VL53L0XV2-Distance/dp/B07F3RH7TC/"
                    className="btn btn-primary stretched-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Buy <span className="badge text-bg-secondary">US$10</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="card mb-4" style={{ width: '100%' }}>
                <img
                  src="https://cdn3.botland.com.pl/60765-large_default/czujnik-ruchu-pir-hc-sr501-zielony.jpg"
                  className="card-img-top mt-2"
                  alt="Motion sensor PIR HC-SR501"
                />
                <div className="card-body">
                  <h5 className="card-title">Motion sensor PIR HC-SR501</h5>
                  <p className="card-text"></p>
                  <a
                    href="https://components101.com/hc-sr501-pir-sensor"
                    className="btn btn-primary stretched-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Buy <span className="badge text-bg-secondary">US$3</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="card mb-4" style={{ width: '100%' }}>
                <img
                  src="https://cdn-reichelt.de/bilder/web/artikel_ws/D400/EPS-35.jpg"
                  className="card-img-top mt-2"
                  alt="Power supply EPS-35-5 (5V, 6A)"
                />
                <div className="card-body">
                  <h5 className="card-title">Power supply EPS-35-5 (5V, 6A)</h5>
                  <p className="card-text"></p>
                  <a
                    href="https://www.reichelt.com/pl/en/power-supply-5-v-6-a-eps-35-5-p170940.html"
                    className="btn btn-primary stretched-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Buy <span className="badge text-bg-secondary">US$17</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="card mb-4" style={{ width: '100%' }}>
                <img src="images/H221d5e0c0a714b4797efeeab160bc71fy.jpg" className="card-img-top mt-2" alt="Power supply AC-DC 5V, 2A" />
                <div className="card-body">
                  <h5 className="card-title">Power supply AC-DC 5V, 2A </h5>
                  <p className="card-text">Cheaper & smaller replacement of previuous, expensive power supply. Found on AliExpress.</p>
                  <a
                    href="https://pl.aliexpress.com/item/10000159007917.html?spm=a2g0o.order_list.order_list_main.244.21ef1c24OHwaqb&gatewayAdapt=glo2pol"
                    className="btn btn-primary stretched-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Buy <span className="badge text-bg-secondary">US$5</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="card mb-4" style={{ width: '100%' }}>
                <img
                  src="https://ce8dc832c.cloudimg.io/v7/_cdn_/33/9D/50/00/0/383283_1.jpg?width=640&height=480&wat=1&wat_url=_tme-wrk_%2Ftme_new.png&wat_scale=100p&ci_sign=695351e97009a463e94182a54a2d0adc88dcf921"
                  className="card-img-top mt-2"
                  alt="SP2112/S4 female panel socket"
                />
                <div className="card-body">
                  <h5 className="card-title">SP2112/S4 female panel socket</h5>
                  <p className="card-text"></p>
                  <a
                    href="https://www.tme.eu/pl/en/details/sp2112_s4/weipu-connectors/weipu/"
                    className="btn btn-primary stretched-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Buy <span className="badge text-bg-secondary">US$5</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="card mb-4" style={{ width: '100%' }}>
                <img
                  src="https://ce8dc832c.cloudimg.io/v7/_cdn_/2D/AA/50/00/0/371410_1.jpg?width=640&height=480&wat=1&wat_url=_tme-wrk_%2Ftme_new.png&wat_scale=100p&ci_sign=d1c6726914132fd1fb1c161bcc0c8ffeba112f6a"
                  className="card-img-top mt-2"
                  alt="SP2110/P4II male plug"
                />
                <div className="card-body">
                  <h5 className="card-title">SP2110/P4II male plug</h5>
                  <p className="card-text"></p>
                  <a
                    href="https://www.tme.eu/pl/en/details/sp2110_p4/weipu-connectors/weipu/sp2110-p4-ii-1n/"
                    className="btn btn-primary stretched-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Buy <span className="badge text-bg-secondary">US$5</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="card mb-4" style={{ width: '100%' }}>
                <img
                  src="https://b.allegroimg.com/s1440/01c0f6/85b088054fa4a82202db2198a1fb/Nakretka-Nakretki-niska-czarna-oksyda-M3-10szt-Liczba-sztuk-w-opakowaniu-10-szt"
                  className="card-img-top mt-2"
                  alt="4x low nut M3 (black, oxidized, 3mm height)"
                />
                <div className="card-body">
                  <h5 className="card-title">4x low nut M3 (black, oxidized, 3mm height)</h5>
                  <p className="card-text"></p>
                  <a
                    href="https://allegro.pl/oferta/nakretka-nakretki-niska-czarna-oksyda-m3-10szt-6904944393"
                    className="btn btn-primary stretched-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Buy <span className="badge text-bg-secondary">US$1</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="card mb-4" style={{ width: '100%' }}>
                <img
                  src="https://f.allegroimg.com/original/0147d7/a00b1e824bd1ad95a4ab0e45c0ff/Sruba-kulista-czarna-M3x8-gniazdo-imbus-10szt"
                  className="card-img-top mt-2"
                  alt="6x spherical screw M3x8 (black, hex socket)"
                />
                <div className="card-body">
                  <h5 className="card-title">6x spherical screw M3x8 (black, hex socket)</h5>
                  <p className="card-text"></p>
                  <a
                    href="https://allegro.pl/oferta/sruba-kulista-czarna-m3x8-gniazdo-imbus-10szt-5315915867"
                    className="btn btn-primary stretched-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Buy <span className="badge text-bg-secondary">US$1</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="card mb-4" style={{ width: '100%' }}>
                <img
                  src="https://ce8dc832c.cloudimg.io/v7/_cdn_/28/2C/50/00/0/377474_1.jpg?width=640&height=480&wat=1&wat_url=_tme-wrk_%2Ftme_new.png&wat_scale=100p&ci_sign=83445eaa0056afaffd43356c316aeddfd9c0fd9a"
                  className="card-img-top mt-2"
                  alt="C14 male panel socket"
                />
                <div className="card-body">
                  <h5 className="card-title">C14 male panel socket</h5>
                  <p className="card-text"></p>
                  <a
                    href="https://www.tme.eu/pl/details/6100.3200/zlacza-iec-60320/schurter/"
                    className="btn btn-primary stretched-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Buy <span className="badge text-bg-secondary">US$2</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="card mb-4" style={{ width: '100%' }}>
                <img
                  src="https://ce8dc832c.cloudimg.io/v7/_cdn_/69/9C/B0/00/1/772502_1.jpg?width=640&height=480&wat=1&wat_url=_tme-wrk_%2Ftme_new.png&wat_scale=100p&ci_sign=f82814d709a215ee5bb31709f8ae5a769a52d8d2"
                  className="card-img-top mt-2"
                  alt="C13 female cable"
                />
                <div className="card-body">
                  <h5 className="card-title">C13 female cable</h5>
                  <p className="card-text">Regular PC power cable</p>
                  <a
                    href="https://www.tme.eu/pl/details/ak-pc-01a/kable-zasil-komputerowe-i-uniwersalne/akyga/"
                    className="btn btn-primary stretched-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Buy <span className="badge text-bg-secondary">US$3</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="card mb-4" style={{ width: '100%' }}>
                <img src="https://dronavista.pl/21621/karta-pamieci-sandisk-extreme-microsdhc-32gb.jpg" className="card-img-top mt-2" alt="microSD card 32GB" />
                <div className="card-body">
                  <h5 className="card-title">microSD card 32GB</h5>
                  <p className="card-text"></p>
                </div>
              </div>
            </div>
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
