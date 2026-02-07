# Artykul - draft (wersja robocza)

## Tytul roboczy
**"Wersja 0.1 inteligentnego biurka: wnioski, bledy i dlaczego najwazniejszy jest UX"**

## Lead (1-2 akapity)
Zbudowalem wersje 0.1 inteligentnego biurka. Dziala: potrafi podnosic i opuszczac blat, mierzyc wysokosc i reagowac na moje komendy. Ale w praktyce **nie zmienilo moich nawykow**. To nie sterowanie bylo problemem. Problemem byl brak systemu, ktory **motywuje** i nie irytuje. Wersja 0.1 jest dla mnie zakonczonym rozdzialem i case study. Poniżej spisuje najwazniejsze wnioski i kierunek na przyszlosc.

## 1. Co faktycznie zrobila wersja 0.1
- Sterowanie biurkiem gora-dol.
- Pomiar wysokosci.
- Czujniki obecnosci.
- Prototyp w jednej obudowie (Raspberry Pi + sterowanie + czujniki).

## 2. Najwazniejszy wniosek: over-engineering
- Zbudowalem zbyt skomplikowany system, by rozwiazac zbyt prosty problem.
- W1 byla bardziej demonstracja moich umiejetnosci IoT niz realne wsparcie zdrowych nawykow.
- **Prawdziwy problem**: jak zaprojektowac komunikacje, ktora zmienia zachowanie czlowieka.

## 3. Architektura modularna zamiast "jednego pudelka"
Wniosek: system musi byc **modularny**.

Minimalny zestaw niezaleznych funkcji:
- modul sterowania silnikiem (gora/dol/stop),
- modul pomiaru wysokosci,
- modul kontroli fizycznej (przyciski),
- modul decyzyjny/serwer (moze byc zewnatrz),
- modul obecnosci (czy jestem przy komputerze).

Dlaczego to kluczowe:
- latwiejsze testowanie i iteracje,
- wymiennosc komponentow,
- mozliwosc integracji z istniejacym smart home.

## 4. Smart Home jako naturalne srodowisko
Biurko powinno byc **czescia inteligentnego domu**, a nie osobnym ekosystemem.
- Serwer decyzyjny moze dzialac obok Home Assistant.
- Czujnik obecnosci moze byc zewnetrzny (np. radarowy na suficie).
- Dane o obecnosci mozna tez brac z aktywnosci na pulpicie.

## 5. Protokoly komunikacji jako fundament
Zeby to dzialalo w skali, potrzebny jest **otwarty protokol**.
- kompatybilnosc miedzy biurkami i aplikacjami,
- automatyczne wykrywanie w sieci (mDNS/DNS-SD),
- mozliwosc integracji z roznymi producentami.

## 6. UX, motywacja, gamifikacja – prawdziwe wyzwanie
- Najwieksza wartoscia jest interfejs, ktory **nie irytuje**.
- Potrzebne badania UX i psychologiczne.
- System powinien nagradzac przerwy i wspierac rytm pracy (np. 45/10, 30/10 itd.).
- To jest najciezszy, ale kluczowy fragment calego projektu.

## 7. Wizja dlugoterminowa
- Kompleksowy system aktywizacji: biurko + smart mirror + czujniki 3D + wearable.
- Dlugoterminowo chodzi o to, by aktywizowac pracownikow umyslowych bez frustracji.
- Standardy komunikacji pozwola budowac kolejne warstwy aplikacji i uslug.

## 8. Sprzetowe detale z W1
- Raspberry Pi przegrzewa sie w obudowie (potrzeba lepszego chlodzenia).
- Przekazniki potrafia sie sklejac (ryzyko awarii i zlego UX).

## 9. Podsumowanie
Wersja 0.1 to dla mnie zamkniety rozdzial i studium bledow. Najwieksza lekcja: **to nie hardware zmienia zachowania, tylko UX i system motywacyjny**. Kolejny krok to zapisanie wnioskow, stworzenie otwartego protokolu i zaproszenie spolecznosci do dalszej dyskusji.

---

# Plan dalszych materialow

## Pliki do przygotowania
1. Artykul (wersja finalna) na strone.
2. Dokument: "Wnioski z W1" (skrocona lista).
3. Dokument: "Wizja W2" (bardziej strategiczny, z naciskiem na protokol i standard).
4. Dokument: "UX/Behavioral" (lista hipotez i pomyslow do zbadania).

## Co wymaga doprecyzowania
- Jakie byly konkretne wyniki testow (liczby, czas, jak czesto stawales).
- Jakie konkretne czujniki i modele testowales.
- Czy sa zdjecia/prototypy do artykulu.
- Jak chcesz nazwac standard i czy ma byc otwarty od startu.

# Pytania redaktorskie (do Ciebie)
1. Jakie byly najwazniejsze 3-5 porazki W1, z podaniem przykladow?
2. Jakie byly 1-2 rzeczy, ktore mimo wszystko zadzialaly?
3. Czy chcesz, zeby artykul byl bardziej osobisty (story) czy bardziej techniczny (whitepaper)?
4. Czy wprowadzamy nazwy wlasne (np. nazwa protokolu, nazwa systemu)?
5. Czy chcesz podac przyblizony koszt W1 lub jego komponentow?
6. Jakie masz zdjecia, screeny, schematy, ktore mozemy wstawic?

