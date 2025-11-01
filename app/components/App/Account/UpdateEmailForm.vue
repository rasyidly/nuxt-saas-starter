<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'

const { client } = useAuth()
const toast = useToast()
const form = useTemplateRef('form')

const state = reactive({
    newEmail: ''
})

async function onSubmit(payload: FormSubmitEvent<typeof state>) {
    try {
        await client.changeEmail({
            ...payload.data,
            callbackURL: '/'
        })

        toast.add({
            title: 'Please check your new email address for verification link.',
            icon: 'i-lucide-mail',
            color: 'success'
        })

        form.value?.clear()
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
            label="New Email Address"
            name="newEmail"
            required
        >
            <UInput
                v-model="state.newEmail"
                type="email"
                placeholder="newemail@example.com"
                required
            />
        </UFormField>
        <UAlert
            color="neutral"
            variant="subtle"
            icon="i-lucide-info"
            description="After submitting, please check your new email address for a verification link to confirm the change."
            class="p-3!"
        />
        <UButton
            type="submit"
            label="Change Email"
        />
    </UForm>
</template>
