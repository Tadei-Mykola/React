import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
    "@components": path.resolve(__dirname, 'src/components/index.js'),
    "@services": path.resolve(__dirname, 'src/services/index.js'),
    "@hooks": path.resolve(__dirname, 'src/hooks/index.js'),
    "@UI": path.resolve(__dirname, 'src/UI/index.js'),
    "@assets": path.resolve(__dirname, 'src/assets'),
    "@schemas": path.resolve(__dirname, "src/schemas/index.js")
    }
  }
})
