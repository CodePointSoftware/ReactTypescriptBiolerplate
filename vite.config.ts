import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';


export default defineConfig({
    plugins: [
        react(),
        createHtmlPlugin({
            entry: 'src/index.tsx',
            template: '/index.html',
            inject: {
            data: {
                title: 'index',
                injectScript: `<script src="./inject.js"></script>`,
            },
            }
        }),
    ],
});
