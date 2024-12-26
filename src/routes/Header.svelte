<script lang="ts">
    import { fade, fly } from 'svelte/transition';

    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
    import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';

    let mobileMenuOpen = false;
    let navBar: HTMLElement;

    function checkScroll() {
        console.log(window.scrollY)
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
        checkScroll();
        window.addEventListener('scroll', checkScroll);
        // Cleanup event listener on component destroy
        return () => {
            window.removeEventListener('scroll', checkScroll);
        };
    });
</script>

<header>
    <button on:click={() => {goto('/'); mobileMenuOpen = false;}}>
        <img id="logo" src="/favicon.png" alt="">
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
                <div in:fade={{ duration: 150, delay:150 }} out:fade={{ duration: 150 }}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
            {:else}
                <div in:fade={{ duration: 150, delay:150 }} out:fade={{ duration: 150 }}>
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
</header>

<style>
    .overlay {
        z-index: 1;
        position: fixed;
        top: 0;
        left: 0;
        background: rgb(0,0,0);
        background: linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0) 100%);
        width: 100vw;
        height: 80%;
    }
    .mobile {
        z-index: 2;
        display: none;
    }
    .desktop {
        display: flex;
    }

    :root {
        --header-bg-color: rgba(23, 23, 23, 0.6);
        --hover-bg-color: rgba(255, 255, 255, 0.1);
        --transition-speed: 0.3s;
    }

    header {
        font-family: var(--font-nav, sans-serif);
        font-size: 1.185rem;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 4;
        color: white;
        display: flex;
        justify-content: space-between;
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
        border-radius: 0 0 0 25px;
        transition: all 0.5s;
    }

    :global(.active) {
        background-color: var(--header-bg-color);
        backdrop-filter: blur(15px);
    }

    ul li {
        margin-left: 20px;
        display: flex;
        justify-content: center;
    }

    ul li a {
        color: white;
        text-decoration: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        transition: background-color var(--transition-speed) ease, 
                    transform 0.2s ease;
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
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        top: 100%;
        right: 0;
        background-color: var(--header-bg-color);
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
        }
        .mobile {
            display: block;
        }
        .desktop {
            display: none;
        }
        .mobile-menu {
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            width: 90%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-self: center;
            position: absolute;
            top: 3.5rem;
            z-index: -1;
            left: 0;
            right: 0;
            background-color: var(--header-bg-color);
            backdrop-filter: blur(15px);
            padding: 1rem;
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
            z-index: 4;
            background: none;
            border: none;
            color: white;
            font-size: 1.75rem;
            cursor: pointer;

        }
        #logo {
            width: 60px;
            height: 60px;
            padding: 0.5rem;
        }
        ul li a {
            width: 75%;
        }
    }
</style>

    