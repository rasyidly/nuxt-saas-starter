<script lang="ts" setup>
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
                <div class="grid place-items-center h-full">
                    <EmptyState
                        icon="i-lucide-rocket"
                        title="Coming Soon"
                        description="This feature is under development."
                    />
                </div>
            </template>
        </UDashboardPanel>
    </div>
</template>
