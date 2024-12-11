<script lang="ts">
    import SuperDebug from 'sveltekit-superforms';
    import { z } from "zod";
    import { zod } from "sveltekit-superforms/adapters";
    import { superForm } from 'sveltekit-superforms/client';
    import { onMount } from 'svelte';
    import { contactSchema } from '$lib/schemas';
    export let data;

    export let showContent: boolean;
    
    const { form, errors, constraints, message, enhance } = superForm(data.form, {
        taintedMessage: 'Er du sikker på at du vil forlate siden?',
        validators: zod(contactSchema)
    })
</script>

<section class = "contact">
    <SuperDebug data={$form} />
    {#if showContent}
        <h2>Kontakt oss</h2>
        <form method="POST" use:enhance class="contact-field">
            <div class="name">
                <div id="name">
                    <label for="firstName">Fornavn</label>
                    <input type="text" id="firstName" name="firstName" 
                        bind:value={$form.firstName}
                    />
                    {#if $errors.firstName} <small>{$errors.firstName}</small> {/if}
                </div>
                <div id="name">
                    <label for="lastName">Etternavn</label>
                    <input type="text" id="lastName" name="lastName"
                        bind:value={$form.lastName}
                    />
                    {#if $errors.lastName} <small>{$errors.lastName}</small> {/if}
                </div>
            </div>
    
            <label for="email">E-post</label>
            <input type="email" id="email" name="email"
                bind:value={$form.email}

            />
            {#if $errors.email} <small>{$errors.email}</small> {/if}
    
            <label for="message">Melding</label>
            <textarea id="message" name="body"
                bind:value={$form.body}>
            </textarea>
            {#if $errors.body} <small>{$errors.body}</small> {/if}
    
            <button type="submit">Send</button>
        </form>
    {/if}
</section>

<style>
    .contact {
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 87vh;
        position: relative;
        text-transform: none;
        overflow: hidden;
        text-align: center;
        background-size: cover;
        background-position: top center;
        background-repeat: no-repeat;
        background-image: none;
        transition: background-image 1s ease-in-out;
    }

    .contact-field {

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 20%;
        height: 100%;
        position: relative;
        text-transform: none;
        overflow: hidden;
        text-align: left;
        background-size: cover;
        background-position: top center;
        background-repeat: no-repeat;
        background-image: none;
        transition: background-image 1s ease-in-out;
    }
    .name {
        display: flex;
        flex-direction: row;
    }
    #name {
        padding: 1rem;
        display: flex;
        flex-direction: column;
    }
    input, textarea {
        color: black;
        padding: 0.5rem;
        width: 100%;
        margin: 0.5rem;
    }
</style>