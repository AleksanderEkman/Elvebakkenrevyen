<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
  
    let carousel: HTMLElement;
  
    let isDragging = false;
    let startX: number;
    let scrollLeft: number;
    let velocity = 0;
    let rafId: number;
  
    const startDrag = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      startX = (e instanceof MouseEvent ? e.pageX : e.touches[0].pageX) - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
      velocity = 0;
      cancelAnimationFrame(rafId);
    };
  
    const stopDrag = () => {
      isDragging = false;
      applyInertia();
    };
  
    const drag = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = (e instanceof MouseEvent ? e.pageX : e.touches[0].pageX) - carousel.offsetLeft;
      const walk = (x - startX) * 2; // Adjust the scroll speed
      carousel.scrollLeft = scrollLeft - walk;
      velocity = walk;
    };
  
    const applyInertia = () => {
      if (Math.abs(velocity) > 0.5) {
        carousel.scrollLeft -= velocity;
        velocity *= 0.95; // Damping factor
        rafId = requestAnimationFrame(applyInertia);
      }
    };
  
    onMount(() => {
      carousel.addEventListener('mousedown', startDrag);
      carousel.addEventListener('touchstart', startDrag);
  
      carousel.addEventListener('mouseleave', stopDrag);
      carousel.addEventListener('mouseup', stopDrag);
      carousel.addEventListener('touchend', stopDrag);
  
      carousel.addEventListener('mousemove', drag);
      carousel.addEventListener('touchmove', drag);
  
      return () => {
        carousel.removeEventListener('mousedown', startDrag);
        carousel.removeEventListener('touchstart', startDrag);
  
        carousel.removeEventListener('mouseleave', stopDrag);
        carousel.removeEventListener('mouseup', stopDrag);
        carousel.removeEventListener('touchend', stopDrag);
  
        carousel.removeEventListener('mousemove', drag);
        carousel.removeEventListener('touchmove', drag);
      };
    });
  </script>

<section class="sponsors-section max-w-8xl mx-auto p-6">
  <h2 class="text-6xl text-center mb-8 text-white">Sponsorer</h2>
  <div class="carousel carousel-center  rounded-box max-w-6xl space-x-6 p-10" bind:this={carousel}>
    <div class="sponsor-logo max-w-xs mx-auto">
      <img src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp" alt="Sponsor 1" class="w-full h-auto">
    </div>
    <div class="sponsor-logo max-w-xs mx-auto">
      <img src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp" alt="Sponsor 2" class="w-full h-auto">
    </div>
    <div class="sponsor-logo max-w-xs mx-auto">
      <img src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp" alt="Sponsor 3" class="w-full h-auto">
    </div>
    <div class="sponsor-logo max-w-xs mx-auto">
      <img src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp" alt="Sponsor 4" class="w-full h-auto">
    </div>
    <div class="sponsor-logo max-w-xs mx-auto">
        <img src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp" alt="Sponsor 5" class="w-full h-auto">
    </div>
    <div class="sponsor-logo max-w-xs mx-auto">
    <img src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp" alt="Sponsor 6" class="w-full h-auto">
    </div>
  </div>
</section>

<style>
    .sponsors-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        width: 100vw;
        user-select: none;
        position: relative;
        text-transform: uppercase;
        overflow: hidden;
        z-index: 1;
    }
    h2 {
        font-family: var(--font-header);
    }
    img {
        -webkit-user-drag: none;
        user-select: none;
    }
  .carousel {
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;
    cursor: grab;
  }

  .carousel:active {
    cursor: grabbing;
  }

  .sponsor-logo {
    flex: 0 0 auto;
  }
</style>