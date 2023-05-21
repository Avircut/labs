import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

export default defineConfig({
  base:'/labs/',
  build: {
    outDir: 'dist',

    rollupOptions: {
      build: {
        rollupOptions: {
          input: {
            accordion: fileURLToPath(
             new URL('index.html', import.meta.url) // typo here: componentes
            ),
          },
        },
      },
     input: {
       accordion: fileURLToPath(
          new URL('index.html', import.meta.url),
        ),
      },
    },
  },
});