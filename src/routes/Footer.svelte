<footer>
    <p id="credit">© 2024-2025 Elvebakkenrevyen. Designet og utviklet av <a href="mailto:aleksander.ekman1@gmail.com">Aleksander Ekman</a>.</p>
</footer>

<style>
    footer {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 10vh;
        background: linear-gradient(45deg, rgb(3, 4, 1), rgrgb(5, 5, 2));
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.5);
        padding: 1em;
    }

    #credit {
        padding: 0 1em;
        font-size: 1em;
        color: white;
        text-transform: none;
        text-align: center;
    }
    #credit:hover {
        cursor: default;
        color: #c2c2c2;
        transition: color 0.3s ease;
    }
    #credit a {
        color: white;
        text-decoration: none;
    }
    #credit a:hover {
        color: #8dc0d2;
        transition: color 0.3s ease;
        text-decoration: underline;
    }
    @media (max-width: 480px) {
        #credit {
            font-size: 0.7em;
        }
    }
</style>