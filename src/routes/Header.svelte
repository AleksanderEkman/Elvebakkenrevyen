<script lang="ts">
    import { fade, fly } from 'svelte/transition';

    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
    import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';

    let showContent = false;
    let mobileMenuOpen = false;
    let navBar: HTMLElement;

    function checkScroll() {
        if (window.scrollY > 0) {
            navBar.classList.add('active');
        } else {
            navBar.classList.remove('active');
        }
    }
    function toggleMobileMenu() {
        mobileMenuOpen = !mobileMenuOpen;
    }

    onMount(() => {
        showContent = true;
        window.addEventListener('scroll', checkScroll);

        // Cleanup event listener on component destroy
        return () => {
            window.removeEventListener('scroll', checkScroll);
        };
    });
</script>

<header>
    {#if showContent}
        <button aria-label="Hjem knapp" id="logo-button" on:click={() => {goto('/'); mobileMenuOpen = false;}}>
            <img id="logo" src="/favicon.webp" alt="">
        </button>
        <!-- Desktop -->
        <ul class="desktop" bind:this={navBar}>
            <li><a href="/billetter">Billetter</a></li>
            <li>
                <div id="more">
                    <p id="text">Revymedlemmer</p>
                    <ul class="submenu" in:fade={{duration: 500}}>
                        <li id="item"><a href="/aktører">Aktører</a></li>
                        <li id="item"><a href="/grupper">Revygrupper</a></li>
                    </ul>
                </div>
            </li>
            <li><a href="/kontakt">Kontakt oss</a></li>
        </ul>

        <!-- Mobile -->
        {#if mobileMenuOpen}
            <div in:fade={{duration: 200}} class="overlay"></div>
        {/if}
        <aside class="mobile">
            <button id="menu-button" aria-label="Åpne meny" on:click={toggleMobileMenu}>
                {#if !mobileMenuOpen}
                    <div in:fade={{ duration: 150, delay:215 }} out:fade={{ duration: 150 }}>
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                {:else}
                    <div in:fade={{ duration: 150, delay:215 }} out:fade={{ duration: 150 }}>
                        <FontAwesomeIcon icon={faClose} />
                    </div>
                {/if}
            </button>
            {#if mobileMenuOpen}
                <ul class="mobile-menu" transition:fade={{duration: 300}}>
                    <li><a href="/billetter" on:click={toggleMobileMenu}>Billetter</a></li>
                    <li><a href="/aktører" on:click={toggleMobileMenu}>Aktører</a></li>
                    <li><a href="/grupper" on:click={toggleMobileMenu}>Revygrupper</a></li>
                    <li><a href="/kontakt" on:click={toggleMobileMenu}>Kontakt oss</a></li>
                </ul>
            {/if}
        </aside>
    {/if}
</header>

<style>
    :root {
        --header-bg-color: rgba(23, 23, 23, 0.4);
        --hover-bg-color: rgba(255, 255, 255, 0.15);
        --transition-speed: 0.3s;
        --logo-size: 60px;
    }
    .overlay {
        z-index: 1;
        position: fixed;
        top: 0;
        left: 0;
        background: rgb(0,0,0);
        background: linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0) 100%);
        width: 100vw;
        height: 80%;
    }
    .mobile {
        z-index: 2;
        display: none;
    }
    .desktop {
        display: flex;
        justify-self: center;
        align-items: center;
    }
    
    header {
        width: 100vw;
        font-family: var(--font-nav, sans-serif);
        font-size: 1.1rem;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        transition: background-color var(--transition-speed) ease, 
                    box-shadow var(--transition-speed) ease;
        user-select: none;
    }

    ul {
        z-index: 4;
        list-style-type: none;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin: 0;
        padding: 0.75rem;
        border-radius: 0 0 25px 25px;
        transition: all 0.5s;
    }

    :global(.active) {
        backdrop-filter: blur(15px);
        background-color: var(--header-bg-color);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    ul li {
        margin-left: 1rem;
        display: flex;
        justify-content: center;
    }

    ul li a, #more {
        color: white;
        text-decoration: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        transition: background-color var(--transition-speed) ease, 
                    transform 0.2s ease;
        display: block;
    }
    ul li a:hover,
    ul li a:focus {
        background-color: var(--hover-bg-color);
        transform: scale(1.05);
    }
    #logo {
        z-index: 2;
        padding: 1rem;
        top: 0;
        left: 0;
        position: fixed;
        -webkit-user-drag: none;
        transition: transform 0.3s ease;
        width: 85px;
        height: 85px;

    }
    #logo:hover {
       transform: scale(1.1) rotate(360deg);
    }
    .submenu {
        z-index: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        top: 100%;
        right: 0;
        border-radius: 0 0 25px 25px;
        backdrop-filter: blur(15px);
        z-index: 2;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: opacity var(--transition-speed) ease, 
                    transform var(--transition-speed) ease,
                    visibility var(--transition-speed) ease;
        padding: 0.5rem 0;
        gap: 0.2rem;
        box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.3);

    }

    #item {
        margin: 0;
        padding: 0.3rem;
    }

    #more {
        position: relative;
        cursor: pointer;
        padding: 0.5rem 1rem;
    }

    #more:hover > .submenu,
    #more:focus-within > .submenu {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }

    .submenu li {
        width: 100%;
        margin: 0;
    }

    .submenu a {
        display: block;
        padding: 0.5rem 1rem;
        width: 100%;

    }

    @media (max-width: 540px) {
        header {
            padding: 0.5rem;
            justify-content: space-between;
        }
        .mobile {
            width: 100vw;
            display: flex;
            justify-content: center;
        }
        .desktop {
            display: none;
        }
        .mobile-menu {
            position: absolute;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            width: 90%;
            display: flex;
            flex-direction: column;
            align-items: center;
            top: 4.25rem;
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--header-bg-color);
            backdrop-filter: blur(15px);
            padding: 1rem;
            z-index: 1000;
        }

        .mobile-menu li {
            display: flex;
            flex-direction: row;
            text-align: center;
            justify-content: center;
            width: 100%;
            margin: 1rem 0;
        }
        #menu-button {
            position: absolute;
            top: 0.6rem;
            right: 0rem;
            z-index: 1001;
            background: none;
            border: none;
            color: white;
            font-size: 1.75rem;
            width: 60px;
        }
        #logo {
            width: 60px;
            height: 60px;
            padding: 0.6rem;
        }
        ul li a {
            width: 75%;
        }
    }
</style>

    