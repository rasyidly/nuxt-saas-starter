<script setup lang="ts">
definePageMeta({
    layout: 'auth'
})

const { setup, signOut } = useAuth()

async function onAfterCreate() {
    await setup()
    await navigateTo('/')
}

useHead({ title: 'Create Organization' })
</script>

<template>
    <UPageCard
        title="Create Organization"
        description="To get started, please create your organization."
        variant="naked"
        :ui="{ wrapper: 'text-center mx-auto mb-4', leading: 'mx-auto', title: 'text-xl' }"
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
        <AppOrganizationCreateForm @after-create="onAfterCreate" />
        <UButton
            variant="link"
            label="Sign out"
            block
            @click="signOut()"
        />
    </UPageCard>
</template>
