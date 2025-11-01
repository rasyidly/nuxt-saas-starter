<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig()

useHead({
    bodyAttrs: {
        class: 'bg-muted dark:bg-default/98'
    }
})
</script>

<template>
    <UMain>
        <ClientOnly>
            <UColorModeButton class="absolute top-4 end-4" />
        </ClientOnly>
        <UContainer class="h-screen grid place-items-center">
            <UPageCard class="w-full max-w-md">
                <slot />
            </UPageCard>
            <div class="absolute bottom-4 text-xs text-muted">
                <span>{{ runtimeConfig.public.appName }} &copy; 2025</span>
            </div>
        </UContainer>
    </UMain>
</template>
