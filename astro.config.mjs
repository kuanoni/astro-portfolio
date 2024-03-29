import { defineConfig } from 'astro/config';
import { astroImageTools } from 'astro-imagetools';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import image from '@astrojs/image';
import robotsTxt from 'astro-robots-txt';
import compress from 'astro-compress';
import shikiTheme from './shikiTheme.json';

// https://astro.build/config
export default defineConfig({
	site: 'https://kainoa.us',
	build: {
		format: 'file',
	},
	integrations: [mdx(), sitemap(), image(), robotsTxt(), compress(), astroImageTools],
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
