<script>
	import { moneyStore, currentPackStore, openedPacksStore, playerPacksStore, playerCardsStore, sortByStore, sortDirStore } from '$lib/store.svelte.js'

    let is_resetting = false;

    function confirmReset() {

    }

	function reset() {
        is_resetting = false

        currentPackStore.value = null

		moneyStore.value = 1000

		openedPacksStore.common = 0
		openedPacksStore.rare = 0
		openedPacksStore.epic = 0
		openedPacksStore.legendary = 0
		openedPacksStore.mythic = 0

		playerCardsStore.value = []

		playerPacksStore.common = 0
		playerPacksStore.rare = 0
		playerPacksStore.epic = 0
		playerPacksStore.legendary = 0
		playerPacksStore.mythic = 0

		sortByStore.value = 'id'
		sortDirStore.value = 'desc'
	}
</script>

<div style="text-align:right; width:100%">
    <br>
    {#if is_resetting}
        Are you sure?
        <br>
        <em style="color: red">This wipes your collection and resets funds to ${moneyStore.value}!</em>
        <br><br>
        <button type="button" onclick={() => is_resetting = false}>oops, cancel</button>
        <button type="button" onclick={reset} class="button-reset">yep, reset</button>
    {:else}
    <button type="button" onclick={() => is_resetting = true} class="button-reset">reset</button>
    {/if}
</div>

<style>
	.button-reset {
		color: white;
		background-color: red;
	}
</style>
