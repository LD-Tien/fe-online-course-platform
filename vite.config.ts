import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import tailwindcss from 'tailwindcss'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        port: 8080
        // hmr: false,
    },
    build: {
        assetsDir: 'static/assets',
        chunkSizeWarningLimit: 1600
    },
    css: {
        postcss: {
            plugins: [tailwindcss]
        }
    },
    plugins: [
        vue(),
        svgLoader(),
        AutoImport({
            imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/core', 'vuex', 'vee-validate'],
            resolvers: [ElementPlusResolver()]
        }),
        Components({
            resolvers: [ElementPlusResolver()]
        })
    ]
})
