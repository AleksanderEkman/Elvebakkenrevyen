<script lang="ts">
	import '../../app.css';
	import NavigatorSubmenu from '../NavigatorSubmenu.svelte';

	let activePath = 'dansere';
	let { children } = $props();
</script>

<NavigatorSubmenu {activePath} />
{@render children()}

<style>
</style>
