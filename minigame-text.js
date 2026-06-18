// minigame-text.js

const MINIGAME_STORIES = [
    {
        intro: "Wszystkie słowa wykreślone! Pozostałe litery układają się w odpowiedzi na trzy pytania: kto zabił, jakiej broni użyto i gdzie doszło do zbrodni.",
        notes: [
            "Przyglądam się czerwonym okręgom... Te litery wskazują sprawcę, narzędzie i miejsce. Muszę je tylko rozdzielić.",
            "Czuję, że odpowiedź jest blisko. Zabójca, broń, miejsce – wszystko zapisane między wierszami.",
            "W notatkach denata zaszyfrowana wiadomość. Pozostałe litery idealnie do niej pasują.",
            "Herbata wystygła, ale trop jest gorący. Litery wskażą winnego, czym uderzył i gdzie to zrobił."
        ]
    },
    {
        intro: "Doskonale! Wszystkie dowody zidentyfikowane. Teraz najtrudniejsze – z pozostałych liter ułóż pełny obraz zbrodni.",
        notes: [
            "Przeglądam akta raz jeszcze... Te litery to nie przypadek. Ktoś celowo je zostawił.",
            "Sierżancie, proszę spojrzeć. Jeśli dobrze odczytam pozostałe znaki, będziemy mieli pełny obraz.",
            "Każda sprawa ma przełomowy moment. Ten jest właśnie teraz."
        ]
    },
    {
        intro: "Kto, czym i gdzie? Trzy pytania, jedna odpowiedź ukryta w pozostałych literach.",
        notes: [
            "Z notatnika detektywa: 'Kluczowe dowody zawsze są na widoku. Trzeba tylko umieć je odczytać.'",
            "Przesłuchania utknęły w martwym punkcie. Tylko te litery mogą wskazać właściwy trop.",
            "Podpisuję protokół... Ale najpierw muszę rozszyfrować te ostatnie znaki."
        ]
    },
    {
        intro: "Układanka prawie gotowa. Brakuje tylko trzech słów: kto, czym, gdzie. Litery czekają na Ciebie.",
        notes: [
            "Zabójca myślał, że jest sprytny. Ale zostawił podpis. Dosłownie.",
            "Ktoś celowo rozrzucił te litery. Jakby chciał, żeby ktoś inny rozwiązał zagadkę.",
            "Zbliża się finał. Czuję to w kościach. Te litery doprowadzą nas do prawdy."
        ]
    },
    {
        intro: "Ostatni etap śledztwa. Z rozrzuconych liter musisz ułożyć trzy słowa kluczowe.",
        notes: [
            "Wszystkie tropy prowadzą donikąd. Tylko te litery zostały. Są jak drogowskaz.",
            "Stary detektyw mawiał: 'Gdy wszystko inne zawiedzie, spójrz na to, co zostało.'",
            "To jak puzzle. Każda litera na swoim miejscu. Czas dokończyć układankę."
        ]
    },
    {
        intro: "Sprawca myślał, że nikt nie rozwiąże tej zagadki. Udowodnij mu, że się mylił.",
        notes: [
            "Z akt sprawy wynika, że ofiara lubiła łamigłówki. Może zostawiła nam wskazówkę?",
            "W laboratorium potwierdzili autentyczność dowodów. Teraz twoja kolej, by złożyć je w całość.",
            "Każdy szczegół ma znaczenie. Zwłaszcza te litery, których nikt nie potrafi wyjaśnić."
        ]
    },
    {
        intro: "Wielka scena finałowa. Podejrzani czekają. Tylko Ty możesz wskazać winnego.",
        notes: [
            "Przypominam sobie słowa świadka: 'To było jak...'. Nie dokończył. Ale ja już wiem.",
            "Zebrani w pokoju przesłuchań patrzą na mnie wyczekująco. Czas ujawnić prawdę.",
            "Mam już wszystkie elementy. Teraz wystarczy je tylko poprawnie ułożyć."
        ]
    },
    {
        intro: "Prawda jest na wyciągnięcie ręki. Trzy słowa dzielą Cię od rozwiązania sprawy.",
        notes: [
            "Detektyw spojrzał na tablicę z dowodami. Wszystko wskazywało na jedno rozwiązanie.",
            "Nawet najmniejszy szczegół może być kluczem. Te litery to nie przypadek.",
            "Ktoś próbował nas zmylić. Ale prawda zawsze wychodzi na jaw. Dosłownie."
        ]
    },
    {
        intro: "Sprawa zbliża się do końca. Czas wskazać mordercę, narzędzie i miejsce zbrodni.",
        notes: [
            "Ostatnia kawa, ostatni rzut oka na akta. Już wiem, kto to zrobił.",
            "Zegar tyka. Sprawca pewnie myśli, że jest bezpieczny. Ale mylisz się.",
            "W sali przesłuchań zapada cisza. Wszyscy czekają na twoje oskarżenie."
        ]
    },
    {
        intro: "Koniec śledztwa. Zostały tylko litery. Ułóż je, a prawda wyjdzie na jaw.",
        notes: [
            "To był długi dzień. Ale na tablicy pozostało tylko kilka znaków. Ostatnia wskazówka.",
            "Przestępca zostawił swój podpis. Dosłownie. Trzeba tylko umieć go odczytać.",
            "Zamykam akta. Ale najpierw muszę wpisać trzy kluczowe słowa. Pomóż mi je znaleźć."
        ]
    }
];

const MINIGAME_HINTS = [
    "Wskazówka: Rozdziel litery na sprawcę, narzędzie i miejsce zbrodni.",
    "Podpowiedź: Który z podejrzanych pasuje do pierwszej grupy liter?",
    "Detektywie, najpierw ustal zabójcę, potem broń, na końcu miejsce.",
    "Czy te litery układają się w znajome słowa? Przypomnij sobie listę podejrzanych.",
    "Zabójca, broń, miejsce – trzy słowa, jedno rozwiązanie. Skup się na pierwszym.",
    "Spójrz na listę podejrzanych z raportu. Pasuje któreś imię do tych liter?",
    "Morderca zawsze zostawia ślad. Tym razem zostawił litery. Wykorzystaj to.",
    "Każdy podejrzany ma motyw. Ale tylko jeden pasuje do układanki.",
    "Nie spiesz się. Sprawdź każdą możliwość. Winny sam się ujawni.",
    "Pamiętaj: narzędzie zbrodni to rzeczownik. Miejsce też. Szukaj sensownych słów."
];

const MINIGAME_SUCCESS_MESSAGES = [
    "✅ Wszystko się zgadza! Morderca zdemaskowany!",
    "✅ Tak! To właśnie ta kombinacja. Sprawa zamknięta!",
    "✅ Brawo, detektywie! Zagadka rozwiązana!",
    "✅ Zgadza się! Wszystkie elementy układanki na swoim miejscu.",
    "✅ Perfekcyjnie! Teraz już wiemy kto, czym i gdzie.",
    "✅ Sprawa rozwiązana! Winny wskazany. Czas na raport końcowy.",
    "✅ To koniec! Prawda wyszła na jaw. Dobra robota.",
    "✅ Zrobiłeś to! Kolejna sprawa trafia do archiwum jako rozwiązana."
];

const MINIGAME_FAIL_MESSAGES = [
    "❌ Nie pasuje. Sprawdź każde pole osobno.",
    "❌ Coś się nie zgadza. Która część jest błędna?",
    "❌ Nie tędy droga. Przeanalizuj litery jeszcze raz.",
    "❌ Zabójca, broń, miejsce – któreś z nich jest niepoprawne.",
    "❌ Blisko, ale to jeszcze nie to. Nie poddawaj się!",
    "❌ Może najpierw ustal zabójcę? Broń i miejsce później.",
    "❌ To nie ta kombinacja. Wróć do listy podejrzanych.",
    "❌ Jeszcze nie. Spróbuj inaczej rozdzielić sylaby."
];

const MINIGAME_INCOMPLETE_MESSAGE = "⛔ Użyj wszystkich liter! Każda zakreślona litera musi trafić na swoje miejsce.";

const MINIGAME_LIVE_VALIDATION = {
    killerCorrect: "Zabójca się zgadza!",
    weaponCorrect: "Broń się zgadza!",
    placeCorrect: "Miejsce się zgadza!",
    killerWrong: "Zabójca nie pasuje...",
    weaponWrong: "Broń nie pasuje...",
    placeWrong: "Miejsce nie pasuje..."
};