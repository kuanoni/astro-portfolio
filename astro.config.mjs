import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import image from '@astrojs/image';
import shikiTheme from './shikiTheme.json';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://astro.build/config
export default defineConfig({
	site: 'https://kainoa.us',
	integrations: [mdx(), sitemap(), image()],
	vite: {
		resolve: {
			alias: {
				'@/': `${path.resolve(__dirname, 'src')}/`,
			},
		},
		css: {
			preprocessorOptions: {
				scss: {
					// path to your scss variables
					additionalData: `
                    @use 'sass:math';
                    @import "@/styles/abstracts/_variables.scss"; 
                    @import "@/styles/abstracts/_functions.scss"; 
                    @import "@/styles/abstracts/_mixins.scss";
                    `,
				},
			},
		},
	},
	markdown: {
		shikiConfig: {
			// https://github.com/shikijs/shiki/blob/main/docs/themes.md
			theme: shikiTheme,
		},
	},
});
