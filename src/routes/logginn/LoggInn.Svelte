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
				<small class="error">{$errors.identifier}</small>
			{:else}
				<small class="error">&nbsp;</small>
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
				<small class="error">{$errors.password}</small>
			{/if}
			<a href="/glemt-passord" class="forgot-password">Glemt passord?</a>
		</div>
		<button class="login-button" type="submit">Logg inn</button>
		<p class="signup-link">
			Har du ikke en bruker? <a href="/registrering">Opprett bruker</a>
		</p>
	</form>
</section>

<style>
	.login-section {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 80vh;
		padding: 2rem 1rem;
	}

	.login-form {
		background: white;
		padding: 2.5rem;
		border-radius: 12px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
		width: 100%;
		max-width: 420px;
	}

	h1 {
		margin: 0 0 2rem 0;
		font-size: 2rem;
		font-weight: 700;
		color: #1a202c;
		text-align: center;
	}

	.input-container {
		margin-bottom: 1.5rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 600;
		color: #374151;
		font-size: 0.95rem;
	}

	input[type='text'],
	input[type='password'] {
		width: 100%;
		padding: 0.75rem 1rem;
		border: 2px solid #e5e7eb;
		border-radius: 8px;
		font-size: 1rem;
		transition: all 0.2s ease;
		box-sizing: border-box;
	}

	input[type='text']:focus,
	input[type='password']:focus {
		outline: none;
		border-color: #3b82f6;
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
	}

	input::placeholder {
		color: #9ca3af;
	}

	.password-input {
		position: relative;
		display: flex;
		align-items: center;
	}

	.password-input input {
		padding-right: 3rem;
	}

	.eye-button {
		position: absolute;
		right: 0.75rem;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: opacity 0.2s ease;
	}

	.eye-button:hover {
		opacity: 0.7;
	}

	.eye-button img {
		width: 20px;
		height: 20px;
	}

	.error {
		display: block;
		color: #dc2626;
		font-size: 0.875rem;
		margin-top: 0.375rem;
		min-height: 1.25rem;
	}

	.forgot-password {
		display: inline-block;
		margin-top: 0.5rem;
		color: #3b82f6;
		text-decoration: none;
		font-size: 0.9rem;
		transition: color 0.2s ease;
	}

	.forgot-password:hover {
		color: #2563eb;
		text-decoration: underline;
	}

	.login-button {
		width: 100%;
		padding: 0.875rem 1.5rem;
		background: #3b82f6;
		color: white;
		border: none;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
		margin-top: 0.5rem;
	}

	.login-button:hover {
		background: #2563eb;
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
	}

	.login-button:active {
		transform: translateY(0);
	}

	.signup-link {
		text-align: center;
		margin-top: 1.5rem;
		color: #6b7280;
		font-size: 0.95rem;
	}

	.signup-link a {
		color: #3b82f6;
		text-decoration: none;
		font-weight: 600;
		transition: color 0.2s ease;
	}

	.signup-link a:hover {
		color: #2563eb;
		text-decoration: underline;
	}

	@media (max-width: 480px) {
		.login-form {
			padding: 2rem 1.5rem;
		}

		h1 {
			font-size: 1.75rem;
		}
	}
</style>

