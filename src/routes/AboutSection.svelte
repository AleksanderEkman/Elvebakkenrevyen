<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<section class="aboutSection">
	<div class="text-card">
		<h2>Forestillingen</h2>
		<p>Elvebakkenrevyen 2024 setter farge på tilværelsen</p>
		<p>
			Årets revy spilles i en trapp. Den har blitt malt beige, hvit og kjedelig av det nye
			Beigerådet, nei, byrådet. De misliker alt som er fargerikt og festlig. Heldigvis har vi
			skrevet inn to helter som ønsker å gjøre noe med det.
		</p>
		<p>
			Klarer de å male trappa full av farger igjen, eller beholder Beigerådet makten i trappa for
			alltid?
		</p>
		<p>
			Kom og se revy på Elvebakken videregående skole 29. februar - 11. mars for å finne det ut!
		</p>
		<button class="cta" on:click={() => goto('/billetter')}>Opplev revyen!</button>
	</div>
	<div class="card">
		<img loading="lazy" src="/og-image.webp" alt="Bilde av Elvebakkenrevyen 2025 forestillingen" />
	</div>
</section>

<style>
	.aboutSection {
		padding: 4rem;
		color: white;
		background: linear-gradient(
			135deg,
			rgba(0, 0, 10, 1) 0%,
			rgba(10, 10, 20, 1) 50%,
			rgba(20, 20, 30, 1) 80%,
			rgba(30, 30, 40, 1) 100%
		);
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100vw;
		height: 52.5rem;
		position: relative;
		text-transform: none;
		overflow: hidden;
		transition: background-image 1s ease-in-out;
	}

	.text-card,
	.card {
		font-size: clamp(1rem, 2vw, 1.15rem);
		display: flex;
		flex-direction: column;
		border-radius: 25px;
	}

	.text-card {
		max-width: none;
		width: 35rem;
		padding: 2rem;
		text-align: left;
		background-color: rgba(0, 0, 0, 0.3);
	}

	h2 {
		font-size: clamp(2rem, 4vw, 2.5rem);
		font-weight: 700;
		letter-spacing: 0.05em;
		margin-bottom: 1rem;
		font-family: var(--font-header);
	}

	p {
		margin-bottom: 1rem;
	}

	.cta {
		margin: 2rem 0;
		display: inline-flex;
		width: 12rem;
		font-size: 1.2rem;
		align-items: center;
		justify-content: center;
		padding: 0.7rem 1rem;
		position: relative;
		border-radius: 10px;
		background-color: rgba(11, 111, 244, 0.2);
		border: 1px solid white;
		transition: all 0.3s ease;
	}

	.cta:hover {
		background-color: rgba(11, 111, 244, 0.4);
		transform: scale(1.05);
	}

	img {
		border-radius: 10px;
		width: 40rem;
		height: auto;
		max-width: none;
	}
	@media (min-width: 1500px) {
		.text-card {
			width: 45rem;
		}
		.aboutSection {
			gap: 5rem;
			height: 85svh;
			justify-content: center;
		}
		img {
			width: 47.5rem;
		}
	}
	@media (max-width: 768px) {
		.aboutSection {
			flex-direction: column-reverse;
			padding: 2rem 1rem;
		}
		.text-card,
		.card {
			width: 100%;
			align-items: center;
			text-align: center;
		}

		.text-card {
			padding: 1.5rem;
		}
		img {
			width: 22.5rem;
		}
	}
	@media (max-width: 935px) and (orientation: landscape) {
		.aboutSection {
			height: auto;
		}
		img {
			padding: 1rem;
			width: 22.5rem;
		}
		.text-card {
			height: 100%;
			padding: 1.5rem;
			font-size: 1rem;
		}
		img {
			width: 22.5rem;
		}
	}
</style>
