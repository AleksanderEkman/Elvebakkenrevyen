<script>
    import { onMount } from 'svelte';
    import { faYoutube, faInstagram, faTiktok, faFacebook } from '@fortawesome/free-brands-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  
    onMount(() => {
      // Any additional logic if needed
    });
  </script>
  
  <ul aria-label="Sosiale medier">
    <li>
      <a href="https://www.youtube.com/Elvebakkenrevyen" aria-label="Abonner på Elvebakken på YouTube">
        <FontAwesomeIcon icon={faYoutube}  /> YouTube
      </a>
    </li>
    <li>
      <a href="https://www.instagram.com/Elvebakkenrevyen/" aria-label="Følg Elvebakkenrevyen på Instagram">
        <FontAwesomeIcon icon={faInstagram} /> Instagram
      </a>
    </li>
    <li>
      <a href="https://www.tiktok.com/@Elvebakkenrevyen" aria-label="Følg Elvebakkenrevyen på TikTok">
        <FontAwesomeIcon icon={faTiktok}  /> TikTok
      </a>
    </li>
    <li>
      <a href="https://www.facebook.com/Elvebakkenrevyen/" aria-label="Følg Elvebakkenrevyen på Facebook">
        <FontAwesomeIcon icon={faFacebook}  /> Facebook
      </a>
    </li>
  </ul>
  
  <style>
    ul {
      user-select: none;
      z-index: 3;
      color: var(--color-text1);
      list-style-type: none;
      text-transform: none;
      font-size: 1.2em;
      padding: 2em;
      width: 5%;
    }
  
    li {
      color: var(--color-text1);
      padding-bottom: 10px;
    
    }
  
    :global(li a svg) {
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
  
    :global(li a:hover svg) {
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
  
    @media not all and (max-height: 600px) and (max-width: 1024px) {
        @media (max-height: 750px) or (max-width: 768px) {
            ul {
                display: flex;
                flex-direction: row;
                justify-content: space-evenly;
                width: 100%;
            }
        }
    }
  @media (max-width: 933px) and (orientation: landscape) {
    ul {
      display: block;
      width: auto;
    }
  } 

  </style>