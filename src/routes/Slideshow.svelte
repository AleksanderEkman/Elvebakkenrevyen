<script lang="ts">
    import { onMount } from 'svelte';
    import nymalt from '$lib/assets/slideshow/nymalt.webp';
    import fortheculture from '$lib/assets/slideshow/fortheculture.webp';
    import ekko from '$lib/assets/slideshow/ekko.webp';
    import image2021 from '$lib/assets/slideshow/2021.webp';
    import døden from '$lib/assets/slideshow/døden.webp';
    import kjøssmegpåmunnen from '$lib/assets/slideshow/kjøssmegpåmunnen.webp';
    import vimåsnakkeommiljø from '$lib/assets/slideshow/vimåsnakkeommiljø.webp';
    import mellomrom from '$lib/assets/slideshow/mellomrom.webp';
    import utåstjælepaller from '$lib/assets/slideshow/utåstjælepaller.webp';
    import utenentråd from '$lib/assets/slideshow/utenentråd.webp';
  
    let imageIndex = 0;
    const images = [
        { src: nymalt },
        { src: fortheculture },
        { src: ekko },
        { src: image2021 },
        { src: døden },
        { src: kjøssmegpåmunnen },
        { src: vimåsnakkeommiljø },
        { src: mellomrom },
        { src: utåstjælepaller},
        { src: utenentråd }
    ];
  
    onMount(() => {
      const imgElement = document.getElementById('slideshow-image') as HTMLImageElement;
      if (!imgElement) return;
  
      const interval = setInterval(() => {
        imgElement.classList.add('fade-out');
  
        imageIndex = (imageIndex + 1) % images.length;
        imgElement.src = images[imageIndex].src;

        imgElement.classList.remove('fade-out');
        imgElement.classList.add('fade-in');

  
      }, 5000); 
  
      return () => clearInterval(interval);
    });
  </script>
  
  <div class="overflow">
    <div class="slideshow">
      <img id="slideshow-image" src={images[0].src} alt="Slideshow for tidligere revyforestillinger" class="w-full h-auto fade-in" />
    </div>
  </div>
  
  <style>
    .overflow {
      margin-top: 7.5%;
      display: flex;
      justify-content: center;
      width: 100%;
      height: auto;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
      border-radius: 12.5px;
      user-select: none;
    }
    .slideshow {
      width: 80%;
      height: auto;
      position: relative;
      border-radius: 10px;
    }
    .slideshow img {
      border-radius: 10px;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: auto;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
      user-select: none;
      -webkit-user-drag: none;
    }
    .fade-in {
      opacity: 1;
      transition: opacity 0.5s ease-in;
    }
    @media (max-width: 480px) {
      .slideshow {
        width: 90vw;
        height: auto;
      }
    }
  </style>