<script lang="ts">
  import { fade } from 'svelte/transition';
  import background_image from '$lib/assets/Elvebakken.webp';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Links from './components/Links.svelte';
  import InAppSpy from "inapp-spy";
  import dice from '$lib/assets/dice.svg';

  let height: number | string;
  let scale = 100;
  let scrollY: number;
  export let showContent: boolean;
  let innerHeight: number;
  let scrollAmplifier: number;

  onMount(() => {
    // Sjekker om brukeren er i en app, bruker annen strategi for å hente høyde
    const { isInApp } = InAppSpy();
    if (isInApp) {
      height = innerHeight + 'px';
    } else {
      height = '100svh';
    }
    if (window.matchMedia("(max-width: 540px)").matches) {
      scrollAmplifier = 0.7;
    } else {
      scrollAmplifier = -1.1;
    }
  });
</script>

<!-- Bind til vinduet for å hente scrollY og innerHeight -->
<svelte:window bind:innerHeight bind:scrollY></svelte:window>

<!-- HTML-struktur med visuell hierarki for UX -->
<section class="hero" style="background-image: url({background_image}); height: {height} !important; background-position-y: {scrollAmplifier * scrollY * 0.25}px;">
  <div class="overlay"></div>
  {#if showContent}
    <div class="container">
      <div class="kicker">
        <div class="inline">
          <img id="logo" src="/favicon.webp" alt="Elvebakkenrevyen logo">
          <p>Elvebakkenrevyen 2025 -</p>
        </div>
        <p id="grey">en <strong>uforglemmelig</strong> opplevelse siden 2002</p>
      </div>
      <div class="hero-title">
        <h1>Konseptnavn</h1>
      </div>
      <div class="btn-container">
        <button class="cta" on:click={() => goto("/billetter")}>Se forestillingene våre!</button>
      </div>
      <div class="rating">
        <img src={dice} alt="Rating" />
        <p id="grey">15x</p>
      </div>
    </div>
    <div class="links" in:fade={{ duration: 800 }}>
      <!-- Egen komponent for links -->
      <Links />
    </div>
  {/if}
</section>

<style>
  .hero {
    @apply text-white py-20;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100vw;
    position: relative;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    overflow-x: hidden;
    padding: 0;
    background-color: #000; /* Set a background color that matches the background image */
    scroll-behavior: smooth; /* Enable smooth scrolling */
  }
  .overlay {
    content: ''; 
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1));
    width: 100%;
    height: 100%;
    z-index: 2;
  }
  .container {
    font-size: 1.25rem;
    display: inline-flex;
    left: 18.5vw;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 3;
    height: 80%;
  }
  .cta {
    font-size: 1.25rem;
    align-items: center;
    justify-content: center;
    display: inline-block;
    width: auto;
    padding: 0;
    position: relative;
    border-radius: 5px;
    border: 1px solid white;
    padding: 0.5rem 1rem;
    background-color: rgba(25,49,132,0.75);
  }
  .hero-title {
    position: relative;
    @apply text-8xl font-bold mb-4;
    font-family: var(--font-header);
    background: #ffffff;
    -webkit-background-clip: text;
    background-clip: text;
    letter-spacing: 3px;
  }

  .links {
    position: absolute;
    width: 100%;
    bottom: 10px;
    left: 20px;
    z-index: 2;
  }

  .kicker {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 1.15rem;
    padding: 0.25rem;
  }
  .rating {
    margin-top: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .rating img {
    width: 40px;
    height: 40px;
  }
  #grey {
    color: rgb(209,209,209);
  }
  strong {
    color: white;
    font-style: italic;
  }
  .inline {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  #logo {
    display: flex;
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  /* Media queries for responsivitet */
  /* Tilegnet laptoper og Mac */
  @media (max-width: 1440px) {
    .hero-title {
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2), 
                  0 0 10px rgba(255, 255, 255, 0.25), 
                  0 0 15px rgba(255, 255, 255, 0.15), 
                  0 0 20px rgba(255, 255, 255, 0.1);
      font-size: 4.5em;
    }
  }
  /* Tilegnet tablets (iPad-er) */
  @media (max-width: 768px) {
    .hero-title {
      font-size: 2.5rem;
    }
  }

  @media (max-height: 1368px) {
    .links {
      bottom: 0;
      left: 0;
      width: 100%;
    }
  }

  @media (max-width: 540px) {
    .hero {
      display: flex; 
      justify-content: flex-start;
      background-attachment: scroll;
    }

    .hero-title {

      font-size: 3rem;
    }
    .container {
      font-size: 1rem;
      left: 0;
      margin-left: 2rem;
    }
    .kicker {
      font-size: 0.9rem;
    }
    .cta {
      font-size: 0.9rem;
      padding: 0.5rem 1rem;
    }
  }

  
  /* Media query for mobile landscape mode */
  @media (max-width: 935px) and (orientation: landscape) {
    .hero {
      height: 100svh;
      padding: 10px;
      background-attachment: scroll;
    }
    .hero-title {
      font-size: 2rem;
      margin-top: 0;
      text-shadow: none;
      text-shadow: 
        1px 1px 2px rgba(0, 0, 0, 0.2), 
        0 0 7px rgba(255, 255, 255, 0.2), 
        0 0 13px rgba(255, 255, 255, 0.13);
    }
    .container {
      padding: 10px;
    }
  }
</style>