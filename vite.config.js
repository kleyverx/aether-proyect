import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'about.html'),
                chat: resolve(__dirname, 'ai-chat.html'),
                contact: resolve(__dirname, 'contact.html'),
                login: resolve(__dirname, 'login.html'),
                product: resolve(__dirname, 'product.html'),
                docs: resolve(__dirname, 'docs.html'),
                api: resolve(__dirname, 'api_tester.html'),
            },
        },
    },
});
