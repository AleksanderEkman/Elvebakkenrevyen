<script lang="ts">
    import '../app.css';
    import { onMount } from 'svelte';
    let { children } = $props();
    import Footer from './Footer.svelte';
    import Scrollbar from 'smooth-scrollbar';

    // Kun for Windows, bruker en custom scrollbar som gir mer smooth scrolling
    let scrollbar: Scrollbar;

    onMount(() => {
        // Bruker userAgent til å sjekke enheten som brukeren er på
        const userAgent = navigator.userAgent;
        const mobileOrMac = (userAgent.includes('Mobile') || userAgent.includes('Mac'));
        if (!mobileOrMac) {
            const scrollContainer = document.querySelector('.scroll-container') as HTMLElement;
            if (scrollContainer) {
                // Initaliserer scrollbar hvis nettsiden ikke kjøres på mobil eller Mac
                scrollbar = Scrollbar.init(scrollContainer, {
                    // Instillinger for scrollbar, test ut
                    damping: 0.025,
                    thumbMinSize: 30,
                    renderByPixels: false,
                    alwaysShowTracks: false,
                    continuousScrolling: false
                });
            }

            return () => {
                if (scrollbar) {
                    // Destruerer scrollbar når komponenten unmountes
                    scrollbar.destroy();
                }
            };
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
        /* Må sette høyde til 100vh for smooth-scrollbar npm packagen */
        height: 100vh;
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