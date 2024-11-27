import { stripFloat } from './utils'
import { globalIdStore } from './store.svelte.js'

export class Card {
    // How many of this card does the player have
    // Uniqueness is given by: series + sequence + rarity + foil
    // @todo make a hash (ideally md5) of these when building the card, to make it easier to compare
    count = $state(1)
    hash = $state(null)

    series = ''
    sequence = 0
    sequence_max = 1000

    title = ''

    // The quality of the pack this card came from - influences probabilities of rarer cards
    pack_quality = 'common'
    pack_quality_factor = 1

    // Rarity probabilities based on https://steamcommunity.com/sharedfiles/filedetails/?id=3334915504

    // rarity is assigned to a card when a pack is opened
    // 0 - none
    // 1 - First Edition: 1/5 (20%)
    // 2 - Silver: 1/12.5 (8%)
    // 3 - Gold: 1/25 (4%)
    // 4 - EX: 1/100 (1%)
    // 5 - Full Art: 1/400 (0.25%)
    rarity = 0

    // foil is rolled when a pack is opened
    // For each rarity, getting a foil is a 1/20 on top of it.
    // Example: a Full Art Foil is a 1/400 to get a Full Art and then a 1/20 for that Full Art to be a Foil, giving a 1/8,000 or 0.0125% chance
    // Any Foil: 1/20 (5%)
    foil = false

    probability = 1

    // Certain cards can be more expensive than others independent of rarity.
    // I can use this multiplier when I define the card's params to assign higher value.
    // For example, Pupimon is the most expensive.
    price_multiplier = 1

    price = 0

    // Unique sequential id, to track the order in which cards are added to the collection
    id = null

    // constructor(series, sequence, title, price_multiplier = null) {
    constructor(params) {
        this.series = params.series
        this.sequence = params.sequence
        this.title = params.title
        this.pack_quality = params.pack_quality
        this.pack_quality_factor = this.calcPackQualityFactor()

        if (typeof params.price_multiplier === 'number') this.price_multiplier = params.price_multiplier
    }

    rollAttributes() {
        this.rarity = this.rollRarity()
        this.foil = this.rollFoil()
        this.probability = this.calcProbability()
        this.price = this.calcPrice()
    }

    rollRarity() {
        const roll = Math.random()
        if (roll < 0.0025) return 5 // Full Art
        else if (roll < 0.01) return 4 // EX
        else if (roll < 0.04) return 3 // Gold
        else if (roll < 0.08) return 2 // Silver
        else if (roll < 0.20) return 1 // First Edition
        return 0 // None
    }

    // For when I need to force a specific card rarity to display in the showcase
    setRarityExplicitly(rarity) {
        if (rarity >= 0 && rarity <= 5) this.rarity = rarity
    }

    rollFoil() {
        return Math.random() < 0.05 // 1/20 chance
    }

    // For when I need to force a specific card foil to display in the showcase
    setFoilExplicitly(value) {
        if (value === true) this.foil = true
    }

    calcProbability() {
        let rarity_probability
        switch (this.rarity) {
            case 5: rarity_probability = 0.0025 // Full Art (0.25%)
                break
            case 4: rarity_probability = 0.01 // EX (1%)
                break
            case 3: rarity_probability = 0.04 // Gold (4%)
                break
            case 2: rarity_probability = 0.08 // Silver (8%)
                break
            case 1: rarity_probability = 0.2 // First Edition (20%)
                break
            default: rarity_probability = 1 // (100%)
        }

        rarity_probability = stripFloat(rarity_probability * this.pack_quality_factor)

        if (this.foil) return stripFloat(rarity_probability * 0.05)

        return rarity_probability
    }

    calcPackQualityFactor() {
        switch (this.pack_quality) {
            case 'common': return 1
            case 'rare': return 1.1
            case 'epic': return 1.2
            case 'legendary': return 1.3
            case 'mythic': return 1.4
            default: return 1
        }
    }

    calcPrice() {
        const price = stripFloat(1 / (this.probability / this.price_multiplier))

        return Math.round(price * 100) / 100 // round to 2 decimals
    }

    makeHash() {
        this.hash = `${this.series}-${this.sequence}-${this.rarity}-${this.foil}`
    }

    assignId() {
        this.id = globalIdStore.value
        globalIdStore.value++
    }
}
