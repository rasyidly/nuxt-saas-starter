<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'

const { client, auth } = useAuth()
const toast = useToast()
const form = useTemplateRef('form')

const state = reactive({
    name: auth.value?.user?.name || '',
    image: auth.value?.user?.image || ''
})

async function onSubmit(payload: FormSubmitEvent<typeof state>) {
    try {
        await client.updateUser({
            name: payload.data.name,
            image: payload.data.image || null
        })

        toast.add({
            title: 'Profile updated successfully',
            icon: 'i-lucide-check',
            color: 'success'
        })

        auth.value.user.name = payload.data.name
        auth.value.user.image = payload.data.image
    } catch (error) {
        handleError(error, form)
    }
}
</script>

<template>
    <UForm
        ref="form"
        loading-auto
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
    >
        <UFormField
            label="Full Name"
            name="name"
            required
        >
            <UInput
                v-model="state.name"
                placeholder="Enter your full name"
                required
            />
        </UFormField>

        <UFormField
            label="Profile Image URL"
            name="image"
        >
            <UInput
                v-model="state.image"
                type="url"
                placeholder="https://example.com/avatar.jpg"
                disabled
            />
        </UFormField>

        <UButton
            type="submit"
            label="Update Profile"
        />
    </UForm>
</template>
