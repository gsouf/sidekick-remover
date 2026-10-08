import { readdir, rm } from 'node:fs/promises'
import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    {
      name: 'clean-extension-output',
      apply: 'build',
      async buildStart() {
        const outDir = resolve(import.meta.dirname, 'extension')
        const entries = await readdir(outDir)
        await Promise.all(entries.filter(entry => !['manifest.json', 'icons'].includes(entry)).map(entry =>
          rm(resolve(outDir, entry), { recursive: true, force: true }),
        ))
      },
    },
  ],
  root: 'src',
  base: './',
  publicDir: false,
  build: {
    outDir: '../extension',
    emptyOutDir: false,
    target: 'es2022',
    modulePreload: false,
    rolldownOptions: {
      input: {
        popup: resolve(import.meta.dirname, 'src/popup.html'),
        content: resolve(import.meta.dirname, 'src/content.ts'),
      },
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
})
