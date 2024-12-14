<script lang="ts">
    import '../app.css';
    import { onMount } from 'svelte';
	let { children } = $props();
    import Footer from './Footer.svelte';
    import { ScrollWrapper } from '@shentohendriks/svelte-smoothscroll';
    let lenisOptions: {
        wrapper: window,
        content: document.documentElement,
        lerp: 0.1,
        duration: 1.2,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        smoothTouch: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        normalizeWheel: true
    }
</script>


<ScrollWrapper settings={lenisOptions}>
    {@render children()}
    <Footer />    
</ScrollWrapper>
<style>
    /*  */
</style>