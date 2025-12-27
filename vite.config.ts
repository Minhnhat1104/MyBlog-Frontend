import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    plugins: [react()],
    publicDir: './public', // keep static file when build
    // base: '.',
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'), // Alias for the 'src' folder
      },
    },
  };
});
