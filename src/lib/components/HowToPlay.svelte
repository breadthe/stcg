<script>
    let show = $state(false)
</script>

<section>
    <h3>
        How to play
        <button type="button" onclick="{() => show = !show}">{ show ? 'hide' : 'show' }</button>
    </h3>

    {#if show}
        <aside>
            <p>STCG is a simple <strong>Trading Card Game</strong>. The "S" stands for Svelte.</p>
            <p>A very loose objective is to open <strong>card packs</strong> and build a <strong>collection</strong> of <strong>unique cards</strong>.</p>
            <p>Each new game starts with $1000 in <strong>funds</strong>.</p>
            <p>You can use the money to buy 4 types of card packs, each progressively more expensive: Common, Rare, Epic, Legendary. Pack quality influences the <strong>probability</strong> of getting <strong>rare cards</strong>.</p>
            <p>Once you've bought at least 1 pack, you can open it. The cards from the last pack you've opened are listed under <strong>Current pack</strong> and are also added to your <strong>Collection</strong> in chronological order.</p>
            <p>You can <strong>sort</strong> your Collection by various criteria, in descending or ascending order.</p>
            <p>Underneath each card in the Collection there is an indicator of how many copies of that card you have (1x, 2x, etc), the card's value, and a button to <strong>sell</strong> it.</p>
            <p>You can also sell <strong>all</strong> the cards or just the <strong>duplicates</strong>.</p>
            <p>At the top of the screen you can see a variety of stats:</p>
            <ul>
                <li><strong>Funds</strong> - the total money you have, that you can use to buy packs.</li>
                <li><strong>Packs</strong> - how many unopened packs of each type you have.</li>
                <li><strong>Opened</strong> - how many packs of each type you've opened.</li>
                <li><strong>Cards</strong> - total number of cards in your Collection (includes duplicates).</li>
                <li><strong>Unique</strong> - total number of unique cards in your Collection (excludes duplicates).</li>
                <li><strong>Value</strong> - the total value of your Collection.</li>
            </ul>
            <p>Card rarities are as follows (from most to least rare):</p>
            <ul>
                <li><strong>Full Art</strong></li>
                <li><strong>EX</strong></li>
                <li><strong>Gold</strong></li>
                <li><strong>Silver</strong></li>
                <li><strong>First Edition</strong></li>
                <li>-no quality-</li>
            </ul>
            <p>In addition, a card that rolls with <strong>Foil</strong> is rarer than the non-Foil variant. So a Full Art Foil is rarer (and more valuable) than a simple Full Art.</p>
            <p>Finally, certain named cards are also intrinsically rarer. You can peek at the code to find out which, but a good indicator is the higher price compared to another card with similar stats.</p>
            <p>When you get bored or reach an impasse (no more funds), you can <strong>reset</strong> the game and start fresh.</p>
        </aside>
    {/if}
</section>

<style>
    aside {
        /* font-family: monospace; */
        padding: 1em;
        background-color:cornsilk;
        border: 1px solid black;
        border-radius: 4px;
        box-shadow:
			2px 2px 5px rgba(0, 0, 0, 0.1),
			1px 1px 3px rgba(0, 0, 0, 0.3),
			2px 2px 5px rgba(255, 255, 255, 0.1) inset,
			0px 0px 7px rgba(255, 255, 255, 0.3) inset;
    }
</style>
