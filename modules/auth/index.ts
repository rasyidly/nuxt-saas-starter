import {
    defineNuxtModule,
    createResolver,
    addImports,
    addServerHandler,
    addServerImportsDir,
    addRouteMiddleware,
    addPlugin
} from '@nuxt/kit'

export default defineNuxtModule({
    meta: {
        name: 'auth'
    },
    async setup(_options, nuxt) {
        const { resolve } = createResolver(import.meta.url)

        nuxt.options.alias['#auth'] = resolve('./runtime/server/utils/auth')

        // Server
        addServerHandler({
            handler: resolve('./runtime/server/api/auth/[...all]'),
            route: '/api/auth/**'
        })
        addServerImportsDir(resolve('./runtime/server/utils'))

        // App
        addImports([
            { name: 'useAuth', from: resolve('./runtime/composables/useAuth') }
        ])

        addPlugin(resolve('./runtime/plugins/auth.client'))
        addPlugin(resolve('./runtime/plugins/auth.server'))

        addRouteMiddleware({
            name: 'auth',
            global: true,
            path: resolve('./runtime/middleware/auth.global')
        })
    }
})
