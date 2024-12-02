<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  // Import all images needed for the slideshow
  const images = import.meta.glob<{ default: string }>('$lib/assets/slideshow/*.webp', { eager: true });
  const imageArray: string[] = Object.values(images).map((module) => (module as { default: string }).default);
  
  let imageIndex = 0;

  onMount(() => {
    if (imageArray.length === 0) return; // Ensure imageArray is not empty

    const interval = setInterval(() => {
      imageIndex = (imageIndex + 1) % imageArray.length; // Cycle through images
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Clean up interval on component destroy
  });
</script>

<div class="overflow" role="region" aria-label="Slideshow over Elvebakkenrevy-konseptene" aria-roledescription="carousel">
  <p class="slideshow-text">Fra skaperne av:</p>
  <div class="slideshow" aria-live="polite" aria-atomic="true">
    {#key imageIndex}
      <img 
        id="slideshow-image" 
        src={imageArray[imageIndex]} 
        alt={`Elvebakkenrevybilde ${imageIndex + 1} av ${imageArray.length}`} 
        class="fade-in" 
        transition:fade 
      />
    {/key}
  </div>
</div>

<style>
  .overflow {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: auto;
    border-radius: 12.5px;
    user-select: none;
    margin-top: 0; /* Removed percentage for consistency */
    z-index: 5;
  }

  .slideshow {
    overflow: hidden;
    background-color: black;
    width: 50vw; /* Set width */
    height: auto; /* Set height to auto */
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
    font-size: 2.7em;
    font-family: var(--font-header);
    color: #fff;
    margin-bottom: 1rem;
    text-align: center;
  }

  @media (max-width: 1450px) {
    .overflow { 
      margin-top: 0%; 
    }
    
    .slideshow {
      width: 57vw; 
      height: auto;
    }

    .slideshow-text {
      font-size: 2.5em;
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
      font-size: 1.5em;
    }
    
}
</style>