import { defineConfig, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' }
    }
  },
  plugins: [
    {
      name: 'jsx-in-js-files',
      enforce: 'pre',
      transform(code, id) {
        if (!id.includes('/node_modules/') && id.endsWith('.js')) {
          return transformWithEsbuild(code, id, { loader: 'jsx' });
        }
        return null;
      }
    },
    react()
  ]
});