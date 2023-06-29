import presetIcons from '@unocss/preset-icons'
import { resolve } from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    srcDir: 'src',
    ssr: true,

    modules: ['@vueuse/nuxt', '@nuxtjs/tailwindcss', '@pinia/nuxt', '@unocss/nuxt'],

    postcss: {
        plugins: {
            'postcss-import': {},
            'tailwindcss/nesting': {},
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    unocss: {
        uno: false,
        preflight: false,
        icons: true,
        presets: [
            presetIcons({
                scale: 1.2,
                extraProperties: {
                    display: 'inline-block',
                },
            }),
        ],
    },

    runtimeConfig: {
        BASE_URL: 'http://www.omdbapi.com',
        // Api key should be hidden in .env file. This is just for demo purposes.
        API_KEY: '7642bb42',
    },

    css: ['@/assets/css/main.pcss', '@/assets/css/tailwind.css'],

    vueuse: {
        ssrHandlers: true,
    },

    sourcemap: {
        server: true,
        client: true,
    },

    devtools: { enabled: true },

    vite: {
        build: {
            sourcemap: true,
        },
        clearScreen: true,
        logLevel: 'info',
    },
})
