<script lang="ts">
    import { zod } from 'sveltekit-superforms/adapters';
    import { superForm } from 'sveltekit-superforms';
    import type { PageData } from './$types';
    import { loginSchema } from '$lib/schemas';
    import hidePasswordSVG from '$lib/assets/svg/eye-slash.svg';
	import showPasswordSVG from '$lib/assets/svg/eye.svg';
    
    export let data;

    const { form, errors, enhance} = superForm(data.form, {
        validators: zod(loginSchema)
    })
    
    let showPassword = false;

    $: passwordValue = $form.password;
	$: $form.password = passwordValue;
</script>

<section class="login-section">
    <form method="POST" use:enhance class="login-form">
        		<h1>Logg inn</h1>
		<div class="input-container">
			<label for="email">E-postadresse</label>
			<input
				type="text"
				id="email"
				name="email"
				placeholder="Skriv brukernavnet eller e-postadressen din"
				required
				autocomplete="off"
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
			<a href="/forgotpassword">Glemt passord?</a>
		</div>
		<button class="login-button" type="submit">Logg inn</button>
		<a href="/signup">Opprett bruker</a>
    </form>
</section>

<style>
    .login-section {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background-color: var(--color-background);
		padding: 2rem;
		color: white;
	}
	.login-form {
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
	.login-form h1 {
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