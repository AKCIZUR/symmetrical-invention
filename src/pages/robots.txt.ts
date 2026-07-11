export async function GET({ site }: { site: URL | undefined }) {
  const base = site ?? new URL('http://localhost:4321');
  const body = `User-agent: *
Allow: /

Sitemap: ${new URL('/sitemap.xml', base).toString()}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}