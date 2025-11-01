<script lang="ts" setup>
const props = withDefaults(defineProps<{
    title?: string
    description?: string
    icon?: string
    class?: string
}>(), {
    title: 'No data available',
    description: 'The data you are looking for could not be found here.',
    icon: 'i-lucide-search-x',
    class: 'py-12'
})
</script>

<template>
    <UEmpty
        :title="props.title"
        :description="props.description"
        variant="naked"
        :ui="{ body: 'w-full text-center' }"
        :class="props.class"
    >
        <template
            v-if="!!props.icon"
            #leading
        >
            <UBadge
                variant="soft"
                color="neutral"
                :icon="props.icon"
                size="xl"
                class="p-3"
            />
        </template>
        <div v-if="$slots.default">
            <slot />
        </div>
    </UEmpty>
</template>
