import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const repo = process.env.GITHUB_REPOSITORY?.split('/')?.[1];
const owner = process.env.GITHUB_REPOSITORY?.split('/')?.[0];
const isUserPages = repo?.endsWith('.github.io');
const isGitHubActions = Boolean(process.env.GITHUB_ACTIONS);
const base = isGitHubActions && repo && !isUserPages ? `/${repo}` : '/';
const site =
  process.env.SITE_URL ||
  (isGitHubActions && owner && repo
    ? `https://${owner}.github.io/${isUserPages ? '' : repo}`.replace(/\/$/, '')
    : 'http://localhost:4321');

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-dark-dimmed',
    },
  },
});