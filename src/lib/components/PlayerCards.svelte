<script>
	import Card from './Card.svelte'

	import { playerCardsStore, sortByStore, sortDirStore } from '$lib/store.svelte.js'

	function sellCard(card) {
		playerCardsStore.sell(card)
	}

	function sortBy(param) {
		sortByStore.value = param
		playerCardsStore.sort()
	}

	function sortDirAsc() {
		sortDirStore.value = 'asc'
		playerCardsStore.sort()
	}

	function sortDirDesc() {
		sortDirStore.value = 'desc'
		playerCardsStore.sort()
	}

	// auto-sorts the collection by the selected criteria as new cards are added
	$effect((sortDirStore, sortByStore) => {
		playerCardsStore.sort()
	})
</script>

{#if playerCardsStore.value.length}
	<hr>

	<header>
			<strong>Collection</strong>
			<small>{playerCardsStore.totalCount} cards ({playerCardsStore.value.length} unique)</small>
	</header>

	<nav>
			<span>Sort by:</span>
			<span class="button-group">
				<button type="button" onclick={() => sortBy('id')} disabled={sortByStore.value === 'id'}>added</button>
				<button type="button" onclick={() => sortBy('rarity')} disabled={sortByStore.value === 'rarity'}>rarity</button>
				<button type="button" onclick={() => sortBy('price')} disabled={sortByStore.value === 'price'}>price</button>
				<button type="button" onclick={() => sortBy('count')} disabled={sortByStore.value === 'count'}>count</button>
			</span>

			&nbsp;&nbsp;
			<span class="button-group">
				<button type="button" onclick={sortDirAsc} disabled={sortDirStore.value === 'asc'}>&uarr;</button>
				<button type="button" onclick={sortDirDesc} disabled={sortDirStore.value === 'desc'}>&darr;</button>
			</span>
	</nav>

	<br>

	<section class="player-cards-wrapper">
		{#each playerCardsStore.value as card}
			<div class="player-card-wrapper">
				<Card {card} />

				<div class="player-cards-value">
					<span>{card.count}&times;</span>
					<span class="dollar-amount">${card.price}</span>
				</div>

				<button type="button" onclick={() => sellCard(card)} class="button-sell w-full">sell</button>
			</div>
		{/each}
	</section>
{/if}

<style>
	nav {
		display: flex;
		gap: 1em;
	}

	.button-group {
		display: inline-flex;
	}
	.button-group button {
		border-radius: 0;
	}
	.button-group button:last-child {
		border-radius: 0 4px 4px 0;
	}
	.button-group button:first-child {
		border-radius: 4px 0 0 4px;
	}

	.player-cards-wrapper {
		display: flex;
		flex-wrap: wrap;
		gap: 1.5rem;
		overflow: auto;
	}
    @media (min-width: 640px) {
        .player-cards-wrapper {
            gap: 2rem;
        }
    }

	.player-cards-value {
		display: flex;
		justify-content: space-between;
		padding: 0 0.5em;
	}
</style>
