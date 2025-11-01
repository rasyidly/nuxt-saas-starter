import {
    defineNuxtModule,
    createResolver,
    addServerImportsDir
} from '@nuxt/kit'

export default defineNuxtModule<object>({
    meta: {
        name: 'email'
    },
    async setup() {
        const { resolve } = createResolver(import.meta.url)

        // Server utils - make sendEmail available globally
        addServerImportsDir(resolve('./runtime/server/utils'))
    }
})
