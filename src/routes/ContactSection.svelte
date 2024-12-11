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

    let contactSection: HTMLElement;
    let footer: HTMLElement | null
    
    const updateContactSectionHeight = () => {

        if (contactSection && footer) {
            const footerHeight = footer.offsetHeight;
            if (window.matchMedia('(min-width: 768px)').matches) {
                contactSection.style.height = `calc(100vh - ${footerHeight}px)`;
            } else {
                contactSection.style.height = `calc(100vh - ${footerHeight}px * 0.75)`;
            }
        }
    };

    onMount(() => {

            footer = document.querySelector('footer');
            updateContactSectionHeight();

    });

</script>

<section bind:this={contactSection} class="contact">
    {#if showContent}
        <form method="POST" use:enhance class="contact-field">
            <div class="desc">
                <h2 id="contact-header">Kontakt oss</h2>
                <p>Er det noe du lurer på? Send en mail da vel!</p>
            </div>
            <div class="name">
                <div class="input-container">
                    <label for="firstName">Fornavn</label>
                    <input type="text" id="firstName" name="firstName" 
                        bind:value={$form.firstName}
                    />
                    {#if $errors.firstName}
                        <small>Fornavn er for kort</small>
                    {/if}
                </div>

                <div class="input-container">
                    <label for="lastName">Etternavn</label>
                    <input type="text" id="lastName" name="lastName"
                        bind:value={$form.lastName}
                    />
                    {#if $errors.lastName}
                        <small>Etternavn er for kort</small>
                    {/if}
                </div>
            </div>
            
            <div class="input-container">
                <label for="email">E-post</label>
                <input type="email" id="email" name="email"
                    bind:value={$form.email}
                />
                {#if $errors.email}
                    <small>Ugyldig e-postadresse</small>
                {/if}
            </div>
            <div class="input-container">
                <label for="message">Melding</label>
                <textarea id="message" name="body"
                    bind:value={$form.body}>
                </textarea>
                {#if $errors.body}
                    <small>Melding for kort</small>
                {/if}    
            </div>

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
        height: 50vh;
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
        margin-top: -10rem;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 22%;
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

    .desc {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        text-transform: none;
        overflow: hidden;
        text-align: center;
        padding: 1rem;
    }
    #contact-header {
        padding: 1rem;
        font-family: var(--font-header);
        font-size: 3.5rem;
    }
    .name {
        display: flex;
        flex-direction: row;
    }

    .input-container {
        font-family: Helvetica;
        width: 100%;
        padding: 0.5rem;
        margin: 0 0 1rem 0;
    }
    input, textarea {
        color: black;
        padding: 0.5rem;
        width: 100%;
        resize: none;
    }
    textarea {
        height: 8rem;
    }
    small {
        color: #FF4040;
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
    }
</style>