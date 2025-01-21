<script lang="ts">
	import { fade } from 'svelte/transition';
	import background_image from '$lib/assets/Elvebakken.webp';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Links from './components/Links.svelte';
	import InAppSpy from 'inapp-spy';
	import dice from '$lib/assets/dice.svg';

	let { showContent } = $props();

	let height: number | string = $state('100svh');
	let scrollY: number = $state(0);
	let innerHeight: number = $state(0);
	let scrollAmplifier: number = $state(0);

	onMount(() => {
		// Sjekker om brukeren er i en app, bruker annen strategi for å hente høyde
		const { isInApp } = InAppSpy();
		if (isInApp) {
			height = innerHeight + 'px';
		} else {
			height = '100svh';
		}
		if (
			window.matchMedia('(max-width: 540px)').matches ||
			window.matchMedia('(max-height: 450px)').matches
		) {
			scrollAmplifier = 0.7;
		} else {
			scrollAmplifier = -1.1;
		}
	});
</script>

<!-- Bind til vinduet for å hente scrollY og innerHeight -->
<svelte:window bind:innerHeight bind:scrollY />

<!-- HTML-struktur med visuell hierarki for UX -->
<section
	class="hero"
	style="background-image: url({background_image}); height: {height} !important; 
	background-position-y: 
	{scrollAmplifier *
		scrollY *
		0.25}px;"
>
	<div class="overlay"></div>

	{#if showContent}
		<div class="container" in:fade={{ duration: 50 }}>
			<div class="kicker">
				<div class="inline">
					<img id="logo" src="/favicon.webp" alt="Elvebakkenrevyenlogo" />
					<p id="grey">Elvebakkenrevyen 2025</p>
				</div>
				<p id="grey">&nbsp- en <strong>uforglemmelig</strong> opplevelse siden 2002</p>
			</div>
			<div class="hero-title">
				<h1>This Must Be The Place</h1>
			</div>
			<div class="rating">
				<img src={dice} alt="Terningkast seks av seks for Elvebakkenrevyen" />
				<p id="grey">15x</p>
				<p id="grey">| Vinneren av årets revy 4 ganger!</p>
			</div>
			<div class="btn-container">
				<button class="cta" onclick={() => goto('/billetter')}>Se forestillingene våre!</button>
			</div>
		</div>
	{/if}

	<div class="info">
		<p>Vestre Elvebakke 3</p>
		<p>26.02.2025 - 12.03.2025</p>
	</div>
	{#if showContent}
		<div class="links" in:fade={{ duration: 500 }}>
			<!-- Egen komponent for links -->
			<Links />
		</div>
	{/if}
</section>

<style>
	.hero {
		@apply py-20 text-white;
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100vw;
		position: relative;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		background-attachment: fixed;
		overflow-x: hidden;
		padding: 0;
		background-color: #000; /* Set a background color that matches the background image */
	}
	.overlay {
		user-select: none;
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 2;
		background: linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3));
	}
	.container {
		width: auto;
		height: auto;
		font-size: 1.2rem;
		display: inline-flex;
		left: 18.5vw;
		position: relative;
		flex-direction: column;
		justify-content: center;
		z-index: 3;
		height: 85%;
	}
	.info {
		font-size: 1.2rem;
		width: 100vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		z-index: 2;
		color: white;
		position: absolute;
		text-align: center;
		margin-bottom: 1.5rem;
		bottom: 0;
	}
	.info p {
		display: flex;
	}
	.cta {
		font-size: 1.4rem;
		align-items: center;
		justify-content: center;
		display: inline-block;
		width: auto;
		padding: 0;
		position: relative;
		border-radius: 10px;
		border: 1px solid white;
		padding: 0.5rem 1rem;
		background-color: rgba(11, 111, 244, 0.5);
		transition: all 0.3s ease;
	}
	.cta:hover {
		background-color: rgba(11, 111, 244, 0.75);
		transform: scale(1.025);
	}
	.hero-title {
		line-height: 1;
		display: inline-block;
		width: auto;
		height: auto;
		position: relative;
		text-shadow:
			2px 2px 4px rgba(0, 0, 0, 0.2),
			0 0 2px rgba(255, 255, 255, 0.2),
			0 0 4px rgba(255, 255, 255, 0.13);
		font-size: 11.5rem;
		font-family: var(--font-header);

		letter-spacing: 2px;
	}
	h1 {
		display: inline-block;
		width: auto;
		margin: 0;
		height: auto;
	}
	.links {
		position: absolute;
		width: 100%;
		bottom: 10px;
		left: 20px;
		z-index: 2;
	}

	.kicker {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 1.4rem;
		margin-bottom: 0.75rem;
	}
	.rating {
		font-style: italic;
		margin-bottom: 1.5rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 1.2rem;
	}
	.rating img {
		width: 20px;
		height: 20px;
	}
	#grey {
		color: #9e9e9e;
	}
	strong {
		color: #b3b1b1;
		font-style: italic;
	}
	.inline {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	#logo {
		display: flex;
		width: 20px;
		height: 20px;
		margin-right: 5px;
	}
	/* Media queries for responsivitet */
	/* Tilegnet laptoper og Mac */
	@media (max-width: 1550px) {
		.hero-title {
			text-shadow:
				1px 1px 2px rgba(0, 0, 0, 0.2),
				0 0 2px rgba(255, 255, 255, 0.2),
				0 0 4px rgba(255, 255, 255, 0.13);
			font-size: 7rem;
		}
		.rating {
			font-size: 0.95rem;
		}
		.kicker {
			font-size: 1.2rem;
		}
	}
	/* Tilegnet tablets (iPad-er) */
	@media (max-width: 930px) {
		.container {
			left: 6rem;
		}
		.hero {
			justify-content: flex-start;
		}
	}

	@media (max-width: 540px) {
		h1 {
			height: auto;
		}
		.hero {
			display: flex;
			justify-content: flex-start;
			background-attachment: scroll;
		}
		.hero-title {
			font-size: 4.25rem;
		}
		.container {
			font-size: 1rem;
			left: 0;
			margin-left: 3.8rem;
		}
		.kicker {
			font-size: 0.95rem;
		}
		.cta {
			font-size: 0.95rem;
			padding: 0.6rem 1rem;
		}
		.rating {
			font-size: 0.8rem;
		}
		.info {
			display: none;
		}
		.links {
			left: 0;
			flex-direction: row;
			width: 100%;
		}
	}
	@media (max-width: 375px) {
		.hero-title {
			font-size: 3rem;
		}
		.container {
			margin-left: 2.25rem;
		}
		.cta {
			font-size: 0.85rem;
			padding: 0.5rem 0.9rem;
		}
		.kicker {
			font-size: 0.85rem;
		}
		.rating {
			font-size: 0.725rem;
		}
	}

	/* Media query for mobile landscape mode */
	@media (max-width: 935px) and (orientation: landscape) {
		.hero {
			height: 100svh;
			padding: 10px;
			background-attachment: scroll;
		}
		.hero-title {
			font-size: 4.25rem;
			margin-top: 0;
			text-shadow: none;
			text-shadow:
				1px 1px 2px rgba(0, 0, 0, 0.2),
				0 0 2px rgba(255, 255, 255, 0.2),
				0 0 4px rgba(255, 255, 255, 0.13);
		}
		h1 {
			height: auto;
		}
		.container {
			padding: 10px;
		}
		.info {
			display: none;
		}
		.links {
			left: 0;
			bottom: 0;
		}
		.cta {
			font-size: 1.1rem;
			padding: 0.6rem 1rem;
		}
	}
</style>
