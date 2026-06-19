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
    
    // Dynamiczne parametry
    const passes = size <= 10 ? 8 : size >= 15 ? 15 : 10;
    const maxOverlap = size <= 10 ? 3 : size >= 15 ? 1 : 2;
    const maxWordsTotal = size * size;
    
    const allWords = [...new Set(ALL_WORDS)]
        .filter(w => w.length >= 2 && w.length <= size)
        .sort((a, b) => b.length - a.length);
    
    for (let pass = 0; pass < passes; pass++) {
        let changed = false;
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                if (!board.isEmpty(r, c)) continue;
                if (placedWords.length >= maxWordsTotal) break;
                
                const shuffled = shuffleArrayLocal([...allWords]);
                for (const w of shuffled) {
                    if (usedWords.has(w)) continue;
                    const dirs = shuffleArrayLocal([...DIRECTIONS]);
                    for (const dir of dirs) {
                        for (let offset = 0; offset < w.length; offset++) {
                            const sr = r - dir.y * offset, sc = c - dir.x * offset;
                            if (sr < 0 || sr >= size || sc < 0 || sc >= size) continue;
                            if (board.canPlaceWord(w, sr, sc, dir)) {
                                let maxOv = 0;
                                for (let i = 0; i < w.length; i++) {
                                    const nr = sr + dir.y * i, nc = sc + dir.x * i;
                                    const ov = board.getCellWordCount(nr, nc);
                                    if (ov > maxOv) maxOv = ov;
                                }
                                if (maxOv <= maxOverlap) {
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
        if (board.isFull() || !changed) break;
    }
    
    // Jeśli nadal puste - agresywne dopełnianie
    if (!board.isFull()) {
        for (let pass = 0; pass < 20; pass++) {
            let changed = false;
            for (let r = 0; r < size; r++) {
                for (let c = 0; c < size; c++) {
                    if (!board.isEmpty(r, c)) continue;
                    const shuffled = shuffleArrayLocal([...allWords]);
                    for (const w of shuffled) {
                        if (w.length < 2 || w.length > size) continue;
                        const dirs = shuffleArrayLocal([...DIRECTIONS]);
                        for (const dir of dirs) {
                            for (let offset = 0; offset < w.length; offset++) {
                                const sr = r - dir.y * offset, sc = c - dir.x * offset;
                                if (sr < 0 || sr >= size || sc < 0 || sc >= size) continue;
                                if (board.canPlaceWord(w, sr, sc, dir)) {
                                    const cells = board.placeWord(w, sr, sc, dir);
                                    placedWords.push({word: w, cells, dir, found: false});
                                    usedWords.add(w);
                                    changed = true;
                                    break;
                                }
                            }
                            if (!board.isEmpty(r, c)) break;
                        }
                        if (!board.isEmpty(r, c)) break;
                    }
                }
            }
            if (board.isFull() || !changed) break;
        }
    }
}

function generatePuzzle() {
    const size = gameState.gridSize;
    const solStr = gameState.solutionString;
    const solLen = solStr.length;

    for (let attempt = 0; attempt < 5; attempt++) {
        const board = new Board(size);

        // Rozmieść solutionCells rozproszone
        const solutionCells = [];
        const blockedSet = new Set();
        
        let allPositions = [];
        for (let r = 1; r < size - 1; r++) {
            for (let c = 1; c < size - 1; c++) {
                allPositions.push({r, c});
            }
        }
        shuffleArrayLocal(allPositions);
        
        let positions = [];
        for (let pos of allPositions) {
            if (positions.length >= solLen) break;
            let tooClose = false;
            for (let p of positions) {
                let dist = Math.abs(pos.r - p.r) + Math.abs(pos.c - p.c);
                if (dist < 2) { tooClose = true; break; }
            }
            if (!tooClose) {
                positions.push(pos);
                blockedSet.add(`${pos.r},${pos.c}`);
                board.block(pos.r, pos.c);
                board.grid[pos.r][pos.c] = solStr[positions.length - 1];
                solutionCells.push({r: pos.r, c: pos.c, letter: solStr[positions.length - 1]});
            }
        }
        
        // Jeśli za mało pozycji, dobierz pozostałe
        if (positions.length < solLen) {
            for (let pos of allPositions) {
                if (positions.length >= solLen) break;
                if (!blockedSet.has(`${pos.r},${pos.c}`)) {
                    positions.push(pos);
                    blockedSet.add(`${pos.r},${pos.c}`);
                    board.block(pos.r, pos.c);
                    board.grid[pos.r][pos.c] = solStr[positions.length - 1];
                    solutionCells.push({r: pos.r, c: pos.c, letter: solStr[positions.length - 1]});
                }
            }
        }

        const placedWords = [];
        const usedWords = new Set();
        fillBoardWithWords(board, placedWords, usedWords);

        if (board.isFull() && placedWords.length >= Math.max(10, size * 2)) {
            gameState.grid = board.grid;
            gameState.placedWords = placedWords;
            gameState.wordsToFind = placedWords.map(p => p.word);
            gameState.solutionCells = solutionCells;
            gameState.blockedCells = blockedSet;
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

    // Rozmieść solutionCells
    let allPositions = [];
    for (let r = 1; r < size - 1; r++) {
        for (let c = 1; c < size - 1; c++) {
            allPositions.push({r, c});
        }
    }
    shuffleArrayLocal(allPositions);
    
    for (let i = 0; i < solStr.length; i++) {
        let placed = false;
        for (let attempt = 0; attempt < 100 && !placed; attempt++) {
            const r = Math.floor(Math.random() * size);
            const c = Math.floor(Math.random() * size);
            if (!blockedSet.has(`${r},${c}`) && r > 0 && r < size - 1 && c > 0 && c < size - 1) {
                blockedSet.add(`${r},${c}`);
                board.block(r, c);
                board.grid[r][c] = solStr[i];
                solutionCells.push({r, c, letter: solStr[i]});
                placed = true;
            }
        }
        if (!placed) {
            for (let r = 0; r < size; r++) {
                for (let c = 0; c < size; c++) {
                    if (!blockedSet.has(`${r},${c}`)) {
                        blockedSet.add(`${r},${c}`);
                        board.block(r, c);
                        board.grid[r][c] = solStr[i];
                        solutionCells.push({r, c, letter: solStr[i]});
                        placed = true;
                        break;
                    }
                }
                if (placed) break;
            }
        }
    }

    const placedWords = [];
    const usedWords = new Set();
    fillBoardWithWords(board, placedWords, usedWords);

    gameState.grid = board.grid;
    gameState.placedWords = placedWords;
    gameState.wordsToFind = placedWords.map(p => p.word);
    gameState.solutionCells = solutionCells;
    gameState.blockedCells = blockedSet;
}

window.generatePuzzle = generatePuzzle;