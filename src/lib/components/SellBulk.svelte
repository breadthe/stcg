<script>
	import { currentPackStore, playerCardsStore } from '$lib/store.svelte.js'

	function sellAll() {
		playerCardsStore.sellAll()
	}

	function sellDuplicates() {
		playerCardsStore.sellDuplicates()
	}
</script>

{#if playerCardsStore.value.length}
	<br>

	<div>
		<button type="button" onclick={sellAll} class="button-sell">sell all</button>
		<button type="button" onclick={sellDuplicates} disabled={!playerCardsStore.hasDuplicates} class="button-sell">sell duplicates</button>
	</div>
{/if}
