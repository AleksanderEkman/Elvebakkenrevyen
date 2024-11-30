<script lang="ts">
    import { onMount } from 'svelte';
  
    let months = 0;
    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
  
    let monthElement: HTMLElement;
    let dayElement: HTMLElement;
    let hourElement: HTMLElement;
    let minuteElement: HTMLElement;
    let secondElement: HTMLElement;

    let monthP: HTMLElement;
    let dayP: HTMLElement;
    let hourP: HTMLElement;
    let minuteP: HTMLElement;
    let secondP: HTMLElement;
  
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
  
    const animateUpdate = (element: HTMLElement | undefined) => {
      if (element) {
        element.classList.remove('update-animation');
        void element.offsetWidth; // Trigger reflow to restart the animation
        element.classList.add('update-animation');
      }
    };
  
    const updateVisibility = (element: HTMLElement | undefined, value: number) => {
      if (element) {
        element.style.display = value <= 0 ? 'none' : 'block';
      }
    };
  
    const updateBorder = (element: HTMLElement | undefined, condition: boolean) => {
      if (element) {
        element.style.borderRight = condition ? 'none' : '3px solid';
      }
    };
  
    onMount(() => {

      const mq = window.matchMedia("(max-width: 480px)");
  
      const updateCountdown = () => {
        updateValues();
  
        updateVisibility(monthElement, months);
        updateVisibility(dayElement, days);
        updateVisibility(hourElement, hours);
        updateVisibility(minuteElement, minutes);
  
        if (months <= 0 && days <= 0 && hours <= 0 && minutes <= 0 && secondElement) {
          secondElement.style.fontSize = "1.8em";
        }
  
        updateBorder(hourElement, mq.matches);
  
        // Trigger animations
        if (parseInt(monthElement.innerText) != months) animateUpdate(monthP);
        if (parseInt(dayElement.innerText) != days) animateUpdate(dayP);
        if (parseInt(hourElement.innerText) != hours) animateUpdate(hourP);
        if (parseInt(minuteElement.innerText) != minutes) animateUpdate(minuteP);
        if (parseInt(secondP.innerText) != seconds) animateUpdate(secondP);
      };
  
      updateCountdown(); // Initialt kall for å vise nedtellingen umiddelbart
      const interval = setInterval(updateCountdown, 1000); // Oppdater hvert sekund
  
      return () => clearInterval(interval); // Cleanup interval on component unmount
    });
  </script>
  
  <div class="countdown">
    <div class="row1">
      <div id="m" class="countdown-item" bind:this={monthElement}>
        <p bind:this={monthP}>{months}</p> <span>måneder</span>
      </div>
      <div id="d" class="countdown-item" bind:this={dayElement}>
        <p bind:this={dayP}>{days}</p> <span>dager</span>
      </div>
      <div id="h" class="countdown-item" bind:this={hourElement}>
        <p bind:this={hourP}>{hours}</p> <span>timer</span>
      </div>
    </div>
    <div class="row2">
      <div id="min" class="countdown-item" bind:this={minuteElement}>
        <p bind:this={minuteP}>{minutes}</p> <span>minutter</span>
      </div>
      <div id="sek" class="countdown-item" bind:this={secondElement}>
        <p bind:this={secondP}>{seconds}</p> <span>sekunder</span>
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
        flex: 1 1 100px;
    }
  
    p {
      font-size: 3em;
    }
    span {
      text-transform: uppercase;
      font-size: 0.8em;
    }
  
    :global(.update-animation) {
      animation: updateEffect 0.5s ease-in-out;
    }
  
    @keyframes updateEffect {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.1);
        opacity: 0.7;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
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
        font-size: 0.75em;
        margin-top: 5%; /* Juster plass over nedtellingen for mindre skjermer */
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