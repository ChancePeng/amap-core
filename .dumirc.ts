import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'core',
    footer: 'power by change',
    logo: '/logo.png',
  },
  links: [{ href: '/logo.png', rel: 'shortcut icon' }],
});
