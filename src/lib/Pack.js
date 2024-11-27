import { basic_cards } from './basic_cards'
import { Card } from './Card.svelte.js'

export class Pack {
    series = ''
    quality = 'common' // Pack quality = common, rare, epic, legendary, mythic
    title = ''

    max_cards = 5
    cards = []

    constructor(params) {
        this.series = params.series
        this.quality = params.quality
        this.title = params.title

        this.generateCards()

        // 🔎 debug
        // console.log('Class Pack says:', this.cards)
    }

    generateCards() {
        while (this.cards.length < this.max_cards) {
            const random_index = this.getRandomInt(basic_cards.length)
            const base_card = basic_cards[random_index]

            const new_card = new Card({
                series: base_card.series,
                sequence: base_card.sequence,
                title: base_card.title,
                pack_quality: this.quality,
                price_multiplier: base_card.price_multiplier
            })

            // roll for rarity and foil
            new_card.rollAttributes()

            // generate the hash
            new_card.makeHash()

            // assign an unique incremental id
            new_card.assignId()

            // add only unique cards to the pack
            if (!this.cardIsInPack(new_card)) {
                this.cards.push(new_card)
            }
        }
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max)
    }

    // Check uniqueness in the pack by comparing the hashes
    cardIsInPack(card) {
        return this.cards.some(c => c.hash === card.hash)
    }
}
