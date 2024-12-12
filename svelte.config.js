import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        adapter: adapter(),


        files: {
            hooks: {
                server: 'src/hooks/hooks.server.ts',
                universal: 'src/hooks/universal.js'
            },
        }
    }
};

export default config;