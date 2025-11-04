<script lang="ts">
    import QRCode from '@castlenine/svelte-qrcode';
    export let data;
</script>

<section class = "purchaseSection">
    <h1>Dine valgte billetter</h1>
    <p>Her er en oversikt over billettene dine:</p>
    <p>Forestilling: {data.showCode}</p>
    <p>Barn: {data.childValue}</p>
    <p>Voksne: {data.adultValue}</p>

    {#each data.ticketsWithTokens as ticketWithToken}
        <QRCode data={`${ticketWithToken.ticket.id}.${ticketWithToken.rawToken}`}/>
    {/each}
</section>


<style>
    .purchaseSection {
        background: linear-gradient(
            135deg,
            rgba(0, 0, 10, 1) 0%,
            rgba(10, 10, 20, 1) 50%,
            rgba(20, 20, 30, 1) 80%,
            rgba(30, 30, 40, 1) 100%
        );
        color: white;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100vw;
        text-align: center;
        padding: 6rem 5rem;
        overflow: hidden;
    }
</style>