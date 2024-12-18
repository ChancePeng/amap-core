import { defineConfig } from 'father';

export default defineConfig({
  // more father config: https://github.com/umijs/father/blob/master/docs/config.md
  cjs: {
    output: 'lib',
    alias: {
      '@/*': './src/*',
    },
    sourcemap: true,
  },
  umd: {
    entry: './src/index',
    output: 'dist',
    name: 'MapStore',
  }
});
