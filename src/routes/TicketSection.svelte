<script lang="ts">
    import { onMount } from 'svelte';

    let events: { label: string; date: string; time: string; showCode: string }[] = [];
    onMount(() => {
        events = [
            {label: "Premiere", date: "26.02", time:"18:00", showCode: "s1"},
            {label: "", date: "27.02", time:"18:00", showCode: "s2"},
            {label: "", date: "28.02", time:"18:00", showCode: "s3"},
            {label: "", date: "29.02", time:"18:00", showCode: "s4"},
            {label: "", date: "1.03", time:"18:00", showCode: "s5"},
            {label: "", date: "2.03", time:"18:00", showCode: "s6"},
            {label: "", date: "3.03", time:"18:00", showCode: "s7"},
            {label: "", date: "4.03", time:"18:00", showCode: "s8"},
            {label: "Teppefalls", date: "4.03.2024", time:"18:00", showCode: "s9"}
        ];
    });
</script>

<section class="ticketSection">
    <div class="flex">
        <div class="text">
            <h2>Billetter</h2>
            <p>Elvebakkenrevyen 2025 spilles i Elvebakkenrevyens lokaler på Vestre Elvebakke 3.</p>
        </div>
        {#each events as event, index}
            <div class="events">
                <label class="event">
                    <div class="event-content">
                        <p>{event.label}</p>
                        <p>{event.date}.2025</p>
                        <p>{event.time}</p>
                        <button>
                            <a href={`https://bestill.albillett.no/en/arrangement/${event.showCode}`} target="_blank">Kjøp billett</a>
                        </button>
                    </div>
                </label>
            </div>
        {/each}
    </div>
</section>

<style>
    .ticketSection {
        color: white;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100vw;
        text-align: center;
    }
    .flex {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        gap: 2rem;
    }
    .events {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .event {
        border-radius: 15px;
        padding: 0.25rem;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        cursor: pointer;
        background-color: rgba(10, 10, 20, 1);
    }
    .event-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 20rem;
        height: 7.5rem;
    }
    button {
        border: 1px solid white;
        border-radius: 5px;
        padding: 0.5rem;
        width: 10rem;
        cursor: pointer;
    }
</style>