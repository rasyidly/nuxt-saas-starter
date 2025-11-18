<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
    layout: 'auth',
    auth: {
        only: 'guest',
        redirectGuestTo: '/auth/password/forgot'
    }
})

const runtimeConfig = useRuntimeConfig()
const toast = useToast()
const form = useTemplateRef('form')
const { client, setup } = useAuth()

const fields: AuthFormField[] = [{
    name: 'email',
    type: 'text',
    label: 'Email',
    required: true
}]

async function onSubmit(payload: FormSubmitEvent<{ email: string }>) {
    const { error } = await client.requestPasswordReset({
        ...payload.data,
        redirectTo: runtimeConfig.public.appUrl + '/auth/password/reset'
    })

    toast.add({ title: 'If an account with that email exists, a password reset link has been sent.' })

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
        title="Forgot Password"
        description="Enter your email to reset your password."
        :fields="fields"
        :submit="{ label: 'Send password reset link' }"
        loading-auto
        @submit="onSubmit"
    >
        <template #leading>
            <UBadge
                icon="i-custom-brand"
                variant="soft"
                color="neutral"
                size="xl"
                class="p-4 rounded-xl mb-4"
            />
        </template>
        <template #footer>
            <div class="text-center text-sm">
                <ULink
                    to="/auth/signin"
                    class="text-default"
                >Back to sign in</ULink>
            </div>
        </template>
    </UAuthForm>
</template>
