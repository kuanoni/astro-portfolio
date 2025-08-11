import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

import draftPostFilter from '@utils/draftPostFilter';

export const GET = async ({ url, redirect }: APIContext) => {
	// get blog and project post urls from collections
	const blogUrls = (await getCollection('blog', draftPostFilter)).map((post) => url.origin + '/posts/' + post.slug);
	const projectUrls = (await getCollection('project', draftPostFilter)).map(
		(post) => url.origin + '/projects/' + post.slug
	);

	// pick random url
	const allUrls = [...blogUrls, ...projectUrls];
	const redirectUrl = allUrls[Math.floor(Math.random() * allUrls.length)];

	return redirect(redirectUrl, 307);
};
