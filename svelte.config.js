import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		csrf: {
			checkOrigin: true
		},
		adapter: adapter(),
		csp: {
			mode: 'nonce',
			directives: {
				'script-src': ["'self'"],
				'script-src-elem': ["'self'"],

				'object-src': ["'self'"],
				'base-uri': ["'self'"]
			}
		},
		files: {
			hooks: {
				server: 'src/hooks/hooks.server.ts',
				universal: 'src/hooks/hooks.ts'
			}
		}
	}
};

export default config;
