<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type { auth as Auth } from '#auth'
import { slugify } from '~~/modules/helper/runtime/utils/helper'

const form = useTemplateRef('form')
const { client } = useAuth()

type OrganizationCreateResponse = Awaited<ReturnType<typeof Auth.api.createOrganization>>

const emit = defineEmits<{
    cancel: []
    afterCreate: [data: OrganizationCreateResponse]
}>()

const state = reactive({
    name: '',
    slug: ''
})

async function onSubmit(payload: FormSubmitEvent<typeof state>) {
    const { data, error } = await client.organization.create(payload.data)

    if (error) return handleError(error, form)

    emit('afterCreate', data)
}
</script>

<template>
    <UForm
        ref="form"
        loading-auto
        :state="state"
        class="space-y-6"
        @submit="onSubmit"
    >
        <UFormField
            label="Organization Name"
            name="name"
            class="col-span-full"
            required
        >
            <UInput
                v-model="state.name"
                required
                @change="state.slug = slugify(state.name)"
            />
        </UFormField>

        <UFormField
            label="Username"
            name="slug"
            required
        >
            <UInput
                v-model="state.slug"
                required
            />
        </UFormField>
        <UButton
            type="submit"
            label="Create Organization"
            block
        />
    </UForm>
</template>
