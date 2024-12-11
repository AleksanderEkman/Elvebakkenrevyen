<script lang="ts">
    import { onMount } from 'svelte';
    import { superForm } from 'sveltekit-superforms';
    import { goto } from '$app/navigation';
    
    import HeroSection from './HeroSection.svelte';
    import SponsorsSection from './SponsorsSection.svelte';
    import ContactSection from './ContactSection.svelte';

    let showContent = false;
    export let data;

    onMount(() => {
        showContent = true;
    });

</script>

<svelte:head>
    <title>Elvebakkenrevyen 2025</title>
</svelte:head>

<main>

    <HeroSection {showContent}/>
    <SponsorsSection {showContent}/>    
    <ContactSection {data} {showContent}/>
</main>

<style nonce="%sveltekit.nonce%">
    main {
        height: auto;
        overflow-x: hidden;
    }

</style>