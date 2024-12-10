<script lang="ts">
  import { onMount } from 'svelte';
  import EmblaCarousel from 'embla-carousel';

  let emblaNode: HTMLElement;
  let viewportNode: HTMLElement;
  let emblaApi: any;
  let sponsorImages: string[] = [];
  let textArray = ['Vulkan Oslo', 'Kaffebrenneriet', 'Freddy Fuego', 'Fellesverkstedet', 'Vega Scene', 'Syng']

  /** @type {import('embla-carousel').EmblaOptionsType} */
  const OPTIONS = { loop: true };

  onMount(() => {
    const loadImages = async () => {
      // Dynamically import all images from $lib/assets/sponsors/*.webp
      const images = import.meta.glob<{ default: string }>('$lib/assets/sponsors/*.webp');
      for (const path in images) {
        const imageModule = await images[path]();
        sponsorImages = [...sponsorImages, imageModule.default];
      }
    };

    loadImages().then(() => {
      emblaApi = EmblaCarousel(viewportNode, OPTIONS);
    });

    emblaNode.addEventListener('click', handleCarouselClick);

    return () => {
      emblaNode.removeEventListener('click', handleCarouselClick);
      emblaApi.destroy();
    };
  });

  function handleCarouselClick(event: MouseEvent) {
    event.preventDefault(); // Prevent default behavior
  }
</script>

<section bind:this={emblaNode} class="embla">
  <div bind:this={viewportNode} class="embla__viewport">
    <div class="embla__container">
      {#each sponsorImages as image, index}
        <div class="embla__slide">
          <div class="embla__slide__img">
            <img src={image} alt="Sponsor" loading="lazy" />
          </div>
          <div class="text">
            <p>{textArray[index]}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .embla {
    z-index: 2;
    margin: auto;
    --slide-height: 30rem;
    --slide-spacing: 1rem;
    --slide-size: 24%;
  }
  .embla:hover {
    cursor: grab;
  }
  .embla:active {
    cursor: grabbing;
  }
  .embla__viewport {
    width: 80vw;
    border-radius: 1.5rem;
    overflow: hidden;
  }
  .embla__container {
    z-index: 2;
    display: flex;
    touch-action: pan-y pinch-zoom;
    margin-left: calc(var(--slide-spacing) * -1);
  }
  .embla__slide {
    display: flex;
    flex-direction: column;
    z-index: 2;
    transform: translate3d(0, 0, 0);
    flex: 0 0 var(--slide-size);
    min-width: 0;
    padding-left: var(--slide-spacing);
  }
  .embla__slide__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1.5rem;
    background-color: rgba(0, 0, 0, 0.6);
    box-shadow: inset 0 0 0 0.2rem var(--detail-medium-contrast);
    user-select: none;
  }
  .text p {
    font-size: 2.5rem;
    color: white;
    text-align: center;
    margin-top: 0.4rem;
    user-select: none;
  }
  @media (max-width: 1450px) {
    .embla {
      --slide-size: 27.5%;
      --slide-height: 20rem;
    }
    .embla__viewport {
      width: 90vw;
    }
  }
  @media (max-width: 540px) {
    .embla {
      --slide-size: 75%;
      --slide-height: 27.5rem;
    }
    .embla__viewport {
      width: 100vw;
    }
    .text p {
      font-size: 2rem;
      margin-top: 0;
    }
  }
</style>