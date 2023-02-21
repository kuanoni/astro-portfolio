import { defineCollection, z } from 'astro:content';

const featuredProjectSchema = z.object({
	title: z.string(),
	techs: z.array(z.string()),
	liveUrl: z.string().optional(),
	sourceUrl: z.string().optional(),
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

const projectPostSchema = postSchema.merge(featuredProjectSchema.omit({ previewImages: true }));

export const collections = {
	featuredProjects: defineCollection({ schema: featuredProjectSchema }),
	blog: defineCollection({ schema: postSchema }),
	project: defineCollection({ schema: projectPostSchema }),
};
