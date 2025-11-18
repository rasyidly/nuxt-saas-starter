export default defineNuxtPlugin({
    name: 'better-auth-fetch-plugin',
    enforce: 'pre',
    async setup(nuxtApp) {
        if (nuxtApp.payload.serverRendered && !nuxtApp.payload.prerenderedAt) {
            try {
                await useAuth().setup()
            } catch (error) {
                console.error('[Auth Plugin] Setup failed:', error)
            }
        }
    }
})
