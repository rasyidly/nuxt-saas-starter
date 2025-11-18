<script lang="ts" setup>
import type { ButtonProps } from '@nuxt/ui'

const props = defineProps<{
    icon?: string
    title?: string
    color?: Color
    description?: string
    close?: ButtonProps
    confirm?: ButtonProps
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
                v-bind="props.close"
                :variant="props.close?.variant || 'subtle'"
                :label="props.close?.label || 'Cancel'"
                block
                @click="() => { close(); $emit('cancel') }"
            />
            <UButton
                v-bind="props.confirm"
                block
                :ui="{ label: 'justify-start' }"
                @click="() => { close(); $emit('confirm') }"
            />
        </template>
    </UModal>
</template>
