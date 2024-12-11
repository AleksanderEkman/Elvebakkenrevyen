<script lang="ts">
    import { onMount } from 'svelte';
    import { superForm } from 'sveltekit-superforms';
    import { goto } from '$app/navigation';
    
    import HeroSection from './HeroSection.svelte';
    import SponsorsSection from './SponsorsSection.svelte';
    import ContactSection from './ContactSection.svelte';

    let showContent = false;
    let csrfToken: string;
    export let data;


    onMount(async () => {
        showContent = true;
        try {
            const response = await fetch('/api/csrf-token');
            if (!response.ok) {
                throw new Error('Failed to fetch CSRF token');
            }
            const data = await response.json();
            csrfToken = data.token; // Assuming your API returns { token: 'your-csrf-token' }

        } catch (error) {
            console.error(error);
        }
    });

</script>

<svelte:head>
    <title>Elvebakkenrevyen 2025</title>
</svelte:head>

<main>

    <HeroSection {showContent}/>
    <SponsorsSection {showContent}/>    
    <ContactSection {csrfToken} {data} {showContent}/>
</main>

<style nonce="%sveltekit.nonce%">
    main {
        height: auto;
        overflow-x: hidden;
    }

</style>