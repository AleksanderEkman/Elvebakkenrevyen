<script lang="ts">
	import SignUp from './SignUp.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	import { onMount } from 'svelte';

	onMount(() => {
		document.body.style.overflow = 'auto';
	});
</script>

<svelte:head>
	<title>Elvebakkenrevyen - Registrer deg</title>
</svelte:head>

<main>
	<SignUp {data} />
</main>

<style lang="postcss">
</style>
