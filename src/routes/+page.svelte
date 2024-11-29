<script>
	import { stripFloat } from '$lib/utils'
	import { Pack } from '$lib/Pack.js'
	import BuyOpen from '$lib/components/BuyOpen.svelte'
	import CurrentPack from '$lib/components/CurrentPack.svelte'
	import PlayerCards from '$lib/components/PlayerCards.svelte'
	import Stats from '$lib/components/Stats.svelte'
	import HowToPlay from '$lib/components/HowToPlay.svelte'
	import Credits from '$lib/components/Credits.svelte'
	import SellBulk from '$lib/components/SellBulk.svelte';
	import Reset from '$lib/components/Reset.svelte';
	// import Changelog from '$lib/components/Changelog.svelte'
	// import Showcase from '$lib/components/Showcase.svelte'

</script>

<Stats />

<br>

<BuyOpen />

<nav class="command-bar">
    <Reset />
</nav>

<SellBulk />

<br>

<CurrentPack />

<PlayerCards />

<hr>

<footer>
    <HowToPlay />

    <Credits />
	<!-- <Showcase /> -->

	<!-- <hr> -->

	<!-- <Changelog /> -->
</footer>

<style>
	:root {
		--indigo-900: rgb(49, 46, 129);
		--indigo-950: rgb(30, 27, 75);
		--indigo-950-semi: rgba(30, 27, 75, 0.5);
	}

	:global(.w-full) {
		width: 100%;
	}

	:global(.dollar-amount) {
		color: goldenrod;
	}

	:global(.common-fg) {
		color: green;
	}
	:global(.rare-fg) {
		color: blue;
	}
	:global(.epic-fg) {
		color: purple;
	}
	:global(.legendary-fg) {
		color: darkorange;
	}

	:global(button) {
		border: 1px solid black;
		border-radius: 4px;

		box-shadow:
			2px 2px 5px rgba(0, 0, 0, 0.1),
			1px 1px 3px rgba(0, 0, 0, 0.3),
			2px 2px 5px rgba(255, 255, 255, 0.1) inset,
			0px 0px 7px rgba(255, 255, 255, 0.3) inset;
		position: relative;
		padding: 2px 10px;
	}

	:global(button:not(:disabled):hover) {
		text-shadow: 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.2);
		border: 1px solid rgba(0, 0, 0, 0.25);
		outline: solid 2px greenyellow;
	}

	:global(button:disabled) {
		opacity: 25%;
		box-shadow: none;
	}

	:global(.button-sell) {
		background-color: aquamarine;
	}

	.command-bar {
		display: flex;
		justify-content: space-between;
	}
</style>
