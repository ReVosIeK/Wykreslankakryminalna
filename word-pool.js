// word-pool.js

const WORD_POOL = {
    kryminalne: [
        "morderstwo", "zbrodnia", "ofiara", "ślad", "krew", "odcisk", "narzędzie", "motyw", "podejrzany", "świadek",
        "alibi", "detektyw", "inspektor", "policja", "patolog", "sekcja", "trup", "ciało", "trucizna", "arszenik",
        "pistolet", "rewolwer", "sztylet", "nóż", "sznur", "ślady", "dowód", "poszlaka", "zeznanie", "kłamstwo",
        "areszt", "więzienie", "kajdanki", "cela", "wyrok", "sędzia", "prokurator", "obrońca", "kartoteka", "akta",
        "tajemnica", "spisek", "zemsta", "zazdrość", "pieniądze", "chciwość", "szantaż", "porwanie", "okup", "złodziej",
        "włamanie", "rabunek", "fałszerstwo", "oszustwo", "gangster", "mafia", "boss", "broń", "amunicja", "nabój",
        "łuska", "strzał", "ofiara", "zabójca", "sprawca", "wspólnik", "kryjówka", "ucieczka", "pogoń", "syrena",
        "radiowóz", "komisariat", "laboratorium", "DNA", "włos", "włókno", "odczynnik", "lupa", "latarka", "fotografia",
        "protokół", "raport", "śledztwo", "dochodzenie", "obserwacja", "nalot", "zatrzymanie", "analiza", "balistyka",
        "kradzież", "napad", "zasadzka", "pościg", "aresztowanie", "dozór", "paragraf", "kodeks", "adwokat", "ławnik",
        "rozprawa", "werdykt", "apelacja", "kasacja", "uniewinnienie", "skazanie", "egzekucja", "szubienica", "gilotyna", "tortura"
    ],
    krotkie_3: [
        "akt", "bat", "bok", "cel", "cud", "cynk", "dar", "dno", "dog", "dół", "dym", "ech", "fakt", "gaz", "gen",
        "gest", "grad", "grot", "hak", "hełm", "igła", "impas", "jazz", "kac", "kajak", "kask", "kąt", "kicz", "kil", "kit",
        "koc", "kod", "kok", "kos", "krab", "kran", "krem", "krok", "kruk", "kryz", "kub", "kult", "kurs", "las", "ląd",
        "lew", "lik", "lis", "lód", "łuk", "mak", "mars", "mecz", "mgła", "miś", "młot", "moc", "mol", "mól", "mur",
        "mysz", "mżawka", "nit", "nokaut", "nurt", "obraz", "okap", "okop", "onuca", "opar", "opas", "opój", "osa", "owoc",
        "oś", "pakt", "pal", "pas", "paw", "pąk", "perz", "pies", "pik", "plan", "plot", "płot", "pnącze", "pot", "pół",
        "prąd", "pszczoła", "puch", "puk", "pył", "rak", "rap", "rat", "róg", "rów", "ruch", "rum", "ruszt", "ryb", "ryk",
        "rys", "rząd", "rzut", "sad", "sąg", "sens", "sęp", "skarb", "skok", "słup", "smok", "snop", "sok", "spór", "srom",
        "ssak", "stal", "staw", "stek", "ster", "stóg", "stój", "sufit", "surdut", "swąd", "syn", "szal", "szczyt", "szew", "szok",
        "szyk", "ślad", "ślepy", "śmiech", "śpiew", "świt", "takt", "tlen", "tłok", "tor", "tort", "traf", "tron", "trop", "trójka",
        "trup", "tryb", "tusz", "typ", "ugór", "ukos", "uprząż", "walc", "wał", "wąs", "wąż", "wiąd", "wiatr", "wiąź", "wiek",
        "wiersz", "wilk", "włos", "wodza", "woń", "wrak", "wtór", "wyciąg", "wydma", "wykrot", "wymarsz", "wypad", "wyraz", "wzór", "zakręt",
        "zalew", "zapis", "zarzut", "zasięg", "zator", "zawór", "ząb", "zbiornik", "zbieg", "zespół", "zgrzyt", "zjazd", "złam", "zrost", "zryw"
    ],
    krotkie_4: [
        "aborcja", "absurd", "adres", "agent", "agrest", "akcent", "akord", "alarm", "album", "alkowa",
        "amok", "amorka", "anioł", "apel", "arbuz", "arena", "argument", "arkusz", "asfalt", "atak",
        "atest", "atom", "awans", "awaria", "bagnet", "bajka", "bakcyl", "balon", "bałwan", "banan",
        "bandaż", "bankiet", "barak", "bariera", "barszcz", "basen", "bawół", "belka", "benzyna", "beton",
        "bezkres", "bilet", "biurko", "blask", "blef", "blizna", "blok", "blues", "błoto", "bocian",
        "bohater", "boks", "bomba", "borg", "bowling", "bractwo", "brama", "brezent", "brodacz", "bruk",
        "bryza", "brzask", "buda", "budynek", "bukiet", "bułka", "bunt", "burza", "butelka", "cebula",
        "cegła", "cement", "cena", "chałwa", "chips", "chirurg", "chlew", "chmura", "chór", "cokół",
        "córka", "cygaro", "cynk", "czajnik", "czapa", "czar", "czasza", "czek", "czerwiec", "czołg",
        "daleka", "danie", "debata", "deser", "deszcz", "detoks", "diament", "dioda", "dno", "docent",
        "dolina", "domiar", "dorobek", "dowcip", "drapak", "drewno", "drina", "drobiazg", "druk", "drut",
        "drzwi", "dusza", "dywan", "dżuma", "elita", "emalia", "emisja", "energia", "epoka", "erozja",
        "eskorta", "etanol", "fajka", "farba", "farsz", "fasola", "ferie", "festiwal", "figiel", "flaga",
        "flet", "flota", "foka", "forma", "fotel", "fragment", "fregata", "front", "fruwacz", "futro"
    ],
    krotkie_5: [
        "akacja", "alkowa", "ananas", "antena", "apteka", "arbuz", "arkada", "armata", "aromat", "asfalt",
        "atleta", "babcia", "bagaż", "balast", "banan", "bandaż", "barak", "barman", "basen", "batalion",
        "benzyna", "bestia", "beton", "bezkres", "biodro", "blankiet", "blask", "blues", "błazen", "błoto",
        "bombka", "boss", "bowling", "bractwo", "brokuł", "brzask", "budowa", "budzik", "bujak", "bunt",
        "cebula", "cegła", "cement", "chaber", "chałwa", "chirurg", "chmiel", "cukier", "cygaro", "czapa",
        "czerń", "czoło", "daleka", "deser", "detoks", "diadem", "dioda", "docent", "dolina", "domiar",
        "dowcip", "dren", "drewno", "drobina", "drut", "dryf", "drzwi", "dusza", "dyktat", "dywan",
        "dział", "dzida", "dżins", "dżuma", "ekran", "eliksir", "emalia", "emisja", "epoka", "erozja",
        "eskorta", "fajka", "farba", "fasola", "ferie", "festiwal", "figiel", "flaga", "flet", "flota",
        "foka", "forma", "fragment", "fregata", "fruwacz", "futro", "galop", "gama", "ganek", "garda"
    ],
    krotkie_6: [
        "abstrakt", "adresat", "agrafka", "akacja", "akwarela", "alarm", "alkohol", "aluminium", "ambaras", "ametyst",
        "amulet", "angina", "antylopa", "aplauz", "apteczka", "arbuz", "areszt", "armata", "arogancki", "artysta",
        "asfalt", "atrament", "automat", "awaria", "babcia", "baczność", "bagietka", "balast", "bandaż", "bankiet",
        "baranek", "barykada", "basen", "bastion", "bateria", "belweder", "benzyna", "bestia", "beton", "bezmiar",
        "bielizna", "biskup", "blaszka", "blef", "blizna", "błazen", "błysk", "bomba", "borsuk", "bowling",
        "bractwo", "brokuł", "brulion", "brzask", "budowla", "budzik", "buława", "bunt", "burmistrz", "butelka",
        "cebula", "cegła", "cement", "chaber", "chirurg", "chłodnia", "choinka", "chomik", "chór", "cokół",
        "cukier", "cygaro", "cyrkiel", "czasza", "czerń", "czoło", "czujka", "daleka", "debata", "deser"
    ],
    krotkie_7: [
        "absolwent", "adwokat", "agresor", "akademia", "akordeon", "alkohol", "aluminium", "ambasada", "amnestia", "amulet",
        "anarchia", "antena", "antylopa", "apetyt", "aptekarz", "arogancja", "artysta", "asfalt", "atrament", "automat",
        "babcia", "baczność", "bagażnik", "balast", "bandyta", "bankiet", "baranek", "barykada", "basen", "batalion",
        "benzyna", "bestia", "beton", "bezmiar", "biblioteka", "bielizna", "biskup", "blaszka", "błazen", "błyskawica",
        "bomba", "borsuk", "bowling", "bractwo", "brokuł", "brulion", "brzask", "budowla", "budzik", "buława",
        "burmistrz", "butelka", "cebula", "cegła", "cement", "chaber", "chirurg", "chłodnia", "choinka", "chomik"
    ],
    krotkie_8: [
        "absolwent", "adwokat", "akademia", "akordeon", "alkohol", "aluminium", "ambasada", "amnestia", "antena", "antylopa",
        "apetyt", "aptekarz", "arogancja", "artysta", "asfalt", "atrament", "automat", "babcia", "baczność", "bagażnik",
        "balast", "bandyta", "bankiet", "baranek", "barykada", "basen", "batalion", "benzyna", "bestia", "beton",
        "bezmiar", "biblioteka", "bielizna", "biskup", "blaszka", "błazen", "błyskawica", "bomba", "borsuk", "bowling",
        "bractwo", "brokuł", "brulion", "brzask", "budowla", "budzik", "buława", "burmistrz", "butelka", "cebula"
    ]
};

// Pojedyncza lista wszystkich słów
const ALL_WORDS = [];
for (let cat in WORD_POOL) {
    WORD_POOL[cat].forEach(w => {
        let clean = w.toLowerCase().trim();
        if (clean.length >= 2 && clean.length <= 15) {
            ALL_WORDS.push(clean);
        }
    });
}

// Indeks słów według długości
const WORDS_BY_LENGTH = {};
for (let i = 2; i <= 15; i++) {
    WORDS_BY_LENGTH[i] = [];
}
for (let w of ALL_WORDS) {
    const len = w.length;
    if (WORDS_BY_LENGTH[len]) {
        WORDS_BY_LENGTH[len].push(w);
    }
}

// Usuń duplikaty
for (let len in WORDS_BY_LENGTH) {
    WORDS_BY_LENGTH[len] = [...new Set(WORDS_BY_LENGTH[len])];
}