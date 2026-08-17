# Hardware Brief
# ZLECENIE: USB miernik wysokości biurka (VL53L0X + RP2040-Zero)
## Cel
Mam działający prototyp. Chcę go sproduktyzować: czujnik ToF montowany pod blatem mierzy odległość do podłogi, RP2040 wysyła wysokość przez USB (CDC / wirtualny COM) do aplikacji na PC, która przypomina o wstawaniu.
De facto: **miernik odległości na USB, podklejany pod biurko.**
Szukam osoby, która doprowadzi to do powtarzalnego, trwałego zestawu — sam nie mam na to czasu.
---
## Architektura (uprzedzam częste pytania)
- **NIE HAT.** Samodzielne urządzenie podpinane po USB, działa niezależnie od komputera jako źródła logiki.
- Własne, proste **PCB-podstawa** ze ścieżkami — przelutowujemy przez nią gotowy moduł RP2040 i gotowy moduł czujnika. **Nie gołe chipy.**
- PCB ma dać sztywność, estetykę i punkty montażowe — zamiast latających kabelków.
- **Zasilanie wyłącznie z USB**, w zupełności wystarcza.
- Komunikacja czujnik ↔ MCU: I²C.
---
## Komponenty — mam je już na stanie
Oba zamówione, po 5 szt., są do dyspozycji wykonawcy.
### 1. Czujnik: VL53L0X, niebieska płytka (GY-530)
- **Link:** https://pl.aliexpress.com/item/1005009540270888.html
- Wariant: `VL53L0X Blue Board, 5pcs`
- Sprzedawca: [Stlxy Official Store](https://www.aliexpress.com/store/5710023)
- Zasięg do ~2 m (long range mode) — z zapasem wystarcza na 60–125 cm biurka stojącego
- Interfejs I²C, adres domyślny `0x29`, piny: VIN / GND / SCL / SDA / GPIO1 / XSHUT
> **Uwaga:** listing jest wielowariantowy i zbiera w jednym ogłoszeniu kilkanaście różnych czujników ToF (VL6180X, VL53L1X, TOF250 itd.). Projektujemy pod **VL53L0X**, wariant „Blue Board".
### 2. Mikrokontroler: RP2040-Zero
- **Link:** https://pl.aliexpress.com/item/1005005742823430.html
- Wariant: `without header` (bez lutowanych goldpinów)
- Cena: 7,31 zł × 5 szt.
- Dwurdzeniowy Cortex-M0+, 2 MB Flash, USB-C
- Ma **castellated pads** po bokach → można go położyć płasko na PCB-podstawie i przylutować od góry. To preferowany wariant montażu: niski profil, maksymalna wytrzymałość mechaniczna.
### Zdjęcia produktów
<!-- AliExpress blokuje automatyczne pobieranie obrazków. Wklej tutaj URL-e: prawy klik na zdjęciu → "Kopiuj adres obrazu" -->
![VL53L0X GY-530 — niebieska płytka](https://claude.ai/chat/WKLEJ_URL_OBRAZKA_CZUJNIKA)
![RP2040-Zero](https://claude.ai/chat/WKLEJ_URL_OBRAZKA_RP2040)
---
## Wymagania mechaniczne
- **Montaż pod blatem na dwa sposoby:** klejenie (taśma typu 3M VHB) **oraz** przykręcanie — otwory na wkręty w dolnej części PCB / obudowy.
- Ma działać **5 lat** i przeżyć przypadkowe uderzenie kolanem: nic się nie rozłącza, **złącze USB odciążone mechanicznie** (to zwykle pierwszy punkt awarii).
- Czujnik musi mieć czysty, niezasłonięty tor optyczny w dół — otwór w obudowie bez zacieków i podpór po druku.
- Obudowa z druku 3D, pliki **STL + STEP**. Kształt i rozmiar wg Twojej propozycji — zwarta, schludna, drukowalna bez podpór.
---
## Dokładność pomiaru — czego NIE potrzebuję
Nie potrzebuję bezwzględnej dokładności pomiaru wysokości. Aplikacja wykrywa **zmianę stanu** (siedzę / stoję), więc ±3–5% jest w pełni akceptowalne. Nie ma potrzeby rozbudowanej kalibracji.
Znane ograniczenia VL53L0X, które warto uwzględnić w testach:
- ciemna wykładzina / czarny dywan pochłania IR i skraca realny zasięg
- silne światło słoneczne (IR w tle) też skraca zasięg
- long range mode wymaga dłuższego timing budget (np. 200 ms) — to w porządku, pomiar raz na sekundę w zupełności wystarcza
**Plan B:** jeśli testy pokażą niestabilność na ciemnych podłogach, dopuszczam zamianę na **VL53L1X** (~4 m, lepsza odporność na światło zewnętrzne). Warto zamówić jedną sztukę na zapas od razu — kosztuje grosze, a oszczędza tydzień czekania na przesyłkę z Chin.
---
## Zakres prac (odpowiedzialność od A do Z)
1. Zakup uzupełniający i **test komponentów** — weryfikacja, czy moduły z AliExpress faktycznie działają i są powtarzalne.
2. **Schemat + projekt PCB**, zamówienie, odbiór, weryfikacja.
3. **Projekt i wydruk obudowy** (STL + STEP).
4. **Montaż i test serii testowej** — kilka sztuk, rozdam je testerom.
5. **BOM z linkami** + krótka instrukcja „złóż sam".
6. **Publikacja obu projektów** (PCB + obudowa) jako open source.
Sama płytka jest banalnie prosta. Praca polega na **odpowiedzialności i doświadczeniu** — dopilnowaniu tematu od A do Z, tak żeby na końcu było urządzenie, które po prostu działa u obcych ludzi przez lata.
---
## Model produktu / kwestie prawne
- Świadomie robimy **zestaw DIY „złóż to sam"** — dzięki temu nie wchodzimy w certyfikację gotowego urządzenia.
- Projekty **open source**, publikowane **pod Twoim nazwiskiem jako autora**, z **przeniesieniem na mnie praw majątkowych**.
- Cel: ludzie mogą złożyć to sami ze schematu **albo** kupić od nas gotowy komplet części.
---
## Dalsza współpraca
Docelowo chcę móc zamawiać u Ciebie kolejne partie, gdy pojawią się zamówienia:
- montaż zestawów,
- pakowanie,
- ewentualnie wysyłka paczek bezpośrednio do klientów.
Szukam kogoś **na dłużej**, nie na jeden strzał.
---
## Proszę o odpowiedź zawierającą
- [ ] Wycenę etapu 1 (projekt + seria testowa, powiedzmy 5 szt.)
- [ ] Orientacyjną cenę za sztukę przy kolejnych partiach (montaż + pakowanie + wysyłka)
- [ ] Termin realizacji
- [ ] Doświadczenie: w czym projektujesz PCB, czy robiłeś już produkcję małoseryjną, przykłady obudów 3D

