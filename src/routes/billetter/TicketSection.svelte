<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { goto } from '$app/navigation';

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
            {label: "Teppefalls", date: "5.03", time:"18:00", showCode: "s9"}
        ];
    });
</script>

<section class="ticketSection">
    
    <div class="text">
        <h2>Billetter</h2>
        <p>Elvebakkenrevyen 2025 spilles i Elvebakkenrevyens lokaler på Vestre Elvebakke 3.</p>
    </div>

    <div class="map-wrapper">
        <iframe  in:fade={{duration: 1500}}  class="map"
            title="map" 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1999.7978048428802!2d10.750444813434079!3d59.918902963584095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46416e6418f98fa3%3A0xd28772a8dd823d4b!2sVestre%20Elvebakke%203%2C%200182%20Oslo!5e0!3m2!1sno!2sno!4v1735079848859!5m2!1sno!2sno"
            height="500"
            style="border:0;"
            referrerpolicy="no-referrer-when-downgrade">
        </iframe>
    </div>

    <div class="flex">
        {#each events as event, index}
            <a class="event {index === 0 ? 'first-event' : ''}" href={`https://bestill.albillett.no/nb/arrangement/${event.showCode}`} target="_blank">
                <div class="event-content">
                    <p>{event.label}</p>
                    <p>{event.date}.2025</p>
                    <p>{event.time}</p>
                </div>
            </a>
        {/each}
    </div>

</section>

<style>
    h2 {
        font-size: 3.5rem;
        letter-spacing: 0.05rem;
        margin-bottom: 0.5rem;
        font-family: var(--font-header);
    }
    p {
        font-size: 1.25rem;
        letter-spacing: 0.025rem;
        margin-bottom: 1rem;
    }
    .ticketSection {
        background: linear-gradient(135deg, rgba(0, 0, 10, 1) 0%, rgba(10, 10, 20, 1) 50%, rgba(20, 20, 30, 1) 80%, rgba(30, 30, 40, 1) 100%);
        color: white;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100vw;
        text-align: center;
        padding: 4rem;
    }
    .flex {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(4, auto);
        gap: 2rem;
        padding: 1rem;
    }
    .first-event {
        grid-column: span 2;
    }
    .event {
        background-color: rgba(0, 0, 0, 0.3);
        font-size: 1rem;
        border-radius: 15px;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        box-shadow: inset 0 0 0 0.1rem rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.4);
    }
    .event-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 20rem;
        height: auto;
    }
    .map-wrapper {
        padding: 3rem;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .map {
        width: 47.5rem;
        border-radius: 5px;
    }
</style>