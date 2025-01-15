<script lang="ts">
	import { onMount, tick } from 'svelte';
	import HeroSection from './HeroSection.svelte';
	import AboutSection from './AboutSection.svelte';
	import sponsorer_background from '$lib/assets/sponsorer.webp';
	
	let SponsorsSection: ConstructorOfATypedSvelteComponent | null = null;
	let showContent = false;
	let sponsorsSectionRef: HTMLElement;

	onMount(async () => {
		showContent = true;
		await tick();
		const spObserver = new IntersectionObserver(
			async (entries) => {
				if (entries[0].isIntersecting) {
					SponsorsSection = (await import('./SponsorsSection.svelte')).default;
					spObserver.disconnect();
				}
			},
			{ rootMargin: '0px 0px 300px 0px', threshold: 0.1 }
		);
		spObserver.observe(sponsorsSectionRef);
	});
</script>

<!-- Side-spesifikk tittel -->
<svelte:head>
	<title>Elvebakkenrevyen 2025</title>
	<link rel="canonical" href="https://www.elvebakkenrevyen.no" />
</svelte:head>

<!-- Rendrer alle komponentene med en main tag. -->
<!-- Bruker litt annen syntaks for å lazy loade SponsorsSection -->
<main>
	<HeroSection {showContent} />
	<AboutSection />
	<section
		bind:this={sponsorsSectionRef}
		class="sponsors"
		style="background-image: url({sponsorer_background})"
	>
		{#if SponsorsSection}
			<svelte:component this={SponsorsSection} />
		{/if}
	</section>
</main>

<style nonce="%sveltekit.nonce%">
	main {
		height: auto;
		overflow-x: hidden;
	}
	.sponsors {
		width: 100vw;
		height: 50rem;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		overflow: hidden;
		font-family: var(--font-header);
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
	.sponsors::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		background: radial-gradient(circle, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9));
		width: 100%;
		height: 100%;
		z-index: 2;
	}
	@media (min-width: 1450px) {
		.sponsors {
			height: 90vh;
		}
	}
	@media (max-width: 550px) {
		.sponsors {
			height: 47.5rem;
			background-position: top;
		}
	}
	/* Media query for mobile landscape mode */
	@media (max-width: 933px) and (orientation: landscape) {
		.sponsors {
			height: 35rem;
		}
	}
</style>
