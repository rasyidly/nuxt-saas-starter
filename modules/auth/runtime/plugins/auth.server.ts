export default defineNuxtPlugin({
    name: 'better-auth-fetch-plugin',
    enforce: 'pre',
    async setup(nuxtApp) {
        // Flag if request is cached
        nuxtApp.payload.isCached = Boolean(useRequestEvent()?.context.cache)
        if (nuxtApp.payload.serverRendered && !nuxtApp.payload.prerenderedAt && !nuxtApp.payload.isCached) {
            try {
                await useAuth().setup()
            } catch (error) {
                console.error('[Auth Plugin] Setup failed:', error)
            }
        }
    }
})
