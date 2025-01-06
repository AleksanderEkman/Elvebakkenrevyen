<script lang="ts">
	import EmblaCarousel from './components/EmblaCarousel.svelte';
</script>

<div class="flex">
	<div class="text">
		<!-- Overskrift -->
		<h2>Sponsorer</h2>
	</div>
	<!-- Importer EmblaCarousel - se EmblaCarousel.svelte i /components -->
	<EmblaCarousel />
</div>

<style>
	.flex {
		margin-top: -5rem;
		z-index: 3;
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
	}

	/* Media query for mobile landscape mode */
	@media (max-width: 933px) and (orientation: landscape) {
		h2 {
			font-size: 3.5rem;
		}
	}
</style>
