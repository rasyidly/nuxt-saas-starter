import {
    defineNuxtModule,
    createResolver,
    addImports,
    addImportsDir,
    addComponentsDir
} from '@nuxt/kit'

export default defineNuxtModule<object>({
    meta: {
        name: 'helper'
    },
    async setup() {
        const { resolve } = createResolver(import.meta.url)

        addImportsDir(resolve('runtime/utils'))

        addImports([
            { name: 'useConfirmation', from: resolve('./runtime/composables/useConfirmation') }
        ])

        addComponentsDir({
            path: resolve('runtime/components')
        })
    }
})
