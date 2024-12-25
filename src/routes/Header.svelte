<script lang="ts">
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';
 
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
    <ul bind:this={navBar}>
        <li><a href="/billetter">Billetter</a></li>
        <li>
            <div id="more">
                <p id="text">Revymedlemmer</p>
                <ul class="submenu" in:fade={{duration: 500}}>
                    <li><a href="/aktører">Aktører</a></li>
                    <li><a href="/sjefer">Grupper</a></li>
                  </ul>
            </div>
          </li>
        <li><a href="/kontakt">Kontakt oss</a></li>
    </ul>
</header>

<style>
    header {
        font-size: 1.175rem;
        top: 0;
        z-index: 4;
        position: fixed;
        width: 100vw;
        color: white;
        text-align: center;
        display: flex;
        justify-content: flex-end;
    }

    ul {
        transition: all 0.5s;
        top: 0;
        z-index: 4;
        list-style-type: none;
        padding: 1rem;
        display: flex;
        justify-content: space-around;
        border-radius: 0 0 0 25px;
        width: 20%;
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-top: none;
        border-right: none;
    }
    :global(.active) {
        background-color: rgba(23, 23, 23, 0.6);
        backdrop-filter: blur(20px);
    }
    ul li {
        display: inline;
        margin-right: 10px;
        display: flex;
        justify-content: center;
    }

    ul li a {
        color: white;
        text-decoration: none;
    }

    ul li a:hover {
        text-decoration: underline;
    }
    .submenu {
        transition: all 0.25s;
        display: block;
        width: 100%;
        opacity: 0;
        position:absolute;
        top: 100%;
        right: 0;
        background-color: rgba(23, 23, 23, 0.6);
        border: none;
        border-radius: 5px;
        backdrop-filter: blur(20px);
        z-index: 3;
        margin-top: 1rem;
    }
    #more {
        position: relative;
        cursor: pointer !important;
    }
    #more:hover > .submenu {
       opacity: 1;
    }

    .submenu li {
        width: 100px;
    }

    .submenu a {
        padding: 0.5rem 0.5rem;
    }
</style>