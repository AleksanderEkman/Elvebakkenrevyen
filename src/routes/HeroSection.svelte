<script>
  import { fly, fade} from 'svelte/transition';
  import { onMount } from 'svelte';
  import background_image from '$lib/assets/Elvebakken.jpg';
  import Countdown from './Countdown.svelte';
  import Slideshow from './Slideshow.svelte';
  import Links from './Links.svelte';

  let showContent = false;
  onMount(() => {
    showContent = true;
  });
  

</script>

<section class="hero is-fullheight is-fullwidth" style="background-image: url({background_image});">
  {#if showContent}
    <div class="container text-center">
        <h1 class="hero-title" in:fly={{ y: -200, duration: 600 }}>Elvebakkenrevyen 2025</h1>
        <div class="countdown" in:fade={{ duration: 800 }}>
          <Countdown />
        </div>
        <Slideshow  />

    </div>
    <div class="links" in:fade={{ duration: 800 }}>
      <Links />
    </div>
  {/if}
</section>

<style>

  .hero {
    @apply text-white py-20;
    height: 100vh;
    width: 100vw;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    text-transform: uppercase;
  }
  .hero::before {
    content: ''; 
    top: 0;
    left: 0;
    position: absolute;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7));
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  .container {
    position: relative;
    z-index: 1;
  }
  .hero-title {
    user-select: none;
    margin-top: 5%;
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
  @media (max-width: 768px) {

    .hero-title {
      margin-top: 10%;
      font-size: 2.5em;
      user-select: none;
    }
  }

  @media (max-width: 480px) {

    .hero-title {
      font-size: 2.5em;
    }
  }
</style>