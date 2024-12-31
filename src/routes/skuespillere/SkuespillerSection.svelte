<script lang="ts">
    import { onMount } from "svelte";

    const skuespillere = [
        {name: "Navn", quote: "Dette er et veldig <br> langt og fint sitat.", img: "/favicon.webp"},
        {name: "Navn", quote: "Sitatsafsad", img: "/favicon.webp"},
        {name: "Navn", quote: "Sitasdffsdsdft", img: "/favicon.webp"},
        {name: "Navn", quote: "Sitdsfsdat", img: "/favicon.webp"},
        {name: "Navn", quote: "Sitadsfsdfsdft", img: "/favicon.webp"},
        {name: "Navn", quote: "Sitdsfsdfsdat", img: "/favicon.webp"},
        {name: "Navn", quote: "Sitasdfsdft", img: "/favicon.webp"},
        {name: "Navn", quote: "Sitdsfsdfsdfat", img: "/favicon.webp"}
    ]

    onMount(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target)
                }
            });
        }, { threshold: 0.4 });
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => observer.observe(card));
    });
</script>

<section class="skuespillerSection">
    <h1>Skuespillere</h1>
    <div class="card-container">
        {#each skuespillere as skuespiller}
            <div class="card">
                <div class="text">
                    <h2>{skuespiller.name}</h2>
                    <div class="quote-wrapper">
                        <p class="quote">{@html skuespiller.quote}</p>
                    </div>
                </div>
                <img src={skuespiller.img} alt={skuespiller.name}>
            </div>
        {/each}
    </div>
</section>

<style>
    h1 {
        margin: 12rem 0rem 10rem 0rem;
        font-size: 2rem;
    }
    h2 {
        font-size: 1.75rem;
        font-weight: 400;
    }

    .quote {
        margin-top: 1rem;
        font-size: 1.25rem;
        font-style: italic;
        text-wrap: nowrap;
        width: auto;
    }
    .quote-wrapper {
        position: relative;
        width: auto;
    }
    .quote::before {
        position: absolute;
        content: "“";
        font-weight: 500;
        font-size: 3rem;
        top: 0.9rem; 
        left: -1.1rem; 
        transform: translateY(-50%);
    }

    .quote::after {
        content: "”";
        position: absolute;
        font-weight: 500;
        font-size: 3rem;
        bottom: -0.25rem; 
        right: -0.75rem; 
        transform: translateY(50%);
    }
    
    .skuespillerSection {
        color: white;
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: auto;
        background: linear-gradient(135deg, rgba(0, 0, 10, 1) 0%, rgba(10, 10, 20, 1) 50%, rgba(20, 20, 30, 1) 80%, rgba(30, 30, 40, 1) 100%);
    }
    .card-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 12rem;
        text-align: center;
        margin-bottom: 4rem;
    }
    .card {
        width: 50%;
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
    @media (min-width: 601px) {
        .card:nth-child(even) {
            flex-direction: row-reverse;
        }
    }
    @media (max-width: 600px) {
        .card {
            width: 65%;
            flex-direction: column-reverse;
            text-wrap: none;
            gap: 2rem;
        }
        .card-container {
            justify-content: space-between;
        }
    }
</style>
