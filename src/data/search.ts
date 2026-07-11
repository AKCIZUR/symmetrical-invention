import { navSections } from './site';

export type SearchEntry = {
  title: string;
  href: string;
  description: string;
  tags: string[];
  group: string;
};

export const searchEntries: SearchEntry[] = [
  { title: 'Úvodní stránka', href: '/', description: 'Hlavní landing page projektu.', tags: ['home', 'landing'], group: 'Start' },
  { title: 'Dokumentace', href: '/docs/', description: 'Přehled dokumentů a sekcí.', tags: ['docs', 'index'], group: 'Start' },
  { title: 'Blog', href: '/blog/', description: 'Seznam článků a release notes.', tags: ['blog', 'index'], group: 'Start' },
  ...navSections.flatMap((section) =>
    section.items.map((item) => ({
      title: item.title,
      href: item.href,
      description: item.description,
      tags: item.tags ?? [],
      group: section.label,
    })),
  ),
];
