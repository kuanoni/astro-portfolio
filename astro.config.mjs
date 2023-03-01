import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import image from '@astrojs/image';
import shikiTheme from './shikiTheme.json';

// https://astro.build/config
export default defineConfig({
	site: 'https://kainoa.us',
	integrations: [mdx(), sitemap(), image()],
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `
                    @use 'sass:math';
                    @import "src/styles/abstracts/_variables"; 
                    @import "src/styles/abstracts/_functions"; 
                    @import "src/styles/abstracts/_mixins";
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
