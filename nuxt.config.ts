// https://nuxt.com/docs/api/configuration/nuxt-config
import * as process from "node:process";

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    modules: ['@nuxtjs/turnstile', '@nuxt/ui', '@nuxtjs/color-mode'],
    css: ['~/assets/css/main.css'],
    // turnstile: {
    //   addValidateEndpoint: true,
    // },
    colorMode: {
        preference: 'light',
        fallback: 'light',
    },

    ssr: false,
    hooks: {
        'pages:extend'(pages) {
            pages.push({
                name: 'first',
                path: process.env.NUXT_FIRST_ROUTE + ':catchAll(.*)',
                file: '~/pages/first.vue',
            })
            pages.push({
                name: 'second',
                path: process.env.NUXT_SECOND_ROUTE + ':catchAll(.*)',
                file: '~/pages/second.vue',
            })
        }
    },
    app: {
        head: {
            link: [
                {
                    rel: 'icon',
                    href: 'https://cdn.prod.website-files.com/67d160f23e7ffa1df49339fc/67f62fdc8bce8a031df5c552_favicon.png',
                    type: 'image/x-icon'
                }
            ]
        }
    }
})