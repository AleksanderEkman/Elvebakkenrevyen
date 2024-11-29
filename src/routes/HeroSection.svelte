<script>
  import background_image from '$lib/assets/Elvebakken.jpg';
  import { onMount } from 'svelte';

  let countdown;

  async function fetchCurrentTime() {
    const response = await fetch('http://worldtimeapi.org/api/timezone/Europe/Oslo');
    const data = await response.json();
    return new Date(data.datetime).getTime();
  }

  onMount(async () => {
    const countDownDate = new Date("Feb 15, 2025 11:30:00").getTime(); // Dato til konseptslipp
    const countdownElement = document.getElementById("countdown");

    let now = await fetchCurrentTime(); // Fetch current time from API once
    const startTime = Date.now();
    const offset = now - startTime;

    const updateCountdown = () => {
      now = Date.now() + offset; // Update current time based on local system clock

      let distance = countDownDate - now; // Finner tidsforskjell i sekunder

      let months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30)); // Finner antall måneder
      let days = Math.floor((distance % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)); // Finner antall dager
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Finner antall timer
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)); // Finner antall minutter
      let seconds = Math.floor((distance % (1000 * 60)) / 1000); // Finner antall sekunder

      if (countdownElement) {
        countdownElement.innerHTML = `${months}m ${days}d ${hours}h ${minutes}m ${seconds}s`; // Viser tidsforskjell i HTML
      }
    };

    updateCountdown(); // Initial call to display the countdown immediately
    setInterval(updateCountdown, 1000); // Update every second
  });
</script>

<style>
  #countdown {
    font-size: 2em;
    font-weight: bold;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px;
    border-radius: 5px;
    display: inline-block;
    margin-bottom: 20px;
  }
  .hero {
    @apply bg-blue-500 text-white py-20;
    height: 100vh;
    width: 100vw;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
  }
  .hero::before {
    content: ''; 
    top: 0;
    left: 0;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  .container {
    position: relative;
    z-index: 1;
  }
  .hero-title {
    @apply text-4xl font-bold mb-4;
  }
  .hero-subtitle {
    @apply text-xl mb-8;
  }
  .hero-button {
    @apply bg-white text-blue-500 font-bold py-2 px-4 rounded;
  }
</style>

<section class="hero is-fullheight is-fullwidth" style="background-image: url({background_image});">
  <div class="container mx-auto text-center">
    <h1 class="hero-title">Elvebakkenrevyen</h1>
    <div id="countdown">Loading...</div>
    <p class="hero-subtitle">We are glad to have you here. Explore our content and enjoy your stay!</p>
    <button class="hero-button">Get Started</button>
  </div>
</section>