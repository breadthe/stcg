export const cardRarityLabel = (rarity) => {
    switch (rarity) {
        case 1: return 'First Edition'
        case 2: return 'Silver'
        case 3: return 'Gold'
        case 4: return 'EX'
        case 5: return 'Full Art'
        default: return null
    }
}

// 1.1 * 0.2 = 0.22000000000000003
// stripFloat(1.1 * 0.2) = 0.22
export const stripFloat = (value) => {
    return parseFloat(parseFloat(value).toPrecision(12))
}
