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

const blogCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		tags: z.array(z.string()),
		publishDate: z.string().transform((str) => new Date(str)),
		editedDate: z
			.string()
			.transform((str) => new Date(str))
			.optional(),
	}),
});

export const collections = {
	project: projectCollection,
	blog: blogCollection,
};
