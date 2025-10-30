<script lang="ts">
	import { zod } from 'sveltekit-superforms/adapters';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { loginSchema } from '$lib/schemas';
	import hidePasswordSVG from '$lib/assets/svg/eye-slash.svg';
	import showPasswordSVG from '$lib/assets/svg/eye.svg';
	export let data: PageData;

	let showPassword = false;

	const { form, errors, enhance, constraints } = superForm(data.form, {
		taintedMessage:
			'Er du sikker på at du vil forlate siden? Alle endringer du har gjort vil gå tapt.',
		validators: zod(loginSchema)
	});

	$: passwordValue = $form.password;
	$: $form.password = passwordValue;
</script>

<section class="login-section">
	<form method="POST" use:enhance class="login-form">
		<h1>Logg inn</h1>
		<div class="input-container">
			<label for="identifier">Brukernavn eller e-postadresse</label>
			<input
				type="text"
				id="identifier"
				name="identifier"
				placeholder="Skriv brukernavnet eller e-postadressen din"
				required
				autocomplete="off"
				bind:value={$form.identifier}
			/>
			{#if $errors.identifier}
				<small id="error">{$errors.identifier}</small>
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
					required
					autocomplete="off"
					bind:value={passwordValue}
					placeholder="Skriv passordet ditt"
				/>
				{#if passwordValue}
					<button class="eye-button" type="button" on:click={() => (showPassword = !showPassword)}>
						<img
							src={showPassword ? hidePasswordSVG : showPasswordSVG}
							alt="Toggle password visibility"
						/>
					</button>
				{/if}
			</div>
			{#if $errors.password}
				<small id="error">{$errors.password}</small>
			{/if}
			<a href="/glemt-passord">Glemt passord?</a>
		</div>
		<button class="login-button" type="submit">Logg inn</button>
		<a href="/registrer">Opprett bruker</a>
	</form>
</section>