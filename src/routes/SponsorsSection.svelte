<script lang="ts">
    import EmblaCarousel from './components/EmblaCarousel.svelte';
</script>

<div class="flex">
  <div class="text">
    <h2>Sponsorer</h2>
  </div>
  <EmblaCarousel />
</div>

<style>
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
    font-family: var(--font-header);
    font-size: 5rem;
    margin-bottom: 2rem;
  }
  @media (max-width: 540px) {
    h2 {
      font-size: 4rem;
    }
  }
</style>