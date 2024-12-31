<script lang="ts">
  import { onMount } from 'svelte';
  import EmblaCarousel from 'embla-carousel';

  let emblaNode: HTMLElement;
  let viewportNode: HTMLElement;
  let emblaApi: any;
  let sponsorImages: string[] = [];
  let sponsors: {name: string, alt: string, url: string}[] = [];
  let showContent = false
  
  // EmblaCarousel options
  const OPTIONS = { loop: true };

  onMount(() => {
    
    // Liste over alle sponsorer samt URL
    sponsors = [{name: 'Vulkan Oslo', alt: 'Vulkan Oslo', url: "https://vulkanoslo.no/"},
        {name: 'Kaffebrenneriet', alt: 'Vulkan Oslo', url: "https://www.kaffebrenneriet.no/"}, 
        {name: 'Freddy Fuego', alt: 'Vulkan Oslo', url: "https://www.freddyfuego.no/"},
        {name: 'Fellesverkstedet', alt: 'Vulkan Oslo', url: "https://www.fellesverkstedet.no/no"}, 
        {name: 'Vega Scene', alt: 'Vulkan Oslo', url: "https://www.vegascene.no/"}, 
        {name: 'Syng', alt: 'Vulkan Oslo', url: "https://syng.no/"}
      ]
    
    const loadImages = async () => {
      // Importerer alle bildene fra lib/assets/sponsors
      const images = import.meta.glob<{ default: string }>('$lib/assets/sponsors/*.webp');
      for (const path in images) {
        // Henter bildene og legger de i en liste, importerer bildene som moduler
        const imageModule = await images[path]();
        sponsorImages = [...sponsorImages, imageModule.default];
      }
      showContent = true;
    };

    loadImages().then(() => {
      // Oppretter en ny EmblaCarousel med emblaAPI
      emblaApi = EmblaCarousel(viewportNode, OPTIONS);
    });

    return () => {
      emblaApi.destroy();
    };
  });
</script>

<!-- Struktur for slideshow -->
<section bind:this={emblaNode} class="embla">
  <div bind:this={viewportNode} class="embla__viewport">
    <div class="embla__container">
      <!-- Itererer over hvert sponsorbilde -->
      {#if showContent}
        {#each sponsorImages as image, index}
          <div class="embla__slide">
            <div class="embla__slide__img">
              <img
                src={image} 
                width="100%"
                height="100%"
                alt="Sponsor" 
                loading="lazy" 
              />
            </div>
            <div class="text">
              <p><a href="{sponsors[index].url}" target={'_blank'} draggable="true">
                <!-- Legger til tekst basert på indeks -->
                {sponsors[index].name}
            </a></p>
            </div>
          </div>
        {/each}
      {/if}
    </div>
  </div>
</section>

<style>
  .embla {
    z-index: 2;
    margin: auto;
    --slide-height: 30rem;
    --slide-spacing: 0.75rem;
    --slide-size: 21%;
  }
  .embla:hover {
    cursor: grab;
  }
  .embla:active {
    cursor: grabbing;
  }
  .embla__viewport {
    width: 100vw;
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
    width: 30rem;
    padding-left: var(--slide-spacing);
  }
  .embla__slide__img {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: var(--slide-height);
    object-fit: cover;
    border-radius: 1.5rem;
    background-color: rgba(0, 0, 0, 0.75);
    box-shadow: inset 0 0 0 0.1rem rgba(0, 0, 0, 0.1), 
                0 4px 8px rgba(0, 0, 0, 0.4); 
    user-select: none;
  }
  
  .text p {
    font-size: 2.5rem;
    color: white;
    text-align: center;
    margin-top: 0.4rem;
    user-select: none;
    z-index: 5;
  }
  .text {
    user-select: none;
  }
  .text p a {
    user-select: none;
    display: inline-block;
  }
  .text p a::after {
    margin-top: -0.5rem;
    display: flex;
    justify-self: center;
    content: '';
    width: 0%;
    height: 5px;
    left: 0;
    background-color: var(--color-text1);
    transition: width 0.2s ease;
    border-radius: 1px;
  }
  .text p a:hover::after {
    width: 100%;
  }
  @media (max-width: 1450px) {
    .embla {
      --slide-size: 24%;
      --slide-height: 20rem;
    }
    .embla__viewport {
      width: 100vw;
    }
  }
  @media (max-width: 821px) {
    .embla {
      --slide-size: 30%;
      --slide-height: 17rem;
    }
    .embla__viewport {
      width: 100vw;
    }
    .text p {
      font-size: 2rem;
    }
  }
  @media (max-width: 550px) {
    .embla {
      --slide-size: 75%;
      --slide-height: 20rem;
      display: flex;
      
    }
    .embla__viewport {
      width: 100vw;
    }
    .text p {
      font-size: 2rem;
      margin-top: 0;
    }
    .text a {
      padding: 0.2rem;
      border: 0.1px solid rgba(255, 255, 255, 0.2);
      border-radius: 10px;
      box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
      text-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    }
  }  

  /* Media query for mobile landscape mode */
  @media (max-width: 933px) and (orientation: landscape) {
    .embla {
      --slide-height: 15rem;
    }
    .text p {
      font-size: 1.75rem;
    }
  }
</style>