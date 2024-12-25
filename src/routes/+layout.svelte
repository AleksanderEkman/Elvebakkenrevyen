<script lang="ts">
    import '../app.css';

    import { onMount } from 'svelte';
    import Footer from './Footer.svelte';
    import Header from './Header.svelte';
    import Lenis from 'lenis'
    import 'lenis/dist/lenis.css'
    
    let { children } = $props();
    let showContent = $state(false);
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
        showContent = true;
    });
</script>

<Header />
{@render children()}
<Footer {showContent} />    


<style>
</style>