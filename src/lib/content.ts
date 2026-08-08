import { getCollection } from "astro:content";
import type { BlogPost } from "../types/blog";

/**
 * 获取所有已发布的文章，按日期降序排列
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  return (await getCollection("blog"))
    .filter((post) => !post.data.draft)
    .sort(
      (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
    ) as unknown as BlogPost[];
}

/**
 * 根据标签筛选文章
 */
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.data.tags.includes(tag));
}

/**
 * 获取所有标签（去重排序）
 */
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach((post) => post.data.tags.forEach((t) => tagSet.add(t)));
  return [...tagSet].sort();
}

/**
 * 获取文章总数
 */
export async function getPostCount(): Promise<number> {
  const posts = await getAllPosts();
  return posts.length;
}

/**
 * 分页获取文章
 */
export async function getPaginatedPosts(
  page: number,
  pageSize: number = 10,
): Promise<{ posts: BlogPost[]; total: number; totalPages: number }> {
  const posts = await getAllPosts();
  const total = posts.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return {
    posts: posts.slice(start, end),
    total,
    totalPages,
  };
}
