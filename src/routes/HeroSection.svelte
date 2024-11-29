<script>
  import background_image from '$lib/assets/Elvebakken.jpg';
  import Countdown from './Countdown.svelte';
</script>

<section class="hero is-fullheight is-fullwidth" style="background-image: url({background_image});">
  <div class="container text-center">
    <h1 class="hero-title">Elvebakkenrevyen</h1>
    <div class="countdown">
      <Countdown />
    </div>
  </div>
</section>

<style>

  .hero {
    @apply text-white py-20;
    height: 100vh;
    width: 100vw;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    text-transform: uppercase;
  }
  .hero::before {
    content: ''; 
    top: 0;
    left: 0;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.8);
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  .container {
    position: relative;
    z-index: 1;
  }
  .hero-title {
    user-select: none;
    margin-top: 10%;
    @apply text-4xl font-bold mb-4;
    font-family: var(--font-header);
  }

  /* Media queries for responsivitet */
  @media (max-width: 768px) {
    .countdown {
      font-size: 1.5em;
      margin-top: 30px; /* Juster plass over nedtellingen for mindre skjermer */
    }
    .countdown-item {
      padding: 3%;
      flex: 1 1 45%; /* Sørg for at elementer tar opp lik plass */
      margin: 5px; /* Legg til margin mellom elementer */
    }
    .hero-title {
      font-size: 2.5em;
      user-select: none;
    }
    .hero-subtitle {
      font-size: 1.2em;
    }
    .hero-button {
      font-size: 1em;
    }
  }

  @media (max-width: 480px) {
    .countdown {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      font-size: 1.25em;
      margin-top: 15%; /* Juster plass over nedtellingen for mindre skjermer */
      height: auto; /* Juster høyde for mindre skjermer */
    }
    .countdown-item {
      margin: 5px 0; /* Legg til margin mellom elementer */
    }
    .hero-title {
      font-size: 2em;
    }
    .hero-subtitle {
      font-size: 1em;
    }
    .hero-button {
      font-size: 0.8em;
    }
    .row {
      display: flex;
      flex-direction: row;
    }
    #min {
      border-left: none;
    }

  }
</style>