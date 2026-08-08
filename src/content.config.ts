import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * 博客文章内容集合定义
 * 使用 Zod 确保 frontmatter 类型安全
 * Astro v7+ 使用 loader API
 */
const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()).default([]),
    description: z.string().optional(),
    draft: z.boolean().default(false),
    coverImage: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
