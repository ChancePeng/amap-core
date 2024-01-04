import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'core',
    footer: 'power by change',
    logo: '/amap-core/logo.png',
  },
  links: [{ href: '/amap-core/logo.png', rel: 'shortcut icon' }],
  publicPath: '/amap-core/',
  base:'/amap-core',
  cssPublicPath:'/amap-core'
});
