<script lang="ts">
	import { on } from 'svelte/events';
  import EmblaCarousel from './components/EmblaCarousel.svelte';

</script>

<div class="flex">
  <div class="text">
    <h2>Sponsorer</h2>
  </div>
  <EmblaCarousel />
</div>

<style nonce="%sveltekit.nonce%">
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
  }
</style>