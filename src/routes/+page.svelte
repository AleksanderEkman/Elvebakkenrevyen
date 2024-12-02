<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    import HeroSection from './HeroSection.svelte';
    import Footer from './Footer.svelte';
</script>

<svelte:head>
    <title>Elvebakkenrevyen 2025</title>
    <meta name="description" content="Nedtelling for Elvebakkenrevyen 2025" />
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"/>
</svelte:head>

<main>
    <HeroSection />
    <Footer />
</main>