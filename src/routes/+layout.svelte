<script lang="ts">
    import '../app.css';
    import { onMount } from 'svelte';
    let { children } = $props();
    import Footer from './Footer.svelte';
    import Lenis from 'lenis'
    import 'lenis/dist/lenis.css'

    // Kun for Windows, bruker en custom scrollbar som gir mer smooth scrolling

    onMount(() => {
        window.scrollTo(0, 0)
        // Bruker userAgent til å sjekke enheten som brukeren er på
        const userAgent = navigator.userAgent;
        const mobileOrMac = (userAgent.includes('Mobile') || userAgent.includes('Mac'));
        if (!mobileOrMac) {
            const lenis = new Lenis({
                autoRaf: true,
            });
        }   
    });
</script>

<!-- Denne scroll-containeren er en wrapper for alle komponentene -->
<div class="scroll-container">
    {@render children()}
    <Footer />    
</div>

<style>
    .scroll-container {
        height: auto;
        overflow: hidden;
    }
    :global(.scroll-container .scrollbar-track) {
        background: transparent;
        width: 15px;
    }
    :global(.scroll-container .scrollbar-thumb) {
        background-color: #888;
        width: 15px;
        border-radius: 10px;
        box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
    }
    @media (max-width: 1450px) {
        .scroll-container {
            height: auto;
        }
        :global(.scroll-container .scrollbar-track) {
            width: 8px;
        }
        :global(.scroll-container .scrollbar-thumb) {
            width: 8px;
        }
    }
</style>