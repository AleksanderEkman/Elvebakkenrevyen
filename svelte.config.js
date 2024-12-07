import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		csp: {
			mode: "hash",
			directives: {
				"script-src": [
					"self",
					"https://www.googletagmanager.com",
					'sha256-1xOgbz/xSP7IfjQKKYNLJO6q+HLQu66Wjd4osOvrWR8='
				],
			},
		},
		files: {
			hooks: {
				server: 'src/hooks/server.js',
				universal: 'src/hooks/universal.js'
			},
		},
		prerender: {
			entries: ['*']
		},
	}
};

export default config;