<script lang="ts">
    import '../app.css';
    import { onMount } from 'svelte';
    let { children } = $props();
    import Footer from './Footer.svelte';
    import Lenis from 'lenis'
    import 'lenis/dist/lenis.css'

    // Kun for Windows, bruker en custom scrollbar som gir mer smooth scrolling
    onMount(() => {
        // Bruker userAgent til å sjekke enheten som brukeren er på
        const userAgent = navigator.userAgent;
        const mobileOrMac = (userAgent.includes('Mobile') || userAgent.includes('Mac'));
        if (!mobileOrMac) {
            window.scrollTo(0, 0)
            const lenis = new Lenis({
                autoRaf: true,
            });
        }   
    });
</script>


{@render children()}
<Footer />    


<style>

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
</style>