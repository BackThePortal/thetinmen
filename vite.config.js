import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/thetinmen/',
	plugins: [vue()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			$: fileURLToPath(new URL('./public', import.meta.url)),
			'!': fileURLToPath(new URL('./src/components/', import.meta.url)),
		},
	},
	test: {},
});
