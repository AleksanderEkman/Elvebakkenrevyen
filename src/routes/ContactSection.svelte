<script lang="ts">
    import { onMount } from 'svelte';
    import { zod } from "sveltekit-superforms/adapters";
    import { superForm } from 'sveltekit-superforms/client';
    import { contactSchema } from '$lib/schemas'; // Ensure this schema is defined correctly
    import { fade } from 'svelte/transition';
    import { faCheck } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
    import spinner from '$lib/assets/spinner.svg';

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
                contactSection.style.height = `calc(100svh - ${footerHeight}px * 0.3)`;
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
        <form in:fade={{ duration: 500 }} 
        method="POST" 
        use:enhance 
        class="contact-field">
            <div class="contact-content">
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
                    <input type="email" id="email" name="email" bind:value={$form.email} required autocomplete="email" />
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
                        <small id="error" in:fade={{ duration: 70 }}>Ugyldig melding (må ha 50-500 tegn)</small>
                    {:else}
                        <small>&nbsp;</small>
                    {/if}
                </div>
    
                <div class="progress">
                    {#if !$delayed && !$message}
                        <button out:fade={{ duration:50 }}>Send</button>
                    {:else if $message}
                        <p in:fade={{duration:50, delay: 50 }} class="icon" id="spinner"><FontAwesomeIcon icon={faCheck}/></p>
                    {:else}
                        <img in:fade={{duration:50, delay: 100 }} id="spinner" src={spinner} alt="Sender..">
                    {/if}
                </div>
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
        margin-top: -2.5rem;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 35%;
        height: 100%;
        position: relative;
        text-transform: none;
        overflow: hidden;
        text-align: left;
        transition: background-image 1s ease-in-out;
    }
    .contact-content {
        border-radius: 1.5rem;
        padding: 2rem;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        box-shadow: inset 0 0 0 0.1rem rgba(0, 0, 0, 0.1), 
                    0 4px 8px rgba(0, 0, 0, 0.4); 
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
        display: flex;
        flex-direction: column;
        overflow: hidden;
        font-family: Helvetica, sans-serif;
        width: 99.5%;
        margin: 0 0 0.25rem 0;
    }
    input, textarea {
        margin: 0;
        overflow: hidden;
        border-radius: 5px;
        border: solid 0.8px rgba(255, 255, 255, 0.75);
        color: white;
        padding: 0.4rem;
        width: 100%;
        resize: none;
        background-color: transparent;
        transition: all 0.2s;
    }
    input:hover, textarea:hover {
        background-color: rgba(255, 255, 255, 0.05);
    }
    .progress {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    small {
        margin: 0;
        padding: 0;
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
        margin: 0 auto;
        user-select: none;
        overflow: hidden;
        width: 4rem;
        height: 4rem;
    }
    .icon {
        font-size: 1.75rem;
    }
    #message {
        height: 15rem;
        padding: 0.4rem;
        font-size: 1rem;
        color: rgb(255, 255, 255);
    }
    button {
        overflow: hidden;
        font-family: var(--font-header);
        font-size: 2rem;
        border: solid 1px rgba(255, 255, 255, 0.75);
        padding: 0 2rem;
        margin: 0;
        border-radius: 10px;
        height: 4rem;
        transition: all 0.2s;
    }
    button:hover {
        background-color: rgba(255, 255, 255, 0.05);
    }
    button:active {
        background-color: rgb(32, 32, 32);
        transform: scale(0.95);
    }


    @media screen and (max-width: 1450px) {
        .input-container {
            margin: 0;
            padding: 0.5rem;
        }
        .contact-field {
            margin-top: 0;
            width: 50%;
        }
        .contact-content {
            padding: 1rem;
            background-color: rgba(0, 0, 0, 0.4);
        }
        small {
            font-size: 0.7rem;
        }
        #message {
            height: 5rem;
        }
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
        #message {
            height: 10rem;
        }
    }

    @media screen and (max-width: 540px) {
        #message {
            height: 5rem;
        }
        input, textarea {
            padding: 0.25rem;
        }
        .name {
            gap: 1rem;
        }
        .contact-field {
            width: 90%;
        }
    }
</style>