<svelte:head>
    
</svelte:head>
<script>

</script>


<ul>
    <li><a href="https://www.youtube.com/Elvebakkenrevyen" aria-label="Abonner på Elvebakken på YouTube"><i class="fab fa-youtube"></i> YouTube</a></li>
    <li><a href="https://www.instagram.com/Elvebakkenrevyen/" aria-label="Følg ELvebakkenrevyen på Instagram"><i class="fab fa-instagram"></i> Instagram</a></li>
    <li><a href="https://www.tiktok.com/@Elvebakkenrevyen" aria-label="Følg Elvebakkenreveyen på TikTok"><i class="fab fa-tiktok"></i> TikTok</a></li>
    <li><a href="https://www.facebook.com/Elvebakkenrevyen/" aria-label="Følg Elvebakkenrevyen på facebook"><i class="fab fa-facebook"></i> Facebook</a></li>
</ul>

<style>
    ul {
        user-select: none;
        z-index: 3;
        color: var(--color-text1);
        list-style-type: none;
        text-transform: none;
        font-size: 1.2em;
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
    @media (max-width: 480px) {
        ul {
            font-size: 0.75em;
        }
    }
    @media (max-height: 768px) or (max-width: 1024px) {
        ul {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
            padding: 7.5px;
        }
    }
</style>