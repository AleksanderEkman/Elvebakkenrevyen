<script>
    import { onMount } from 'svelte';

    let months = 0;
    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    onMount(() => {
    const countDownDate = new Date("Feb 15, 2025 11:30:00").getTime(); // Dato til konseptslipp

    const updateCountdown = () => {
        const now = new Date().getTime(); // Hent nåværende lokal tid

        const distance = countDownDate - now; // Beregn tidsforskjellen

        months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30)); // Beregn måneder
        days = Math.floor((distance % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)); // Beregn dager
        hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Beregn timer
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)); // Beregn minutter
        seconds = Math.floor((distance % (1000 * 60)) / 1000); // Beregn sekunder
    };

    updateCountdown(); // Oppdater nedtellingen umiddelbart
    setInterval(updateCountdown, 1000); // Oppdater hvert sekund
    });
</script>

<div class="countdown">
    <div class="row">
      <div class="countdown-item">
        <p>{months}</p> <span>måneder</span>
      </div>
      <div id = "d" class="countdown-item">
        <p>{days}</p> <span>dager</span>
      </div>
      <div class="countdown-item">
        <p>{hours}</p> <span>timer</span>
      </div>
    </div>
    <div class="row">
      <div id="min" class="countdown-item">
        <p>{minutes}</p> <span>minutter</span>
      </div>
      <div id="sek" class="countdown-item">
        <p>{seconds}</p> <span>sekunder</span>
      </div>
    </div>
</div>

<style>
    .row {
        display: flex;
        flex-direction: row;
    }
    .countdown {
        margin-top: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2em;
        flex-wrap: wrap; /* Tillat elementer å brytes på mindre skjermer */
        user-select: none;
    }
    .countdown-item {
        margin: 10px;
        padding: 5%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-width: 80px;
        flex: 1 1 100px; /* Tillat elementer å vokse og krympe */
    }
    #d, #min {
        padding-left: 60px; 
        padding-right: 60px;
        border-left: 3px solid;
        border-right: 3px solid;
    }
    p {
        font-size: 3em;
    }
    span {
        text-transform: uppercase;
        font-size: 0.8em;
    }
    @media (max-width: 768px) {
        .countdown {
            font-size: 1.5em;
            margin-top: 30px; /* Juster plass over nedtellingen for mindre skjermer */
        }
        .countdown-item {
            padding: 3%;
            flex: 1 1 45%; /* Sørg for at elementer tar opp lik plass */
            margin: 5px; /* Legg til margin mellom elementer */
        }
    }

    @media (max-width: 480px) {
        .countdown {
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            font-size: 1.25em;
            margin-top: 15%; /* Juster plass over nedtellingen for mindre skjermer */
            height: auto; /* Juster høyde for mindre skjermer */
        }
        .countdown-item {
            margin: 5px 0; /* Legg til margin mellom elementer */
        }
        .row {
            display: flex;
            flex-direction: row;
        }
        #min {
            border-left: none;
        }

    }

</style>