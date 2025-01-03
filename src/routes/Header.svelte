<script lang="ts">
    import { fade, fly } from 'svelte/transition';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
    import { faBars, faClose, faAngleDown } from '@fortawesome/free-solid-svg-icons';

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
    const rotate = () => {
        const logo = document.getElementById('logo');
        if (!logo) return;
        
        logo.classList.add('animate-logo');
        setTimeout(() => {
            logo.classList.remove('animate-logo');
        }, 650);
    };
    onMount(() => {
        showContent = true;
        checkScroll();
        window.addEventListener('scroll', checkScroll);
        
        // Cleanup event listener on component destroy
        return () => {
            window.removeEventListener('scroll', checkScroll);
        };
    });
</script>

<header>
    <button aria-label="Hjem knapp" id="logo-button" on:click={() => {goto('/'); rotate(); mobileMenuOpen = false; }}>
        <img id="logo" src="/favicon.webp" alt="Elvebakkenrevyen logo">
    </button>
    <!-- Desktop -->
    <ul class="desktop" bind:this={navBar}>
        <li><a id="border" href="/billetter">Billetter</a></li>
        <li class="dropdown">
            <div id="more">
                <p id="text">Revymedlemmer 
                    {#if showContent}
                        <FontAwesomeIcon icon={faAngleDown}/>
                    {:else}
                        <span style="width: 1.05rem;">&nbsp</span>
                    {/if}
                </p>
                <ul class="submenu" id="submenu" in:fade={{duration: 500}}>
                    <li id="item"><a href="/skuespillere">Aktører</a></li>
                    <li id="item"><a href="/sjefer">Sjefer og grupper</a></li>
                </ul>
            </div>
        </li>
        <li><a href="/om-revyen">Om revyen</a></li>
        <li><a href="/kontakt-oss">Kontakt oss</a></li>
    </ul>

    <!-- Mobile -->
    {#if mobileMenuOpen}
        <div in:fade={{duration: 200}} class="overlay"></div>
    {/if}
    <aside class="mobile">
        {#if showContent}
            <button id="menu-button" aria-label="Åpne meny" on:click={toggleMobileMenu}>
                {#if !mobileMenuOpen}
                    <div in:fade={{ duration: 100, delay:150 }} out:fade={{ duration: 100 }}>
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                {:else}
                    <div in:fade={{ duration: 100, delay:150 }} out:fade={{ duration: 100 }}>
                        <FontAwesomeIcon icon={faClose} />
                    </div>
                {/if}
            </button>
        {/if}
        {#if mobileMenuOpen}
            <ul class="mobile-menu" transition:fade={{duration: 300}}>
                <li><a href="/billetter" on:click={() => {setTimeout(toggleMobileMenu, 150)}}>Billetter</a></li>
                <li><a href="/skuespillere" on:click={() => {setTimeout(toggleMobileMenu, 150)}}>Aktører</a></li>
                <li><a href="/sjefer" on:click={() => {setTimeout(toggleMobileMenu, 150)}}>Sjefer og grupper</a></li>
                <li><a href="/om-revyen" on:click={() => {setTimeout(toggleMobileMenu, 150)}}>Om revyen</a></li>
                <li><a href="/kontakt-oss" on:click={() => {setTimeout(toggleMobileMenu, 150)}}>Kontakt oss</a></li>
            </ul>
        {/if}
    </aside>

</header>

<style>
    @keyframes rotate {
        0% {
            transform: rotate(0deg) scale(1);
        }
        50% {
            transform: rotate(360deg) scale(1.1);
        }
        100% {
            transform: rotate(0deg) scale(1);
        }
    }
    :root {
        --header-bg-color: rgba(23, 23, 23, 0.5);
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
    #border {
        border: 1px solid rgb(66, 66, 66);
    }
    .desktop {
        text-align: center;
        width: 57.5%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }
    .dropdown {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    header {
        z-index: -1;
        width: 100vw;
        font-family: var(--font-nav, sans-serif);
        font-size: 1.2rem;
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
        touch-action: manipulation;
    }

    ul {
        z-index: 4;
        list-style-type: none;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        margin: 0;
        padding: 0.6rem 0.75rem;
        border-radius: 0 0 17px 17px;
        transition: all 0.5s;
    }

    :global(.active) {
        backdrop-filter: blur(12px);
        background-color: var(--header-bg-color);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    ul li {
        display: flex;
        justify-content: center;
        flex: 1;
    }

    ul li a, #more {
        display: flex;
        align-items: center;
        justify-content: center;
        text-wrap: nowrap;
        text-align: center;
        color: white;
        text-decoration: none;
        padding: 0.4rem 1.8rem;
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
    #text {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        width: auto;
    }
    #logo {
        z-index: 2;
        margin: 0.75rem;
        top: 0;
        left: 0;
        position: fixed;
        -webkit-user-drag: none;
        transition: transform 0.3s ease;
        width: 50px;
        height: 50px;

    }
    @media (min-width: 768px) {
        #logo:hover {
            transform: scale(1.1) rotate(360deg);
        }
        .desktop {
            width: 62%;
        }
    }
    .submenu {
        width: 100%;
        z-index: 5;
        background-color: rgba(30, 30, 30, 0.9);
        backdrop-filter: blur(15px);
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        top: 105%;
        right: 0;
        border-radius: 10px 10px 25px 25px;
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
        padding: 0.5rem 0.75rem;
        width: 80%;
    }

    @media (max-width: 1200px) {
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
            width: 80%;
            max-width: 600px;
            display: flex;
            flex-direction: column;
            align-items: center;
            top: 4.25rem;
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--header-bg-color);
            backdrop-filter: blur(15px);
            padding: 1rem;
            gap: 1.2rem;
            z-index: 1000;
        }

        .mobile-menu li {
            display: flex;
            flex-direction: row;
            text-align: center;
            justify-content: center;
            width: 100%;
            margin: 0.5rem 0;
        }
        #menu-button {
            top: 0;
            margin: 0.7rem;
            position: absolute;
            right: 0rem;
            z-index: 1001;
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            width: 45px;
        }
        #logo {
            width: 45px;
            height: 45px;
        }
        :global(.animate-logo) {
            animation: rotate 0.65s ease-in-out;
            animation-fill-mode: forwards;
        }

        ul li a {
            padding: 0.75rem 1.2rem;
            width: 75%;
        }
    }
</style>

    