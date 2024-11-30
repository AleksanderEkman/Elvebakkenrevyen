<script lang="ts">
    import { onMount } from 'svelte';
  
    let months = 0;
    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
  
    const countDownDate = new Date("Feb 15, 2025 11:30:00").getTime(); // Dato til konseptslipp
  
    const updateValues = () => {
        const now = new Date().getTime(); // Hent nåværende lokal tid
        const distance = countDownDate - now; // Beregn tidsforskjellen
  
        months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30)); // Beregn måneder
        days = Math.floor((distance % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)); // Beregn dager
        hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Beregn timer
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)); // Beregn minutter
        seconds = Math.floor((distance % (1000 * 60)) / 1000); // Beregn sekunder
    };
    
    updateValues();
    onMount(() => {
      const mq = window.matchMedia("(max-width: 480px)");
      const m = document.getElementById("m");
      const d = document.getElementById("d");
      const h = document.getElementById("h");
      const min = document.getElementById("min");
      const sek = document.getElementById("sek");
  
      const updateCountdown = () => {
        updateValues();
  
        if (months <= 0 && m) {
            m.style.display = "none";
        }
        if (h && d && min) {
            if (days <= 0) {
                d.style.display = "none";
            } else {
                d.style.display = "flex";
            } 
            if (hours <= 0) {
                h.style.display = "none";
                if (mq.matches) {
                    d.style.borderRight = "none";
                } else {
                    d.style.borderRight = "3px solid";
                }
            } else {
                h.style.display = "flex";
            }
            if (minutes <= 0 && min) {
                min.style.display = "none";
            } else {
                min.style.display = "flex";
            }
        }
        if (months <= 0 && days <= 0 && hours <= 0 && minutes <= 0 && sek) {
            sek.style.fontSize = "1.8em";
        }
        if (h) {
            if (mq.matches) {
                h.style.borderRight = "none";
            } else {
                h.style.borderRight = "3px solid";
            }
        }
      };
      
      updateCountdown(); // Initialt kall for å vise nedtellingen umiddelbart
      const interval = setInterval(updateCountdown, 1000); // Oppdater hvert sekund
  
      return () => clearInterval(interval); // Cleanup interval on component unmount
    });
</script>

<div class="countdown">
    <div class="row1">
      <div id="m" class="countdown-item">
        <p>{months}</p> <span>måneder</span>
      </div>
      <div id = "d" class="countdown-item">
        <p>{days}</p> <span>dager</span>
      </div>
      <div id="h" class="countdown-item">
        <p>{hours}</p> <span>timer</span>
      </div>
    </div>
    <div class="row2">
      <div id="min" class="countdown-item">
        <p>{minutes}</p> <span>minutter</span>
      </div>
      <div id="sek" class="countdown-item">
        <p>{seconds}</p> <span>sekunder</span>
      </div>
    </div>
</div>

<style>
    .row1, .row2 {
        display: flex;
        flex-direction: row;
    }
    .row1 > .countdown-item:not(:last-child),
    .row2 > .countdown-item:not(:last-child) {
        border-right: 3px solid;
    }
    .countdown {
        margin-top: 5%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2em;
        flex-wrap: wrap; /* Tillat elementer å brytes på mindre skjermer */
        user-select: none;
    }
    .countdown-item {
        overflow: hidden;
        margin: 10px;
        padding: 5%;
        padding-left: 35px; 
        padding-right: 55px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-width: 80px;
        flex: 1 1 100px; /* Tillat elementer å vokse og krympe */
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
            padding-left: 40px;
            padding-right: 40px;
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
        .row1, .row2 {
            display: flex;
            flex-direction: row;
        }
        #min {
            border-left: none;
        }

    }

</style>