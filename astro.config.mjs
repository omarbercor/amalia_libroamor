import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://unosiemprecambia.com',
  compressHTML: true,
  vite: {
    server: {
      proxy: {
        '/api-cms': {
          target: 'https://cms.unosiemprecambia.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api-cms/, '')
        }
      }
    }
  }
});
