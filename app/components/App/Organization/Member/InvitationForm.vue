<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'

const { client, organization } = useAuth()
const toast = useToast()
const form = useTemplateRef('form')

const emit = defineEmits(['onSuccess'])

const state = reactive({
    email: '',
    role: ['member'] as ('owner' | 'admin' | 'member')[]
})

async function submit(event: FormSubmitEvent<typeof state>) {
    const { data, error } = await client.organization.inviteMember({
        ...event.data,
        organizationId: organization.value?.id
    })

    if (error) return handleError(error, form)

    toast.add({ title: 'Invitation sent successfully', icon: 'i-lucide-check' })

    emit('onSuccess', data)
}
</script>

<template>
    <UForm
        ref="form"
        loading-auto
        :state="state"
        class="flex flex-wrap items-end gap-2"
        @submit="submit"
    >
        <UFormField
            name="email"
            label="Email"
            class="grow"
            required
        >
            <UInput
                v-model="state.email"
                type="email"
                required
            />
        </UFormField>
        <UFormField
            name="slug"
            label="Choose Role"
            class="grow"
            required
        >
            <USelectMenu
                v-model="state.role"
                :items="Enum.OrganizationRoles"
                value-key="value"
                label-key="label"
                multiple
                required
            />
        </UFormField>
        <UButton
            type="submit"
            icon="i-lucide-send"
            label="Invite"
        />
    </UForm>
</template>
