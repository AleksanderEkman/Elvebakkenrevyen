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
<!-- Cont er bare continuation -->
<div class="cont" class:loaded={contBackgroundLoaded} style="background-image: {contBackground};"> 
  <!-- Lazy loading -->
  {#if showContent}
    <div class="fade" in:fade={{ duration: 500 }}>
      <div class="flex">
        <div class="text">
          <!-- Overskrift -->
          <h2>Sponsorer</h2>
        </div>
        <!-- Importer EmblaCarousel - se EmblaCarousel.svelte i /components -->
        <EmblaCarousel />
      </div>
    </div>
  {/if}
</div>

<style nonce="%sveltekit.nonce%">
  .cont {
    height: 49rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    font-family: var(--font-header);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .cont::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    background: radial-gradient(circle, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9));
    width: 100%;
    height: 49rem;
    z-index: 2;
  }
  .flex {
    margin-top: -5rem;
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
  }
  .text {
    z-index: 2;
  }
  @media (min-width: 1450px) {
    .cont {
      height: 90vh;
    }
    .cont::before {
      height: 90vh;
    }
  }
  @media (max-width: 1450px) {
    h2 {
      font-size: 4rem;
    }
  }
  @media (max-width: 550px) {
    h2 {
      font-size: 3.25rem;
      margin-bottom: 0rem;
    }
    .cont {
      background-position: top;
    }
  }
    
  /* Media query for mobile landscape mode */
  @media (max-width: 933px) and (orientation: landscape) {
    .cont {
      height: 40rem;
    }
    h2 {
      font-size: 3.5rem;
    }
  }
</style>