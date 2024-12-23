<script lang="ts">
    import { onMount, tick } from 'svelte';
    import HeroSection from './HeroSection.svelte';
    let SponsorsSection: ConstructorOfATypedSvelteComponent | null = null;
    let ContactSection: ConstructorOfATypedSvelteComponent | null = null;


    let showContent = false;
    export let data;

    let contactSection: HTMLElement;
    let footer: HTMLElement | null;

    const updateContactSectionHeight = () => {
        if (contactSection && footer) {
            const footerHeight = footer.offsetHeight;
            if (window.matchMedia('(min-width: 768px)').matches && !navigator.userAgent.includes('Mobile')) {
                console.log("run")
                contactSection.style.height = `calc(100svh - ${footerHeight}px + 1px)`;
            } else {
                contactSection.style.height = `auto`;
            }
        }
    };

    onMount(async () => {
        showContent = true;
        SponsorsSection = (await import('./SponsorsSection.svelte')).default;
        await tick();
        setTimeout(async () => {
            ContactSection = (await import('./ContactSection.svelte')).default;
        }, 1000);

        footer = document.querySelector('footer');
        updateContactSectionHeight();
    });

</script>

<!-- Side-spesifikk tittel -->
<svelte:head>
    <title>Elvebakkenrevyen 2025</title>
</svelte:head>

<!-- Rendrer alle komponentene med en main tag. -->
<!-- Bruker litt annen syntaks for å lazy loade SponsorsSection og ContactSection. -->
<main>
    <HeroSection {showContent}/>
    {#if SponsorsSection}
        <svelte:component this={SponsorsSection} {showContent}/>    
    {/if}
    {#if showContent}
        <section bind:this={contactSection} class="contact">
            {#if ContactSection}
                <svelte:component this={ContactSection} {data} {showContent}/>
            {/if}
        </section>
    {/if}
</main>

<style nonce="%sveltekit.nonce%">
    main {
        height: auto;
        overflow-x: hidden;
    }
    .contact {
        padding:0.75rem;
        color: white;
        background: linear-gradient(135deg, rgba(0, 0, 10, 1) 0%, rgba(10, 10, 20, 1) 50%, rgba(20, 20, 30, 1) 80%, rgba(30, 30, 40, 1) 100%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        position: relative;
        text-transform: none;
        overflow: hidden;
        text-align: center;
        transition: background-image 1s ease-in-out;
    }
</style>