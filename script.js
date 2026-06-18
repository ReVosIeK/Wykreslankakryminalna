// script.js

let gameState = {
    caseNumber: "", killer: "", weapon: "", place: "", victim: "",
    storyText: "", suspects: [], gridSize: 14,
    wordsToFind: [], grid: [], solutionString: "",
    selectedCells: [], isSelecting: false, startCell: null,
    svgLinesData: [],
    remainingLetters: [],
    guessKiller: [], guessWeapon: [], guessPlace: [],
    activeField: 'killer', minigameSolved: false,
    minigameNoteIndex: 0, hintIndex: 0, debugMode: false,
    placedWords: [], solutionCells: [], blockedCells: new Set()
};

document.addEventListener("DOMContentLoaded", () => {
    initEventListeners();
    checkSavedGame();
    window.addEventListener("resize", redrawAllMarkers);
});

function initEventListeners() {
    document.getElementById("start-btn")?.addEventListener("click", handleStartBtnAction);
    document.getElementById("resume-btn")?.addEventListener("click", resumeSavedGame);
    document.getElementById("to-game-btn")?.addEventListener("click", () => { switchScreen("game-screen"); setTimeout(redrawAllMarkers, 50); });
    document.getElementById("abandon-btn")?.addEventListener("click", handleAbandonCase);
    document.getElementById("restart-btn")?.addEventListener("click", () => switchScreen("start-screen"));
    document.getElementById("finish-case-btn")?.addEventListener("click", () => { clearSave(); switchScreen("start-screen"); });
    document.getElementById("debug-btn")?.addEventListener("click", debugSolveAll);
    document.getElementById("to-minigame-btn")?.addEventListener("click", () => { buildMinigame(); switchScreen("minigame-screen"); });
    document.getElementById("minigame-reset-btn")?.addEventListener("click", resetMinigameGuess);
    document.getElementById("to-end-from-minigame-btn")?.addEventListener("click", () => { triggerVictoryData(); switchScreen("end-screen"); });

    const gridEl = document.getElementById("word-search-grid");
    if (gridEl) {
        gridEl.addEventListener("mousedown", handleStart);
        window.addEventListener("mousemove", handleMove);
        window.addEventListener("mouseup", handleEnd);
        gridEl.addEventListener("touchstart", handleStart, { passive: false });
        window.addEventListener("touchmove", handleMove, { passive: false });
        window.addEventListener("touchend", handleEnd);
    }
}

// ============ DEBUG ============
function debugSolveAll() {
    if (!gameState.placedWords.length) return;
    gameState.debugMode = true;
    document.getElementById("markers-layer").innerHTML = "";
    gameState.svgLinesData = [];

    for (let pw of gameState.placedWords) {
        pw.found = true;
        if (pw.cells.length > 0) {
            gameState.svgLinesData.push({
                startRow: pw.cells[0].r.toString(),
                startCol: pw.cells[0].c.toString(),
                endRow: pw.cells[pw.cells.length - 1].r.toString(),
                endCol: pw.cells[pw.cells.length - 1].c.toString()
            });
        }
    }

    document.querySelectorAll(".word-tag").forEach(t => t.classList.add("found"));
    redrawAllMarkers();
    updateGridDisplay();
    onAllWordsFound();
    saveGame();
}

function showDebugHint() {
    const b = document.getElementById("debug-hint-box");
    const t = document.getElementById("debug-hint-text");
    if (b && t) {
        t.innerText = `${gameState.killer} + ${gameState.weapon} + ${gameState.place}`;
        b.classList.add("visible");
    }
}

function hideDebugHint() {
    document.getElementById("debug-hint-box")?.classList.remove("visible");
}

// ============ MINIGRA ============
function buildMinigame() {
    const tiles = prepareSyllablesForMinigame(
        gameState.solutionCells,
        gameState.killer,
        gameState.weapon,
        gameState.place
    );
    
    gameState.remainingLetters = tiles;
    gameState.guessKiller = [];
    gameState.guessWeapon = [];
    gameState.guessPlace = [];
    gameState.activeField = 'killer';
    gameState.minigameSolved = false;

    const s = getRandomElement(MINIGAME_STORIES);
    gameState.minigameNoteIndex = Math.floor(Math.random() * s.notes.length);
    gameState.hintIndex = Math.floor(Math.random() * MINIGAME_HINTS.length);

    document.getElementById("minigame-story-intro").innerText = s.intro;
    document.getElementById("minigame-note").innerText = s.notes[gameState.minigameNoteIndex];
    document.getElementById("to-end-from-minigame-btn").style.display = "none";
    document.getElementById("minigame-reset-btn").style.display = "block";

    if (gameState.debugMode) showDebugHint();
    else hideDebugHint();

    renderMinigame();
}

function getUsedIndices() {
    return [...gameState.guessKiller, ...gameState.guessWeapon, ...gameState.guessPlace];
}

function renderMinigame() {
    const c = document.getElementById("remaining-letters-container");
    const ks = document.getElementById("guess-killer-slots");
    const ws = document.getElementById("guess-weapon-slots");
    const ps = document.getElementById("guess-place-slots");
    const fb = document.getElementById("minigame-feedback");
    const sk = document.getElementById("status-killer");
    const sw = document.getElementById("status-weapon");
    const sp = document.getElementById("status-place");

    if (!c || !ks || !ws || !ps) return;

    const gk = gameState.guessKiller.map(i => gameState.remainingLetters[i].text).join("");
    const gw = gameState.guessWeapon.map(i => gameState.remainingLetters[i].text).join("");
    const gp = gameState.guessPlace.map(i => gameState.remainingLetters[i].text).join("");

    if (fb) {
        if (gameState.minigameSolved) {
            fb.innerText = getRandomElement(MINIGAME_SUCCESS_MESSAGES);
            fb.style.color = "#145A32";
        } else {
            fb.innerText = MINIGAME_HINTS[gameState.hintIndex];
            fb.style.color = "#1A365D";
        }
    }

    function ss(el, txt, cls) {
        if (!el) return;
        el.innerText = txt || "";
        el.className = "guess-field-status " + (cls || "empty");
    }

    if (gk.length === gameState.killer.length) {
        ss(sk, gk === gameState.killer ? MINIGAME_LIVE_VALIDATION.killerCorrect : MINIGAME_LIVE_VALIDATION.killerWrong, gk === gameState.killer ? "correct" : "wrong");
    } else {
        ss(sk, "", "empty");
    }
    if (gw.length === gameState.weapon.length) {
        ss(sw, gw === gameState.weapon ? MINIGAME_LIVE_VALIDATION.weaponCorrect : MINIGAME_LIVE_VALIDATION.weaponWrong, gw === gameState.weapon ? "correct" : "wrong");
    } else {
        ss(sw, "", "empty");
    }
    if (gp.length === gameState.place.length) {
        ss(sp, gp === gameState.place ? MINIGAME_LIVE_VALIDATION.placeCorrect : MINIGAME_LIVE_VALIDATION.placeWrong, gp === gameState.place ? "correct" : "wrong");
    } else {
        ss(sp, "", "empty");
    }

    if (gk === gameState.killer && gw === gameState.weapon && gp === gameState.place && !gameState.minigameSolved) {
        gameState.minigameSolved = true;
        document.getElementById("to-end-from-minigame-btn").style.display = "block";
        document.getElementById("minigame-reset-btn").style.display = "none";
        if (fb) {
            fb.innerText = getRandomElement(MINIGAME_SUCCESS_MESSAGES);
            fb.style.color = "#145A32";
        }
        hideDebugHint();
        saveGame();
    }

    // Kafelki sylab
    c.innerHTML = "";
    const used = getUsedIndices();
    gameState.remainingLetters.forEach((tile, i) => {
        let chip = document.createElement("div");
        chip.classList.add("letter-chip");
        if (used.includes(i)) chip.classList.add("placed");
        chip.innerText = tile.text;
        chip.addEventListener("click", () => addTileToField(i));
        c.appendChild(chip);
    });

    // Pola zgadywania - pojedyncze sloty na każdą LITERĘ (jak wcześniej)
    function renderField(el, arr, maxLen, fieldName) {
        el.innerHTML = "";
        // Rozwiń sylaby na pojedyncze litery
        const letters = [];
        for (const idx of arr) {
            const tile = gameState.remainingLetters[idx];
            for (const char of tile.text) {
                letters.push({ char, tileIndex: idx });
            }
        }
        
        for (let i = 0; i < maxLen; i++) {
            let slot = document.createElement("div");
            slot.classList.add("guess-slot");
            if (i < letters.length) {
                slot.classList.add("filled");
                slot.innerText = letters[i].char;
                // Kliknięcie usuwa CAŁĄ sylabę która zawiera tę literę
                slot.addEventListener("click", () => {
                    const tileIdx = letters[i].tileIndex;
                    const arr = gfa(fieldName);
                    const pos = arr.indexOf(tileIdx);
                    if (pos >= 0) removeTileFromField(fieldName, pos);
                });
            } else {
                slot.classList.add("empty");
                slot.addEventListener("click", () => {
                    gameState.activeField = fieldName;
                    renderMinigame();
                });
            }
            el.appendChild(slot);
        }
    }

    renderField(ks, gameState.guessKiller, gameState.killer.length, 'killer');
    renderField(ws, gameState.guessWeapon, gameState.weapon.length, 'weapon');
    renderField(ps, gameState.guessPlace, gameState.place.length, 'place');

    [ks, ws, ps].forEach(el => el.style.outline = 'none');
    if (gameState.activeField === 'killer') ks.style.outline = '2px solid var(--stamp-red)';
    if (gameState.activeField === 'weapon') ws.style.outline = '2px solid var(--stamp-red)';
    if (gameState.activeField === 'place') ps.style.outline = '2px solid var(--stamp-red)';
}

function gfa(f) {
    return f === 'killer' ? gameState.guessKiller : f === 'weapon' ? gameState.guessWeapon : gameState.guessPlace;
}

function gfm(f) {
    return f === 'killer' ? gameState.killer.length : f === 'weapon' ? gameState.weapon.length : gameState.place.length;
}

function addTileToField(i) {
    if (gameState.minigameSolved) return;
    if (getUsedIndices().includes(i)) return;
    
    const arr = gfa(gameState.activeField);
    const currentText = arr.map(idx => gameState.remainingLetters[idx].text).join("");
    const tileText = gameState.remainingLetters[i].text;
    const maxLen = gfm(gameState.activeField);
    
    if (currentText.length + tileText.length > maxLen) {
        if (gameState.activeField === 'killer') {
            gameState.activeField = 'weapon';
        } else if (gameState.activeField === 'weapon') {
            gameState.activeField = 'place';
        } else {
            return;
        }
        const arr2 = gfa(gameState.activeField);
        const currentText2 = arr2.map(idx => gameState.remainingLetters[idx].text).join("");
        if (currentText2.length + tileText.length > gfm(gameState.activeField)) return;
        arr2.push(i);
    } else {
        arr.push(i);
    }
    
    renderMinigame();
    saveGame();
}

function removeTileFromField(f, pos) {
    if (gameState.minigameSolved) return;
    gameState.activeField = f;
    gfa(f).splice(pos, 1);
    renderMinigame();
    saveGame();
}

function resetMinigameGuess() {
    if (gameState.minigameSolved) return;
    gameState.guessKiller = [];
    gameState.guessWeapon = [];
    gameState.guessPlace = [];
    gameState.activeField = 'killer';
    renderMinigame();
    saveGame();
}

// ============ GRA ============
function handleStartBtnAction() {
    gameState.debugMode = false;
    hideDebugHint();
    clearSave();
    generateNewCase(false);
}

function switchScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(id)?.classList.add("active");
    if (id === "start-screen") {
        checkSavedGame();
        hideDebugHint();
    }
}

function checkSavedGame() {
    const s = localStorage.getItem("detektyw_save");
    const b = document.getElementById("resume-btn");
    if (s && s !== "null") {
        try {
            const d = JSON.parse(s);
            if (d && d.minigameSolved) {
                if (b) b.style.display = "none";
                return;
            }
        } catch(e) {}
        if (b) b.style.display = "block";
    } else {
        if (b) b.style.display = "none";
    }
}

function saveGame() {
    try {
        localStorage.setItem("detektyw_save", JSON.stringify({
            caseNumber: gameState.caseNumber,
            killer: gameState.killer,
            weapon: gameState.weapon,
            place: gameState.place,
            victim: gameState.victim,
            storyText: gameState.storyText,
            suspects: gameState.suspects,
            wordsToFind: gameState.wordsToFind,
            grid: gameState.grid,
            gridSize: gameState.gridSize,
            solutionString: gameState.solutionString,
            svgLinesData: gameState.svgLinesData,
            remainingLetters: gameState.remainingLetters,
            guessKiller: gameState.guessKiller,
            guessWeapon: gameState.guessWeapon,
            guessPlace: gameState.guessPlace,
            activeField: gameState.activeField,
            minigameSolved: gameState.minigameSolved,
            minigameNoteIndex: gameState.minigameNoteIndex,
            hintIndex: gameState.hintIndex,
            debugMode: gameState.debugMode,
            placedWords: gameState.placedWords,
            solutionCells: gameState.solutionCells,
            blockedCells: Array.from(gameState.blockedCells)
        }));
    } catch (e) {}
}

function clearSave() {
    localStorage.removeItem("detektyw_save");
}

function handleAbandonCase() {
    if (confirm(getRandomElement(PLOT_COMPONENTS.abandonComments) + "\n\nOdłożyć sprawę?")) {
        clearSave();
        switchScreen("start-screen");
    }
}

function generateNewCase(isResuming = false) {
    document.getElementById("finish-case-btn").style.display = "none";
    document.getElementById("to-minigame-btn").style.display = "none";
    document.getElementById("to-end-from-minigame-btn").style.display = "none";
    document.getElementById("markers-layer").innerHTML = "";
    hideDebugHint();

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
        gameState.gridSize = 14;

        let ps = PLOT_COMPONENTS.killers.filter(x => x !== k);
        shuffleArray(ps);
        gameState.suspects = [k, ps[0], ps[1]];
        shuffleArray(gameState.suspects);

        gameState.wordsToFind = [];
        gameState.svgLinesData = [];
        gameState.remainingLetters = [];
        gameState.guessKiller = [];
        gameState.guessWeapon = [];
        gameState.guessPlace = [];
        gameState.activeField = 'killer';
        gameState.minigameSolved = false;
        gameState.placedWords = [];
        gameState.solutionCells = [];
        gameState.blockedCells = new Set();

        generatePuzzle();
    }

    document.getElementById("case-number").innerText = gameState.caseNumber;
    document.getElementById("case-victim").innerText = gameState.victim;
    document.getElementById("story-text").innerText = gameState.storyText;
    document.getElementById("game-case-title").innerText = "#" + gameState.caseNumber;

    const sl = document.getElementById("suspects-list");
    if (sl) {
        sl.innerHTML = "";
        gameState.suspects.forEach(s => {
            let li = document.createElement("li");
            li.classList.add("suspect-item");
            li.innerText = s.charAt(0).toUpperCase() + s.slice(1);
            sl.appendChild(li);
        });
    }

    document.getElementById("words-count").innerText = gameState.wordsToFind.length;

    if (isResuming) {
        renderGridHTML(gameState.grid);
        renderWordListHTML();
        gameState.placedWords.filter(pw => pw.found).forEach(pw => {
            document.getElementById("tag-" + pw.word)?.classList.add("found");
        });
        setTimeout(redrawAllMarkers, 50);
        if (gameState.placedWords.every(pw => pw.found)) onAllWordsFound();
        switchScreen("game-screen");
    } else {
        renderGridHTML(gameState.grid);
        renderWordListHTML();
        saveGame();
        switchScreen("story-screen");
    }
}

function resumeSavedGame() {
    const s = localStorage.getItem("detektyw_save");
    if (!s || s === "null") return;
    try {
        const d = JSON.parse(s);
        if (!d) return;
        if (d.minigameSolved) return; // Nie wznawiaj zakończonej gry
        gameState.caseNumber = d.caseNumber;
        gameState.killer = d.killer;
        gameState.weapon = d.weapon;
        gameState.place = d.place;
        gameState.victim = d.victim;
        gameState.storyText = d.storyText;
        gameState.suspects = d.suspects;
        gameState.wordsToFind = d.wordsToFind;
        gameState.grid = d.grid;
        gameState.solutionString = d.solutionString;
        gameState.gridSize = d.gridSize || 14;
        gameState.svgLinesData = d.svgLinesData || [];
        gameState.remainingLetters = d.remainingLetters || [];
        gameState.guessKiller = d.guessKiller || [];
        gameState.guessWeapon = d.guessWeapon || [];
        gameState.guessPlace = d.guessPlace || [];
        gameState.activeField = d.activeField || 'killer';
        gameState.minigameSolved = d.minigameSolved || false;
        gameState.minigameNoteIndex = d.minigameNoteIndex || 0;
        gameState.hintIndex = d.hintIndex || 0;
        gameState.debugMode = d.debugMode || false;
        gameState.placedWords = d.placedWords || [];
        gameState.solutionCells = d.solutionCells || [];
        gameState.blockedCells = new Set(d.blockedCells || []);
        generateNewCase(true);
    } catch (e) {
        clearSave();
    }
}

function isBlockedCell(r, c) {
    return gameState.blockedCells.has(`${r},${c}`);
}

// ============ UI ============
function renderGridHTML(grid) {
    const c = document.getElementById("word-search-grid");
    if (!c) return;
    c.innerHTML = "";
    c.style.gridTemplateColumns = `repeat(${gameState.gridSize}, 1fr)`;
    c.style.gridTemplateRows = `repeat(${gameState.gridSize}, 1fr)`;
    for (let r = 0; r < gameState.gridSize; r++) {
        for (let cc = 0; cc < gameState.gridSize; cc++) {
            let cell = document.createElement("div");
            cell.classList.add("grid-cell");
            cell.innerText = grid[r][cc] || '';
            cell.dataset.row = r;
            cell.dataset.col = cc;
            c.appendChild(cell);
        }
    }
}

function renderWordListHTML() {
    const tc = document.getElementById("words-to-find");
    if (!tc) return;
    tc.innerHTML = "";
    if (!gameState.wordsToFind.length) {
        tc.innerHTML = "<p style='color:red'>Błąd generowania!</p>";
        return;
    }
    [...gameState.wordsToFind].sort((a, b) => a.localeCompare(b, 'pl')).forEach(w => {
        let t = document.createElement("div");
        t.classList.add("word-tag");
        t.id = "tag-" + w;
        t.innerText = w;
        tc.appendChild(t);
    });
}

function updateGridDisplay() {
    document.querySelectorAll(".grid-cell").forEach(cell => {
        let r = parseInt(cell.dataset.row), c = parseInt(cell.dataset.col);
        if (isBlockedCell(r, c)) { cell.style.opacity = '1'; return; }
        cell.style.opacity = '1';
    });
    gameState.placedWords.forEach(pw => {
        if (pw.found) document.getElementById("tag-" + pw.word)?.classList.add("found");
    });
}

function getCellFromEvent(e) {
    let cx, cy;
    if (e.touches?.length > 0) { cx = e.touches[0].clientX; cy = e.touches[0].clientY; }
    else if (e.clientX !== undefined) { cx = e.clientX; cy = e.clientY; }
    else return null;
    let el = document.elementFromPoint(cx, cy);
    return el?.classList.contains("grid-cell") ? el : null;
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
    let cc = getCellFromEvent(e);
    if (!cc) return;
    let sr = parseInt(gameState.startCell.dataset.row);
    let sc = parseInt(gameState.startCell.dataset.col);
    let cr = parseInt(cc.dataset.row);
    let ccol = parseInt(cc.dataset.col);
    let dr = cr - sr;
    let dc = ccol - sc;
    if (dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc)) {
        document.querySelectorAll(".grid-cell").forEach(c => c.classList.remove("highlighted"));
        gameState.selectedCells = [];
        let steps = Math.max(Math.abs(dr), Math.abs(dc));
        let stepR = dr === 0 ? 0 : dr / Math.abs(dr);
        let stepC = dc === 0 ? 0 : dc / Math.abs(dc);
        for (let i = 0; i <= steps; i++) {
            let r = sr + stepR * i, c = sc + stepC * i;
            let cell = document.querySelector(`.grid-cell[data-row='${r}'][data-col='${c}']`);
            if (cell) { cell.classList.add("highlighted"); gameState.selectedCells.push(cell); }
        }
    }
}

function handleEnd() {
    if (!gameState.isSelecting) return;
    gameState.isSelecting = false;
    if (!gameState.selectedCells.length) return;
    let sw = gameState.selectedCells.map(c => c.innerText.toLowerCase()).join('');
    let rw = sw.split('').reverse().join('');
    let match = null;
    for (let pw of gameState.placedWords) {
        if (pw.found) continue;
        if (pw.word === sw || pw.word === rw) {
            let cells = pw.cells;
            let selected = gameState.selectedCells.map(c => ({ r: parseInt(c.dataset.row), c: parseInt(c.dataset.col) }));
            if (cells.length === selected.length) {
                let allMatch = true;
                for (let i = 0; i < cells.length; i++) {
                    if (!selected.some(s => s.r === cells[i].r && s.c === cells[i].c)) { allMatch = false; break; }
                }
                if (allMatch) { match = pw; break; }
            }
        }
    }
    if (match) {
        match.found = true;
        let fc = gameState.selectedCells[0];
        let lc = gameState.selectedCells[gameState.selectedCells.length - 1];
        gameState.svgLinesData.push({ startRow: fc.dataset.row, startCol: fc.dataset.col, endRow: lc.dataset.row, endCol: lc.dataset.col });
        drawMarkerLine(fc, lc);
        document.getElementById("tag-" + match.word)?.classList.add("found");
        updateGridDisplay();
        saveGame();
        if (gameState.placedWords.every(pw => pw.found)) onAllWordsFound();
    }
    document.querySelectorAll(".grid-cell").forEach(c => c.classList.remove("highlighted"));
    gameState.selectedCells = [];
}

function onAllWordsFound() {
    highlightRemainingCells();
    document.getElementById("to-minigame-btn").style.display = "block";
    if (gameState.minigameSolved) document.getElementById("finish-case-btn").style.display = "block";
}

function drawMarkerLine(cs, ce) {
    const svg = document.getElementById("markers-layer");
    const w = document.getElementById("grid-wrapper");
    if (!w || !svg) return;
    let rw = w.getBoundingClientRect();
    let rs = cs.getBoundingClientRect();
    let re = ce.getBoundingClientRect();
    let x1 = (rs.left + rs.width / 2) - rw.left;
    let y1 = (rs.top + rs.height / 2) - rw.top;
    let x2 = (re.left + re.width / 2) - rw.left;
    let y2 = (re.top + re.height / 2) - rw.top;
    let l = document.createElementNS("http://www.w3.org/2000/svg", "line");
    l.setAttribute("x1", x1); l.setAttribute("y1", y1);
    l.setAttribute("x2", x2); l.setAttribute("y2", y2);
    l.setAttribute("stroke", "rgba(26,54,93,0.4)");
    l.setAttribute("stroke-width", rs.width * 0.45);
    l.setAttribute("stroke-linecap", "round");
    l.dataset.startRow = cs.dataset.row; l.dataset.startCol = cs.dataset.col;
    l.dataset.endRow = ce.dataset.row; l.dataset.endCol = ce.dataset.col;
    svg.appendChild(l);
}

function redrawAllMarkers() {
    const svg = document.getElementById("markers-layer");
    if (!svg) return;
    svg.innerHTML = "";
    gameState.svgLinesData.forEach(d => {
        let cs = document.querySelector(`.grid-cell[data-row='${d.startRow}'][data-col='${d.startCol}']`);
        let ce = document.querySelector(`.grid-cell[data-row='${d.endRow}'][data-col='${d.endCol}']`);
        if (cs && ce) drawMarkerLine(cs, ce);
    });
}

function highlightRemainingCells() {
    for (let sc of gameState.solutionCells) {
        let cell = document.querySelector(`.grid-cell[data-row='${sc.r}'][data-col='${sc.c}']`);
        if (cell) {
            cell.style.opacity = '1';
            cell.classList.add("solution-leak");
            cell.style.setProperty('--twist', (Math.random() * 30 - 15).toFixed(1));
        }
    }
}

function triggerVictoryData() {
    document.getElementById("final-killer").innerText = gameState.killer.toUpperCase();
    document.getElementById("final-weapon").innerText = gameState.weapon.toUpperCase();
    document.getElementById("final-place").innerText = gameState.place.toUpperCase();
    
    const wf = CASE_FORMS.narzednik[gameState.weapon] || gameState.weapon;
    const pf = CASE_FORMS.miejscownik[gameState.place] || gameState.place;
    
    // Sprawdź który przyimek pasuje
    const naMiejsca = ["promenada", "plaża", "taras", "balkon", "strych", "peron", "parking", 
                        "targowisko", "stadion", "lodowisko", "kąpielisko", "przystań", "park",
                        "skwer", "skocznia", "lotnisko", "dworzec", "przystanek", "poddasze",
                        "piętro", "parter", "cmentarz", "boisko", "basen", "kort", "pole"];
    
    const przyimek = naMiejsca.includes(gameState.place) ? "na" : "w";
    
    document.getElementById("final-story-resolution").innerText =
        `Śledztwo zakończone sukcesem! Sprawcą okazał się ${gameState.killer}, który posłużył się ${wf}. Do zbrodni doszło ${przyimek} ${pf}. Sprawa nr ${gameState.caseNumber} – zamknięta.`;
}

function getRandomElement(a) { return a[Math.floor(Math.random() * a.length)]; }
function shuffleArray(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } }
function shuffleArrayReturn(a) { let arr = [...a]; for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; }