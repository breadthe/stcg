<script>
	import Card from './Card.svelte'
	import CurrentPack from './CurrentPack.svelte'
	import PlayerCards from './PlayerCards.svelte'


	import { currentPackStore, playerCardsStore } from '$lib/store.svelte.js'
</script>

{#if currentPackStore.value && playerCardsStore.value.length}
	<strong>Current pack</strong>
	<small>{currentPackStore.value.cards.length} cards</small>

	<div class="current-pack">
		{#each currentPackStore.value.cards as card}
			<Card {card} />
		{/each}
	</div>
{/if}

<style>
	.current-pack {
		display: flex;
        flex-wrap: wrap;
		gap: 1.5em;
	}
    @media (min-width: 640px) {
        .current-pack {
            gap: 2rem;
        }
    }

</style>
