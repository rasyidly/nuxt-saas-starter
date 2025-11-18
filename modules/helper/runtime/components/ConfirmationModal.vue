<script lang="ts" setup>
import type { ButtonProps, ModalProps } from '@nuxt/ui'

const props = defineProps<{
    modal?: ModalProps
    icon?: string
    title?: string
    color?: Color
    description?: string
    cancel?: ButtonProps
    confirm?: ButtonProps
}>()
</script>

<template>
    <UModal v-bind="props.modal">
        <template #description />
        <template #body>
            <slot>
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
            </slot>
        </template>
        <template #footer="{ close }">
            <UButton
                v-bind="props.cancel"
                block
                @click.self="() => { close(); }"
            />
            <UButton
                v-bind="props.confirm"
                block
                :ui="{ label: 'justify-start' }"
                @click.self="() => { close(); }"
            />
        </template>
    </UModal>
</template>
