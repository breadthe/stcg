<script>
	import { moneyStore, openedPacksStore, playerPacksStore, playerCardsStore, sortByStore, sortDirStore } from '$lib/store.svelte.js'
	import { stripFloat } from '$lib/utils'
</script>

<table>
	<thead>
		<tr>
			<th class="player-funds">Funds</th>
			<th class="player-packs">Packs</th>
			<th class="opened-packs">Opened</th>
			<th class="total-cards">Cards</th>
			<th class="unique-cards">Unique</th>
			<th class="total-value">Value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td class="player-funds">${stripFloat(moneyStore.value)}</td>
			<td class="player-packs">
				<span class="common-fg" title="Common packs">{playerPacksStore.common}</span>
				/ <span class="rare-fg" title="Rare packs">{playerPacksStore.rare}</span>
				/ <span class="epic-fg" title="Epic packs">{playerPacksStore.epic}</span>
				/ <span class="legendary-fg" title="Legendary packs">{playerPacksStore.legendary}</span>
			</td>
			<td class="opened-packs">
				<span class="common-fg" title="Common packs">{openedPacksStore.common}</span>
				/ <span class="rare-fg" title="Rare packs">{openedPacksStore.rare}</span>
				/ <span class="epic-fg" title="Epic packs">{openedPacksStore.epic}</span>
				/ <span class="legendary-fg" title="Legendary packs">{openedPacksStore.legendary}</span>
			</td>
			<td class="total-cards">{playerCardsStore.totalCount}</td>
			<td class="unique-cards">{playerCardsStore.value.length}</td>
			<td class="total-value">${playerCardsStore.totalValue}</td>
		</tr>
	</tbody>
</table>

<style>
	table {
		border: 1px solid black;
		border-radius: 4px;
		box-shadow:
			2px 2px 5px rgba(0, 0, 0, 0.1),
			1px 1px 3px rgba(0, 0, 0, 0.3),
			2px 2px 5px rgba(255, 255, 255, 0.1) inset,
			0px 0px 7px rgba(255, 255, 255, 0.3) inset;

		width: 100%;
		font-family: monospace;
		border-spacing: 0;
	}

	th {
		width: calc(100%/6);
		padding: 0 0.5rem;
		text-transform: uppercase;
		font-weight: 400;
		text-align: right;
	}

	td {
		padding: 0 0.5rem;
		text-align: right;
		font-size: 2em;
	}

	.player-funds {
		color: white;
		background-color: goldenrod;
	}
	.player-packs {
		color: white;
		background-color: turquoise;
	}
	.opened-packs {
		color: white;
		background-color: yellowgreen;
	}
	.total-cards {
		color: white;
		background-color: slateblue;
	}
	.unique-cards {
		color: white;
		background-color: salmon;
	}
	.total-value {
		color: white;
		background-color: deeppink;
	}
</style>
