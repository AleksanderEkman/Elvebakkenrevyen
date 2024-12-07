import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		csp: {
			mode: "nonce",
			directives: {
				"script-src": [
					"self"
				],
				"script-src-elem": [
                    "'self'"
                ],
				"object-src": ["none"],
				"base-uri": ["none"],
			},
		},
		files: {
			hooks: {
				server: 'src/hooks/hooks.server.ts',
				universal: 'src/hooks/universal.js'
			},
		}
	}
};

export default config;