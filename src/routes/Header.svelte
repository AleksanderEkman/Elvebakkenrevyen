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
                    <li id="item"><a href="/aktører">Aktører</a></li>
                    <li id="item"><a href="/grupper">Revygrupper</a></li>
                </ul>
            </div>
        </li>
        <li><a href="/kontakt">Kontakt oss</a></li>
    </ul>
</header>

<style>
    header {
        font-family: 'Montserrat', sans-serif;
        user-select: none;
        font-size: 1.185rem;
        top: 0;
        z-index: 4;
        position: fixed;
        width: 100%;
        color: white;
        text-align: center;
        display: flex;
        justify-content: flex-end;
        transition: background-color 0.3s ease, box-shadow 0.3s ease; /* Smooth transitions */
    }
    
    ul {
        transition: all 0.5s;
        list-style-type: none;
        padding: 0; /* Reset padding to avoid extra space */
        display: flex;
        justify-content: space-around;
        border-radius: 0 0 0 25px;
        align-items: center; /* Center items vertically */
        margin: 0; /* Reset default margin */
        padding: 0.75rem;
    }
    
    :global(.active) {
        background-color: rgba(23, 23, 23, 0.6); /* Slightly darker for better visibility */
        backdrop-filter: blur(15px);
    }
    
    ul li {
        margin-left: 20px; /* Reduced margin for a more compact look */
        display: flex;
        justify-content: center;
    }
    
    ul li a {
        color: white;
        text-decoration: none;
        padding: 0.5rem 1rem; 
        border-radius: 5px;
        transition: background-color 0.3s ease, transform 0.2s ease; /* Added transform transition */
    }
    
    ul li a:hover {
        background-color: rgba(255, 255, 255, 0.1); /* Subtle hover effect */
        transform: scale(1.05); /* Slightly enlarge on hover for emphasis */
    }
    
    .submenu {
        transition: opacity 0.25s ease, transform 0.25s ease; /* Smooth transitions for opacity and movement */
        display: flex;
        flex-direction: column;
        align-items: center;
        width: auto; /* Adjusted to fit content naturally */
        opacity: 0; /* Start hidden for transition effect */
        position:absolute;
        top: 100%;
        right: 0;
        background-color: rgba(23, 23, 23, 0.6); /* Darker submenu for better contrast */
        border-radius: 0 0 25px 25px;
        backdrop-filter: blur(15px);
        z-index: 2;
        gap: 0.2rem; 
        padding-top: 0;
    }
    
    #item {
        margin: 0;
        padding: 0.3rem;
        padding-top:0;
    }
    
    #more {
        position: relative;
        cursor: pointer !important;
        padding: 0.5rem 1rem; 
    }
    
    #more:hover > .submenu {
       opacity: 1; /* Show submenu on hover */
       transform: translateY(10px); /* Slide down effect when appearing */
    }
    
    .submenu li {
       width: auto; /* Allow items to size naturally based on content */
       margin-bottom: 5px; /* Add space between submenu items */
    }
    
    .submenu a {
       padding: 0.5rem; /* Consistent padding in submenu links */
    }
    </style>
    