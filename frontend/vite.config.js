import { defineConfig } from 'vite';
import inject from '@rollup/plugin-inject';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    inject({
      Buffer: ['buffer', 'Buffer']
    })
  ],
  resolve: {
    alias: {
      buffer: 'buffer'
    }
  }
});
