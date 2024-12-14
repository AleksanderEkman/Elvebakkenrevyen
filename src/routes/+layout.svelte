<script lang="ts">
    import '../app.css';
    import { onMount } from 'svelte';
	let { children } = $props();
    import Footer from './Footer.svelte';


</script>

{@render children()}
<Footer />    

<style>
    /* */
</style>