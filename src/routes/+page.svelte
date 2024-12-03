<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    import HeroSection from './HeroSection.svelte';
    import Footer from './Footer.svelte';
</script>

<svelte:head>
    <title>Elvebakkenrevyen 2025</title>
    <meta name="description" content="Nedtelling for Elvebakkenrevyen 2025" />
</svelte:head>

<main>
    <HeroSection />
    <Footer />
</main>