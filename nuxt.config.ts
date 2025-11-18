import vue from '@vitejs/plugin-vue'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxt/eslint',
        '@nuxt/ui',
        '@vueuse/nuxt',
        // (process.env.NODE_ENV === 'production' ? 'nuxt-api-shield' : null)
        'nuxt-file-storage',
        '@nuxtjs/mdc'
    ],

    imports: {
        dirs: ['~~/shared/types']
    },

    devtools: {
        enabled: true
    },

    app: {
        layoutTransition: { name: 'fade', mode: 'out-in' },
        pageTransition: { name: 'fade', mode: 'out-in' }
    },

    css: ['~/assets/css/main.css'],

    runtimeConfig: {
        public: {
            appUrl: process.env.NUXT_SITE_URL || 'http://localhost:3000',
            appName: process.env.NUXT_SITE_NAME || 'Nuxt Application'
        },
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || undefined,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || undefined
        },
        facebook: {
            clientId: process.env.FACEBOOK_CLIENT_ID || undefined,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET || undefined
        },
        openaiApiKey: process.env.NUXT_OPENAI_API_KEY || undefined
    },

    compatibilityDate: '2025-01-15',

    nitro: {
        experimental: {
            tasks: true
        },
        rollupConfig: {
            plugins: [vue()]
        }
    },

    eslint: {
        config: {
            stylistic: {
                indent: 4,
                commaDangle: 'never',
                braceStyle: '1tbs'
            }
        }
    },

    fileStorage: {
        mount: './public/storage'
    },

    icon: {
        customCollections: [{
            prefix: 'custom',
            dir: './app/assets/icons'
        }]
    }
})
