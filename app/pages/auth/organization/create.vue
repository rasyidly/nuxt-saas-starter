<script setup lang="ts">
definePageMeta({
    layout: 'auth'
})

const { setup, organizations, setActiveOrganization } = useAuth()

async function onAfterCreate() {
    await setup()
    await navigateTo('/')
}

const organization = ref(organizations.value[0]?.id)

async function switchOrganization() {
    if (organization.value) {
        await setActiveOrganization({
            organizationId: organization.value
        })
        await navigateTo('/')
    }
}

useHead({ title: 'Choose Organization' })
</script>

<template>
    <UPageCard
        title="Choose Organization"
        description="To get started, please choose or create your organization."
        variant="naked"
        :ui="{ wrapper: 'text-center mx-auto mb-4', leading: 'mx-auto', title: 'text-xl' }"
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
        <UFormField
            v-if="organizations.length"
            label="Choose existing organizations"
        >
            <div class="flex gap-2">
                <USelectMenu
                    v-model="organization"
                    :items="organizations"
                    value-key="id"
                    label-key="name"
                    variant="soft"
                />
                <UButton
                    :label="'Choose'"
                    :disabled="!organization"
                    variant="subtle"
                    @click="switchOrganization()"
                />
            </div>
        </UFormField>
        <USeparator
            v-if="organizations.length"
            label="Or create a new organization"
            :ui="{ label: 'text-sm text-muted' }"
            class="py-2"
        />
        <AppOrganizationCreateForm @after-create="onAfterCreate" />
    </UPageCard>
</template>
