// @ts-check
import { defineConfig } from 'astro/config';

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import icon from 'astro-icon';
import mdx from '@astrojs/mdx';
import remarkMagic from './src/remark/remarkMagic.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  site: 'https://kainoa.us',
  build: {
    format: 'file',
  },
  image: {
    domains: ["api.scryfall.com", "cards.scryfall.io"],
  },
  vite: {
    resolve: {
      alias: { '@/': `${path.resolve(__dirname, 'src')}/` },
    },
  },
  integrations: [icon({
    iconDir: "src/assets/icons",
  }), mdx({
    remarkPlugins: [[remarkMagic],]
  })],
  markdown: {
    shikiConfig: {
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'dracula',
    },
  },
});