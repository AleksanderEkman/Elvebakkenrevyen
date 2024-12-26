<script lang="ts">
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
 
    let navBar: HTMLElement;
    function checkScroll() {
        console.log(window.scrollY)
        if (window.scrollY > 0) {
            navBar.classList.add('active');
        } else {
            navBar.classList.remove('active');
        }
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
    <button on:click={() => goto('/')}>
        <img id="logo" src="/favicon.png" alt="">
    </button>
    <ul bind:this={navBar}>
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
</header>

<style>
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
        transition: transform 0.3s ease;
        width: 85px;
        height: 85px;
        padding: 1rem;
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
        box-sizing: border-box;
    }
</style>

    