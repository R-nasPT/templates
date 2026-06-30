import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/react/') || id.includes('/node_modules/react-dom/') || id.includes('/node_modules/react-router/') || id.includes('/node_modules/axios/')) return 'vendor';
          if (id.includes('cmdk') || id.includes('class-variance-authority') || id.includes('clsx') || id.includes('tailwind-merge')) return 'ui';
          if (id.includes('zustand')) return 'store';
          if (id.includes('keycloak-js')) return 'auth';
          if (id.includes('shadcn')) return 'shadcn';
          if (id.includes('@base-ui/react')) return 'base-ui';
          if (id.includes('@tanstack/react-query')) return 'query';
          if (id.includes('lucide-react')) return 'icons';
          if (id.includes('sonner')) return 'sonner';
        },
      },
    },
  },
})
