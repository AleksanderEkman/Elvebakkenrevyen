<script lang="ts">
    import '../app.css';
    import { onMount } from 'svelte';
	let { children } = $props();
    import Footer from './Footer.svelte';
    import { ScrollWrapper } from '@shentohendriks/svelte-smoothscroll';

    let lenisOptions: {
        lerp: 0.1,
        duration: 1,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: false,
        smoothTouch: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        normalizeWheel: true
    }
    onMount(() => {

    });
</script>

<ScrollWrapper settings={lenisOptions}>
    {@render children()}
    <Footer />    
</ScrollWrapper>


<style>
    :global(::-webkit-scrollbar) {
       width: 0;
    }

</style>