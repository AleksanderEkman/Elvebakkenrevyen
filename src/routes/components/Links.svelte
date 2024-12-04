<script>
    import { onMount } from 'svelte';

    onMount(() => {
        // Create a link element
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css';
        link.media = 'print'; // Initially set media to print
        document.head.appendChild(link);

        // Change media to all after loading
        link.onload = () => {
            link.media = 'all';
        };
    });
</script>


<ul aria-label="Sosiale medier">
    <li><a href="https://www.youtube.com/Elvebakkenrevyen" aria-label="Abonner på Elvebakken på YouTube"><i aria-hidden="true" class="fab fa-youtube"></i> YouTube</a></li>
    <li><a href="https://www.instagram.com/Elvebakkenrevyen/" aria-label="Følg ELvebakkenrevyen på Instagram"><i aria-hidden="true" class="fab fa-instagram"></i> Instagram</a></li>
    <li><a href="https://www.tiktok.com/@Elvebakkenrevyen" aria-label="Følg Elvebakkenreveyen på TikTok"><i aria-hidden="true" class="fab fa-tiktok"></i> TikTok</a></li>
    <li><a href="https://www.facebook.com/Elvebakkenrevyen/" aria-label="Følg Elvebakkenrevyen på Facebook"><i aria-hidden="true" class="fab fa-facebook"></i> Facebook</a></li>
</ul>

<style>
    ul {
        user-select: none;
        z-index: 3;
        color: var(--color-text1);
        list-style-type: none;
        text-transform: none;
        font-size: 1.2em;
        padding: 20px;
    }
    
    li {
        color: var(--color-text1);
        padding-bottom: 10px;
    }
    li a i {
        transition: transform 0.3s ease;
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    li a {
        color: rgb(255, 255, 255, 0.5);
        text-decoration: none;
        transition: color 0.3s ease, transform 0.2s ease;
        white-space: nowrap;
    }
        
    li a:hover {
        color: var(--color-text1);
        transform: translateY(-2px);
    }
    li a:hover i {
        transform: rotate(360deg);
    }
    li a {
        position: relative;
    }
    @media (max-width: 1450px) {
        ul {
            font-size: 0.95em;
        }
    }
    @media (max-width: 480px) {
        ul {
            font-size: 0.9em;
        }
    }
    @media (max-height: 750px) or (max-width: 768px) {
        ul {
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            width: 100%;
            padding: 7.5px;
        }
    }
</style>