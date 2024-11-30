<script>
	import { AtOrBelowAmountStore, currentPackStore, playerCardsStore } from '$lib/store.svelte.js'
</script>

{#if playerCardsStore.value.length}
	<br>

	<div>
		<button type="button" onclick={() => playerCardsStore.sellAll()} class="button-sell">sell all</button>
		<button type="button" onclick={() => playerCardsStore.sellDuplicates()} disabled={!playerCardsStore.hasDuplicates} class="button-sell">sell duplicates</button>
		<button type="button" onclick={() => playerCardsStore.sellAtOrBelow()} disabled={!playerCardsStore.hasCardsAtOrBelowValue} class="button-sell">sell &lt;=</button>
        $ <input type="number" bind:value={AtOrBelowAmountStore.value} min="1" style="width: 60px" />
	</div>
{/if}
