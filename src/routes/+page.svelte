<script lang="ts">
    import { onMount, tick } from 'svelte';
    import HeroSection from './HeroSection.svelte';
    let SponsorsSection: ConstructorOfATypedSvelteComponent | null = null;
    let ContactSection: ConstructorOfATypedSvelteComponent | null = null;


    let showContent = false;
    export let data;


    onMount(async () => {
        SponsorsSection = (await import('./SponsorsSection.svelte')).default;
        showContent = true;
        await tick();
        setTimeout(async () => {
            ContactSection = (await import('./ContactSection.svelte')).default;
        }, 700);
    });

</script>

<!-- Side-spesifikk tittel -->
<svelte:head>
    <title>Elvebakkenrevyen 2025</title>
</svelte:head>

<!-- Rendrer alle komponentene med en main tag. -->
<!-- Bruker litt annen syntaks for å lazy loade SponsorsSection og ContactSection. -->
<main>
    <HeroSection {showContent}/>
    {#if SponsorsSection}
        <svelte:component this={SponsorsSection} {showContent}/>    
    {/if}
    {#if ContactSection}
        <svelte:component this={ContactSection} {data} {showContent}/>
    {/if}
</main>

<style nonce="%sveltekit.nonce%">
    main {
        height: auto;
        overflow-x: hidden;
    }
</style>