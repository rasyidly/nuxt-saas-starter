<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'

const { client, organization } = useAuth()
const toast = useToast()
const form = useTemplateRef('form')

const state = reactive({
    confirmText: undefined
})

async function onDelete(event: FormSubmitEvent<typeof state>) {
    if (event.data.confirmText !== organization.value?.slug) {
        toast.add({
            title: 'Organization username does not match',
            icon: 'i-lucide-alert-circle',
            color: 'error'
        })
        return
    }

    const { error } = await client.organization.delete({
        organizationId: organization.value?.id || ''
    })

    if (error) return handleError(error, form)

    toast.add({
        title: 'Organization deleted successfully',
        icon: 'i-lucide-check',
        color: 'success'
    })

    await navigateTo('/auth/organization/create')
}
</script>

<template>
    <div class="space-y-6">
        <UPageCard
            title="Transfer Ownership"
            description="Transfer ownership of this organization to another user. Coming soon!"
            color="primary"
            orientation="horizontal"
            variant="naked"
            :ui="{ title: 'text-sm', description: 'text-sm' }"
        >
            <UButton
                label="Transfer Ownership"
                variant="soft"
                icon="i-lucide-arrow-left-right"
                disabled
                class="w-fit lg:ms-auto"
            />
        </UPageCard>
        <UPageCard
            title="Delete Organization"
            description="Permanently delete your organization and all associated data."
            color="error"
            orientation="horizontal"
            variant="naked"
            :ui="{ title: 'text-sm', description: 'text-sm' }"
        >
            <UModal title="Delete Organization">
                <UButton
                    color="error"
                    label="Delete Organization"
                    variant="soft"
                    class="w-fit lg:ms-auto"
                />
                <template #description />
                <template #body>
                    <div class="space-y-4">
                        <p class="text-sm text-muted">
                            This action cannot be undone. This will permanently delete the organization
                            <strong>{{ organization?.name }}</strong> and all associated data.
                        </p>

                        <UForm
                            ref="form"
                            loading-auto
                            :state="state"
                            class="space-y-4"
                            @submit="onDelete"
                        >
                            <UFormField
                                name="confirmText"
                                required
                            >
                                <template #label>
                                    Type <strong>{{ organization?.slug }}</strong> to confirm
                                </template>
                                <UInput
                                    v-model="state.confirmText"
                                    placeholder="Enter organization username"
                                    required
                                />
                            </UFormField>
                            <UButton
                                type="submit"
                                color="error"
                                variant="soft"
                                icon="i-lucide-trash"
                                label="Delete Organization"
                            />
                        </UForm>
                    </div>
                </template>
            </UModal>
        </UPageCard>
    </div>
</template>
