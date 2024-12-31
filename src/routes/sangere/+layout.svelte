<script lang="ts">
    import '../../app.css';
    import { onMount } from 'svelte';
    import NavigatorSubmenu from '../NavigatorSubmenu.svelte';
    
    let activePath = "sangere";

    let { children } = $props();

</script>


<NavigatorSubmenu {activePath} />
{@render children()}


<style>
</style>