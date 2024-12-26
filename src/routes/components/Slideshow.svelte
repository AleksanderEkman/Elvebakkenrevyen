<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  let images: Record<string, () => Promise<{ default: string }>>;

  // Importer alle bilder fra assets mappa
  if (navigator.userAgent.includes('Mobile')) {
    images = import.meta.glob<{ default: string }>('$lib/assets/slideshow/mobile/*.webp');
  } else {
    images = import.meta.glob<{ default: string }>('$lib/assets/slideshow/*.webp');
  }

  let imageArray: string[] = [];
  let imageIndex = 0;

  onMount(() => {
    (async () => {
      imageArray = await Promise.all(
        Object.values(images).map(module => module())
      ).then(images => images.map(img => img.default));

      if (imageArray.length === 0) return; // Passer på at imageArray ikke er tom

      const interval = setInterval(() => {
        imageIndex = (imageIndex + 1) % imageArray.length; // Cycle through images
      }, 4000); // Change image every 4 seconds

      return () => clearInterval(interval); // Cleanup interval on component unmount
    })();
  });
</script>

<div class="overflow" role="region" aria-label="Slideshow over Elvebakkenrevy-konseptene" aria-roledescription="carousel">
  <p class="slideshow-text">Fra skaperne av</p>
  <div class="slideshow" aria-live="polite" aria-atomic="true">
    {#if imageArray.length > 0}
      {#key imageIndex}
        <img 
          loading="eager"
          id="slideshow-image" 
          src={imageArray[imageIndex]} 
          alt={`Elvebakkenrevybilde ${imageIndex + 1} av ${imageArray.length}`} 
          transition:fade
        />
      {/key}
    {/if}
  </div>
</div>

<style nonce="%sveltekit.nonce%">
  .overflow {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-radius: 12.5px;
    user-select: none;
    z-index: 5;
  }

  .slideshow {
    overflow: hidden;
    background-color: black;
    width: 52.5vw; /* Set width */
    height: auto; /* Prepare for aspect ratio */
    position: relative;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    aspect-ratio: 18.5 / 10;
  }

  #slideshow-image {
    border-radius: 10px;
    position: absolute; 
    top: 0; 
    left: 0; 
    width: 100%;
    height: 100%;
    object-fit: cover;
    user-select: none;
    -webkit-user-drag: none; 
    z-index: 2;
    transition: opacity 0.5s ease-in-out; 
  }
  
  .slideshow-text {
    text-align: center;
    font-size: 3.2em;
    font-family: var(--font-header);
    color: #fff;
    margin-bottom: 1rem;
  }

  @media (max-width: 1450px) {
    .overflow { 
      margin-top: 0%; 
    }
    
    .slideshow {
      width: 60vw; 
      height: auto;
    }

    .slideshow-text {
      font-size: 2.5em;
    }
  }
  @media (max-width: 768px) {
    .slideshow {
      width: 72.5vw; 
      height: auto;
    }
  }
  @media (max-width: 480px) {
    .overflow { 
      margin-top: 5%; 
    }
    .slideshow {
      width: 90vw; 
      height: auto; 
    }
    .slideshow-text {
      font-size: 1.8em;
    }
  }
  /* Media query for mobile landscape mode */
  @media (max-width: 933px) and (orientation: landscape) {
    .slideshow-text {
      font-size: 1.8em;
    }
  } 
</style>