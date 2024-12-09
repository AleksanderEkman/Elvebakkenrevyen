<script lang="ts">
    import { onMount } from 'svelte';
    import EmblaCarousel from 'embla-carousel';

  
    let emblaNode: HTMLElement;
    let viewportNode: HTMLElement;
    let emblaApi: any;
  
    /** @type {import('embla-carousel').EmblaOptionsType} */
    const OPTIONS = { loop: true };
  
    onMount(() => {
      emblaApi = EmblaCarousel(viewportNode, OPTIONS);
  
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
        <div class="embla__slide">
          <div class="embla__slide__number">1</div>
        </div>
        <div class="embla__slide">
          <div class="embla__slide__number">2</div>
        </div>
        <div class="embla__slide">
          <div class="embla__slide__number">3</div>
        </div>
        <div class="embla__slide">
          <div class="embla__slide__number">4</div>
        </div>
        <div class="embla__slide">
          <div class="embla__slide__number">5</div>
        </div>
        <div class="embla__slide">
            <div class="embla__slide__number">6</div>
          </div>
      </div>
    </div>
  </section>
  
  <style>
    .embla {
        z-index: 2;

        margin: auto;
        --slide-height: 30rem;
        --slide-spacing: 1rem;
        --slide-size: 25%;
    }
    .embla:hover {
        cursor: grab;
    }
    .embla:active {
        cursor: grabbing;
    }
    .embla__viewport {
        width: 65vw;
        border-radius: 1.8rem;
        overflow: hidden;
    }
    .embla__container {
        z-index: 2;
        display: flex;
        touch-action: pan-y pinch-zoom;
        margin-left: calc(var(--slide-spacing) * -1);
    }
    .embla__slide {
        z-index: 2;
        transform: translate3d(0, 0, 0);
        flex: 0 0 var(--slide-size);
        min-width: 0;
        padding-left: var(--slide-spacing);
    }
    .embla__slide__number {
        background-color: rgba(255,255,255,0.15);
        z-index: 2;
        box-shadow: inset 0 0 0 0.2rem var(--detail-medium-contrast);
        border-radius: 1.8rem;
        font-size: 4rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        height: var(--slide-height);
        user-select: none;
    }
    @media (max-width: 540px) {
        .embla {
            --slide-size: 65%;
            --slide-height: 25rem;
        }
        .embla__viewport {
            width: 100vw;
        }
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
  </style>