// BAZA DANYCH
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
        "protokół", "raport", "śledztwo", "dochodzenie", "obserwacja", "nalot", "zatrzymanie", "analiza", "balistyka"
    ],
    ogolne_A_D: [
        "samochód", "motocykl", "rower", "pociąg", "samolot", "statek", "dworzec", "lotnisko", "ulica", "aleja",
        "droga", "ścieżka", "most", "wiadukt", "tunel", "rondo", "skrzyżowanie", "dom", "mieszkanie", "blok",
        "wieżowiec", "willa", "pałac", "zamek", "chatka", "piwnica", "strych", "garaż", "ogród", "park",
        "las", "drzewo", "krzak", "kwiat", "trawa", "ziemia", "kamień", "piasek", "rzeka", "jezioro",
        "morze", "ocean", "potok", "staw", "bagno", "góra", "dolina", "skała", "jaskinia", "wulkan",
        "niebo", "słońce", "księżyc", "gwiazda", "chmura", "deszcz", "śnieg", "grad", "burza", "piorun",
        "wiatr", "mgła", "mróz", "upał", "ciepło", "zimno", "woda", "ogień", "powietrze", "ziemia",
        "chleb", "bułka", "masło", "ser", "mleko", "jajko", "mięso", "ryba", "szynka", "kiełbasa",
        "warzywo", "owoc", "jabłko", "gruszka", "śliwka", "banan", "cytryna", "pomidor", "ogórek", "marchew",
        "ziemniak", "cebula", "czosnek", "ryż", "kasza", "mąka", "cukier", "sól", "pieprz", "oliwa"
    ],
    ogolne_E_H: [
        "obiad", "kolacja", "śniadanie", "przepisy", "kuchnia", "kucharz", "kelner", "restauracja", "kawiarnia", "bar",
        "stół", "krzesło", "talerz", "kubek", "szklanka", "widelec", "łyżka", "nóż", "patelnia", "garnek",
        "piekarnik", "lodówka", "zmywarka", "pralka", "telewizor", "komputer", "telefon", "tablet", "zegarek", "budzik",
        "lampa", "światło", "żarówka", "świeca", "zapałki", "zapalniczka", "ogrzewanie", "kaloryfer", "okno",
        "drzwi", "klucz", "zamek", "klamka", "ściana", "podłoga", "sufit", "dach", "komin", "schody",
        "winda", "balkon", "taras", "płot", "brama", "skrzynka", "list", "koperta", "znaczek", "paczka",
        "kurier", "listonosz", "poczta", "bank", "pieniądze", "moneta", "banknot", "karta", "portfel", "torba",
        "plecak", "walizka", "worek", "koszyk", "pudełko", "karton", "butelka", "słoik", "puszka", "kartka",
        "papier", "książka", "zeszyt", "długopis", "ołówek", "gumka", "linijka", "piórnik", "teczka", "segregator"
    ],
    ogolne_I_M: [
        "gazeta", "magazyn", "plakat", "obraz", "ramka", "lustro", "zegar", "dywan", "chodnik", "zasłona",
        "firanka", "rolety", "poduszka", "koc", "kołdra", "materac", "łóżko", "kanapa", "fotel",
        "pufa", "szafa", "komoda", "regał", "półka", "biurko", "ławka", "wieszak", "szafka", "szuflada",
        "ubranie", "odzież", "spodnie", "spódnica", "sukienka", "koszula", "bluza", "sweter", "kurtka", "płaszcz",
        "buty", "kapcie", "sandały", "kozaki", "skarpety", "majtki", "piżama", "szlafrok", "czapka",
        "szalik", "rękawiczki", "pasek", "krawat", "muszka", "szelki", "okulary", "parasol", "torba", "portfel",
        "biżuteria", "pierścionek", "łańcuszek", "bransoletka", "kolczyki", "zegarek", "broszka", "korona", "złoto", "srebro",
        "diament", "szmaragd", "rubin", "bursztyn", "perła", "metal", "żelazo", "stal", "miedź", "mosiądz",
        "drewno", "plastik", "szkło", "ceramika", "guma", "skóra", "bawełna", "wełna", "jedwab", "len"
    ],
    ogolne_N_R: [
        "człowiek", "ludzie", "kobieta", "mężczyzna", "dziecko", "niemowlę", "dziewczynka", "chłopiec", "ojciec", "matka",
        "syn", "córka", "brat", "siostra", "dziadek", "babcia", "wnuk", "wnuczka", "stryjek", "ciotka",
        "kuzyn", "małżonek", "żona", "mąż", "przyjaciel", "kolega", "sąsiad", "znajomy", "gość", "obcy",
        "lekarz", "doktor", "pielęgniarka", "aptekarz", "dentysta", "chirurg", "pacjent", "szpital", "przychodnia", "apteka",
        "lekarstwo", "tabletka", "syrop", "maść", "bandaż", "plaster", "zastrzyk", "zdrowie", "choroba", "grypa",
        "kaszel", "katar", "gorączka", "ból", "zawroty", "osłabienie", "zmęczenie", "sen", "odpoczynek",
        "praca", "zawód", "szef", "pracownik", "biuro", "firma", "fabryka", "sklep", "sprzedawca", "klient",
        "towar", "cena", "paragon", "rachunek", "kasa", "zakupy", "rynek", "bazar", "galeria", "supermarket",
        "szkoła", "klasa", "uczeń", "nauczyciel", "dyrektor", "lekcja", "przerwa", "tablica", "kreda", "ławka",
        "studia", "student", "profesor", "wykład", "egzamin", "indeks", "nauka", "wiedza", "mądrość", "rozum"
    ],
    ogolne_S_Z: [
        "pies", "kot", "mysz", "szczur", "chomik", "królik", "ptak", "papuga", "kanarek",
        "rybka", "żółw", "jaszczurka", "wąż", "pająk", "mucha", "komar", "pszczoła", "osa", "motyl",
        "mrówka", "biedronka", "ślimak", "ryba", "rekin", "wieloryb", "delfin", "orzeł",
        "koń", "krowa", "świnia", "owca", "koza", "kura", "kogut", "kaczka", "gęś", "indyk",
        "lew", "tygrys", "pantera", "gepard", "niedźwiedź", "wilk", "lis", "jeleń", "sarna", "dzik",
        "zając", "wiewiórka", "jeż", "borsuk", "wydra", "bóbr", "bizon", "żubr", "słoń", "żyrafa",
        "zebra", "hipopotam", "nosorożec", "małpa", "goryl", "szympans", "kangur", "koala", "wielbłąd", "krokodyl",
        "kolor", "biały", "czarny", "czerwony", "niebieski", "zielony", "żółty", "brązowy", "szary", "fioletowy",
        "różowy", "pomarańczowy", "granatowy", "turkusowy", "beżowy", "srebrny", "złoty", "jasny", "ciemny",
        "ostry", "słodki", "gorzki", "słony", "kwaśny", "pyszny", "świeży", "stary", "nowy"
    ],
    dodatkowe_1: [
        "muzyka", "piosenka", "melodia", "koncert", "zespół", "wokalista", "gitara", "pianino", "perkusja", "skrzypce",
        "radio", "głośnik", "słuchawki", "dźwięk", "hałas", "cisza", "głos", "szept", "krzyk", "śpiew",
        "film", "kino", "teatr", "spektakl", "aktor", "aktorka", "reżyser", "scenariusz", "scena", "widz",
        "bilet", "popcorn", "ekran", "kamera", "zdjęcie", "aparat", "galeria", "wystawa", "muzeum", "zabytek",
        "sport", "mecz", "gra", "zabawa", "trening", "trener", "zawodnik", "drużyna", "kibic", "stadion",
        "boisko", "basen", "kort", "piłka", "bramka", "kosz", "siatka", "rakieta", "rower", "bieg",
        "skok", "pływanie", "jazda", "taniec", "szachy", "karty", "kości", "puzzle", "zabawka", "lalka",
        "miś", "klocks", "samochodzik", "rowerek", "hulajnoga", "rolki", "łyżwy", "narty", "sanki", "górka",
        "wakacje", "urlop", "wycieczka", "podróż", "hotel", "pensjonat", "kemping", "namiot", "plaża",
        "góry", "spacer", "relaks", "czas", "godzina", "minuta", "sekunda", "dzień", "noc", "rano", "wieczór",
        "południe", "północ", "tydzień", "miesiąc", "rok", "wiek", "wiosna", "lato", "jesień", "zima",
        "styczzeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik",
        "listopad", "grudzień", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota", "niedziela",
        "święto", "urodziny", "imieniny", "prezent", "życzenia", "goście", "zabawa"
    ]
};

const ALL_WORDS = [];
for (let cat in WORD_POOL) {
    WORD_POOL[cat].forEach(w => {
        let clean = w.toLowerCase().trim();
        if (clean.length >= 3 && clean.length <= 9) {
            ALL_WORDS.push(clean);
        }
    });
}

const PLOT_COMPONENTS = {
    killers: ["ogrodnik", "lokaj", "hrabia", "kucharz", "sąsiad", "lekarz", "wdowa", "kuzyn", "dyrektor", "prawnik"],
    weapons: ["nóż", "sznur", "trucizna", "pistolet", "laska", "toporek", "kamień", "klucz", "sztylet", "poduszka"],
    places: ["salon", "ogród", "strych", "piwnica", "garaż", "biuro", "kuchnia", "taras", "biblioteka", "basen"],
    victims: [
        "Lord Ashton (milioner)", "Profesor Wilczur (naukowiec)", "Hrabina Maria (dziedziczka)", 
        "Jan Kowalski (biznesmen)", "Elena Rostova (aktorka)", "Marek Arena (hazardzista)"
    ],
    stories: [
        "Ciało odnaleziono o poranku. Brak śladów włamania sugeruje, że sprawcą był ktoś z bliskiego otoczenia. Podejrzani plączą się w zeznaniach.",
        "W rezydencji podczas burzy zgasło światło. Gdy zasilanie wróciło, ofiara już nie żyła. Ktoś z obecnych zrealizował plan doskonały.",
        "List z szantażem znaleziony w biurku ofiary rzuca nowe światło na sprawę. Każdy z podejrzanych miał motyw finansowy, by uciszyć ofiarę.",
        "Analiza toksykologiczna oraz nagłe zniknięcie cennych dokumentów wskazują, że zbrodnia została drobiazgowo zaplanowana na kilka dni przed."
    ],
    abandonComments: [
        "Chcesz odłożyć odznakę na biurko? Morderca ucieknie, jeśli teraz odpuścisz.",
        "Kawa w kubku już dawno wystygła, ale akta same się nie zamkną. Jesteś pewien?",
        "Zostawiasz te dowody? Prokurator nie będzie zadowolony z niewyjaśnionej sprawy.",
        "Jeśli teraz wyjdziesz, ten przestępca uderzy ponownie. Kontynuujesz odwrót?",
        "Ślady bledną z każdą minutą. Na pewno chcesz schować tę sprawę do szuflady?"
    ]
};

let gameState = {
    caseNumber: "",
    killer: "",
    weapon: "",
    place: "",
    victim: "",
    storyText: "",
    suspects: [],
    gridSize: 10,
    wordsToFind: [],
    foundWords: [],
    grid: [],
    solutionString: "",
    selectedCells: [],
    isSelecting: false,
    startCell: null,
    usedCellsInFoundWords: new Set(),
    svgLinesData: []
};

document.addEventListener("DOMContentLoaded", () => {
    initEventListeners();
    checkSavedGame();
    window.addEventListener("resize", redrawAllMarkers);
});

function initEventListeners() {
    const startBtn = document.getElementById("start-btn");
    const resumeBtn = document.getElementById("resume-btn");
    const toGameBtn = document.getElementById("to-game-btn");
    const abandonBtn = document.getElementById("abandon-btn");
    const restartBtn = document.getElementById("restart-btn");
    const finishCaseBtn = document.getElementById("finish-case-btn");

    startBtn.addEventListener("click", handleStartBtnAction);
    startBtn.addEventListener("touchstart", (e) => {
        e.preventDefault();
        handleStartBtnAction();
    }, { passive: false });

    resumeBtn.addEventListener("click", resumeSavedGame);
    resumeBtn.addEventListener("touchstart", (e) => {
        e.preventDefault();
        resumeSavedGame();
    }, { passive: false });

    toGameBtn.addEventListener("click", () => {
        switchScreen("game-screen");
        setTimeout(redrawAllMarkers, 50);
    });

    abandonBtn.addEventListener("click", handleAbandonCase);
    restartBtn.addEventListener("click", () => switchScreen("start-screen"));
    finishCaseBtn.addEventListener("click", () => {
        clearSave();
        switchScreen("start-screen");
    });

    const gridEl = document.getElementById("word-search-grid");
    gridEl.addEventListener("mousedown", handleStart);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleEnd);

    gridEl.addEventListener("touchstart", handleStart, { passive: false });
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("touchend", handleEnd);
}

function handleStartBtnAction() {
    generateNewCase(false);
}

function switchScreen(screenId) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(screenId).classList.add("active");
    if (screenId === "start-screen") {
        checkSavedGame();
    }
}

function checkSavedGame() {
    const saved = localStorage.getItem("detektyw_save");
    const resumeBtn = document.getElementById("resume-btn");
    if (saved && saved !== "null") {
        resumeBtn.style.display = "block";
    } else {
        resumeBtn.style.display = "none";
    }
}

function saveGame() {
    try {
        const dataToSave = {
            caseNumber: gameState.caseNumber,
            killer: gameState.killer,
            weapon: gameState.weapon,
            place: gameState.place,
            victim: gameState.victim,
            storyText: gameState.storyText,
            suspects: gameState.suspects,
            wordsToFind: gameState.wordsToFind,
            foundWords: gameState.foundWords,
            grid: gameState.grid,
            solutionString: gameState.solutionString,
            usedCellsInFoundWords: Array.from(gameState.usedCellsInFoundWords),
            svgLinesData: gameState.svgLinesData
        };
        localStorage.setItem("detektyw_save", JSON.stringify(dataToSave));
    } catch (e) {
        console.error("Nie udało się zapisać gry:", e);
    }
}

function clearSave() {
    localStorage.removeItem("detektyw_save");
}

function handleAbandonCase() {
    const randomComment = getRandomElement(PLOT_COMPONENTS.abandonComments);
    if (confirm(randomComment + "\n\nCzy na pewno chcesz PORZUCIĆ SPRAWĘ i usunąć postęp?")) {
        clearSave();
        switchScreen("start-screen");
    }
}

function generateNewCase(isResuming = false) {
    document.getElementById("finish-case-btn").style.display = "none";
    const markersLayer = document.getElementById("markers-layer");
    if(markersLayer) markersLayer.innerHTML = "";
    
    if (!isResuming) {
        const k = getRandomElement(PLOT_COMPONENTS.killers);
        const w = getRandomElement(PLOT_COMPONENTS.weapons);
        const p = getRandomElement(PLOT_COMPONENTS.places);
        
        gameState.killer = k;
        gameState.weapon = w;
        gameState.place = p;
        gameState.victim = getRandomElement(PLOT_COMPONENTS.victims);
        gameState.storyText = getRandomElement(PLOT_COMPONENTS.stories);
        gameState.caseNumber = Math.floor(Math.random() * 90000 + 10000);
        gameState.solutionString = (k + w + p).toLowerCase();

        let potentialSuspects = PLOT_COMPONENTS.killers.filter(x => x !== k);
        shuffleArray(potentialSuspects);
        gameState.suspects = [k, potentialSuspects[0], potentialSuspects[1]];
        shuffleArray(gameState.suspects);

        gameState.wordsToFind = [];
        gameState.foundWords = [];
        gameState.usedCellsInFoundWords.clear();
        gameState.svgLinesData = [];

        buildWordSearchGrid();
    }

    document.getElementById("case-number").innerText = gameState.caseNumber;
    document.getElementById("case-victim").innerText = gameState.victim;
    document.getElementById("story-text").innerText = gameState.storyText;
    document.getElementById("game-case-title").innerText = "#" + gameState.caseNumber;

    const suspList = document.getElementById("suspects-list");
    suspList.innerHTML = "";
    gameState.suspects.forEach(s => {
        let li = document.createElement("li");
        li.innerText = s.charAt(0).toUpperCase() + s.slice(1);
        suspList.appendChild(li);
    });

    document.getElementById("words-count").innerText = gameState.wordsToFind.length;
    
    if (isResuming) {
        renderGridHTML(gameState.grid);
        renderWordListHTML();
        gameState.foundWords.forEach(w => {
            let tag = document.getElementById("tag-" + w);
            if (tag) tag.classList.add("found");
        });
        setTimeout(redrawAllMarkers, 50);
        
        if (gameState.foundWords.length === gameState.wordsToFind.length) {
            highlightSolutionCrime();
        }
        switchScreen("game-screen");
    } else {
        saveGame();
        switchScreen("story-screen");
    }
}

function resumeSavedGame() {
    const saved = localStorage.getItem("detektyw_save");
    if (!saved || saved === "null") return;
    
    try {
        const data = JSON.parse(saved);
        if(!data) return;
        gameState.caseNumber = data.caseNumber;
        gameState.killer = data.killer;
        gameState.weapon = data.weapon;
        gameState.place = data.place;
        gameState.victim = data.victim;
        gameState.storyText = data.storyText;
        gameState.suspects = data.suspects;
        gameState.wordsToFind = data.wordsToFind;
        gameState.foundWords = data.foundWords;
        gameState.grid = data.grid;
        gameState.solutionString = data.solutionString;
        gameState.usedCellsInFoundWords = new Set(data.usedCellsInFoundWords);
        gameState.svgLinesData = data.svgLinesData || [];

        generateNewCase(true);
    } catch(e) {
        console.error("Błąd odczytu zapisu, resetowanie...", e);
        clearSave();
    }
}

function buildWordSearchGrid() {
    const size = gameState.gridSize;
    let grid = Array(size).fill(null).map(() => Array(size).fill(''));
    
    let solCoordsPool = [];
    for(let r=0; r<size; r++) {
        for(let c=0; c<size; c++) {
            solCoordsPool.push({r: r, c: c});
        }
    }
    shuffleArray(solCoordsPool);
    
    let solLen = Math.min(gameState.solutionString.length, size * size);
    for(let i=0; i < solLen; i++) {
        let coord = solCoordsPool[i];
        grid[coord.r][coord.c] = gameState.solutionString[i];
    }

    const directions = [
        {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 1, y: -1},
        {x: -1, y: 0}, {x: 0, y: -1}, {x: -1, y: -1}, {x: -1, y: 1}
    ];

    let poolCopy = [...ALL_WORDS];
    shuffleArray(poolCopy);

    let uniqueWordsSet = new Set();

    for (let word of poolCopy) {
        if (word === gameState.killer || word === gameState.weapon || word === gameState.place) continue;
        if (word.length > size) continue;
        if (uniqueWordsSet.has(word)) continue;

        let placed = false;
        for (let attempt = 0; attempt < 35; attempt++) {
            let dir = getRandomElement(directions);
            let startX = Math.floor(Math.random() * size);
            let startY = Math.floor(Math.random() * size);

            if (canPlaceWordDense(grid, word, startX, startY, dir, size)) {
                placeWordDense(grid, word, startX, startY, dir);
                uniqueWordsSet.add(word);
                placed = true;
                break;
            }
        }
        if (uniqueWordsSet.size >= 16) break;
    }

    gameState.wordsToFind = Array.from(uniqueWordsSet);

    let shortWords = ALL_WORDS.filter(w => w.length === 3);
    for(let r=0; r<size; r++) {
        for(let c=0; c<size; c++) {
            if (grid[r][c] === '') {
                let fillerPlaced = false;
                shuffleArray(shortWords);
                for(let sw of shortWords) {
                    if (uniqueWordsSet.has(sw)) continue;
                    for(let dir of directions) {
                        if(canPlaceWordDense(grid, sw, c, r, dir, size)) {
                            placeWordDense(grid, sw, c, r, dir);
                            gameState.wordsToFind.push(sw);
                            uniqueWordsSet.add(sw);
                            fillerPlaced = true;
                            break;
                        }
                    }
                    if(fillerPlaced) break;
                }
                if (grid[r][c] === '') {
                    const abc = "aąbcćdeęfghijklłmnńoóprsśtuwyzźż";
                    grid[r][c] = abc.charAt(Math.floor(Math.random() * abc.length));
                }
            }
        }
    }

    gameState.grid = grid;
    renderGridHTML(grid);
    renderWordListHTML();
}

function canPlaceWordDense(grid, word, sx, sy, dir, size) {
    if (sx + dir.x * (word.length - 1) >= size || sx + dir.x * (word.length - 1) < 0) return false;
    if (sy + dir.y * (word.length - 1) >= size || sy + dir.y * (word.length - 1) < 0) return false;
    
    for (let i = 0; i < word.length; i++) {
        let nx = sx + dir.x * i;
        let ny = sy + dir.y * i;
        if (grid[ny][nx] !== '' && grid[ny][nx] !== word[i]) {
            return false;
        }
    }
    return true;
}

function placeWordDense(grid, word, sx, sy, dir) {
    for (let i = 0; i < word.length; i++) {
        let nx = sx + dir.x * i;
        let ny = sy + dir.y * i;
        grid[ny][nx] = word[i];
    }
}

function renderGridHTML(grid) {
    const container = document.getElementById("word-search-grid");
    container.innerHTML = "";
    container.style.gridTemplateColumns = `repeat(${gameState.gridSize}, 1fr)`;
    
    for(let r=0; r<gameState.gridSize; r++) {
        for(let c=0; c<gameState.gridSize; c++) {
            let cell = document.createElement("div");
            cell.classList.add("grid-cell");
            cell.innerText = grid[r][c];
            cell.dataset.row = r;
            cell.dataset.col = c;
            container.appendChild(cell);
        }
    }
}

function renderWordListHTML() {
    const tagsContainer = document.getElementById("words-to-find");
    if(!tagsContainer) return;
    tagsContainer.innerHTML = "";
    let sortedWords = [...gameState.wordsToFind].sort((a,b) => a.localeCompare(b));
    sortedWords.forEach(w => {
        let tag = document.createElement("div");
        tag.classList.add("word-tag");
        tag.id = "tag-" + w;
        tag.innerText = w;
        tagsContainer.appendChild(tag);
    });
}

function getCellFromEvent(e) {
    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else if (e.clientX !== undefined && e.clientY !== undefined) {
        clientX = e.clientX;
        clientY = e.clientY;
    } else {
        return null;
    }
    
    let el = document.elementFromPoint(clientX, clientY);
    if (el && el.classList.contains("grid-cell")) {
        return el;
    }
    return null;
}

function handleStart(e) {
    let cell = getCellFromEvent(e);
    if (!cell) return;
    if (e.cancelable) e.preventDefault();
    
    gameState.isSelecting = true;
    gameState.startCell = cell;
    gameState.selectedCells = [cell];
    
    cell.classList.add("highlighted");
}

function handleMove(e) {
    if (!gameState.isSelecting) return;
    let currentCell = getCellFromEvent(e);
    if (!currentCell) return;

    let startR = parseInt(gameState.startCell.dataset.row);
    let startC = parseInt(gameState.startCell.dataset.col);
    let currR = parseInt(currentCell.dataset.row);
    let currC = parseInt(currentCell.dataset.col);

    let diffR = currR - startR;
    let diffC = currC - startC;

    if (diffR === 0 || diffC === 0 || Math.abs(diffR) === Math.abs(diffC)) {
        document.querySelectorAll(".grid-cell").forEach(c => c.classList.remove("highlighted"));
        gameState.selectedCells = [];

        let steps = Math.max(Math.abs(diffR), Math.abs(diffC));
        let stepR = diffR === 0 ? 0 : diffR / Math.abs(diffR);
        let stepC = diffC === 0 ? 0 : diffC / Math.abs(diffC);

        for (let i = 0; i <= steps; i++) {
            let r = startR + (stepR * i);
            let c = startC + (stepC * i);
            let cellOnPath = document.querySelector(`.grid-cell[data-row='${r}'][data-col='${c}']`);
            if (cellOnPath) {
                cellOnPath.classList.add("highlighted");
                gameState.selectedCells.push(cellOnPath);
            }
        }
    }
}

function handleEnd() {
    if (!gameState.isSelecting) return;
    gameState.isSelecting = false;

    if (gameState.selectedCells.length === 0) return;

    let selectedWord = gameState.selectedCells.map(c => c.innerText.toLowerCase()).join('');
    let reversedWord = selectedWord.split('').reverse().join('');

    let foundMatch = "";
    if (gameState.wordsToFind.includes(selectedWord) && !gameState.foundWords.includes(selectedWord)) {
        foundMatch = selectedWord;
    } else if (gameState.wordsToFind.includes(reversedWord) && !gameState.foundWords.includes(reversedWord)) {
        foundMatch = reversedWord;
    }

    if (foundMatch !== "") {
        let firstCell = gameState.selectedCells[0];
        let lastCell = gameState.selectedCells[gameState.selectedCells.length - 1];
        
        gameState.foundWords.push(foundMatch);
        
        gameState.selectedCells.forEach(cell => {
            let r = cell.dataset.row;
            let c = cell.dataset.col;
            gameState.usedCellsInFoundWords.add(`${r},${c}`);
        });

        gameState.svgLinesData.push({
            startRow: firstCell.dataset.row,
            startCol: firstCell.dataset.col,
            endRow: lastCell.dataset.row,
            endCol: lastCell.dataset.col
        });
        
        drawMarkerLine(firstCell, lastCell);

        let tag = document.getElementById("tag-" + foundMatch);
        if (tag) tag.classList.add("found");

        saveGame();

        if (gameState.foundWords.length === gameState.wordsToFind.length) {
            highlightSolutionCrime();
        }
    }

    document.querySelectorAll(".grid-cell").forEach(c => c.classList.remove("highlighted"));
    gameState.selectedCells = [];
}

function drawMarkerLine(cellStart, cellEnd) {
    const svg = document.getElementById("markers-layer");
    const wrapper = document.getElementById("grid-wrapper");
    if (!wrapper || !svg) return;
    
    let rectWrap = wrapper.getBoundingClientRect();
    let rectStart = cellStart.getBoundingClientRect();
    let rectEnd = cellEnd.getBoundingClientRect();

    let x1 = (rectStart.left + rectStart.width / 2) - rectWrap.left;
    let y1 = (rectStart.top + rectStart.height / 2) - rectWrap.top;
    let x2 = (rectEnd.left + rectEnd.width / 2) - rectWrap.left;
    let y2 = (rectEnd.top + rectEnd.height / 2) - rectWrap.top;

    let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", "rgba(26, 54, 93, 0.4)");
    line.setAttribute("stroke-width", rectStart.width * 0.45);
    line.setAttribute("stroke-linecap", "round");
    
    line.dataset.startRow = cellStart.dataset.row;
    line.dataset.startCol = cellStart.dataset.col;
    line.dataset.endRow = cellEnd.dataset.row;
    line.dataset.endCol = cellEnd.dataset.col;

    svg.appendChild(line);
}

function redrawAllMarkers() {
    const svg = document.getElementById("markers-layer");
    if (!svg) return;
    svg.innerHTML = "";

    gameState.svgLinesData.forEach(lineData => {
        let cStart = document.querySelector(`.grid-cell[data-row='${lineData.startRow}'][data-col='${lineData.startCol}']`);
        let cEnd = document.querySelector(`.grid-cell[data-row='${lineData.endRow}'][data-col='${lineData.endCol}']`);
        if(cStart && cEnd) {
            drawMarkerLine(cStart, cEnd);
        }
    });
}

function highlightSolutionCrime() {
    const size = gameState.gridSize;
    for(let r=0; r<size; r++) {
        for(let c=0; c<size; c++) {
            if (!gameState.usedCellsInFoundWords.has(`${r},${c}`)) {
                let cell = document.querySelector(`.grid-cell[data-row='${r}'][data-col='${c}']`);
                if (cell) {
                    cell.classList.add("solution-leak");
                }
            }
        }
    }

    const reportBtn = document.getElementById("finish-case-btn");
    if(reportBtn) reportBtn.style.display = "block";
    
    triggerVictoryData();
}

function triggerVictoryData() {
    document.getElementById("final-killer").innerText = gameState.killer.toUpperCase();
    document.getElementById("final-weapon").innerText = gameState.weapon.toUpperCase();
    document.getElementById("final-place").innerText = gameState.place.toUpperCase();

    let summary = `Śledztwo zakończone sukcesem! Pozostałe litery otoczone czerwonymi śladami jednoznacznie wykazały, że winnym zbrodni jest ${gameState.killer}. Narzędziem zbrodni okazał się być ${gameState.weapon}, a do zdarzenia doszło w lokacji: ${gameState.place}.`;
    
    document.getElementById("final-story-resolution").innerText = summary;
}

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
