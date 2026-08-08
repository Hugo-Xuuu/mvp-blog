import { getAllPosts } from "../lib/content";

/**
 * 搜索索引 API — 构建时生成 JSON
 * 供前端 Fuse.js 搜索使用
 */
export async function GET() {
  const posts = await getAllPosts();

  const searchIndex = posts.map((post) => ({
    slug: post.id.replace(/\.md$/, ""),
    title: post.data.title,
    description: post.data.description || "",
    tags: post.data.tags,
    date: post.data.date.toISOString(),
    content: post.body || "",
  }));

  return new Response(JSON.stringify(searchIndex), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
