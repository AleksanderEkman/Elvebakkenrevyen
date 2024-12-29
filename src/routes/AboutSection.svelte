<script lang="ts">
    import { goto } from "$app/navigation"
</script>

<section class="aboutSection">
    <div class="text-card">
        <h2>Forestillingen</h2>
        <p>Elvebakkenrevyen 2024 setter farge på tilværelsen <br><br>
            Årets revy spilles i en trapp. Den har blitt malt beige, hvit og kjedelig av det nye Beigerådet,
            nei, byrådet. <br> De misliker alt som er fargerikt og festlig. Heldigvis har vi skrevet inn to 
            helter som ønsker å gjøre noe med det.<br>Klarer de å male trappa full av farger igjen, eller beholder 
            Beigerådet makten i trappa for alltid? <br><br>
            Kom og se revy på Elvebakken videregående skole 29. februar - 11. mars for å finne det ut!
        </p>
        <button class="cta" on:click={() => goto('/billetter')}>Billetter</button>
    </div>
    <div class="card">
        <img src="/og-image.webp" alt="Bilde av Elvebakkenrevyen 2025 forestillingen" />
    </div>
</section>

<style>
    h2 {
        font-size: 2.5rem;
        font-weight: 700;
        letter-spacing: 0.05em;
        margin-bottom: 1rem;
        font-family: var(--font-header);
    }
    .cta {
        margin: 2rem 0rem;
        display: inline-flex;
        width: 12rem;
        font-size: 1.1rem;
        align-items: center;
        justify-content: center;
        padding: 0;
        position: relative;
        border-radius: 10px;
        background-color: rgba(11, 111, 244, 0.2);
        border: 1px solid white;
        padding: 0.5rem 1rem;
        transition: all 0.3s ease;
    }
    .cta:hover {
        background-color: rgba(11, 111, 244, 0.4);
        transform: scale(1.05);
    }
    .aboutSection {
        padding: 3.5rem;
        gap: 2rem;
        color: white;
        background: linear-gradient(135deg, rgba(0, 0, 10, 1) 0%, rgba(10, 10, 20, 1) 50%, rgba(20, 20, 30, 1) 80%, rgba(30, 30, 40, 1) 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 50rem;
        position: relative;
        text-transform: none;
        overflow: hidden;
        text-align: center;
        transition: background-image 1s ease-in-out;
    }
    .text-card, .card {
        font-size: 1.15rem;
        display: inline-flex;
        flex-direction: column;
        width: 50%;
        border-radius: 25px;
    }
    .text-card {
        padding: 1.1rem;
        text-align: left;
        background-color: rgba(0, 0, 0, 0.3);
    }
    img {
        border-radius: 10px;
    }
    @media (max-width: 540px) {
        .aboutSection {
            flex-direction: column-reverse;
            padding: 4.5rem 1rem;
            height: 60rem;
        }
        .text-card, .card {
            width: 100%;
            align-items: center;
            text-align: center;
        }
    }
</style>