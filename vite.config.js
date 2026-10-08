import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import prerender from '@prerenderer/rollup-plugin'
import PuppeteerRenderer from '@prerenderer/renderer-puppeteer'

// No Vercel o Chrome do Puppeteer não arranca (falta de bibliotecas do sistema),
// por isso usamos o Chromium do @sparticuz/chromium, preparado para estes servidores Linux
const getLaunchOptions = async () => {
  if (!process.env.VERCEL) return undefined;
  const { default: chromium } = await import('@sparticuz/chromium');
  return {
    executablePath: await chromium.executablePath(),
    args: chromium.args,
    headless: true,
  };
};

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    react(),
    tailwindcss(),
    prerender({
      // Rotas estáticas que gerarão ficheiros index.html físicos na pasta dist
      routes: ['/', '/marcas', '/sobre-nos', '/folhetos'],
      renderer: new PuppeteerRenderer({
        // O Puppeteer aguardará este evento customizado para capturar a página, garantindo precisão absoluta
        renderAfterDocumentEvent: 'prerender-trigger',
        launchOptions: await getLaunchOptions(),
      }),
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
}))
