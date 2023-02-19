import { defineCollection, z } from 'astro:content';

const projectCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		techs: z.array(z.string()),
		previewImages: z.array(z.string()),
		liveUrl: z.string().optional(),
		sourceUrl: z.string().optional(),
	}),
});

export const collections = {
	project: projectCollection,
};
