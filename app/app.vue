<script setup>
useHead({
    meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
        { rel: 'icon', href: '/favicon.ico' }
    ],
    htmlAttrs: {
        lang: 'id'
    }
})

const config = useRuntimeConfig()

const title = `${config.public.appName} - Your SaaS Solution`
const description = 'The best SaaS starter template for Nuxt.js, built to kickstart your next project with ease and efficiency.'

useHead({
    titleTemplate: `%s - ${config.public.appName}`
})

useSeoMeta({
    title,
    description,
    ogImage: '/og-image.png',
    twitterImage: '/og-image.png',
    ogTitle: title,
    ogDescription: description
})
</script>

<template>
    <UApp
        :toaster="{ progress: false }"
        :tooltip="{ delayDuration: 0 }"
    >
        <NuxtLoadingIndicator />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </UApp>
</template>
