<script lang="ts">
  import { onMount } from 'svelte';
  const images = import.meta.glob<{ default: string }>('$lib/assets/slideshow/*.webp', { eager: true });
  const imageArray: string[] = Object.values(images).map((module) => (module as { default: string }).default);
  let imageIndex = 0;
  let imgElement: HTMLImageElement;

  onMount(() => {
    const imgElement = document.getElementById('slideshow-image') as HTMLImageElement;
    if (!imgElement) return;
    imgElement.src = imageArray[imageIndex];

    const interval = setInterval(() => {
      imgElement.classList.remove('fade-in');
      imgElement.classList.add('fade-out');
      imageIndex = (imageIndex + 1) % imageArray.length;
      setTimeout(() => {
        imgElement.src = imageArray[imageIndex];
        setTimeout(() => {
          imgElement.classList.remove('fade-out');
          imgElement.classList.add('fade-in');
        }, 200);
      }, 200);
    }, 5000);

    return () => clearInterval(interval);
  });
</script>

<div class="overflow">
  <div class="slideshow">
    <img id="slideshow-image" bind:this={imgElement} alt="Slideshow for tidligere revyforestillinger" class="w-full h-auto fade-in" />
  </div>
</div>
<style>
  .overflow {
    overflow: hidden;
    z-index: 5;
    margin-top: 0%;
    display: flex;
    justify-content: center;
    width: 100%;
    height: auto;
    border-radius: 12.5px;
    user-select: none;
  }

  .slideshow {
    overflow: hidden;
    background-color: black;
    width: 50vw; /* Setter bredde */
    height: auto; /* Setter høyde til auto */
    position: relative;
    border-radius: 10px;
    z-index: 5;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    aspect-ratio: 18.5 / 10; /* Bredde til høyde */
}

  #slideshow-image {
    border-radius: 10px;
    position: absolute; 
    top: 0; 
    left: 0; 
    width: 100%;
    height: 100%;
    user-select: none;
    -webkit-user-drag: none;
    z-index: 2;
    object-fit: cover; 
  }
    
  :global(.fade-in) {
    animation: fadeIn 0.2s forwards;
  }

  :global(.fade-out) {
    animation: fadeOut 0.2s forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @media (max-width: 1420px) {
    .overflow { 
      margin-top: 3.5%;
    }
    .slideshow {
      width: 55vw; /* Adjusted width for medium screens */
      aspect-ratio: auto; /* Allow height to adjust */
      height: auto; /* Allow height to adjust based on content */
    }
    #slideshow-image {
      position: relative;
    }
  }

  @media (max-width: 480px) {
    .slideshow {
      width: 90vw; /* Full width for small screens */
      aspect-ratio: auto; /* Allow height to adjust */
      height: auto; /* Allow height to adjust based on content */
    }
    #slideshow-image {
      position: relative;
    }
  }
</style>