# Strumien notatek (surowe, uporzadkowane)

## Kontekst
- To jest podsumowanie i wnioski z wersji 0.1 inteligentnego biurka.
- To nie jest opis gotowej wersji 0.2, tylko lekcje, wnioski i kierunek.

## Najwazniejsze wnioski
- Najwiekszym problemem nie jest sterowanie gora-dol, tylko **UX i motywacja** uzytkownika.
- W1 byla przeinwestowana (over-engineering) i bardziej pokazywala umiejetnosci IoT niz realnie rozwiazywala problem nawykow.
- Potrzebny jest **system behawioralny**, a nie tylko hardware.

## Architektura i modularnosc (najwazniejszy zwrot)
- Komponenty musza byc **rozdzielone**:
  - sterowanie silnikiem (gora/dol/stop),
  - pomiar wysokosci biurka,
  - fizyczny kontroler/przyciski na biurku,
  - serwer/mozliwy kontroler decyzyjny (mikroprocesor albo serwer),
  - czujnik obecnosci przy komputerze.
- Rozdzielenie pozwala na wymiennosc modulow i szybkie iteracje.
- Serwer nie musi byc w biurku (Raspberry Pi nie musi byc w srodku); moze byc np. na tym samym komputerze co Home Assistant.
- Biurko powinno byc traktowane jako czesc inteligentnego domu.

## Czujniki i integracje
- Czujnik obecnosci **nie musi** byc w biurku. Moze byc zewnetrzny (np. radarowy czujnik z rynku ~80 USD), montowany na suficie.
- Obecnosc mozna wykrywac tez przez aktywnosc z pulpitu (mysz/klawiatura), bez dodatkowych czujnikow.
- Pomiar wysokosci bywa rozny: czasem z zewnetrznego czujnika, czasem z danych dostarczanych przez producenta.
- Sterowanie gora-dol moze byc zewnetrznymi przekaznikami, ale idealnie przez natywne interfejsy producentow.

## Standardy i protokoly komunikacji
- Kluczowy wniosek: potrzeba **uniwersalnego protokolu komunikacji**.
- Protokol umozliwi integrowanie roznych biurek i roznych modulow.
- Docelowo biurka powinny byc wykrywalne w sieci (np. przez mDNS/DNS-SD, adresy typu `model.desk.local`).
- Dlugoterminowo to moze stac sie standardem dla producentow.

## Wspolpraca z producentami i spolecznosc
- Warto inicjowac rozmowy z producentami i spolecznoscia, aby zbudowac otwarty standard.
- Mozliwy jest „forum standardu” laczace producentow i uzytkownikow.

## UX, motywacja, gamifikacja
- Najtrudniejsze i najwazniejsze: **komunikacja z uzytkownikiem**, aby nie irytowac i nie prowokowac wylaczenia funkcji.
- Interfejs powinien byc przede wszystkim **desktopowy** (tray), a nie fizyczne przyciski.
- Potrzebne badania UX/psychologiczne, aby wypracowac skuteczne bodzce i teksty.
- Gamifikacja: punkty za przerwy, kary za brak przerw, cykle pracy/stania.

## Koncepcje rytmu pracy
- Przyklad zasad:
  - po 45 minutach siedzenia -> 10 minut stania,
  - potem tylko 30 minut siedzenia -> 10 minut stania,
  - potem 15 minut -> przerwa.
- Punkty dodatnie za przerwy i aktywnosc, ujemne za brak przerw.

## Wizja dlugoterminowa
- Kompleksowy system aktywizujacy pracownikow umyslowych:
  - biurko + smart mirror + czujniki 3D (np. depth camera),
  - integracja z zegarkami i smart home,
  - system prowadzacy uzytkownika przez aktywnosc bez irytacji.

## Sprzetowe wnioski
- Raspberry Pi w obudowie sie przegrzewa (lepszy radiator na zewnatrz).
- Przekazniki moga sie sklejac (ryzyko awarii i zle UX).
- PIR czujnik obecnosci zawodzil (falszywe sygnaly, rozlaczenia, slaba kalibracja przy nieruchomosci).
- Kontroler przyciskow i LCD nie powstal (niedowieziony zleceniobiorca, zly nadzor i rozmyty zakres).
- Zla decyzja architektoniczna: dwie plytki (front + PCB) zamiast jednej uniwersalnej.

## W1: ocena i zamkniecie rozdzialu
- W1 nie zmotywowala do wstawania, brak skutecznego systemu motywacji.
- Projekt byl zbyt „hardware centric”, a powinien byc „behavioral centric”.
- W1 jest zamykana jako rozdzial, z potrzeba spisania wnioskow.

## Rynek i inne projekty
- Inne projekty pokazaly, ze czasem wystarczy sam czujnik wysokosci i dobra aplikacja desktopowa.
- To wzmacnia teze, ze UX i protokol sa wazniejsze niz rozbudowany hardware.

## Potencjalny biznes / monetyzacja
- Otwartym standardem mozna zbudowac ekosystem aplikacji i integracji.
- Aplikacja moze dostarczac spersonalizowane rekomendacje (np. zdrowotne) i reklamy dopasowane do danych.
- Potencjalny model: nie sprzedaz hardware, a wartosc w danych + aplikacji.

## W1: porazki (doprecyzowane)
- Obudowa z plexi powodowala przegrzewanie Raspberry Pi; musialem pracowac na rozebranym urzadzeniu (ryzyko porazenia, kurz).
- Brak skutecznego UX i gamifikacji: projekt nie aktywizowal mnie w praktyce.
- Sklejajace sie przekazniki przy zalaczaniu silnikow starego biurka (potrzebne konsultacje elektryczne lub lepsze rozwiazanie).
- PIR czujnik obecnosci nie spelnil roli (falszywe odczyty, trudna kalibracja).
- Niewypalony kontroler biurka (LCD + przyciski 1/2 + gora/dol): zleceniobiorca nie dowiozl, zakres zbyt szeroki, brak nadzoru.
- Zly wybor celu: projekt pod stare biurko i obudowe zamiast uniwersalnego sterownika.
- Zly dobór sprzetu: duze Raspberry Pi w obudowie pod dev (VS Code Remote), a nie pod docelowego uzytkownika.

## W1: co dzialalo
- Sterowanie biurkiem gora-dol z komputera/telefonu.
- Pomiar wysokosci (laserowy czujnik).
- Panel administracyjny z podstawowymi danymi o biurku.
- Sam fakt zbudowania POC i wyciagniecie wnioskow.
- Konstrukcja plexi byla estetyczna i skladna (poza problemem wentylacji).

## Koszty (szacunki)
- W1 ok. 700 PLN / 200 USD (czesci z Chin, obudowa wycinana w PL).
- Bez kosztow V2 (nie podajemy).

## Nazewnictwo
- Robocza nazwa systemu: Smart Desk / iDesk.

