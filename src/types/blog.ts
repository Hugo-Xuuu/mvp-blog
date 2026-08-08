import type { CollectionEntry } from "astro:content";

/** 博客文章集合的条目类型 */
export type BlogPost = CollectionEntry<"blog">;

/** 博客文章 frontmatter 字段类型 */
export type BlogFrontmatter = BlogPost["data"];

/** 文章卡片展示所用的精简数据类型 */
export type PostCardData = {
  slug: string;
  title: string;
  date: Date;
  tags: string[];
  description?: string;
};
