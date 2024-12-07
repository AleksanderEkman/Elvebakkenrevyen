<footer aria-label="Footer Informasjon">
  <div class="content">
    <div class="footer-col">
      <p id="header">
        © 2024-2025 Elvebakkenrevyen
      </p>
      <p id="credit">
        Designet og utviklet av <a href="mailto:aleksanderekman@elvebakkenrevyen.no">Aleksander Ekman</a>
      </p>
    </div>
    <div class="footer-col">
      <p id="header">
        Kontakt oss
      </p>
      <ul>
        <li><a href="mailto:revysjefer@elvebakkenrevyen.no">revysjefer@elvebakkenrevyen.no</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <p id="header">
        Adresse
      </p>
      <ul>
        <li>Vestre Elvebakke 3</li>
        <li>0182 Oslo</li>
      </ul>
    </div>
  </div>
</footer>

<style>
  footer {
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    padding: 2em 0em;
    background: linear-gradient(135deg, #000000, #161616);
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.5);
  }

  .content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    max-width: 1200px;
    gap: 3em; /* Add gap between columns */
  }

  .footer-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center; /* Center text within columns */
    flex: 1; /* Allow columns to grow and shrink equally */
    padding: 0 1em;
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

    .content {
      flex-direction: column;
      align-items: center;
    }

    .footer-col {
      width: 100%;
      align-items: center;
      text-align: center;
      padding: 1em 0;
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
      height: auto;
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