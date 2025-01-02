<script lang="ts">
    import { fade } from 'svelte/transition';
    let  {activePath } = $props();
</script>

<nav class="submenu" aria-label="Sub Navigation">
    <ul>
        <li><a class:active={activePath === 'skuespillere'} href="/skuespillere">Skuespillere</a></li>
        <li><a class:active={activePath === 'band'} href="/band">Band</a></li>
        <li><a class:active={activePath === 'dansere'} href="/dansere">Dansere</a></li>
        <li><a class:active={activePath === 'sangere'} href="/sangere">Sangere</a></li>
    </ul>
</nav>

<style>
    .submenu {
        z-index: 4;
        top: 4.75rem;
        position: fixed;
        display: flex;
        justify-content: center;
        color: white;
        width: 100vw;
        margin: 0;
        padding: 0;
    }
    .active {
        background-color: var(--hover-bg-color);
    }
    ul {
        background-color: rgba(23, 23, 23, 0.6);;
        border-radius: 25px;
        padding: 1rem 0.5rem;
        display: flex;
        justify-content: space-evenly;
        width: 45%;
    }
    ul li a {
        border-radius: 5px;
        transition: all 0.5s;
        padding: 0.5rem 2rem;
    }
    ul li a:hover,
    ul li a:focus {
        background-color: var(--hover-bg-color);
        transform: scale(1.05);
    }
    @media (max-width: 1024px) {
        .submenu {
            top: 4.5rem;
        }
        ul {
            width: 80%;
        }
        ul li a {
            padding: 0.5rem 0.5rem;
        }
    }
    @media (max-width: 650px) {
        .submenu {
            top: 3.9rem;
        }
        ul {
            width: 90%;
        }
        ul li a {
            padding: 0.5rem 0.75rem;
        }
    }
    @media (max-width: 390px) {
        .submenu {
            top: 3.5rem;
            font-size: 0.8rem;
        }
    }
    @media (max-width: 350px) {
        .submenu {
            justify-content: flex-start;
        }
        .submenu ul {
            gap: 1rem;
            border-radius: 5px;
            width: auto;
            display: flex;
            flex-direction: column;
        }
    }
</style>