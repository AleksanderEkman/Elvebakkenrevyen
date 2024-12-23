<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import background_image from '$lib/assets/Elvebakken.webp';
  import { onMount } from 'svelte';
  import Countdown from './components/Countdown.svelte';
  import Slideshow from './components/Slideshow.svelte';
  import Links from './components/Links.svelte';
  import InAppSpy from "inapp-spy";

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
  {#if showContent}
    <div class="container text-center">
      <!-- Animasjoner for innhold -->
      <h1 class="hero-title" in:fly={{ y: -200, duration: 800 }}>Elvebakkenrevyen 2025</h1>
      <div class="fade" in:fade={{ duration: 800 }}>
        <div class="fly" in:fly={{ y: 200, duration: 800 }}>
          <!-- Nøstede komponenter -->
          <Slideshow /> <!-- Slideshow for å vise tidligere konsepter -->
          <Countdown /> <!-- Countdown for å vise tid til konseptslipp -->
        </div>
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
    margin-top: 0%;
    @apply text-white py-20;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    position: relative;
    text-transform: uppercase;
    overflow: hidden;
    padding: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    overflow: hidden;
    padding: 0;
    background-color: #000; /* Set a background color that matches the background image */
    scroll-behavior: smooth; /* Enable smooth scrolling */
  }
  .fade {
    z-index: 1;
  }
  
  .hero::before {
    content: ''; 
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.8));
    width: 100%;
    height: 100%;
    z-index: 1;
    backdrop-filter: blur(1.4px);
  }

  .container {
    position: relative;
    z-index: 1;
  }
  
  .hero-title {
    user-select: none;
    margin-top: 0%;
    @apply text-8xl font-bold mb-4;
    font-family: var(--font-header);
    background: linear-gradient(90deg, #ffffff, #ffffff);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2), 
    0 0 10px rgba(255, 255, 255, 0.25), 
    0 0 20px rgba(255, 255, 255, 0.15), 
    0 0 30px rgba(255, 255, 255, 0.1);
    letter-spacing: 3px;
  }

  .links {
    position: absolute;
    width: 100%;
    bottom: 10px;
    left: 20px;
    z-index: 2;
  }

  /* Media queries for responsiveness */
  @media (max-width: 1440px) {
    .hero-title {
      margin-top: 0%;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2), 
      0 0 10px rgba(255, 255, 255, 0.25), 
      0 0 15px rgba(255, 255, 255, 0.15), 
      0 0 20px rgba(255, 255, 255, 0.1);
      margin-top: -2.5%;
      font-size: 4.5em;
      user-select: none;
    }
  }

  @media (max-width: 768px) {
    .hero-title {
      margin-top: -8%;
      font-size: 2.5em;
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
      display: flex; /* Ensure flexbox is applied */
      justify-content: flex-start;
      align-items: center; /* Center items vertically if needed */
      background-size: cover;
      background-attachment: scroll;
      background-position: top; 
      overflow: hidden; /* Prevent overflow if needed */
      scroll-behavior: smooth; /* Enable smooth scrolling for mobile */
    }

    .hero-title {
      margin-top: 10%;
      text-shadow: 
        1px 1px 2px rgba(0, 0, 0, 0.2), 
        0 0 7px rgba(255, 255, 255, 0.2), 
        0 0 13px rgba(255, 255, 255, 0.13), 
        0 0 19px rgba(255, 255, 255, 0.07);
      background: none;
      -webkit-background-clip: initial;
      background-clip: initial;
      -webkit-text-fill-color: initial;
      color: #ffffff; /* Fallback color */
      padding: 5px;
      text-align: center; /* Center title text for better readability */
      width: 100%; /* Ensure it takes full width */
      box-sizing: border-box; /* Include padding in width calculation */
    }
  }

  @media (max-width: 1024px) and (max-height: 600px) {
    .hero-title {
      margin-top: -5.5%;
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
      font-size: 2em;
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