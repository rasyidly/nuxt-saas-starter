<script lang="ts" setup>
const starGithubRepo = () => useConfirmation({
    title: 'Star GitHub Repository?',
    description: 'You will be redirected to the GitHub repository page to give a star.',
    color: 'neutral',
    icon: 'i-lucide-star',
    confirm: {
        label: 'Continue',
        icon: 'i-lucide-star',
        to: 'https://github.com/rasyidly/nuxt-saas-starter',
        target: '_blank',
        external: true
    }
})

useHead({
    title: 'Overview'
})
</script>

<template>
    <div class="flex flex-1 overflow-hidden">
        <UDashboardPanel>
            <template #header>
                <UDashboardNavbar title="Overview">
                    <template #leading>
                        <UDashboardSidebarCollapse />
                    </template>
                </UDashboardNavbar>
            </template>
            <template #body>
                <UEmpty
                    icon="i-lucide-rocket"
                    title="Coming Soon"
                    description="This feature is under development."
                    variant="naked"
                    class="h-full"
                >
                    <template #actions>
                        <UButton
                            icon="i-lucide-github"
                            label="Star Repository"
                            variant="subtle"
                            @click="starGithubRepo()"
                        />
                    </template>
                </UEmpty>
            </template>
        </UDashboardPanel>
    </div>
</template>
