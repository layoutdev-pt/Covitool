import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import prerender from '@prerenderer/rollup-plugin'
import PuppeteerRenderer from '@prerenderer/renderer-puppeteer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    prerender({
      // Rotas estáticas que gerarão ficheiros index.html físicos na pasta dist
      routes: ['/', '/marcas', '/sobre-nos', '/folhetos'],
      renderer: new PuppeteerRenderer({
        // O Puppeteer aguardará este evento customizado para capturar a página, garantindo precisão absoluta
        renderAfterDocumentEvent: 'prerender-trigger',
      }),
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})