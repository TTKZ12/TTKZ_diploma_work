import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const proxy = { '/api': { target: process.env.API_PROXY_TARGET || 'http://localhost:8000', changeOrigin: true } };
export default defineConfig({ plugins: [react()], server: { proxy }, preview: { proxy } });
