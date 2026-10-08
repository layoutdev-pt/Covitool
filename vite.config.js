import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'
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

// Com o Vite 8 (rolldown) o plugin de prerender perde o index.html da raiz: apaga o original
// e o ficheiro novo com o mesmo nome é descartado. Geramos a home com outro nome e
// depois de escrita a build movemo-la para index.html
const HOME_TEMP = 'index.prerender.html';
const moverHomePrerender = () => ({
  name: 'mover-home-prerender',
  apply: 'build',
  writeBundle(options) {
    const temp = path.join(options.dir, HOME_TEMP);
    if (fs.existsSync(temp)) fs.renameSync(temp, path.join(options.dir, 'index.html'));
  },
});

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
      postProcess(renderedRoute) {
        if (renderedRoute.route === '/') renderedRoute.outputPath = HOME_TEMP;
      },
    }),
    moverHomePrerender(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
}))
