import { defineCollection, z } from 'astro:content';

const projectCollection = defineCollection({
	schema: z.object({
		techs: z.array(z.string()),
		previewDesktop: z.string().optional(),
		previewMobile: z.string().optional(),
	}),
});

export const collections = {
	project: projectCollection,
};
