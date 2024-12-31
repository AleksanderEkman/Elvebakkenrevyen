<script lang="ts">
    import { onMount } from 'svelte';

    const sjefer = [
        {group: "Revysjefer", names: "Vetle, Mari, Martin og Frida" },
        {group: "Scene", names: "Navn, Navn og Navn"},
        {group: "Kostyme", names: "Navn, Navn og Navn"},
        {group: "Hændy", names: "Navn, Navn og Navn"},
        {group: "Lyd og lys", names: "Navn, Navn og Navn"},
        {group: "Medieprod", names: "Navn, Navn og Navn"},
        {group: "PR", names: "Navn, Navn og Navn"},
        {group: "Fezt & kos", names: "Navn, Navn og Navn"},
        {group: "M.A.T", names: "Navn, Navn og Navn"},
        {group: "Søppel/Inspisient", names: "Navn og navn"},
    ]
    onMount(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target)
                }
            });
        }, { threshold: 0.25 });

        const cards = document.querySelectorAll('.card');
        cards.forEach(card => observer.observe(card));

        return () => {
            cards.forEach(card => observer.unobserve(card));
        };
    });
</script>

<section class="sjeferSection">
    <h1>Årets Sjefer</h1>
    <div class="card-container">
        {#each sjefer as sjef_card, index}
            <div class="card">
                <div class="text">
                    <h2>{sjef_card.group}</h2>
                    <p>{sjef_card.names}</p>
                </div>
                <img src="/favicon.webp" alt="">
            </div>
        {/each}
    </div>
</section>

<style>
    .sjeferSection {
        color: white;
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: auto;
        background: linear-gradient(135deg, rgba(0, 0, 10, 1) 0%, rgba(10, 10, 20, 1) 50%, rgba(20, 20, 30, 1) 80%, rgba(30, 30, 40, 1) 100%);
    }
    h1 {
        margin: 5rem 0rem;
        font-size: 2.25rem;
    }
    h2 {
        font-size: 2.1rem;
    }
    .text {
        font-size: 1.2rem;
        text-wrap: nowrap;
    }
    .card-container {
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10rem;
        text-align: center;
        margin-bottom: 4rem;
    }
    .card {
        gap: 7.5rem;
        display: flex;
        justify-content: center;
        flex-direction: row;
        align-items: center;
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    :global(.card.visible) {
        opacity: 1;
        transform: translateY(0);
    }
    @media (min-width: 676px) {
        .card:nth-child(even) {
            flex-direction: row-reverse;
        }
    }
    @media (max-width: 675px) {
        .card {
            width: 65%;
            flex-direction: column-reverse;
            text-wrap: none;
            gap: 2rem;
        }
        .card-container {
            justify-content: space-between;
        }
        h1 {
            margin: 4rem 0rem;
            font-size: 2.1rem;
        }
        h2 {
            font-size: 1.9rem;
        }
    }
</style>