---
title: Vite + Sass setup
description: An easy and organized way to setup your Sass or SCSS files and imports
datePublished: 03-08-23
draft: false
---

## Why use Sass?

There are plenty of useful tools in Sass, but personally, I would use it for the ability to nest rules alone. I find styles so much easier to organize with nesting. In vanilla CSS you'll find yourself writing the same selectors over and over, desperately trying to keep classes properly scoped to avoid styling unintended things. It can quickly become tiring and confusing. So until nesting comes to native CSS, Sass it is.

## File structure

Here's what my typical styles file structure looks like. You don't have to copy it exactly, it mostly comes down to personal preference.

```
styles/
 ├── abstracts/
 │    ├── _variables.scss
 │    ├── _mixins.scss
 │    └── functions.scss
 ├── components/
 │    ├── BaseHead.scss
 │    └── ...
 ├── core/
 │    ├── _resets.scss
 │    ├── _typography.scss
 ├── layouts/
 │    ├── BaseLayout.scss
 │    └── ...
 ├── pages/
 │    ├── Home.scss
 │    └── ...
 └── main.scss
```

Here's a breakdown of each directory:
- **abstracts/**: Variables, mixins, functions, and other things that don't output any CSS when compiled.
- **components/**: Your component styles. Mirrors your `src/components` directory.
- **core/**: Any styles used globally in your project such as resets.
- **layouts/**: Your layout styles. Mirrors your `src/layouts` directory.
- **pages/**: Your pages styles. Mirrors your `src/pages` directory.
- **main.scss**: This file will contain your global imports. It should look something like this:
    ```scss
    @import './core/reset';
    @import './core/typography';
    @import './core/keyframes';
    ```

You'll need to import `main.scss` in every page for your styles to work. I find the best place to do this is the `BaseHead.astro` because it's a component that's included in all of my pages. You could also import it in a layout that you plan to wrap every page in. Either way, it'll look like this:

```js
---
import '../styles/main.scss';
---
```


## Injecting Sass partials

This allows Intellisense to auto-complete your variables, mixins, and functions without you having to import them in each Sass file.

```js
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    // ...other config goes here
	vite: {
		resolve: {
			alias: {
				'@/': `${path.resolve(__dirname, 'src')}/`,
			},
		},
		css: {
			preprocessorOptions: {
                scss: {
                    // built-in sass modules can also be injected with the @use syntax
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
});
```