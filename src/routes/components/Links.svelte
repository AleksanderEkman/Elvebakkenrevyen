<script>
    import { onMount } from 'svelte';
    import { faYoutube, faInstagram, faTiktok, faFacebook } from '@fortawesome/free-brands-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
    
  </script>
  
  <ul aria-label="Sosiale medier">
    <li>
      <a href="https://www.youtube.com/Elvebakkenrevyen" aria-label="Abonner på Elvebakken på YouTube">
        <FontAwesomeIcon icon={faYoutube} /> YouTube
      </a>
    </li>
    <li>
      <a href="https://www.instagram.com/Elvebakkenrevyen/" aria-label="Følg Elvebakkenrevyen på Instagram">
        <FontAwesomeIcon icon={faInstagram} /> Instagram
      </a>
    </li>
    <li>
      <a href="https://www.tiktok.com/@Elvebakkenrevyen" aria-label="Følg Elvebakkenrevyen på TikTok">
        <FontAwesomeIcon icon={faTiktok} /> TikTok
      </a>
    </li>
    <li>
      <a href="https://www.facebook.com/Elvebakkenrevyen/" aria-label="Følg Elvebakkenrevyen på Facebook">
        <FontAwesomeIcon icon={faFacebook} /> Facebook
      </a>
    </li>
  </ul>
  
  <style nonce="%sveltekit.nonce%">
    ul {
      user-select: none;
      z-index: 3;
      list-style-type: none;
      font-size: 1.2em;
      margin: 1.25rem;
      width: 5%;
    }

    li {
      padding-bottom: 13px;
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
      z-index: 2;
      color: rgb(255, 255, 255, 0.5);
      text-decoration: none;
      transition: color 0.3s ease, transform 0.2s ease;
      white-space: nowrap;
    }
    li a::after {
      content: '';
      position: absolute;
      width: 0;
      height: 1px;
      bottom: -4px;
      left: 0;
      background-color: var(--color-text1);
      transition: width 0.2s ease;
    }
    li a:hover::after {
      width: 100%;
    }
    li a:hover {
      color: var(--color-text1);
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
  
    @media (max-width: 540px) {
      ul {
        font-size: 0.85em;
        margin: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        width: 100%;
      }
    }
  

  @media (max-width: 933px) and (orientation: landscape) {
    ul {
      display: block;
      width: auto;
    }
  } 

  </style>