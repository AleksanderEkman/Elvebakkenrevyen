<script lang="ts">
  import { fade } from 'svelte/transition';
  import background_image from '$lib/assets/Elvebakken.webp';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Links from './components/Links.svelte';
  import InAppSpy from "inapp-spy";
  import dice from '$lib/assets/dice.svg';

  export let showContent;

  let height: number | string;
  let scale = 100;
  let scrollY: number;
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
      <div class="container" in:fade={{ duration: 50 }}>
        <div class="kicker">
          <div class="inline">
            <img id="logo" src="/favicon.webp" alt="Elvebakkenrevyenlogo">
            <p id="grey">Elvebakkenrevyen 2025 -</p>
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
          <img src={dice} alt="Terningkast seks av seks for Elvebakkenrevyen" />
          <p id="grey">15x</p>
        </div>
      </div>
    {/if}

    <div class="info">
      <p>Vestre Elvebakke 3</p>
      <p>26.02.2025 - 12.03.2025</p>
    </div>
    {#if showContent}
      <div class="links" in:fade={{ duration: 500 }}>
        <!-- Egen komponent for links -->
        <Links />
      </div>
    {/if}
</section>

<style>
  .hero {
    height: 100svh;
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
    user-select: none;
    content: ''; 
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.1));
  }
  .container {
    font-size: 1.2rem;
    display: inline-flex;
    left: 18.5vw;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 3;
    height: 85%;
  }
  .info {
    font-size: 1.2rem;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 2;
    color: white;
    position: absolute;
    text-align: center;
    margin-bottom: 1.5rem;
    bottom: 0;
  }
  .info p {
    display: flex;
  }
  .cta {
    font-size: 1.4rem;
    align-items: center;
    justify-content: center;
    display: inline-block;
    width: auto;
    padding: 0;
    position: relative;
    border-radius: 10px;
    border: 1px solid white;
    padding: 0.5rem 1rem;
    background-color: rgba(11, 111, 244, 0.5);
    transition: all 0.3s ease;
  }
  .cta:hover {
    background-color: rgba(11, 111, 244, 0.75);
    transform: scale(1.025);
  }
  .hero-title {
    position: relative;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2),
                0 0 2px rgba(255, 255, 255, 0.2), 
                0 0 4px rgba(255, 255, 255, 0.13);
    @apply text-8xl mb-4 mt-1;
    font-family: var(--font-header);
    background: #ffffff;
    -webkit-background-clip: text;
    background-clip: text;
    letter-spacing: 2px;

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
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
  }
  .rating {
    margin-top: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.2rem;
  }
  .rating img {
    width: 40px;
    height: 40px;
  }
  #grey {
    color: #9E9E9E;
  }
  strong {
    color: #b3b1b1;
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
  @media (max-width: 1450px) {
    .hero-title {
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2),
                  0 0 2px rgba(255, 255, 255, 0.2), 
                  0 0 4px rgba(255, 255, 255, 0.13);
      font-size: 4.5em;
    }
  }
  /* Tilegnet tablets (iPad-er) */
  @media (max-width: 768px) {
    .hero-title {
      font-size: 4rem;
    }
  }

  @media (max-width: 540px) {
    .hero {
      display: flex; 
      justify-content: flex-start;
      background-attachment: scroll;
    }
    .hero-title {
      font-size: 3.5rem;
    }
    .container {
      font-size: 1rem;
      left: 0;
      margin-left: 3.8rem;
    }
    .kicker {
      font-size: 0.95rem;
    }
    .cta {
      font-size: 0.95rem;
      padding: 0.6rem 1rem;
    }
    .info {
      display: none;
    }
    .links {
      left: 0;
      flex-direction: row;
      width: 100%;
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
        0 0 2px rgba(255, 255, 255, 0.2), 
        0 0 4px rgba(255, 255, 255, 0.13);
    }
    .container {
      padding: 10px;
    }
  }
</style>