<script lang="ts">
	import { onMount } from 'svelte';
	import LogIn from './LogIn.svelte';
	
	export let data;

	onMount(() => {
		document.body.style.overflow = 'auto';
	});
</script>

<svelte:head>
	<title>Elvebakkenrevyen - Logg inn</title>
</svelte:head>

<main>
	<LogIn {data} />
</main>