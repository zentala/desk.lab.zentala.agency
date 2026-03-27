/**
 * Blog RSS feed endpoint.
 * Generates an RSS 2.0 feed from the blog content collection.
 */
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog');

  return rss({
    title: 'zntlDesk Blog',
    description:
      'Insights on sitting habits, standing desk optimization, and behavioral health tracking',
    site: context.site!.toString(),
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.description,
      link: `/blog/${post.id}/`,
    })),
  });
}
