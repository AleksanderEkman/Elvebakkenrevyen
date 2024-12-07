<script lang="ts">
  import { onMount } from 'svelte';

  let months = 0, days = 0, hours = 0, minutes = 0, seconds = 0;

  let monthElement: HTMLElement, dayElement: HTMLElement, 
    hourElement: HTMLElement, minuteElement: HTMLElement, 
    secondElement: HTMLElement;

  let monthP: HTMLElement, dayP: HTMLElement, 
    hourP: HTMLElement, minuteP: HTMLElement, 
    secondP: HTMLElement;

  const countDownDate = new Date("Jan 28, 2025 15:50:00").getTime(); // Dato til konseptslipp

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

  const updateBorder = (element: HTMLElement | undefined, condition: boolean, condition2: boolean = true) => {
    if (element) {
      element.style.borderRight = (condition && condition2) ? 'none' : '3px solid';
    }
  };

  onMount(() => {

    const mq = window.matchMedia("(max-width: 1024px)");

    const updateCountdown = () => {
      updateValues();

      updateVisibility(monthElement, months);
      updateVisibility(dayElement, days);
      updateVisibility(hourElement, hours);
      updateVisibility(minuteElement, minutes);

      if (months <= 0 && days <= 0 && hours <= 0 && minutes <= 0 && secondElement) {
        secondElement.style.fontSize = "1.6em";
      }
      

      updateBorder(hourElement, mq.matches);
      updateBorder(dayElement, mq.matches, hours <= 0);

      // Spill animasjon hvis verdi har endret seg
      if (parseInt(monthElement.innerText) != months) animateUpdate(monthP);
      if (parseInt(dayElement.innerText) != days) animateUpdate(dayP);
      if (parseInt(hourElement.innerText) != hours) animateUpdate(hourP);
      if (parseInt(minuteElement.innerText) != minutes) animateUpdate(minuteP);
      if (parseInt(secondP.innerText) != seconds) animateUpdate(secondP);
    };

    updateCountdown(); // Initialt kall for å vise nedtellingen umiddelbart
    const interval = setInterval(updateCountdown, 1000); // Oppdater hvert sekund

    return () => clearInterval(interval);
  });
</script>


<div class="countdown" aria-label="Nedtelling til konseptslipp for Elvebakkenrevyen 2025">
  <div class="row1">
    <div id="m" class="countdown-item" aria-live="polite" aria-atomic="true" bind:this={monthElement}>
      <p bind:this={monthP}>{months}</p> <span>måned</span>
    </div>
    <div id="d" aria-live="polite" aria-atomic="true" class="countdown-item" bind:this={dayElement}>
      <p bind:this={dayP}>{days}</p> <span>dager</span>
    </div>
    <div id="h" aria-live="polite" aria-atomic="true" class="countdown-item" bind:this={hourElement}>
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
    margin-top: 3.25%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem; /* Use rem units for font size */
    flex-wrap: wrap;
    user-select: none;
    height: 100%; /* Ensure the countdown takes up the full height of its parent */
  }
  .countdown-item {
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      justify-content: center;
      min-width: 5rem;
      padding-left: 3rem; 
      padding-right: 3rem;
      flex: 1 1 100px;
  }
  p {
    font-size: 6rem;
    display: flex;
    justify-content: center;

  }
  span {
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    text-transform: uppercase;
    font-size: 1.3rem; 
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
  
  @media (max-width: 1450px) {
    .countdown {
      font-size: 1.4rem; /* Use rem units for font size */
      margin-top: 2%; /* Juster plass over nedtellingen for mindre skjermer */
    }
    .countdown-item {
      padding: 3%;
      flex: 1 1 45%; /* Sørg for at elementer tar opp lik plass */
      margin: 5px; /* Legg til margin mellom elementer */
    }
  }

  @media (max-width: 540px) {
    .countdown {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      font-size: 0.75rem; /* Use rem units for font size */
      margin-top: 4%; 
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
    span {
      font-size: 1rem; /* Use rem units for font size */
    }
  }
  @media (max-width: 1024px) and (max-height:600px) {
    .countdown {
      font-size: 0.8rem; /* Use rem units for font size */
    }
  }
  @media  (max-height: 600px) and (max-width: 1024px) {
    .countdown {
      display: none;
    }
  }
</style>