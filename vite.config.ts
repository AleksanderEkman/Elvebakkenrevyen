import { defineConfig } from "vitest/config";
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
    plugins: [sveltekit()],

    test: {
        include: ['src/**/*.{test,spec}.{js,ts}']
    },
    build: {
        sourcemap: true
      },
    optimizeDeps: {
        include: ['lodash.get', 'lodash.isequal', 'lodash.clonedeep']
    }
});
