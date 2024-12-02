<footer>
    <div class="footer-col">
        <p id="text">
            © 2024-2025 Elvebakkenrevyen.
        </p> 
        <p id="credit">
            Designet og utviklet av <a href="mailto:aleksander.ekman1@gmail.com">Aleksander Ekman</a>.
        </p>
    </div>
    <div class="footer-col">
        <p id="text">
            Revysjefer: 
        </p>
        <p id="text">
            Vetle
        </p>
        <p id="text">
            Mari
        </p>
        <p id="text">
            Martin
        </p>
        <p id="text">
            Frida 
        </p>
    </div>
    <div class="footer-col">
        <p id="text">
            Revyinstruktører:
        </p>
        <p id="text">
            Mats
        </p>
        <p id="text">
            Sindre
        </p>
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
        justify-content: center;
        align-items: flex-start;
        width: 30%;
        padding: 1em;
    }

    #credit, #text {
        padding: 0.1em 0;
        font-size: 1em;
        color: white;
        text-align: left;
    }

    #credit a {
        color: #8dc0d2;
        text-decoration: none;
    }

    #credit a:hover {
        color: #c2c2c2;
        transition: color 0.3s ease;
        text-decoration: underline;
    }

    #text {
        margin: 0.05em 0;
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

        #credit, #text {
            text-align: center;
        }
    }

    @media (max-width: 480px) {
        #credit, #text {
            font-size: 0.8em;
        }
        footer {
            height: 45svh;
        }
    }
</style>