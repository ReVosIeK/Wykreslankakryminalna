function splitIntoRandomGroups(text, word) {
    // Najpierw sprawdź słownik
    if (window.SYLLABLE_DICTIONARY && window.SYLLABLE_DICTIONARY[word]) {
        return [...window.SYLLABLE_DICTIONARY[word]];
    }
    
    // Fallback: podział na losowe grupy
    const groups = [];
    let remaining = text;
    while (remaining.length > 0) {
        const size = Math.min(remaining.length, 2 + Math.floor(Math.random() * 2));
        groups.push(remaining.substring(0, size));
        remaining = remaining.substring(size);
    }
    return groups;
}

function prepareSyllablesForMinigame(solutionCells, killer, weapon, place) {
    const fullText = solutionCells.map(sc => sc.letter).join('');
    
    const killerText = fullText.substring(0, killer.length);
    const weaponText = fullText.substring(killer.length, killer.length + weapon.length);
    const placeText = fullText.substring(killer.length + weapon.length);
    
    // Użyj słownika dla poprawnego podziału
    const killerSyllables = splitIntoRandomGroups(killerText, killer);
    const weaponSyllables = splitIntoRandomGroups(weaponText, weapon);
    const placeSyllables = splitIntoRandomGroups(placeText, place);
    
    let tiles = [];
    
    for (let i = 0; i < killerSyllables.length; i++) {
        tiles.push({ text: killerSyllables[i], wordIndex: 0, syllableIndex: i });
    }
    for (let i = 0; i < weaponSyllables.length; i++) {
        tiles.push({ text: weaponSyllables[i], wordIndex: 1, syllableIndex: i });
    }
    for (let i = 0; i < placeSyllables.length; i++) {
        tiles.push({ text: placeSyllables[i], wordIndex: 2, syllableIndex: i });
    }
    
    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    
    return tiles;
}