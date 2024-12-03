import { stripFloat } from './utils.js'

export const packPriceStore = {
    get common() {
        return 20
    },
    get rare() {
        return 25
    },
    get epic() {
        return 30
    },
    get legendary() {
        return 35
    },
    get mythic() {
        return 40
    },
}

// sell all cards valued at or below this amount
let atOrBelowAmount = $state(1)
export const AtOrBelowAmountStore = {
    get value() {
        // Without the next line there's an internal Svelte warning when deleting the value in the input
        // "The specified value "NaN" cannot be parsed, or is out of range."
        // but I'm ok with that since the "Sell <=" button is disabled anyway.
        // if (isNaN(atOrBelowAmount)) return 1

        return parseInt(atOrBelowAmount, 10)
    },
    set value(val) {
        atOrBelowAmount = parseInt(val, 10)
    },
}

let money = $state(1000)
export const moneyStore = {
    get value() {
        return money
    },
    set value(val) {
        money = val
    },
    sub(amount) {
        const new_money = money - amount
        if (new_money < 0) { money = 0; return false }
        else { money = new_money; return true }
    }
}

let currentPack = $state(null)
export const currentPackStore = {
    get value() {
        return currentPack
    },
    set value(val) {
        currentPack = val
    }
}

let openedCommonPacks = $state(0)
let openedRarePacks = $state(0)
let openedEpicPacks = $state(0)
let openedLegendaryPacks = $state(0)
let openedMythicPacks = $state(0)
export const openedPacksStore = {
    get value() {
        return openedPacks
    },
    set value(val) {
        if (val <= 0) openedPacks = 0
        else openedPacks = val
    },

    get common() {
        return openedCommonPacks
    },
    set common(val) {
        if (val <= 0) openedCommonPacks = 0
        else openedCommonPacks = val
    },
    get rare() {
        return openedRarePacks
    },
    set rare(val) {
        if (val <= 0) openedRarePacks = 0
        else openedRarePacks = val
    },
    get epic() {
        return openedEpicPacks
    },
    set epic(val) {
        if (val <= 0) openedEpicPacks = 0
        else openedEpicPacks = val
    },
    get legendary() {
        return openedLegendaryPacks
    },
    set legendary(val) {
        if (val <= 0) openedLegendaryPacks = 0
        else openedLegendaryPacks = val
    },
    get mythic() {
        return openedMythicPacks
    },
    set mythic(val) {
        if (val <= 0) openedMythicPacks = 0
        else openedMythicPacks = val
    }
}

// A global unique sequential number assigned to each new card retrieved from the pack,
// to track the order of cards added to the collection
let globalId = $state(1)
export const globalIdStore = {
    get value() {
        return parseInt(globalId, 10)
    },
    set value(val) {
        if (val <= 1) globalId = 1
        else globalId = parseInt(val, 10)
    }
}

let playerCommonPacks = $state(0)
let playerRarePacks = $state(0)
let playerEpicPacks = $state(0)
let playerLegendaryPacks = $state(0)
let playerMythicPacks = $state(0)
export const playerPacksStore = {
    get total() {
        return playerCommonPacks + playerRarePacks
    },

    get common() {
        return playerCommonPacks
    },
    set common(val) {
        if (val <= 0) playerCommonPacks = 0
        else playerCommonPacks = val
    },
    get rare() {
        return playerRarePacks
    },
    set rare(val) {
        if (val <= 0) playerRarePacks = 0
        else playerRarePacks = val
    },
    get epic() {
        return playerEpicPacks
    },
    set epic(val) {
        if (val <= 0) playerEpicPacks = 0
        else playerEpicPacks = val
    },
    get legendary() {
        return playerLegendaryPacks
    },
    set legendary(val) {
        if (val <= 0) playerLegendaryPacks = 0
        else playerLegendaryPacks = val
    },
    get mythic() {
        return playerMythicPacks
    },
    set mythic(val) {
        if (val <= 0) playerMythicPacks = 0
        else playerMythicPacks = val
    }
}

let sortBy = $state('id')
export const sortByStore = {
    get value() {
        return sortBy
    },
    set value(val) {
        sortBy = val
    }
}

let sortDir = $state('desc')
export const sortDirStore = {
    get value() {
        return sortDir
    },
    set value(val) {
        sortDir = val === 'desc' ? 'desc' : 'asc'
    }
}

let playerCards = $state([])
export const playerCardsStore = {
    get value() {
        return playerCards
    },
    get totalCount() {
        return playerCards.reduce((accumulator, currentCard) => accumulator + currentCard.count, 0)
    },
    get totalValue() {
        const total_value = playerCards.reduce((accumulator, currentCard) => accumulator + (currentCard.price * currentCard.count), 0)
        return Math.round(total_value * 100) / 100
    },
    get hasDuplicates() {
        return playerCards.filter((card) => card.count > 1).length > 0
    },
    get hasCardsAtOrBelowValue() {
        return playerCards.filter((card) => card.price <= AtOrBelowAmountStore.value).length > 0
    },
    set value(val) {
        playerCards = val
    },
    addCards(cards) {
        if (!Array.isArray(cards)) return

        cards.forEach((card) => {
            const ix = playerCards.findIndex((c) => c.hash === card.hash)

            if (ix >= 0) {
                playerCards[ix].count++
            } else {
                playerCards.push(card)
            }
        })
    },
    sell(card) {
        const ix = playerCards.findIndex((c) => c.hash === card.hash)

        if (ix >= 0) {
            const found_card = playerCards[ix]

            if (found_card.count > 1) { // duplicate, decrement the count
                playerCards[ix].count--
            } else { // unique, remove it from the collection
                playerCards.splice(ix, 1)
            }

            money += found_card.price
        }
    },
    sellAll() {
        money += playerCardsStore.totalValue
        playerCards = []
    },
    sellDuplicates() {
        playerCards.forEach((card) => {
            if (card.count > 1) playerCardsStore.sellCopies(card, parseInt(card.count - 1, 10))
        })
    },
    sellAtOrBelow() {
        const at_or_below_cards = []
        const remaining_cards = []

        playerCards.forEach((card, ix) => {
            if (card.price <= AtOrBelowAmountStore.value) {
                at_or_below_cards.push(playerCards[ix])

                money += card.price * card.count
            } else {
                remaining_cards.push(playerCards[ix])
            }
        })

        playerCards = remaining_cards
    },
    // sell 1+ copies of a card
    sellCopies(card, copies = 1) {
        const ix = playerCards.findIndex((c) => c.hash === card.hash)

        if (ix >= 0) {
            const found_card = playerCards[ix]
            let total_amount = 0

            // sell 1+ copies of this card
            if (copies > 0 && copies <= found_card.count) {
                total_amount = found_card.price * copies

                playerCards[ix].count -= copies
            }

            money += total_amount
        }
    },
    sort() {
        switch (sortBy) {
            case 'id':
                return sortDir === 'asc'
                    ? playerCards.sort((a, b) => b.id - a.id)
                    : playerCards.sort((a, b) => a.id - b.id)
            case 'rarity': // probability = rarity + foil
                return sortDir === 'asc'
                    ? playerCards.sort((a, b) => b.probability - a.probability)
                    : playerCards.sort((a, b) => a.probability - b.probability)
            case 'price':
                return sortDir === 'asc'
                    ? playerCards.sort((a, b) => a.price - b.price)
                    : playerCards.sort((a, b) => b.price - a.price)
            case 'count':
                return sortDir === 'asc'
                    ? playerCards.sort((a, b) => a.count - b.count)
                    : playerCards.sort((a, b) => b.count - a.count)
            default: return playerCards
        }
    }
}
