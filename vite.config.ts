import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

// Generates a copy of index.html for each client-side route so FastTrack
// (and any static host) can serve them on direct navigation without a 404.
// Also writes 404.html as a catch-all fallback for unknown paths.
function staticRoutesFallback() {
  return {
    name: 'static-routes-fallback',
    apply: 'build' as const,
    closeBundle() {
      const html = fs.readFileSync('dist/index.html', 'utf-8')
      const routes = ['style-guide', 'cartas-a-beele']
      for (const route of routes) {
        fs.mkdirSync(`dist/${route}`, { recursive: true })
        fs.writeFileSync(`dist/${route}/index.html`, html)
      }
      fs.writeFileSync('dist/404.html', html)
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    staticRoutesFallback(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
