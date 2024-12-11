<script lang="ts">
    import { onMount } from 'svelte';
    import { zod } from "sveltekit-superforms/adapters";
    import { superForm } from 'sveltekit-superforms/client';
    import { contactSchema } from '$lib/schemas'; // Ensure this schema is defined correctly
    import { fade } from 'svelte/transition';
    import { faCheck } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
    import spinner from '$lib/assets/spinner.svg';

    export let csrfToken: string; // Expecting csrfToken to be passed as a prop
    export let data; // Form data passed from the parent
    export let showContent: boolean;

    // Initialize Superform with Zod schema
    const { form, errors, constraints, message, enhance, delayed } = superForm(data.form, {
        taintedMessage: 'Er du sikker på at du vil forlate siden?',
        validators: zod(contactSchema)
    });

    let contactSection: HTMLElement;
    let footer: HTMLElement | null;

    const updateContactSectionHeight = () => {
        if (contactSection && footer) {
            const footerHeight = footer.offsetHeight;
            if (window.matchMedia('(min-width: 768px)').matches) {
                contactSection.style.height = `calc(100svh - ${footerHeight}px)`;
            } else {
                contactSection.style.height = `calc(100svh - ${footerHeight}px * 0.75)`;
            }
        }
    };

    onMount(async () => {
        footer = document.querySelector('footer');
        updateContactSectionHeight();
    });
</script>

<section bind:this={contactSection} class="contact">
    {#if showContent}
        <form in:fade={{ duration: 500 }} method="POST" use:enhance class="contact-field">
            <input type="hidden" name="csrf_token" bind:value={csrfToken} /> <!-- Bind CSRF token directly -->
            <div class="desc">
                <h2 id="contact-header">Kontakt oss</h2>
                <p>Er det noe du lurer på? Send oss en mail da vel!</p>
            </div>
            <div class="name">
                <div class="input-container">
                    <label for="firstName">Fornavn</label>
                    <input type="text" id="firstName" name="firstName" bind:value={$form.firstName} required />
                    {#if $errors.firstName}
                        <small id="error" in:fade={{ duration: 70 }}>Ugyldig fornavn</small>
                    {:else}
                        <small>&nbsp;</small>
                    {/if}
                </div>

                <div class="input-container">
                    <label for="lastName">Etternavn</label>
                    <input type="text" id="lastName" name="lastName" bind:value={$form.lastName} required />
                    {#if $errors.lastName}
                        <small id="error" in:fade={{ duration: 70 }}>Ugyldig etternavn</small>
                    {:else}
                        <small>&nbsp;</small>
                    {/if}
                </div>
            </div>

            <div class="input-container">
                <label for="email">E-post</label>
                <input type="email" id="email" name="email" bind:value={$form.email} required />
                {#if $errors.email}
                    <small id="error" in:fade={{ duration: 70 }}>Ugyldig e-postadresse</small>
                {:else}
                    <small>&nbsp;</small>
                {/if}
            </div>

            <div class="input-container">
                <label for="message">Melding</label>
                <textarea id="message" name="body" bind:value={$form.body} required></textarea>
                {#if $errors.body}
                    <small id="error" in:fade={{ duration: 70 }}>Ugyldig melding (må ha 30-500 tegn)</small>
                {:else}
                    <small>&nbsp;</small>
                {/if}
            </div>

            <div class="progress">
                <button type="submit">Send</button>
                {#if $delayed}
                    <img id="spinner" src="{spinner}" alt="Sender..">
                {:else if $message}
                    <p id="spinner"><FontAwesomeIcon icon={faCheck}/></p>
                {:else}
                    <p id="spinner"></p>
                {/if}
            </div>
        </form>
    {/if}
</section>

<style>
    .contact {
        color: white;
        background: linear-gradient(135deg, rgba(0, 0, 10, 1) 0%, rgba(10, 10, 20, 1) 50%, rgba(20, 20, 30, 1) 80%, rgba(30, 30, 40, 1) 100%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        position: relative;
        text-transform: none;
        overflow: hidden;
        text-align: center;
        transition: background-image 1s ease-in-out;
    }

    .contact-field {
        font-size: 1.2rem;
        display: flex;
        margin-top: -10rem;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 27.5%;
        height: 100%;
        position: relative;
        text-transform: none;
        overflow: hidden;
        text-align: left;
        transition: background-image 1s ease-in-out;
    }

    .desc {
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        text-transform: none;
        overflow: hidden;
        text-align: center;
        padding: 1rem;
        margin-bottom: 0.4rem;
    }
    #contact-header {
        overflow: hidden;
        padding: 1rem;
        font-family: var(--font-header);
        font-size: 3.5rem;
    }
    .name {
        overflow: hidden;
        width: 99.5%;
        gap: 1.5rem;
        display: flex;
        flex-direction: row;
    }

    .input-container {
        overflow: hidden;
        font-family: Helvetica, sans-serif;
        width: 99.5%;
        margin: 0 0 0.75rem 0;
    }
    input, textarea {
        overflow: hidden;
        border-radius: 5px;
        border: solid 0.8px white;
        color: white;
        padding: 0.5rem;
        width: 100%;
        resize: none;
        background-color: transparent;
    }
    textarea {
        height: 9rem;
    }
    .progress {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    small {
        color: white;
        overflow: hidden;
        transition: all 0.15s;
        font-size: 0.8rem;
        flex: 0 0 auto;
        user-select: none;
    }
    #error {
        color: #FF4040;
    }
    #spinner {
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        user-select: none;
        overflow: hidden;
        padding: 1rem;
        width: 4rem;
        height: 4rem;
    }
    #message {
        height: 4rem;
        padding: 1rem;
        font-size: 1rem;
        color: rgb(255, 255, 255);
    }
    button {
        overflow: hidden;
        font-family: var(--font-header);
        font-size: 2rem;
        border: solid 1px white;
        padding: 0.25rem 2rem;
        border-radius: 10px;
    }
    button:active {
        background-color: rgb(32, 32, 32);
        transform: scale(0.95);
    }
    @media screen and (max-width: 768px) {
        .contact-field {
            width: 80%;
            margin-top: 0;
        }
        #contact-header {
            font-size: 2.5rem;
        }
        .contact-field {
            font-size: 0.9rem;
        }
        button {
            font-size: 1.5rem;
        }
    }
</style>