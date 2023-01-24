import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	integrations: [mdx(), sitemap()],
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
                    @import "@/styles/abstracts/_variables.scss"; 
                    @import "@/styles/abstracts/_functions.scss"; 
                    @import "@/styles/abstracts/_mixins.scss";
                    `,
				},
			},
		},
	},
});
