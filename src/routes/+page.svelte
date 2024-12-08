<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    import HeroSection from './HeroSection.svelte';
    import Footer from './Footer.svelte';
</script>

<svelte:head>
    <title>Elvebakkenrevyen 2025</title>
</svelte:head>

<main>
    <HeroSection />
    <Footer />
</main>

<style>
    main {
        scroll-snap-type: y mandatory;
        overflow-y: scroll;
        height: auto;
    }
</style>