import type { CollectionEntry } from 'astro:content';

export default (entry: CollectionEntry<any>) => process.env.NODE_ENV === 'development' || !entry.data.draft;
