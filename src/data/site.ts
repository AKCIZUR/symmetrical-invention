export const site = {
  name: 'NoirDocs',
  description: 'Shadcn-inspired dokumentační web s liquid glass vzhledem, dark B&W stylem a animovanými přechody.',
  accent: 'zinc',
};

export type NavItem = {
  title: string;
  href: string;
  description: string;
  tags?: string[];
};

export type NavSection = {
  label: string;
  items: NavItem[];
};

export const navSections: NavSection[] = [
  {
    label: 'Začínáme',
    items: [
      { title: 'Úvod', href: '/docs/getting-started/uvod/', description: 'Co projekt umí, jak je postavený a jak začít.', tags: ['start', 'overview'] },
      { title: 'Instalace', href: '/docs/getting-started/instalace/', description: 'Nastavení lokálního prostředí a GitHub Pages.', tags: ['install', 'setup'] },
      { title: 'Struktura projektu', href: '/docs/getting-started/struktura-projektu/', description: 'Jak jsou rozdělené složky a soubory.', tags: ['structure', 'folders'] },
    ],
  },
  {
    label: 'Průvodce',
    items: [
      { title: 'Navigace a megamenu', href: '/docs/guide/navigace-a-megamenu/', description: 'Navbar, megamenu, breadcrumbs a sticky layout.', tags: ['nav', 'menu'] },
      { title: 'Liquid glass', href: '/docs/guide/liquid-glass/', description: 'Skleněný monochromní styl, vrstvy a efekty.', tags: ['glass', 'style'] },
      { title: 'Přechody stránek', href: '/docs/guide/prechody-stranek/', description: 'Animace mezi stránkami přes Astro client router.', tags: ['transitions', 'motion'] },
      { title: 'Vyhledávání', href: '/docs/guide/vyhledavani/', description: 'Vestavěná client-side search paleta.', tags: ['search', 'palette'] },
    ],
  },
  {
    label: 'Customizace',
    items: [
      { title: 'Téma a proměnné', href: '/docs/customization/tema-a-promenne/', description: 'Barvy, radius, stíny a typografie.', tags: ['theme', 'tokens'] },
      { title: 'Code bloky', href: '/docs/customization/code-bloky/', description: 'Minimalistické bloky s barevnou hranou podle jazyka.', tags: ['code', 'syntax'] },
      { title: 'Obsah a editace', href: '/docs/customization/obsah-a-editace/', description: 'Jak přidávat nové Markdown stránky a blog.', tags: ['markdown', 'content'] },
    ],
  },
  {
    label: 'Provoz',
    items: [
      { title: 'GitHub Pages', href: '/docs/deployment/github-pages/', description: 'Deploy, workflow a base path.', tags: ['deploy', 'pages'] },
      { title: 'Troubleshooting', href: '/docs/troubleshooting/caste-chyby/', description: 'Nejčastější chyby a jak je opravit.', tags: ['debug', 'faq'] },
      { title: 'Design systém', href: '/docs/reference/design-system/', description: 'Tokeny, komponenty a pravidla UI.', tags: ['design', 'system'] },
    ],
  },
];

export const quickLinks = [
  { title: 'Dokumentace', href: '/docs/' },
  { title: 'Blog', href: '/blog/' },
  { title: 'GitHub Pages', href: '/docs/deployment/github-pages/' },
  { title: 'Customizace', href: '/docs/customization/tema-a-promenne/' },
];