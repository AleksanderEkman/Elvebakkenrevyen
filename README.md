# Elvebakkenrevyen

## Introduksjon

Elvebakkenrevyen-nettsiden er laget for å presentere informasjon om revyen ved Elvebakken videregående skole, samt selge billetter til kunder gjennom **bestill.albillett.no**. Nettsiden er bygget med **SvelteKit**, et moderne rammeverk for utvikling av brukergrensesnitt som gir en rask og responsiv opplevelse.

## Teknisk informasjon

### Teknologier brukt

- **SvelteKit**: Et rammeverk for å bygge applikasjoner med Svelte. Det gir server-side rendering, statisk nettstedgenerering og en enkel utviklingsopplevelse.
- **TypeScript**: Et superset av JavaScript som legger til statiske typer, noe som forbedrer utviklingsopplevelsen ved å gi bedre verktøystøtte og feilsøking.
- **Vite**: En rask byggverktøy som brukes av SvelteKit for utvikling og produksjon.
- **Node.js**: Brukes som servermiljø for å kjøre applikasjonen, noe som muliggjør server-side rendering og håndtering av API-anrop.
- **Vitest**: Et testverktøy bygget for Vite, som gir en rask og enkel måte å skrive og kjøre tester for JavaScript- og TypeScript-kode.

### Installasjon

For å sette opp prosjektet lokalt, følg disse trinnene:

1. Klon repositoriet:

   ```bash
   git clone https://github.com/allsers/elvebakkenrevyen.git
   cd elvebakkenrevyen

   ```

2. Installer avhengigheter:

   ```bash
   npm install

   ```

3. Start utviklingsserveren:
   ```bash
   npm run dev
   ```

### Prosjektstruktur

/elvebakkenrevyen

- │
- ├── src/
- │ ├── routes/ # Inneholder ruter for applikasjonen
- │ ├── components/ # Gjenbrukbare komponenter
- │ ├── styles/ # CSS-filer og Tailwind-konfigurasjoner
- │ └── lib/ # Biblioteker og hjelpefunksjoner
- │
- ├── static/ # Statisk innhold (bilder, favicon osv.)
- ├── package.json # Prosjektets avhengigheter og skript
- └── svelte.config.js # Konfigurasjon for SvelteKit

### Docker

For å bygge og kjøre prosjektet med Docker, følg disse trinnene:

1. Bygg Docker-avbildningen:

   ```bash
   docker build -t elvebakkenrevyen .
   ```

2. Kjør Docker-avbildningen:

   ```bash
   docker run -p 8080:8080 elvebakkenrevyen
   ```

   Nettsiden vil nå være tilgjengelig på `http://localhost:8080`.

### Kontakt

For spørsmål eller tilbakemeldinger, vennligst kontakt meg på aleksander.ekman1@gmail.com. Takk for at du besøker Elvebakkenrevyens nettside!
