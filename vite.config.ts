import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
      sourcemap: false,
    },
    plugins: [react()],
    publicDir: './public', // keep static file when build
    // base: '.',
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'), // Alias for the 'src' folder
      },
    },
    server: {
      watch: {
        ignored: ['**/node_modules/**', '**/.git/**'],
      },
    },
    hmr: {
      overlay: false, // tránh block UI
    },
  };
});
