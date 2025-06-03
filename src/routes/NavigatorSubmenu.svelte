<script lang="ts">
	import { onMount } from 'svelte';
	let { activePath } = $props();
	let submenu: HTMLElement;
	let maxScroll = $state(100);
	let y = $state(0);

	$effect(() => {
		maxScroll = document.documentElement.scrollHeight - window.innerHeight;
		if (submenu) {
			if (y < maxScroll * 0.04 || y > maxScroll * 0.925) {
				submenu.classList.add('show');
			} else {
				submenu.classList.remove('show');
			}
		}
	});

	onMount(() => {
		if (submenu) {
			if (y > 10) {
				submenu.classList.remove('show');
			} else {
				submenu.classList.add('show');
			}
		}
	});
</script>

<svelte:window bind:scrollY={y} />

<nav class="submenu" bind:this={submenu} aria-label="Sub Navigation">
	<ul>
		<li><a class:active={activePath === 'skuespillere'} href="/skuespillere">Skuespillere</a></li>
		<li><a class:active={activePath === 'band'} href="/band">Band</a></li>
		<li><a class:active={activePath === 'dansere'} href="/dansere">Dansere</a></li>
		<li><a class:active={activePath === 'sangere'} href="/sangere">Sangere</a></li>
	</ul>
</nav>

<style>
	.submenu {
		backdrop-filter: blur(5px);
		z-index: 4;
		top: 4.5rem;
		position: fixed;
		display: flex;
		justify-content: center;
		color: white;
		width: 100vw;
		margin: 0;
		padding: 0;
		transition: all 0.325s;
		opacity: 0;
		transform: scale(0.8);
		pointer-events: none;
	}
	:global(.submenu.show) {
		display: flex; 
		opacity: 1;
		transform: scale(1);
		pointer-events: auto;
	}
	.active {
		background-color: var(--hover-bg-color);
	}
	ul {
		font-size: 1.1rem;
		background-color: rgba(23, 23, 23, 0.6);
		border-radius: 17px;
		padding: 1.25rem 0.5rem;
		display: flex;
		justify-content: space-evenly;
		width: 27.5%;
	}
	ul li a {
		border-radius: 5px;
		transition: all 0.5s;
		padding: 0.75rem 2rem;
	}
	ul li a:hover,
	ul li a:focus {
		background-color: var(--hover-bg-color);
		transform: scale(1.05);
	}
	@media (max-width: 1900px) {
		ul {
			width: 45%;
		}
	}
	@media (max-width: 1100px) {
		.submenu {
			top: 0.5rem;
		}
		ul {
			width: 80%;
		}
		ul li a {
			padding: 0.5rem 0.5rem;
		}
	}
	@media (max-width: 650px) {
		.submenu {
			top: 3.9rem;
			left: 0;
		}
		ul {
			width: 90%;
		}
		ul li a {
			padding: 0.5rem 0.5rem;
		}
	}
	@media (max-width: 390px) {
		.submenu {
			top: 3.5rem;
			font-size: 0.8rem;
		}
	}
	@media (max-width: 350px) {
		.submenu {
			justify-content: flex-start;
		}
		.submenu ul {
			gap: 1rem;
			border-radius: 5px;
			width: auto;
			display: flex;
			flex-direction: column;
		}
	}
</style>
