<script lang="ts">
	import { onMount } from 'svelte';
	import LogIn from './logginn.svelte';

	export let data;

	onMount(() => {
		document.body.style.overflow = 'auto';
	});
</script>

<svelte:head>
	<title>BakkaDiffusion - Logg inn</title>
</svelte:head>

<main>
	<LogIn {data} />
</main>
