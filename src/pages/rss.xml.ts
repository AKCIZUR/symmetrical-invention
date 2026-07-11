import { getCollection } from 'astro:content';

export async function GET({ site }: { site: URL | undefined }) {
  const posts = (await getCollection('blog')).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  const base = site ?? new URL('http://localhost:4321');

  const items = posts.map((post) => `
    <item>
      <title><![CDATA[${post.data.title}]]></title>
      <link>${new URL(`/blog/${post.slug}/`, base).toString()}</link>
      <guid>${new URL(`/blog/${post.slug}/`, base).toString()}</guid>
      <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
      <description><![CDATA[${post.data.description}]]></description>
    </item>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>NoirDocs Blog</title>
      <link>${new URL('/blog/', base).toString()}</link>
      <description>Blog pro NoirDocs</description>
      ${items}
    </channel>
  </rss>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}