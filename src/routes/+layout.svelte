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
    :global(.windows ::-webkit-scrollbar) {
        width: 13px;
    }
    
    :global(.windows ::-webkit-scrollbar-track) {
    background: transparent; 

    border-radius: 0px;
    }
    
    :global(.windows ::-webkit-scrollbar-thumb) {
    background: #4d4c4c;
    border-radius: 10px;
    box-shadow: inset 2px 2px 2px hsla(0, 0%, 100%, 0.08),
                inset -2px -2px 2px rgba(0, 0, 0, 0.08);
    }

    :global(.windows ::-webkit-scrollbar-thumb:hover) {
    background: #3a3a3a;
    }

</style>