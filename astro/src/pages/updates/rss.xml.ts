import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
export async function GET(context) {
  const entries = (await getCollection('updates')).sort((a, b) => b.data.statusDate.valueOf() - a.data.statusDate.valueOf());
  return rss({ title: 'Open Smart Desk updates', description: 'Versioned engineering status updates.', site: context.site ?? 'https://lp.desk.labs.zentala.agency', items: entries.map((entry) => ({ title: entry.data.title, description: entry.data.description, pubDate: entry.data.statusDate, link: '/updates/' + entry.id })) });
}
