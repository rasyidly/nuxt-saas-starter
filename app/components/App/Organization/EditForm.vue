<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'

const { client, organization } = useAuth()
const toast = useToast()
const form = useTemplateRef('form')

const state = reactive({
    name: organization.value?.name,
    slug: organization.value?.slug,
    logo: organization.value?.logo as File | null
})

const logo = ref()

const { handleFileInput, files } = useFileStorage()

async function submit(event: FormSubmitEvent<typeof state>) {
    try {
        if (event.data.logo instanceof File) {
            const [response] = await $fetch('/api/upload', {
                method: 'POST',
                body: {
                    files: files.value
                }
            })
            logo.value = response
        }

        await client.organization.update({
            data: {
                name: event.data.name,
                slug: event.data.slug,
                logo: event.data.logo ? logo.value : ''
            },
            organizationId: organization.value?.id || ''
        })

        toast.add({ title: 'Profile updated successfully', icon: 'i-lucide-check' })
    } catch (error) {
        handleError(error, form)
    }
}

function createObjectUrl(file: string | File): string {
    return typeof file == 'string' ? file : URL.createObjectURL(file)
}

watch(organization, (newOrg) => {
    state.name = newOrg?.name || ''
    state.slug = newOrg?.slug || ''
    state.logo = null
})
</script>

<template>
    <UForm
        ref="form"
        loading-auto
        :state="state"
        class="space-y-4"
        @submit="submit"
    >
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <UFormField
                name="files"
                class="lg:col-span-2 mb-4"
            >
                <UFileUpload
                    v-slot="{ open, removeFile }"
                    v-model="state.logo"
                    accept="image/*"
                    @input="handleFileInput"
                >
                    <div class="flex flex-wrap items-center gap-4">
                        <UAvatar
                            size="lg"
                            :src="state.logo ? createObjectUrl(state.logo) : undefined"
                            icon="i-lucide-image"
                            class="size-20 rounded-xl"
                        />
                        <UButton
                            :label="state.logo ? 'Change image' : 'Upload image'"
                            color="neutral"
                            variant="outline"
                            @click="open()"
                        />
                        <UButton
                            v-if="state.logo"
                            variant="outline"
                            icon="i-lucide-trash"
                            class="-ms-1"
                            @click="removeFile()"
                        />
                    </div>
                </UFileUpload>
            </UFormField>
            <UFormField
                name="name"
                label="Name"
                required
            >
                <UInput v-model="state.name" />
            </UFormField>
            <UFormField
                name="slug"
                label="Username"
                required
            >
                <UInput
                    v-model="state.slug"
                    disabled
                />
            </UFormField>
        </div>
        <UButton
            type="submit"
            icon="i-lucide-check"
            label="Save Changes"
        />
    </UForm>
</template>
