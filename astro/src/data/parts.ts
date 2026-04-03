export type Currency = 'USD' | 'PLN';

export type Part = {
  name: string;
  img: string;
  url?: string;
  priceValue?: number;
  currency?: Currency;
};

export const parts: Part[] = [
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
