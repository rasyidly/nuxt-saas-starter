<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
    layout: 'auth',
    auth: {
        only: 'guest',
        redirectGuestTo: '/auth/signup'
    }
})

const toast = useToast()
const form = useTemplateRef('form')
const { client, setup } = useAuth()

const fields: AuthFormField[] = [{
    name: 'name',
    type: 'text',
    label: 'Full Name',
    required: true
}, {
    name: 'email',
    type: 'text',
    label: 'Email',
    required: true
}, {
    name: 'password',
    label: 'Password',
    type: 'password',
    required: true
}, {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    required: true
}, {
    name: 'acceptTerms',
    label: 'I accept the terms and conditions',
    type: 'checkbox',
    required: true
}]

async function onSubmit(payload: FormSubmitEvent<{ name: string, email: string, password: string, confirmPassword: string, acceptTerms: boolean }>) {
    // Assuming client.signUp.email exists
    const { error } = await client.signUp.email({
        name: payload.data.name,
        email: payload.data.email,
        password: payload.data.password
    })

    if (error) return handleError(error, form)

    toast.add({
        title: 'Account created successfully! Please check your email to verify your account.',
        icon: 'i-lucide-check-circle',
        color: 'success'
    })

    await setup()
    await navigateTo('/')
}

useHead({
    title: 'Sign Up'
})
</script>

<template>
    <UAuthForm
        ref="form"
        title="Sign Up"
        description="Create your account to get started."
        :fields="fields"
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
        <template #footer>
            <div class="text-center text-sm">
                Already have an account?
                <ULink
                    to="/auth/signin"
                    class="text-default"
                >Sign In</ULink>
            </div>
        </template>
    </UAuthForm>
</template>
