<script lang="ts">
	import { onMount } from 'svelte';
	import { zod } from 'sveltekit-superforms/adapters';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { newUserSchema } from '$lib/schemas';
	import { fade } from 'svelte/transition';
	export let data: PageData;
	import hidePasswordSVG from '$lib/assets/svg/eye-slash.svg';
	import showPasswordSVG from '$lib/assets/svg/eye.svg';

	let passwordField: HTMLInputElement;
	const { form, errors, enhance, constraints } = superForm(data.form, {
		validators: zod(newUserSchema)
	});
	let showPassword = false;
	let showConfirmPassword = false;

	$: if ($form.password) {
		showConfirmPassword = true;
	}

	let validLength = false;
	let validUppercase = false;
	let validLowercase = false;
	let validNumber = false;
	let validSpecialChar = false;
	let allValid = false;

	$: if ($form.password !== undefined) {
		validLength = $form.password.length >= 10;
		validUppercase = /[A-Z]/.test($form.password);
		validLowercase = /[a-z]/.test($form.password);
		validNumber = /\d/.test($form.password);
		validSpecialChar = /[@$!%*?&#-]/.test($form.password);
		allValid = validLength && validUppercase && validLowercase && validNumber && validSpecialChar;
	}
</script>

<section class="signup-section">
	<form method="POST" use:enhance class="signup-form">
		<h1>Registrer bruker</h1>
		<div class="input-container">
			<label for="first_name">Fornavn</label>
			<input
				type="text"
				id="first_name"
				name="first_name"
				placeholder="Skriv fornavnet ditt"
				required
				bind:value={$form.first_name}
			/>
			{#if $errors.first_name}
				<small id="error">{$errors.first_name}</small>
			{:else}
				<small id="error">&nbsp;</small>
			{/if}
		</div>
		<div class="input-container">
			<label for="email">E-postadresse</label>
			<input
				type="email"
				id="email"
				name="email"
				placeholder="Skriv e-postadressen din"
				required
				bind:value={$form.email}
			/>
			{#if $errors.email}
				<small id="error">{$errors.email}</small>
			{:else}
				<small id="error">&nbsp;</small>
			{/if}
		</div>
		<div class="input-container">
			<label for="password">Passord</label>
			<div class="password-input">
				<input
					type={showPassword ? 'text' : 'password'}
					id="password"
					name="password"
					placeholder="Skriv passordet ditt"
					required
					bind:value={$form.password}
					bind:this={passwordField}
				/>
				{#if $form.password}
					<button class="eye-button" type="button" on:click={() => (showPassword = !showPassword)}>
						<img
							src={showPassword ? hidePasswordSVG : showPasswordSVG}
							alt="Toggle password visibility"
						/>
					</button>
				{/if}
			</div>
			{#if !allValid && showConfirmPassword}
				<ul class="validation-feedback">
					<li class:valid={validLength}>
						<small id="error"> Minst 10 tegn </small>
					</li>
					<li class:valid={validUppercase && validLowercase}>
						<small id="error"> Både store og små bokstaver </small>
					</li>
					<li class:valid={validNumber}>
						<small id="error"> Minst ett tall </small>
					</li>
					<li id="error" class:valid={validSpecialChar}>
						<small id="error"> Minst ett spesialtegn </small>
					</li>
				</ul>
			{:else}
				<small id="error">&nbsp;</small>
			{/if}
		</div>
		{#if allValid}
			<div class="input-container">
				<label for="confirmPassword">Gjenta Passord</label>
				<input
					type="password"
					id="confirmPassword"
					name="confirmPassword"
					placeholder="Skriv passordet på nytt"
					required
					bind:value={$form.confirmPassword}
				/>
				{#if $errors.confirmPassword}
					<small id="error">{$errors.confirmPassword}</small>
				{:else}
					<small id="error">&nbsp;</small>
				{/if}
			</div>
		{/if}
		<button class="signup-button" type="submit">Registrer deg</button>
		<p>
			Ved å registrere deg godtar du vår <a href="/personvernerklaering">personvernerklæring</a>.
		</p>
	</form>
</section>

<style>
	.signup-section {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background-color: var(--color-background);
		padding: 2rem;
		color: white;
	}
	.signup-form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-radius: 1rem;
		padding: 2rem;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		width: 100%;
		max-width: 500px;
	}
	.signup-form h1 {
		text-align: center;
		margin-bottom: 1.5rem;
		font-size: 2rem;
		color: var(--color-primary);
	}
	.input-container {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	input {
		color: black;
		width: 100%;
		padding: 0.75rem;
		border: 1px solid var(--color-border);
		border-radius: 0.5rem;
		font-size: 1rem;
		margin-bottom: 0.5rem;
	}
</style>