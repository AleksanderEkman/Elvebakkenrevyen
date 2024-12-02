<footer>
    <div class="footer-col">
        <p id="credit">
            © 2024-2025 Elvebakkenrevyen. Designet og utviklet av 
            <a href="mailto:aleksander.ekman1@gmail.com">Aleksander Ekman</a>.
        </p>
    </div>
    <div class="footer-col">
        <p id="text">
            Revysjefer: 
        </p>
        <p id="text">
            Vetle Due Garnes
        </p>
        <p id="text">
            Mari Brøten
        </p>
        <p id="text">
            Martin Langeland
        </p>
        <p id="text">
            Frida 
        </p>
    </div>
</footer>

<style>
    footer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: auto;
        /* Use a transparent background with a dark gradient overlay */
        background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3));
        background-size: cover; /* Ensures the background image covers the entire footer */
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.5);
        padding: 1em;
    }
    .footer-col {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 0.5em;
    }

    #credit {
        padding: 0 1em;
        font-size: 1em;
        color: white; /* White text for contrast */
        text-transform: none;
        text-align: left;
    }

    #credit:hover {
        cursor: default;
        color: #c2c2c2; /* Slightly lighter on hover */
        transition: color 0.3s ease;
    }

    #credit a {
        color: white; /* Link color */
        text-decoration: none; /* Remove underline */
    }

    #credit a:hover {
        color: #8dc0d2; /* Lighter link color on hover */
        transition: color 0.3s ease;
        text-decoration: underline; /* Underline on hover */
    }
    #text {
        color: white;
    }
    @media (max-width: 480px) {
        #credit {
            font-size: 0.7em; /* Responsive font size for smaller screens */
        }
    }
</style>