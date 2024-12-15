<script lang="ts">
    import '../app.css';
    import { onMount } from 'svelte';
    let { children } = $props();
    import Footer from './Footer.svelte';
    import Scrollbar from 'smooth-scrollbar';

    let scrollbar: Scrollbar;

    onMount(() => {
        const userAgent = navigator.userAgent;
        const mobile = userAgent.includes('Mobile');
        if (!mobile) {
            const scrollContainer = document.querySelector('.scroll-container') as HTMLElement;
            if (scrollContainer) {
                scrollbar = Scrollbar.init(scrollContainer, {
                    damping: 0.025,
                    thumbMinSize: 30,
                    renderByPixels: false,
                    alwaysShowTracks: false,
                    continuousScrolling: false
                });
            }

            return () => {
                if (scrollbar) {
                    scrollbar.destroy();
                }
            };
        }
    });
</script>

<div class="scroll-container">
    {@render children()}
    <Footer />    
</div>

<style>
    .scroll-container {
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
    @media (max-width: 540px) {
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