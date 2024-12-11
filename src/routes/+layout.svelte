<script lang="ts">
    import '../app.css';
	let { children } = $props();
    import Footer from './Footer.svelte';

    const windowsOS = navigator.userAgent.includes('Win');
    console.log(navigator.userAgent);
    if (windowsOS) {
        document.body.classList.add('windows');
    }
</script>

{@render children()}
<Footer />

<style>

</style>