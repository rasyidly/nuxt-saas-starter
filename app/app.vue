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

const title = 'CekStatus - Track your service in seconds'
const description = 'Quickly check the status of any service order using its order number — repairs, salon visits, appliance fixes, and more.'

useHead({
    titleTemplate: '%s - CekStatus'
})

useSeoMeta({
    title,
    description,
    ogImage: '/og-image.jpg',
    twitterImage: '/og-image.jpg',
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
