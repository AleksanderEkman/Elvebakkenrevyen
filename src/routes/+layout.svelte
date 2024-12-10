<script lang="ts">
    import '../app.css';
	let { children } = $props();
    import Footer from './Footer.svelte';
</script>

{@render children()}
<Footer />

<style>

</style>