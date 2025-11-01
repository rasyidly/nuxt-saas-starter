<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'

const { client, auth, organization, signOut, setup } = useAuth()
const toast = useToast()
const leaveForm = useTemplateRef('leaveForm')
const deleteForm = useTemplateRef('deleteForm')

const leaveState = reactive({
    confirmText: undefined
})

const deleteState = reactive({
    password: undefined
})

async function onLeaveOrganization(event: FormSubmitEvent<typeof leaveState>) {
    if (event.data.confirmText !== organization.value?.name) {
        toast.add({
            title: 'Organization name does not match',
            icon: 'i-lucide-alert-circle',
            color: 'error'
        })
        return
    }

    const { error } = await client.organization.leave({
        organizationId: organization.value?.id || ''
    })

    if (error) return handleError(error, leaveForm)

    toast.add({
        description: 'Left organization successfully! You have been removed from the organization.',
        icon: 'i-lucide-check',
        color: 'success'
    })

    // Refresh organization state
    await setup()
}

async function onDeleteAccount(event: FormSubmitEvent<typeof deleteState>) {
    try {
        const { error } = await client.deleteUser({
            password: event.data.password
        })

        if (error) throw error

        toast.add({
            title: 'Your account has been permanently deleted.',
            icon: 'i-lucide-check',
            color: 'success'
        })

        // Sign out after deletion
        await signOut()
    } catch (error) {
        handleError(error, deleteForm)
    }
}
</script>

<template>
    <div class="space-y-4">
        <!-- Leave Organization -->
        <UPageCard
            v-if="organization"
            title="Leave Organization"
            description="Remove yourself from this organization. You will lose access to all organization resources."
            color="error"
            orientation="horizontal"
            variant="naked"
            :ui="{ title: 'text-sm', description: 'text-sm' }"
        >
            <UModal title="Leave Organization">
                <UButton
                    color="error"
                    label="Leave Organization"
                    variant="soft"
                    class="w-fit lg:ms-auto"
                />
                <template #description />
                <template #body>
                    <div class="space-y-4">
                        <p class="text-sm text-muted">
                            This action cannot be undone. This will remove you from the organization
                            <strong>{{ organization?.name }}</strong> and you will lose access to all associated data.
                        </p>

                        <UForm
                            ref="leaveForm"
                            loading-auto
                            :state="leaveState"
                            class="space-y-4"
                            @submit="onLeaveOrganization"
                        >
                            <UFormField
                                name="confirmText"
                                required
                            >
                                <template #label>
                                    Type <strong>{{ organization?.name }}</strong> to confirm
                                </template>
                                <UInput
                                    v-model="leaveState.confirmText"
                                    placeholder="Enter organization name"
                                    required
                                />
                            </UFormField>
                            <UButton
                                type="submit"
                                color="error"
                                variant="soft"
                                icon="i-lucide-log-out"
                                label="Leave Organization"
                            />
                        </UForm>
                    </div>
                </template>
            </UModal>
        </UPageCard>

        <!-- Delete Account -->
        <UPageCard
            title="Delete Account"
            description="Permanently delete your account and all associated data."
            color="error"
            orientation="horizontal"
            variant="naked"
            :ui="{ title: 'text-sm', description: 'text-sm' }"
        >
            <UModal title="Delete Account">
                <UButton
                    color="error"
                    label="Delete Account"
                    variant="soft"
                    class="w-fit lg:ms-auto"
                />
                <template #description />
                <template #body>
                    <div class="space-y-4">
                        <p class="text-sm text-muted">
                            This action cannot be undone. This will permanently delete your account
                            <strong>{{ auth?.user?.email }}</strong> and all associated data.
                        </p>

                        <UForm
                            ref="deleteForm"
                            loading-auto
                            :state="deleteState"
                            class="space-y-4"
                            @submit="onDeleteAccount"
                        >
                            <UFormField
                                name="password"
                                required
                            >
                                <template #label>
                                    Enter your password to confirm
                                </template>
                                <UInput
                                    v-model="deleteState.password"
                                    type="password"
                                    placeholder="Enter your current password"
                                    required
                                />
                            </UFormField>
                            <UButton
                                type="submit"
                                color="error"
                                variant="soft"
                                icon="i-lucide-trash"
                                label="Delete Account"
                            />
                        </UForm>
                    </div>
                </template>
            </UModal>
        </UPageCard>
    </div>
</template>
