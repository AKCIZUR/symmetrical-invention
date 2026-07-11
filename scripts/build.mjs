import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.cwd());
const src = path.join(root, "src");
const dist = path.join(root, "dist");
const pages = [
  "index.html",
  "docs/index.html",
  "docs/zacatek.html",
  "docs/design.html",
  "docs/komponenty.html",
  "docs/navigace.html",
  "docs/github-pages.html",
  "docs/troubleshooting.html",
  "docs/markdown.html",
  "404.html"
];

const copyRecursive = (from, to) => {
  const stat = fs.statSync(from);
  if (stat.isDirectory()) {
    fs.mkdirSync(to, { recursive: true });
    for (const entry of fs.readdirSync(from)) {
      if (entry === ".DS_Store") continue;
      copyRecursive(path.join(from, entry), path.join(to, entry));
    }
  } else {
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.copyFileSync(from, to);
  }
};

fs.rmSync(dist, { recursive: true, force: true });
copyRecursive(src, dist);
fs.writeFileSync(path.join(dist, ".nojekyll"), "");

const baseUrl = process.env.SITE_URL || "";
if (baseUrl) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(p => `  <url><loc>${baseUrl.replace(/\/$/, "")}/${p}</loc></url>`).join("\n")}\n</urlset>\n`;
  fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);
}

const robots = `User-agent: *\nAllow: /\nSitemap: /sitemap.xml\n`;
fs.writeFileSync(path.join(dist, "robots.txt"), robots);

const manifest = {
  name: "NoirGlass Docs",
  short_name: "NoirGlass",
  start_url: "/index.html",
  display: "standalone",
  background_color: "#050505",
  theme_color: "#050505",
  icons: []
};
fs.writeFileSync(path.join(dist, "manifest.webmanifest"), JSON.stringify(manifest, null, 2));
