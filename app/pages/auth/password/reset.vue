<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
    layout: 'auth',
    auth: {
        only: 'guest',
        redirectGuestTo: '/auth/password/reset'
    }
})

const route = useRoute()
const toast = useToast()
const form = useTemplateRef('form')
const { client, setup } = useAuth()

const fields: AuthFormField[] = [{
    name: 'newPassword',
    type: 'password',
    label: 'New Password',
    required: true
}]

async function onSubmit(payload: FormSubmitEvent<{ newPassword: string }>) {
    const { error } = await client.resetPassword({
        ...payload.data,
        token: route.query.token as string
    })

    toast.add({ title: 'Your password has been reset successfully.' })

    if (error) return handleError(error, form)

    await setup()
    await navigateTo('/')
}

useHead({
    title: 'Forgot Password'
})
</script>

<template>
    <UAuthForm
        ref="form"
        title="Reset Password"
        description="Enter your new password below."
        :fields="fields"
        :submit="{ label: 'Update Password' }"
        loading-auto
        @submit="onSubmit"
    >
        <template #leading>
            <UBadge
                icon="i-lucide-crown"
                variant="soft"
                color="neutral"
                size="xl"
                class="p-4 rounded-xl mb-4"
            />
        </template>
    </UAuthForm>
</template>
