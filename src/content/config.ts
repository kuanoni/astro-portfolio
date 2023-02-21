import { defineCollection, z } from 'astro:content';

const projectPreviewSchema = z.object({
	previewImages: z.array(z.string()),
});

const postSchema = z.object({
	title: z.string(),
	tags: z.array(z.string()),
	datePublished: z.string().transform((str) => new Date(str)),
	dateUpdated: z
		.string()
		.transform((str) => new Date(str))
		.optional(),

	// metaDescription: z.string(),
	// featuredImage: z.string(),
	// featuredImageAlt: z.string(),
	// ogImage: z.string(),
	// ogSquareImage: z.string(),
	// twitterImage: z.string(),
});

const projectPostSchema = postSchema.extend({
	techs: z.array(z.string()),
	liveUrl: z.string().optional(),
	sourceUrl: z.string().optional(),
});

export const collections = {
	projectPreview: defineCollection({ schema: projectPreviewSchema }),
	blog: defineCollection({ schema: postSchema }),
	project: defineCollection({ schema: projectPostSchema }),
};
