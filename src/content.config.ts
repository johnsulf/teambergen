import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

const team = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      image: image().optional(),
      pdga: z.number().optional(),
      order: z.number().default(999), // For sorting - lower number = higher in list
    }),
});

export const collections = {
  team,
};
