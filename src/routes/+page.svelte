<script lang="ts">
    import { onMount, tick } from 'svelte';
    import HeroSection from './HeroSection.svelte';
    import TicketSection from './TicketSection.svelte';
    let SponsorsSection: ConstructorOfATypedSvelteComponent | null = null;
    let ContactSection: ConstructorOfATypedSvelteComponent | null = null;
    import sponsorer_background from '$lib/assets/sponsorer.webp';


    let showContent = false;
    export let data;

    let contactSectionRef: HTMLElement;
    let sponsorsSectionRef: HTMLElement;
    let footer: HTMLElement | null;

    const updateContactSectionHeight = () => {
        if (contactSectionRef && footer) {
            const footerHeight = footer.offsetHeight;
            if (window.matchMedia('(min-width: 768px)').matches && !navigator.userAgent.includes('Mobile')) {
                contactSectionRef.style.height = `calc(100svh - ${footerHeight}px + 1px)`;
            } else {
                contactSectionRef.style.height = `auto`;
            }
        }
    };

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
        
        const observer = new IntersectionObserver(async (entries) => {
            if (entries[0].isIntersecting) {
                ContactSection = (await import('./ContactSection.svelte')).default;
                observer.disconnect();
            }
        }, { threshold: 0.7 });

        observer.observe(sponsorsSectionRef);

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
    {#if showContent}
        <section bind:this={sponsorsSectionRef} class="sponsors" style="background-image: url({sponsorer_background})">
            <svelte:component this={SponsorsSection}/>
        </section>
    {/if}
    {#if showContent}
        <section bind:this={contactSectionRef} class="contact">
            {#if ContactSection}
                <svelte:component this={ContactSection} {data} {showContent}/>
            {/if}
        </section>
        <TicketSection/>
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