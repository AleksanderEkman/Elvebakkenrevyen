<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	const events = [
		{ label: 'Premiere', date: '26. Februar', time: '18:00', showCode: 's1' },
		{ label: 'Forestilling', date: '27. Februar', time: '18:00', showCode: 's2' },
		{ label: 'Forestilling', date: '28. Februar', time: '18:00', showCode: 's3' },
		{ label: 'Forestilling', date: '29. Februar', time: '18:00', showCode: 's4' },
		{ label: 'Forestilling', date: '1. Mars', time: '18:00', showCode: 's5' },
		{ label: 'Forestilling', date: '2. Mars', time: '18:00', showCode: 's6' },
		{ label: 'Forestilling', date: '3. Mars', time: '18:00', showCode: 's7' },
		{ label: 'Forestilling', date: '4. Mars', time: '18:00', showCode: 's8' },
		{ label: 'Forestilling', date: '5. Mars', time: '18:00', showCode: 's9' },
		{ label: 'Forestilling', date: '6. Mars', time: '18:00', showCode: 's10' },
		{ label: 'Teppefalls', date: '7. Mars', time: '18:00', showCode: 's11' }
	];
	onMount(() => {
		setTimeout(() => {
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							entry.target.classList.add('visible');
							observer.unobserve(entry.target);
						}
					});
				},
				{ threshold: 0.45 }
			);

			const cards = document.querySelectorAll('.event');
			cards.forEach((card) => observer.observe(card));
		});
	});
</script>

<section class="ticketSection">
	<div class="text">
		<h1>Billetter</h1>
		<p>
			Spar datoen 26. februar 2025, for da går premieren av stabelen. Kom og bli en del av vårt
			publikum, og opplev magien selv.
			<br /><br />
			Elvebakkenrevyen er mer enn en forestilling, det er en hjertelig invitasjon til å bli en del av
			noe større.<br />Vi gleder oss til å dele kvelden med dere!
		</p>
	</div>

	<div class="wide">
		<div class="map-wrapper">
			<iframe
				in:fade={{ duration: 1500 }}
				class="map"
				title="map"
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1999.7978048428802!2d10.750444813434079!3d59.918902963584095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46416e6418f98fa3%3A0xd28772a8dd823d4b!2sVestre%20Elvebakke%203%2C%200182%20Oslo!5e0!3m2!1sno!2sno!4v1735079848859!5m2!1sno!2sno"
				height="500"
				loading="eager"
				style="border:0;"
				referrerpolicy="no-referrer-when-downgrade"
			>
			</iframe>
		</div>
	</div>

	<div class="flex">
		<h2><a href="https://bestill.albillett.no/nb/1574">Albillett:</a></h2>
		{#each events as event, index}
			<a
				class="event {index === 0 ? 'first-event' : ''}"
				href={`https://bestill.albillett.no/nb/arrangement/${event.showCode}`}
				target="_blank"
			>
				<div class="event-content">
					<p class="event-label">{event.label}</p>
					<p class="event-date">{event.date} 2025</p>
					<p class="event-time">Kl. {event.time}</p>
				</div>
			</a>
		{/each}
	</div>
</section>

<style>
	h1 {
		font-size: 3.5rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		margin-bottom: 1rem;
		font-family: var(--font-header);
	}
	h2 {
		font-size: 1.5rem;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		grid-column: span 2;
		text-decoration: underline;
	}
	p {
		font-size: 1.25rem;
		max-width: 60ch;
		margin-bottom: 1rem;
	}
	.wide {
		width: 100vw;
		display: flex;
		justify-content: center;
	}
	.ticketSection {
		background: linear-gradient(
			135deg,
			rgba(0, 0, 10, 1) 0%,
			rgba(10, 10, 20, 1) 50%,
			rgba(20, 20, 30, 1) 80%,
			rgba(30, 30, 40, 1) 100%
		);
		color: white;
		height: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100vw;
		text-align: center;
		padding: 6.5rem 5rem;
		overflow: hidden;
	}
	.flex {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(5, auto);
		gap: 2rem;
		padding: 1rem;
	}
	.first-event {
		grid-column: span 2;
	}
	.event {
		background-color: rgba(0, 0, 0, 0.3);
		font-size: 1rem;
		border-radius: 15px;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0rem;
		cursor: pointer;
		box-shadow:
			inset 0 0 0 0.1rem rgba(0, 0, 0, 0.1),
			0 4px 8px rgba(0, 0, 0, 0.4);
		transition: all 0.3s ease;
		opacity: 0;
		transform: translateY(20px);
	}
	:global(.event.visible) {
		opacity: 1;
		transform: translateY(0);
	}
	.event:hover {
		transform: scale(1.04) translateY(-5px);
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.6);
	}
	.event-content {
		text-wrap: none;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 20rem;
		height: auto;
	}
	.event-label {
		font-size: 1.7rem;
		font-weight: bold;
	}
	.event-date,
	.event-time {
		text-wrap: nowrap;
	}
	.event-date {
		font-size: 1.6rem;
	}
	.event-time {
		font-size: 1.3rem;
	}
	.map-wrapper {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100vw;
		margin: 3rem 0;
		max-width: 1100px;
	}

	.map {
		display: flex;
		justify-self: center;
		width: 100%;
		height: 40rem;
		border-radius: 10px;
		box-shadow: var(--shadow);
	}
	@media (min-width: 1500px) {
		.event-content {
			width: 30rem;
		}
		.event {
			padding: 2.5rem 2rem;
		}
	}
	@media (max-width: 800px) {
		.event-content {
			width: 12.5rem;
		}
	}
	@media (max-width: 580px) {
		.ticketSection {
			padding: 2rem 0;
		}
		.map {
			width: 92.5vw;
			height: 92.5vw;
		}
		.map-wrapper {
			max-width: none;
		}
		.flex {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		.event {
			gap: 0rem;
			grid-column: span 2;
			width: 85%;
			padding: 1.5rem 10rem;
		}
		.event-content {
			width: 100%;
			max-width: none;
			height: 8rem;
		}
		.event-label {
			font-size: 1.4rem;
		}
		.event-date {
			font-size: 1.1rem;
		}
		.event-time {
			font-size: 1rem;
		}
		p {
			font-size: 1rem;
		}
	}
	@media (max-width: 935px) and (orientation: landscape) {
		.map {
			width: 72.5vw;
			height: 37.5vw;
		}
		.map-wrapper {
			max-width: none;
		}
		.flex {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		.event {
			gap: 0rem;
			grid-column: span 2;
			width: 85%;
			padding: 1.5rem 10rem;
		}
		.event-label {
			font-size: 1.4rem;
		}
		.event-date {
			font-size: 1.1rem;
		}
		.event-time {
			font-size: 1rem;
		}
		p {
			font-size: 1rem;
		}
	}
</style>
