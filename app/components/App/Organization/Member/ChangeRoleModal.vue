<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'

const { client, organization } = useAuth()
const toast = useToast()
const form = useTemplateRef('form')

const props = defineProps<{
    member: typeof client.$Infer.Member
}>()

const emit = defineEmits(['success', 'close'])

const state = reactive({
    email: '',
    role: props.member.role.split(',') as ('owner' | 'admin' | 'member')[]
})

async function onSubmit(event: FormSubmitEvent<typeof state>) {
    const { data, error } = await client.organization.updateMemberRole({
        ...event.data,
        memberId: props.member.id,
        organizationId: organization.value?.id
    })

    if (error) return handleError(error, form)

    toast.add({ title: 'Role updated successfully', icon: 'i-lucide-check' })
    emit('close')

    emit('success', data)
}
</script>

<template>
    <UModal :title="`Change ${props.member.user.name} role`">
        <template #description />
        <template #body>
            <UForm
                ref="form"
                loading-auto
                :state="state"
                class="space-y-6"
                @submit="onSubmit"
            >
                <UFormField
                    name="slug"
                    label="Choose Role"
                    class="grow"
                    required
                >
                    <UCheckboxGroup
                        v-model="state.role"
                        :items="Enum.OrganizationRoles"
                        variant="card"
                        icon="i-lucide-check"
                    />
                </UFormField>
                <UButton
                    type="submit"
                    icon="i-lucide-check"
                    label="Update Role"
                />
            </UForm>
        </template>
    </UModal>
</template>
