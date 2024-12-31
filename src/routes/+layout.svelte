<script lang="ts">
    import '../app.css';

    import { onMount } from 'svelte';
    import Footer from './Footer.svelte';
    import Header from './Header.svelte';
    import Lenis from 'lenis'

    
    let { children } = $props();

</script>

<Header />
{@render children()}
<Footer />    


<style>
</style>