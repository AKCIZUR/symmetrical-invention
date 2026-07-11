import { getCollection } from 'astro:content';

export async function GET({ site }: { site: URL | undefined }) {
  const base = site ?? new URL('http://localhost:4321');
  const docs = await getCollection('docs');
  const posts = await getCollection('blog');

  const urls = ['/', '/docs/', '/blog/', ...docs.map((doc) => `/docs/${doc.slug}/`), ...posts.map((post) => `/blog/${post.slug}/`)];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.map((path) => `<url><loc>${new URL(path, base).toString()}</loc></url>`).join('')}
  </urlset>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}