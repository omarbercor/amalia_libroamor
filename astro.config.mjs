import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://amalia10anos.com',
  compressHTML: true,
  vite: {
    server: {
      proxy: {
        '/api-cms': {
          target: 'https://cmsamalia.stagings.website',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api-cms/, '')
        }
      }
    }
  }
});
