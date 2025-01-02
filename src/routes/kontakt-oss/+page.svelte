<script lang="ts">
    import ContactSection from "./ContactSection.svelte";
    import { onMount, tick } from 'svelte';

    export let data;


</script>

<svelte:head>
    <title>Elvebakkenrevyen 2025 Kontaktskjema</title>
</svelte:head>

<main>
   <section class="contact">
        <ContactSection  {data} />
    </section> 
</main>


<style>
    .contact {
        padding: 4.5rem 0.75rem;
        color: white;
        background: linear-gradient(135deg, rgba(0, 0, 10, 1) 0%, rgba(10, 10, 20, 1) 50%, rgba(20, 20, 30, 1) 80%, rgba(30, 30, 40, 1) 100%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: auto;
        position: relative;
        text-transform: none;
        overflow: hidden;
        text-align: center;
        transition: background-image 1s ease-in-out;
    }
    @media (max-width: 540px) {
        .contact {
            padding: 4.5rem 1rem;
            height: 47.5rem;
        }
    }
</style>