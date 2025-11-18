<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
    layout: 'auth',
    auth: {
        only: 'guest'
    }
})

const form = useTemplateRef('form')
const { client, setup } = useAuth()

const fields: AuthFormField[] = [{
    name: 'email',
    type: 'text',
    label: 'Email',
    required: true
}, {
    name: 'password',
    label: 'Password',
    type: 'password'
}, {
    name: 'remember',
    label: 'Remember session',
    type: 'checkbox'
}]

async function onSubmit(payload: FormSubmitEvent<{ email: string, password: string }>) {
    const { error } = await client.signIn.email(payload.data)

    if (error) return handleError(error, form)

    await setup()
    await navigateTo('/')
}

onMounted(() => {
    if (process.env.NODE_ENV === 'development') {
        Object.assign(form.value?.state, {
            email: 'test@example.com',
            password: 'password'
        })
    }
})

useHead({
    title: 'Sign In'
})
</script>

<template>
    <UAuthForm
        ref="form"
        title="Sign In"
        description="Enter your credentials to access your account."
        :fields="fields"
        loading-auto
        @submit="onSubmit"
    >
        <template #leading>
            <UButton
                icon="i-custom-brand"
                to="/"
                variant="link"
                size="xl"
                :ui="{ leadingIcon: 'size-8' }"
                class="mb-4"
            />
        </template>
        <template #password-hint>
            <ULink
                to="/auth/password/forgot"
                class="text-xs text-default"
                tabindex="-1"
            >Forgot password?</ULink>
        </template>
        <template #footer>
            <div class="text-center text-sm">
                Don't have an account?
                <ULink
                    to="/auth/signup"
                    class="text-default"
                >Sign Up</ULink>
            </div>
        </template>
    </UAuthForm>
</template>
