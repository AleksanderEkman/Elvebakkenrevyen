<script lang="ts">
	import { i18n } from "$lib/i18n";
	import { ParaglideJS } from "@inlang/paraglide-sveltekit";
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<meta name="keywords" content="Elvebakkenrevyen, Revy, 2025, Elvebakken, Nymalt, For the culture, Ekko" />
    <meta name="author" content="Elvebakkenrevyen" />
    <meta property="og:title" content="Elvebakkenrevyen 2025" />
    <meta property="og:description" content="Nedtelling for Elvebakkenrevyen 2025" />
    <meta property="og:url" content="https://elvebakkenrevyen.no" />
    <script type="application/ld+json">
        {`
        {
            "@context": "https://schema.org",
            "@type": "Event",
            "name": "Elvebakkenrevyen 2025",
            "startDate": "2025-02-15T11:30:00",
            "location": {
                "@type": "Place",
                "name": "Elvebakken",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Vestre Elvebakke 3",
                    "addressLocality": "Oslo",
                    "postalCode": "0182",
                    "addressCountry": "NO"
                }
            },
            "image": [
                "%sveltekit.assets%/og-image.png"
            ],
            "description": "Nedtelling for Elvebakkenrevyen 2025",
            "organizer": {
                "@type": "Organization",
                "name": "Elvebakkenrevyen",
                "url": "https://elvebakkenrevyen.no"
            },
			"sameAs": [
                "https://www.facebook.com/Elvebakkenrevyen",
                "https://www.instagram.com/Elvebakkenrevyen",
				"https://www.tiktok.com/@elvebakkenrevyen
            ]
        }
        `}
    </script>
</svelte:head>

<ParaglideJS {i18n}>
	{@render children()}
</ParaglideJS>

