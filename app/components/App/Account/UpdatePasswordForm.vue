<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'

const { client } = useAuth()
const toast = useToast()
const form = useTemplateRef('form')

const state = reactive({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
})

async function onSubmit(payload: FormSubmitEvent<typeof state>) {
    try {
        // Validate password confirmation
        if (payload.data.newPassword !== payload.data.confirmPassword) {
            throw createError({
                statusCode: 400,
                statusMessage: 'New passwords do not match'
            })
        }

        const { error } = await client.changePassword({
            currentPassword: payload.data.currentPassword,
            newPassword: payload.data.newPassword
        })

        if (error) return handleError(error, form)

        toast.add({
            title: 'Password changed successfully',
            icon: 'i-lucide-check',
            color: 'success'
        })

        // Reset form
        state.currentPassword = ''
        state.newPassword = ''
        state.confirmPassword = ''
    } catch (error) {
        handleError(error, form)
    }
}
</script>

<template>
    <UForm
        ref="form"
        :state="state"
        class="space-y-4"
        loading-auto
        @submit="onSubmit"
    >
        <UFormField
            label="Current Password"
            name="currentPassword"
            required
        >
            <UInput
                v-model="state.currentPassword"
                type="password"
                placeholder="Enter your current password"
                required
            />
        </UFormField>

        <UFormField
            label="New Password"
            name="newPassword"
            required
        >
            <UInput
                v-model="state.newPassword"
                type="password"
                placeholder="Enter your new password"
                required
            />
        </UFormField>

        <UFormField
            label="Confirm New Password"
            name="confirmPassword"
            required
        >
            <UInput
                v-model="state.confirmPassword"
                type="password"
                placeholder="Confirm your new password"
                required
            />
        </UFormField>

        <UButton
            type="submit"
            label="Change Password"
        />
    </UForm>
</template>
