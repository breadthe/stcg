<script>
	import { cardRarityLabel } from '../utils.js'

	let { card } = $props()
</script>

<div class="card-outer"
	class:border-silver={card.rarity === 2}
	class:border-gold={card.rarity === 3}
	class:border-transparent={card.rarity === 5}
	class:full-art={card.rarity === 5}
	>
	<div class="card-middle"
		class:border-silver={card.rarity === 1 || card.rarity === 2}
		class:border-gold={card.rarity === 3 || card.rarity === 4}
		class:border-transparent={card.rarity === 5}
		>
		<div class="card-inner"
			class:border-silver={card.rarity === 2}
			class:border-gold={card.rarity === 3}
			class:border-transparent={card.rarity === 5}
			>
			<small
				class="sequence"
				title="Sequence"
			>{card.sequence}</small>

			<div class="overlay"
				class:foil={card.foil && [0, 1, 4].includes(card.rarity)}
				class:silver-foil={card.foil && card.rarity === 2}
				class:gold-foil={card.foil && card.rarity === 3}
				class:full-art-foil={card.foil && card.rarity === 5}
				style:margin={card.rarity === 5 && card.foil ? '-7px' : '0'}
				style:border-radius={card.rarity === 5 && card.foil ? '4px' : '0'}
			>
				<main>
					<header>
						<strong title={card.title}>{card.title}</strong>
					</header>
					<!-- <small>{card.series}</small> -->

					<small class="rarity-label">
						{#if card.rarity}
								{cardRarityLabel(card.rarity)}
						{:else}
							&nbsp;
						{/if}
					</small>

					<!-- vertical spacer  -->
					&nbsp;


					<!-- debug  -->
					<!-- <small class="">{card.probability * 100}%</small> -->
					<!-- <small class="">${card.price} ({card.price_multiplier}x)</small> -->

				</main>
			</div>
		</div>
	</div>
</div>



<style>
	.card-outer {
		display: inline-block;
		margin: 1px;
		border: 2px solid;
		border-color: var(--indigo-950);
		border-radius: 4px;
	}
	.card-middle {
		border: 3px solid;
		border-color: var(--indigo-950);
		border-radius: 1px;
	}
	.card-inner {
		position: relative;
		border: 2px solid;
		border-color: var(--indigo-950);
        min-width: 80px;
		aspect-ratio: 7/8;
        font-size: 0.85rem;
	}
    @media (min-width: 640px) {
        .card-inner {
	    	min-width: 100px;
            font-size: 1rem;
        }
    }

	.overlay {
		position: absolute;
		inset: 0;
		padding: 2px 7px;
		/* border-radius: 4px; */
	}
	.foil {
    background: linear-gradient(
        45deg,
        rgba(255, 0, 150, 1),
        rgba(0, 255, 255, 1),
        rgba(255, 255, 0, 1),
        rgba(0, 150, 255, 1),
        rgba(255, 0, 150, 1)
    );
    background-size: 200% 200%;
    animation: holo-gradient 3s ease infinite;
	}
	.silver-foil {
    background: linear-gradient(
        45deg,
        rgba(192, 192, 192, 1), /* Light silver */
        rgba(220, 220, 220, 1), /* Bright silver */
        rgba(169, 169, 169, 1), /* Darker silver */
        rgba(211, 211, 211, 1), /* Mid-tone silver */
        rgba(192, 192, 192, 1)  /* Light silver */
    );
    background-size: 200% 200%;
    animation: holo-gradient 3s ease infinite;
	}
	.gold-foil {
	    background: linear-gradient(
	        45deg,
	        rgba(255, 215, 0, 1),  /* Bright gold */
	        rgba(255, 223, 63, 1), /* Lighter gold */
	        rgba(218, 165, 32, 1), /* Deep gold */
	        rgba(255, 239, 148, 1), /* Pale gold */
	        rgba(255, 215, 0, 1)   /* Bright gold */
	    );
	    background-size: 200% 200%;
	    animation: holo-gradient 3s ease infinite;
	}
	.full-art-foil {
	    background: linear-gradient(
	        45deg,
	        rgba(250, 128, 114, 1),  /* Salmon */
	        rgba(255, 160, 122, 1),  /* Light salmon */
	        rgba(233, 87, 63, 1),    /* Deep salmon */
	        rgba(255, 182, 148, 1),  /* Pale salmon */
	        rgba(250, 128, 114, 1)   /* Salmon */
	    );
	    background-size: 200% 200%;
	    animation: holo-gradient 3s ease infinite;
	}
	/* Animation to create a shifting effect */
	@keyframes holo-gradient {
	    0% { background-position: 0% 50%; }
	    50% { background-position: 100% 50%; }
	    100% { background-position: 0% 50%; }
	}

	main {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
	}

	.rarity-label {
		/* flex: 1 1 0%; */
		display: block;
		text-align: center;
		text-transform: uppercase;
	}

	.border-silver {
		border-color: silver;
	}

	.border-gold {
		border-color: gold;
	}

	.border-transparent {
		border-color: transparent;
	}

	.full-art {
		border-color: transparent;
		background-color: salmon;
		color: white;
	}

	.sequence {
		position: absolute;
		bottom: 0;
		right: 0;
		z-index: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 100%;
		border-bottom-right-radius: 0;
		padding: 4px;
		min-width: 15px;
		height: 15px;
		background-color: rgba(0, 0, 0, 0.5);
		color: white;
		font-size: 0.8em;
		font-family: monospace;
	}
</style>
