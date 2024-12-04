<footer aria-label="Footer Informasjon">
  <div class="footer-col">
    <p id="header">
      © 2024-2025 Elvebakkenrevyen.
    </p>
    <p id="credit">
      Designet og utviklet av <a href="mailto:aleksander.ekman1@gmail.com">Aleksander Ekman</a>.
    </p>
  </div>
  <div class="footer-right">
    <div class="footer-col">
      <p id="header">
        Revysjefene
      </p>
      <ul>
        <li>Vetle Due Garnes</li>
        <li>Mari Brøten</li>
        <li>Martin Langeland</li>
        <li>Frida Del Rio-Vang</li>
      </ul>
    </div>
    <div class="footer-col">
      <p id="header">
        Revyinstruktørene
      </p>
      <ul>
        <li>Mats Valø</li>
        <li>Sindre Hansen</li>
      </ul>
    </div>
  </div>
</footer>

<style>
  footer {
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
    width: 100vw;
    padding: 2em 1em;
    background: linear-gradient(135deg, #000000, #161616);
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.5);
  }

  .footer-col {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0.5em;
  }

  .footer-right {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 2em; /* Adjust the gap between the columns */
  }

    #header {
      font-size: 1.2em;
      font-weight: bold;
      color: white;
      margin-bottom: 0.5em;
    }

    #credit {
      font-size: 1em;
      color: white;
      margin-top: 0.5em;
    }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    font-size: 1em;
    color: white;
    margin: 0.2em 0;
  }

  a {
    color: white;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
  @media (max-width: 768px) {
        footer {
            flex-direction: column;
            align-items: center;
        }

        .footer-col {
            width: 100%;
            align-items: center;
            text-align: center;
        }

        #credit, li {
            text-align: center;
        }
    }

  @media (max-width: 480px) {
      #header {
          font-size: 1.1em;
      }
      #credit, li {
          font-size: 0.8em;
      }
      footer {
          height: 45svh;
      }
  }
  @media (max-width: 933px) and (orientation: landscape) { 
    #header {
      font-size: 0.9em;
    }

    #credit {
      font-size: 0.75em;
    }
    li {
      font-size: 0.8em;
    }
  }
</style>