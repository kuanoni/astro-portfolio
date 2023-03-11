import { defineCollection, z } from 'astro:content';

const projectPreviewSchema = z.object({
	previewImages: z.array(z.string()),
});

const postSchema = z.object({
	title: z.string(),
	description: z.string(),
	datePublished: z.string().transform((str) => new Date(str)),
	dateUpdated: z
		.string()
		.transform((str) => new Date(str))
		.optional(),
	draft: z.boolean(),
});

const projectPostSchema = postSchema.extend({
	techs: z.array(z.string()),
	liveUrl: z.string().optional(),
	sourceUrl: z.string().optional(),
});

const videosSchema = z.object({
	title: z.string(),
	videoId: z.string(),
	datePublished: z.string().transform((str) => new Date(str)),
	dateUploaded: z.string().transform((str) => new Date(str)),
});

export const collections = {
	projectPreview: defineCollection({ schema: projectPreviewSchema }),
	blog: defineCollection({ schema: postSchema }),
	project: defineCollection({ schema: projectPostSchema }),

	videos: defineCollection({ schema: videosSchema }),
};
