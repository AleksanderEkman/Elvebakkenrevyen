<script lang="ts">
    import { onMount, tick } from 'svelte';
    import HeroSection from './HeroSection.svelte';
    let SponsorsSection: ConstructorOfATypedSvelteComponent | null = null;
    import sponsorer_background from '$lib/assets/sponsorer.webp';


    let showContent = false;

    let contactSectionRef: HTMLElement;
    let sponsorsSectionRef: HTMLElement;
    let footer: HTMLElement | null;

    onMount(async () => {
        showContent = true;
        await tick();
        const spObserver = new IntersectionObserver(async (entries) => {
            if (entries[0].isIntersecting) {
                SponsorsSection = (await import('./SponsorsSection.svelte')).default;
                spObserver.disconnect();
            }
        }, { threshold: 0.025});
        spObserver.observe(sponsorsSectionRef);

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
    {#if showContent}
        <section bind:this={sponsorsSectionRef} class="sponsors" style="background-image: url({sponsorer_background})">
            <svelte:component this={SponsorsSection}/>
        </section>
    {/if}
</main>

<style nonce="%sveltekit.nonce%">
    main {
        height: auto;
        overflow-x: hidden;
    }
    .sponsors {
        width: 100vw;
        height: 71rem;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        overflow: hidden;
        font-family: var(--font-header);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
    .sponsors::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        background: radial-gradient(circle, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9));
        width: 100%;
        height: 100%;
        z-index: 2;
    }
    @media (min-width: 1450px) {
        .sponsors {
            height: 90vh;
        }
    }
    @media (max-width: 550px) {
        .sponsors {
            height: 47.5rem;
            background-position: top;
        }
    }
    /* Media query for mobile landscape mode */
    @media (max-width: 933px) and (orientation: landscape) {
        .sponsors {
            height: 40rem;
        }
    }
</style>