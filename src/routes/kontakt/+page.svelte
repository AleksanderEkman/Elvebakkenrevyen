<script lang="ts">
    import ContactSection from "./ContactSection.svelte";
    import { onMount, tick } from 'svelte';

    export let data;

    let contactSectionRef: HTMLElement;
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
        await tick();
        footer = document.querySelector('footer');
        updateContactSectionHeight();
    });
</script>

<section bind:this={contactSectionRef} class="contact">
    {#if ContactSection}
        <svelte:component this={ContactSection} {data}/>
    {/if}
</section>

<style>
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
    @media (max-width: 540px) {
        .contact {
            padding: 4.5rem 1rem;
        }
    }
</style>