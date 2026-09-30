import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: /(?:src\/.*\.[jt]sx?|Exercise xp\.JS|Exercise xp gold\.js|Exercise xp gold 2\/React and forms\.js|Exercise xp ninja\.js|Daily challenge\/Voting app\.js)$/,
    exclude: []
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx', '.JS': 'jsx' }
    }
  }
});