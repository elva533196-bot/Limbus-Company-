import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import { viteSingleFile } from "vite-plugin-singlefile"

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  const isProd = process.env.NODE_ENV === 'production';
  // Use './' base for both local double-click and simple web hosting.
  const base = isProd ? './' : '/';

  return {
    base,
    plugins: [
      react(), 
      tailwindcss(),
      // Enable single file build for "double-click" functionality.
      isProd && viteSingleFile(),
    ].filter(Boolean),
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
