<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui'

const navigations: NavigationMenuItem[][] = [[
    { label: 'Profile', icon: 'i-lucide-user', to: '/settings', exact: true },
    { label: 'Organization', icon: 'i-lucide-building', to: '/settings/organization', exact: true }
]]

useHead({
    title: 'Settings'
})
</script>

<template>
    <div class="flex flex-1 overflow-hidden">
        <UDashboardPanel>
            <template #header>
                <UDashboardNavbar title="Settings">
                    <template #leading>
                        <UDashboardSidebarCollapse />
                    </template>
                </UDashboardNavbar>

                <UDashboardToolbar>
                    <UNavigationMenu
                        :items="navigations"
                        highlight
                        class="-mx-1 flex-1"
                    />
                </UDashboardToolbar>
            </template>

            <template #body>
                <NuxtPage />
            </template>
        </UDashboardPanel>
    </div>
</template>
