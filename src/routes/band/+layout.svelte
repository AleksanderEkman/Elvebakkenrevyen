<script lang="ts">
    import '../../app.css';
    import { onMount } from 'svelte';
    import Footer from '../Footer.svelte';
    import Header from '../Header.svelte';
    import NavigatorSubmenu from '../NavigatorSubmenu.svelte';
    
    let activePath = "band";

    let { children } = $props();

</script>


<NavigatorSubmenu {activePath} />
{@render children()}


<style>
</style>