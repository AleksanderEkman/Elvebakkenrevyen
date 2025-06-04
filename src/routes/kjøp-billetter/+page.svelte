<script lang="ts">
	import PurchaseTickets from './PurchaseTickets.svelte';
	export let data;
</script>

<svelte:head>
	<title>Elvebakkenrevyen 2025 Kjøp Billetter</title>
	<link rel="canonical" href="https://www.elvebakkenrevyen.no/kjøp-billetter" />
</svelte:head>

<main>
    <!-- Overfører billettdata til billettkomponenten-->
	<PurchaseTickets {data} />
</main>
