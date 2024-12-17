<script lang="ts">
    import { onMount, tick } from 'svelte';
    import { superForm } from 'sveltekit-superforms';
    import { goto } from '$app/navigation';
    import HeroSection from './HeroSection.svelte';
    let SponsorsSection: ConstructorOfATypedSvelteComponent | null = null;
    let ContactSection: ConstructorOfATypedSvelteComponent | null = null;

    
    let showContent = false;
    export let data;


    onMount(async () => {
        SponsorsSection = (await import('./SponsorsSection.svelte')).default;
        ContactSection = (await import('./ContactSection.svelte')).default;
        await tick();

        showContent = true;
    });

</script>

<svelte:head>
    <title>Elvebakkenrevyen 2025</title>
</svelte:head>

<main>
    <svelte:component this={HeroSection} {showContent}/>
    {#if SponsorsSection && ContactSection}
        <svelte:component this={SponsorsSection} {showContent}/>    
        <svelte:component this={ContactSection} {data} {showContent}/>
    {/if}
</main>

<style nonce="%sveltekit.nonce%">
    main {
        height: auto;
        overflow-x: hidden;
    }

</style>