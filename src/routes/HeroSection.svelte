<script lang="ts">
  import { fly, fade} from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import background_image from '$lib/assets/Elvebakken.webp';
  import Countdown from './components/Countdown.svelte';
  import Slideshow from './components/Slideshow.svelte';
  import Links from './components/Links.svelte';
  
  let hero: HTMLElement

  let showContent = false;
  onMount(() => {
    console.log(navigator.userAgent);
    // @ts-ignore
    if (navigator.userAgent.includes('Mobile') && navigator.brave.isBrave()) {
      hero.style.height = 'auto';
    } else {
      hero.style.height = '100svh';
    }
    showContent = true;
  });
</script>

<section class="hero" bind:this={hero} style="background-image: url({background_image});">
  {#if showContent}
    <div class="container text-center">
        <h1 class="hero-title" in:fly={{y: -200, duration: 800}}>Elvebakkenrevyen 2025</h1>
        <div class="countdown" in:fade={{ duration: 800 }}>
          <div class="fly" in:fly={{y:200, duration: 800}}>
            <Slideshow />
            <Countdown />
          </div>
        </div>
    </div>
    <div class="links" in:fade={{ duration: 800 }}>
      <Links />
    </div>
  {/if}
</section>

<style>
  .hero {
    @apply text-white py-20;
    width: 100vw;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    text-transform: uppercase;
    overflow: hidden;
  }


  .hero::before {
    content: ''; 
    top: 0;
    left: 0;
    position: absolute;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7));
    width: 100%;
    min-height: 100svh;
    z-index: 0;
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
    bottom: 10px;
    left: 20px;
    z-index: 2;
    width: 10%;
  }

  /* Media queries for responsivitet */
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
  @media (max-width: 480px) {
    .hero-title {
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2), 
      0 0 7px rgba(255, 255, 255, 0.2), 
      0 0 13px rgba(255, 255, 255, 0.13), 
      0 0 19px rgba(255, 255, 255, 0.07);
      background: none;
      -webkit-background-clip: initial;
      background-clip: initial;
      -webkit-text-fill-color: initial;
      color: #ffffff; /* Fallback color */
      padding: 5px;
    }
  }
  @media (max-width: 1024px) and (max-height:600px) {
     .hero-title {
      margin-top: -5.5%;
    }
  }
</style>