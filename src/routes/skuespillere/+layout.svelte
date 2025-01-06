<script lang="ts">
	import '../../app.css';
	import NavigatorSubmenu from '../NavigatorSubmenu.svelte';

	let activePath = 'skuespillere';
	let { children } = $props();
</script>

<NavigatorSubmenu {activePath} />
{@render children()}

<style>
</style>
