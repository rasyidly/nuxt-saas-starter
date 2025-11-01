<script lang="ts" setup>
const props = defineProps<{
    icon?: string
    title?: string
    color?: Color
    description?: string
    confirm?: {
        text?: string
        color?: Color
        icon?: string
    }
}>()

const _emit = defineEmits<{
    confirm: []
    cancel: []
}>()
</script>

<template>
    <UModal title="Please Confirm">
        <template #description />
        <template #body>
            <UPageCard
                :title="props.title || `Are you sure?`"
                :description="props.description || `This action cannot be undone.`"
                class="text-center py-2"
                variant="naked"
                :ui="{ body: 'w-full', leading: 'mx-auto' }"
            >
                <template #leading>
                    <UBadge
                        :icon="props.icon || 'i-lucide-alert-triangle'"
                        :color="props.color || 'neutral'"
                        variant="soft"
                        size="xl"
                        class="p-3"
                    />
                </template>
            </UPageCard>
        </template>
        <template #footer="{ close }">
            <UButton
                label="Cancel"
                variant="outline"
                block
                @click="() => { close(); $emit('cancel') }"
            />
            <UButton
                :icon="props.confirm?.icon || undefined"
                :label="props.confirm?.text || 'Confirm'"
                :color="props.confirm?.color || props.color || 'neutral'"
                block
                @click="() => { close(); $emit('confirm') }"
            />
        </template>
    </UModal>
</template>
