import { getCollection } from 'astro:content';

import BaseHead from '@components/BaseHead.astro';
import draftPostFilter from '@utils/draftPostFilter';

import type { APIContext } from 'astro';
export const get = async ({ url }: APIContext) => {
	// get blog and project post urls from collections
	const blogUrls = (await getCollection('blog', draftPostFilter)).map((post) => url.origin + '/posts/' + post.slug);
	const projectUrls = (await getCollection('project', draftPostFilter)).map(
		(post) => url.origin + '/projects/' + post.slug
	);

	// pick random url
	const allUrls = [...blogUrls, ...projectUrls];
	const redirectUrl = allUrls[Math.floor(Math.random() * allUrls.length)];

	return {
		// use meta tag to redirect to new url
		body: `<html><head><meta http-equiv="refresh" content="0; url=${redirectUrl}" />
        <style>html{background-color: #000;color: #fff}p{margin:16px}a{color:#ed6502}a:hover{color:#ffa767}</style></head><body><p>Redirecting...</p><p>Click <a href="${url.origin}">here</a> to return</p></body></html>`,
	};
};
