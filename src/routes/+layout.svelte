<script>
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
    <title>STCG</title>
</svelte:head>

{@render children()}
