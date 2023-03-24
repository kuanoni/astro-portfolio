export const SITE_TITLE = 'kainoa.us';
export const SITE_DESCRIPTION = 'Kainoa Araiza Kuanoni: Front-end web developer, personal website and portfolio.';
export const SITE_EMAIL = 'me@kainoa.us';

export const GITHUB_URL = 'https://github.com/kuanoni';
export const GITLAB_URL = 'https://gitlab.com/kuanoni';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/kainoa-araiza-k/';
export const STACK_OVERFLOW_URL = 'https://stackoverflow.com/users/20453324/kuanoni';
export const DEV_URL = 'https://dev.to/kuanoni';

export const SOUNDCLOUD_USERNAME = 'kuanoni97';

interface TechInfo {
	[i: string]: {
		description: string;
		url: string;
	};
}

export const TECH_INFO: TechInfo = {
	Javascript: {
		description: 'You probably know what Javascript is...',
		url: 'https://en.wikipedia.org/wiki/JavaScript',
	},
	Typescript: {
		description: 'A strongly typed version of Javascript.',
		url: 'https://www.typescriptlang.org/',
	},
	React: {
		description: 'A popular Javascript library for building user interfaces. My go-to.',
		url: 'https://reactjs.org/',
	},
	Next: {
		description: 'An full-stack web framework that extends on React.',
		url: 'https://nextjs.org/',
	},
	Stiches: {
		description: 'CSS-in-JS with near-zero runtime, SSR, and multi-variant support.',
		url: 'https://stitches.dev/',
	},
	MongoDB: {
		description: "Document-oriented database program. It's easy to use, and they provide hosting.",
		url: 'https://www.mongodb.com/',
	},
	Sass: {
		description: 'Popular CSS extension language. My go-to...until W3C adds nesting to CSS.',
		url: 'https://sass-lang.com/',
	},
	Figma: {
		description: 'Powerful interface design tool.',
		url: 'https://www.figma.com/',
	},
	Express: {
		description: 'Node.js framework for creating web servers.',
		url: 'https://expressjs.com/',
	},
	Redux: {
		description: 'A application state managing library for Javascript.',
		url: 'https://redux.js.org/',
	},
	'Socket.IO': {
		description: 'A well-known websocket wrapper library for both the server and client.',
		url: 'https://socket.io/',
	},
};

// content slugs for projects to be featured on the home page
export const FEATURED_PROJECTS = ['kroyooz-tv', 'security-badging', 'text-tabber'];
