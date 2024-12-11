<script lang="ts">
    import '../app.css';
    import { onMount } from 'svelte';
	let { children } = $props();
    import Footer from './Footer.svelte';

    onMount(() => {
        const windowsOS = navigator.userAgent.includes('Windows');
        if (windowsOS) {
            document.documentElement.classList.add('windows');
        }
    });
</script>


{@render children()}
<Footer />    



<style>

</style>