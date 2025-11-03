import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { imagetools } from 'vite-imagetools';
export default defineConfig({
    plugins: [react(), imagetools()],
    appType: 'spa',
    server: {
        host: 'localhost',
        port: 5173,
        strictPort: true
    },
    build: {
        target: 'es2020'
    }
});
