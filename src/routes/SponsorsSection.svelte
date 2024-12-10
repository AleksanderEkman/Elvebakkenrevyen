<script lang="ts">
	import { on } from 'svelte/events';
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import EmblaCarousel from './components/EmblaCarousel.svelte';
  import sponsorer_background from '$lib/assets/sponsorer.webp';

  let contBackground: string = '';
  let contBackgroundLoaded = false;
  export let showContent: boolean;

  onMount(() => {
    const contImg = new Image();
    contImg.src = sponsorer_background;
    contImg.onload = () => {
      contBackground = `url(${sponsorer_background})`;
      contBackgroundLoaded = true;
    };
  });
</script>
<div class="cont" class:loaded={contBackgroundLoaded} style="background-image: {contBackground};"> 
  {#if showContent}
    <div class="fade" in:fade={{ duration: 800 }}>
      <div class="flex">
        <div class="text">
          <h2>Sponsorer</h2>
        </div>
        <EmblaCarousel />
      </div>
    </div>
  {/if}
</div>

<style nonce="%sveltekit.nonce%">
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
    font-family: var(--font-header);
    text-align: center;
    background-size: cover;
    background-position: top center;
    background-repeat: no-repeat;
    background-image: none;
    transition: background-image 1s ease-in-out;
  }

  .cont.loaded {
    background-image: var(--contBackground);
  }

  .cont::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    background: radial-gradient(circle, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.9));
    width: 100%;
    height: 100vh;
    z-index: 1;
  }
  .flex {
    margin-top: -8rem;
    z-index: 1;
    width: 100vw;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h2 {
    @apply text-white;
    text-shadow: 0 0 1rem black;
    font-family: var(--font-header);
    font-size: 5rem;
    margin-bottom: 2rem;
    user-select: none;
    z-index: 2;
  }
  .text {
    z-index: 2;
  }
  @media (max-width: 1450px) {
    h2 {
      font-size: 4rem;
    }
  }
  @media (max-width: 540px) {
    h2 {
      font-size: 3.25rem;
      margin-bottom: 0rem;
    }
    .cont {
      background-position: top;
    }
  }
  
</style>