<script>
	import { stripFloat } from '$lib/utils'
	import { Pack } from '$lib/Pack.js'
	import Card from './Card.svelte'
	import PlayerCards from './PlayerCards.svelte'
	import Stats from './Stats.svelte'

	import { packPriceStore, moneyStore, currentPackStore, openedPacksStore, playerPacksStore, playerCardsStore } from '$lib/store.svelte.js'

	let max_common_packs_that_can_be_bought = $derived(Math.floor(moneyStore.value / packPriceStore.common))
	let max_rare_packs_that_can_be_bought = $derived(Math.floor(moneyStore.value / packPriceStore.rare))
	let max_epic_packs_that_can_be_bought = $derived(Math.floor(moneyStore.value / packPriceStore.epic))
	let max_legendary_packs_that_can_be_bought = $derived(Math.floor(moneyStore.value / packPriceStore.legendary))
	let max_mythic_packs_that_can_be_bought = $derived(Math.floor(moneyStore.value / packPriceStore.mythic))

	function buyPack(quality) {
		const pack_price = getPackPrice(quality)

		if (moneyStore.sub(pack_price)) {
			playerPacksStore[quality]++
		}
	}

	function buyAll(quality) {
		const pack_price = getPackPrice(quality)

		switch (quality) {
			case 'common':
				const tmp_max_common_packs_that_can_be_bought = max_common_packs_that_can_be_bought
				if (moneyStore.sub(parseInt(tmp_max_common_packs_that_can_be_bought * pack_price, 10))) {
					playerPacksStore.common += tmp_max_common_packs_that_can_be_bought
				}
				break
			case 'rare':
				const tmp_max_rare_packs_that_can_be_bought = max_rare_packs_that_can_be_bought
				if (moneyStore.sub(parseInt(tmp_max_rare_packs_that_can_be_bought * pack_price, 10))) {
					playerPacksStore.rare += tmp_max_rare_packs_that_can_be_bought
				}
				break
			case 'epic':
				const tmp_max_epic_packs_that_can_be_bought = max_epic_packs_that_can_be_bought
				if (moneyStore.sub(parseInt(tmp_max_epic_packs_that_can_be_bought * pack_price, 10))) {
					playerPacksStore.epic += tmp_max_epic_packs_that_can_be_bought
				}
				break
			case 'legendary':
				const tmp_max_legendary_packs_that_can_be_bought = max_legendary_packs_that_can_be_bought
				if (moneyStore.sub(parseInt(tmp_max_legendary_packs_that_can_be_bought * pack_price, 10))) {
					playerPacksStore.legendary += tmp_max_legendary_packs_that_can_be_bought
				}
				break
			case 'mythic':
				const tmp_max_mythic_packs_that_can_be_bought = max_mythic_packs_that_can_be_bought
				if (moneyStore.sub(parseInt(tmp_max_mythic_packs_that_can_be_bought * pack_price, 10))) {
					playerPacksStore.mythic += tmp_max_mythic_packs_that_can_be_bought
				}
				break
			default: return
		}
	}

	function getPackPrice(quality) {
		return packPriceStore[quality]
	}

	function openPack(quality) {
		if (playerPacksStore[quality] === 0) return

		playerPacksStore[quality]--

		currentPackStore.value = new Pack({series: 'Basic', quality: quality, title: 'Basic Pack'})

		openedPacksStore[quality]++

		// unpack
		playerCardsStore.addCards(currentPackStore.value.cards)
	}

	function openAll(quality) {
		let total_packs = 0

		total_packs = playerPacksStore[quality]

		for (let i = 0; i < total_packs; i++) {
			openPack(quality)
		}
	}
</script>

<table>
	<thead>
		<tr>
			<th>&nbsp;</th>
			<th class="common-fg">Common Pack ${packPriceStore.common}</th>
			<th class="rare-fg">Rare Pack ${packPriceStore.rare}</th>
			<th class="epic-fg">Epic Pack ${packPriceStore.epic}</th>
			<th class="legendary-fg">Legendary Pack ${packPriceStore.legendary}</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th align="right">Buy</th>
			<td class="">
				<button type="button" onclick={() => buyPack('common')} class="button-buy-common" disabled={moneyStore.value < packPriceStore.common}>1 pack</button>
				<button type="button" onclick={() => buyAll('common')} class="button-buy-common" disabled={moneyStore.value < packPriceStore.common}>{max_common_packs_that_can_be_bought} packs ${parseInt(max_common_packs_that_can_be_bought * packPriceStore.common, 10)}</button>
			</td>
			<td class="">
				<button type="button" onclick={() => buyPack('rare')} class="button-buy-rare" disabled={moneyStore.value < packPriceStore.rare}>1 pack</button>
				<button type="button" onclick={() => buyAll('rare')} class="button-buy-rare" disabled={moneyStore.value < packPriceStore.rare}>{max_rare_packs_that_can_be_bought} packs ${parseInt(max_rare_packs_that_can_be_bought * packPriceStore.rare, 10)}</button>
			</td>
			<td class="">
				<button type="button" onclick={() => buyPack('epic')} class="button-buy-epic" disabled={moneyStore.value < packPriceStore.epic}>1 pack</button>
				<button type="button" onclick={() => buyAll('epic')} class="button-buy-epic" disabled={moneyStore.value < packPriceStore.epic}>{max_epic_packs_that_can_be_bought} packs ${parseInt(max_epic_packs_that_can_be_bought * packPriceStore.epic, 10)}</button>
			</td>
			<td class="">
				<button type="button" onclick={() => buyPack('legendary')} class="button-buy-legendary" disabled={moneyStore.value < packPriceStore.legendary}>1 pack</button>
				<button type="button" onclick={() => buyAll('legendary')} class="button-buy-legendary" disabled={moneyStore.value < packPriceStore.legendary}>{max_legendary_packs_that_can_be_bought} packs ${parseInt(max_legendary_packs_that_can_be_bought * packPriceStore.legendary, 10)}</button>
			</td>
		</tr>
		<tr>
			<th align="right">Open</th>
			<td class="">
				<button type="button" onclick={() => openPack('common')} class="button-open-common" disabled={playerPacksStore.common === 0}>1 pack</button>
				<button type="button" onclick={() => openAll('common')} class="button-open-common" disabled={playerPacksStore.common === 0}>all {playerPacksStore.common ? playerPacksStore.common : ''} packs</button>
			</td>
			<td class="">
				<button type="button" onclick={() => openPack('rare')} class="button-open-rare" disabled={playerPacksStore.rare === 0}>1 pack</button>
				<button type="button" onclick={() => openAll('rare')} class="button-open-rare" disabled={playerPacksStore.rare === 0}>all {playerPacksStore.rare ? playerPacksStore.rare : ''} packs</button>
			</td>
			<td class="">
				<button type="button" onclick={() => openPack('epic')} class="button-open-epic" disabled={playerPacksStore.epic === 0}>1 pack</button>
				<button type="button" onclick={() => openAll('epic')} class="button-open-epic" disabled={playerPacksStore.epic === 0}>all {playerPacksStore.epic ? playerPacksStore.epic : ''} packs</button>
			</td>
			<td class="">
				<button type="button" onclick={() => openPack('legendary')} class="button-open-legendary" disabled={playerPacksStore.legendary === 0}>1 pack</button>
				<button type="button" onclick={() => openAll('legendary')} class="button-open-legendary" disabled={playerPacksStore.legendary === 0}>all {playerPacksStore.legendary ? playerPacksStore.legendary : ''} packs</button>
			</td>
		</tr>
	</tbody>
</table>

<style>
	table {
		border-collapse: collapse;
	}
	table td {
		padding: 0.2em 0.5em;
	}

	.button-buy-common {
		color: black;
		background-color: lightgreen;
	}
	.button-buy-rare {
		color: white;
		background-color: dodgerblue;
	}
	.button-buy-epic {
		color: white;
		background-color: violet;
	}
	.button-buy-legendary {
		color: black;
		background-color: moccasin;
	}

	.button-open-common {
		color: white;
		background-color: green;
	}
	.button-open-rare {
		color: white;
		background-color: blue;
	}
	.button-open-epic {
		color: white;
		background-color: purple;
	}
	.button-open-legendary {
		color: white;
		background-color: darkorange;
	}
</style>
