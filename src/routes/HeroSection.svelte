<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { onMount, onDestroy } from 'svelte';
  import background_image from '$lib/assets/Elvebakken.webp';
  import sponsorer_background from '$lib/assets/sponsorer.webp';
  import Countdown from './components/Countdown.svelte';
  import Slideshow from './components/Slideshow.svelte';
  import SponsorsSection from './SponsorsSection.svelte';
  import Links from './components/Links.svelte';

  let showContent = false;
  let linksClass: HTMLElement;

  const handleScroll = () => {
    let scrolledBottom = (window.scrollY > window.innerHeight)

  };
  onMount(() => {
    showContent = true;

    window.addEventListener('scroll', handleScroll);
  });
</script>


<section class="hero" style="background-image: url({background_image});">
  {#if showContent}
    <div class="container text-center">
      <h1 class="hero-title" in:fly={{ y: -200, duration: 800 }}>Elvebakkenrevyen 2025</h1>
      <div class="fade" in:fade={{ duration: 800 }}>
        <div class="fly" in:fly={{ y: 200, duration: 800 }}>
          <Slideshow />
          <Countdown />
        </div>
      </div>
    </div>
    <div bind:this={linksClass} class="links" in:fade={{ duration: 800 }}>
      <Links />
    </div>
  {/if}
</section>

<div class="cont" style="background-image: url({sponsorer_background});"> 
  {#if showContent}
    <div class="fade" in:fade={{ duration: 800 }}>
      <SponsorsSection />
    </div>
  {/if}
</div>

<style>

  .hero {
    margin-top: 0%;
    @apply text-white py-20;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100svh; /* Ensure the hero section takes up at least the full viewport height */
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
  }
  .fade {
    z-index: 1;
  }

  .cont {
    height: 100vh;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    position: relative;
    text-transform: uppercase;
    overflow: hidden;
    background: linear-gradient(135deg, #311500, #4b0326); /* Sunset colors */

    font-family: var(--font-header);
    text-align: center;

    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
  }

  .cont::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.8));
    width: 100%;
    height: 100svh;
    z-index: 1;
  }
  .hero::before {
    content: ''; 
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.8));
    width: 100%;
    height: 100vh;
    z-index: 1;
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

  .cont {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    padding: 0%;
    position: relative;
    text-transform: uppercase;
    overflow: hidden;
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

  @media (max-width: 480px) {
  .hero {
    display: flex; /* Ensure flexbox is applied */
    justify-content: flex-start;
    align-items: center; /* Center items vertically if needed */
    background-size: 411%;
    background-position: center; /* Center the background image */
    height: 100svh; /* Make sure the hero section takes full height */
    overflow: hidden; /* Prevent overflow if needed */
  }

  .cont {
    background-position: top; /* Keep this as is if it fits your design */
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
  @media (max-width: 933px) and (orientation: landscape) {
    .hero {
      min-height: 100vh;
      padding: 10px;
    }
    .hero::before {
      height: 100vh;
    }
    .hero-title {
      font-size: 2em;
      margin-top: 0;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2), 
      0 0 7px rgba(255, 255, 255, 0.2), 
      0 0 13px rgba(255, 255, 255, 0.13), 
      0 0 19px rgba(255, 255, 255, 0.07);
    }
    .container {
      padding: 10px;
    }
  }
</style>