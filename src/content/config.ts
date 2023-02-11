import { defineCollection, z } from 'astro:content';

const projectCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		techs: z.array(z.string()),
		previewDesktop: z.string().optional(),
		previewMobile: z.string().optional(),
	}),
});

export const collections = {
	project: projectCollection,
};
