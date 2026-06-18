// generator.js

const DIRECTIONS = [
    {x:1,y:0},{x:0,y:1},{x:1,y:1},{x:1,y:-1},
    {x:-1,y:0},{x:0,y:-1},{x:-1,y:-1},{x:-1,y:1}
];

function shuffleArrayLocal(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

class Board {
    constructor(size) {
        this.size = size;
        this.grid = Array(size).fill(null).map(() => Array(size).fill(''));
        this.blocked = new Set();
        this.cellWords = {};
    }

    block(r, c) { this.blocked.add(`${r},${c}`); }
    isBlocked(r, c) { return this.blocked.has(`${r},${c}`); }
    isEmpty(r, c) { return !this.isBlocked(r, c) && this.grid[r][c] === ''; }
    getCellWordCount(r, c) { return this.cellWords[`${r},${c}`] || 0; }

    canPlaceWord(word, r, c, dir) {
        for (let i = 0; i < word.length; i++) {
            const nr = r + dir.y * i, nc = c + dir.x * i;
            if (nr < 0 || nr >= this.size || nc < 0 || nc >= this.size) return false;
            if (this.isBlocked(nr, nc)) return false;
            if (this.grid[nr][nc] !== '' && this.grid[nr][nc] !== word[i]) return false;
        }
        return true;
    }

    placeWord(word, r, c, dir) {
        const cells = [];
        for (let i = 0; i < word.length; i++) {
            const nr = r + dir.y * i, nc = c + dir.x * i;
            this.grid[nr][nc] = word[i];
            const key = `${nr},${nc}`;
            this.cellWords[key] = (this.cellWords[key] || 0) + 1;
            cells.push({r: nr, c: nc});
        }
        return cells;
    }

    isFull() {
        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                if (this.grid[r][c] === '') return false;
            }
        }
        return true;
    }
}

function fillBoardWithWords(board, placedWords, usedWords) {
    const size = board.size;
    const allWords = [...new Set(ALL_WORDS)].filter(w => w.length >= 3 && w.length <= 10);

    for (let pass = 0; pass < 15; pass++) {
        let changed = false;
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                if (!board.isEmpty(r, c)) continue;
                const shuffled = shuffleArrayLocal([...allWords]);
                for (const w of shuffled) {
                    if (usedWords.has(w)) continue;
                    const dirs = shuffleArrayLocal([...DIRECTIONS]);
                    for (const dir of dirs) {
                        for (let offset = 0; offset < w.length; offset++) {
                            const sr = r - dir.y * offset, sc = c - dir.x * offset;
                            if (sr < 0 || sr >= size || sc < 0 || sc >= size) continue;
                            if (board.canPlaceWord(w, sr, sc, dir)) {
                                let maxOverlap = 0;
                                for (let i = 0; i < w.length; i++) {
                                    const nr = sr + dir.y * i, nc = sc + dir.x * i;
                                    const overlap = board.getCellWordCount(nr, nc);
                                    if (overlap > maxOverlap) maxOverlap = overlap;
                                }
                                if (maxOverlap <= 1) {
                                    const cells = board.placeWord(w, sr, sc, dir);
                                    placedWords.push({word: w, cells, dir, found: false});
                                    usedWords.add(w);
                                    changed = true;
                                    break;
                                }
                            }
                        }
                        if (!board.isEmpty(r, c)) break;
                    }
                    if (!board.isEmpty(r, c)) break;
                }
            }
        }
        if (board.isFull()) break;
    }
}

function generatePuzzle() {
    const size = gameState.gridSize;
    const solStr = gameState.solutionString;
    const solLen = solStr.length;

    for (let attempt = 0; attempt < 10; attempt++) {
        const board = new Board(size);
        
        // KROK 1: Najpierw wybierz losowe pozycje dla solutionCells
        // Rozmieść je POJEDYNCZO na całej planszy
        const solutionCells = [];
        const blockedSet = new Set();
        
        let allPositions = [];
        for (let r = 1; r < size - 1; r++) {
            for (let c = 1; c < size - 1; c++) {
                allPositions.push({r, c});
            }
        }
        shuffleArrayLocal(allPositions);
        
        // Wybierz solLen pozycji, ale rozproszonych
        let positions = [];
        let used = new Set();
        
        for (let pos of allPositions) {
            if (positions.length >= solLen) break;
            
            // Sprawdź czy nie za blisko innych solutionCells (min 2 komórki odstępu)
            let tooClose = false;
            for (let p of positions) {
                let dist = Math.abs(pos.r - p.r) + Math.abs(pos.c - p.c);
                if (dist < 3) { tooClose = true; break; }
            }
            
            if (!tooClose) {
                positions.push(pos);
                used.add(`${pos.r},${pos.c}`);
            }
        }
        
        // Jeśli za mało, dobierz pozostałe
        if (positions.length < solLen) {
            for (let pos of allPositions) {
                if (positions.length >= solLen) break;
                if (!used.has(`${pos.r},${pos.c}`)) {
                    positions.push(pos);
                }
            }
        }
        
        // Oznacz solutionCells jako zablokowane
        for (let i = 0; i < solLen; i++) {
            const {r, c} = positions[i];
            blockedSet.add(`${r},${c}`);
            board.block(r, c);
            board.grid[r][c] = solStr[i];
            solutionCells.push({r, c, letter: solStr[i]});
        }
        
        // KROK 2: Wypełnij resztę słowami
        const placedWords = [];
        const usedWords = new Set();
        fillBoardWithWords(board, placedWords, usedWords);
        
        if (board.isFull() && placedWords.length >= 15) {
            gameState.grid = board.grid;
            gameState.placedWords = placedWords;
            gameState.wordsToFind = placedWords.map(p => p.word);
            gameState.solutionCells = solutionCells;
            gameState.blockedCells = blockedSet;
            console.log(`OK: ${placedWords.length} słów, solution rozproszone`);
            return;
        }
    }

    fallbackGenerate();
}

function fallbackGenerate() {
    const size = gameState.gridSize;
    const solStr = gameState.solutionString;
    const board = new Board(size);
    const solutionCells = [];
    const blockedSet = new Set();

    // Rozmieść solutionCells pojedynczo, rozproszone
    let allPositions = [];
    for (let r = 1; r < size - 1; r++) {
        for (let c = 1; c < size - 1; c++) {
            allPositions.push({r, c});
        }
    }
    shuffleArrayLocal(allPositions);
    
    let positions = [];
    for (let pos of allPositions) {
        if (positions.length >= solStr.length) break;
        let tooClose = false;
        for (let p of positions) {
            let dist = Math.abs(pos.r - p.r) + Math.abs(pos.c - p.c);
            if (dist < 2) { tooClose = true; break; }
        }
        if (!tooClose) positions.push(pos);
    }
    
    if (positions.length < solStr.length) {
        for (let pos of allPositions) {
            if (positions.length >= solStr.length) break;
            if (!positions.some(p => p.r === pos.r && p.c === pos.c)) {
                positions.push(pos);
            }
        }
    }
    
    for (let i = 0; i < solStr.length; i++) {
        const {r, c} = positions[i];
        blockedSet.add(`${r},${c}`);
        board.block(r, c);
        board.grid[r][c] = solStr[i];
        solutionCells.push({r, c, letter: solStr[i]});
    }

    const placedWords = [];
    const usedWords = new Set();
    fillBoardWithWords(board, placedWords, usedWords);

    gameState.grid = board.grid;
    gameState.placedWords = placedWords;
    gameState.wordsToFind = placedWords.map(p => p.word);
    gameState.solutionCells = solutionCells;
    gameState.blockedCells = blockedSet;
    console.log(`Fallback: ${placedWords.length} słów`);
}

window.generatePuzzle = generatePuzzle;