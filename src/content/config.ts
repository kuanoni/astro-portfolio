import { defineCollection, z } from 'astro:content';

const projectCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		tags: z.array(z.string()),
		thumbnail: z.string().optional(),
	}),
});

export const collections = {
	project: projectCollection,
};
