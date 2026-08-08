import rss from "@astrojs/rss";
import { getAllPosts } from "../lib/content";
import { SITE_CONFIG } from "../lib/utils";

export async function GET(context: any) {
  const posts = await getAllPosts();

  return rss({
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    site: context.site || SITE_CONFIG.url,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description || "",
      link: `/blog/${post.id.replace(/\.md$/, "")}/`,
      categories: post.data.tags,
    })),
    customData: `<language>${SITE_CONFIG.language}</language>`,
  });
}
