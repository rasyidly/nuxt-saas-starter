<script lang="ts" setup>
import type { DropdownMenuItem, NavigationMenuItem } from '@nuxt/ui'

const sidebar = ref(false)
const { auth, signOut } = useAuth()

const top: NavigationMenuItem[][] = [[
    { label: 'Overview', icon: 'i-lucide-home', to: '/' },
    { label: 'Ask AI', icon: 'i-lucide-bot', to: '/ai' }
], [
    {
        label: 'Settings', icon: 'i-lucide-settings', defaultOpen: true, children: [
            { label: 'Profile', icon: 'i-lucide-user', to: '/settings', exact: true },
            { label: 'Organization', icon: 'i-lucide-building', to: '/settings/organization' }
        ]
    }
]]

const accounts = computed<DropdownMenuItem[][]>(() => [[
    { label: 'Profile', icon: 'i-lucide-user', to: '/settings', exact: true }
], [
    { label: 'Sign Out', icon: 'i-lucide-log-out', onSelect: async () => await signOut({ redirectTo: '/auth/signin' }) }
]])

const groups = computed(() => [{
    id: 'links',
    label: 'Go to',
    items: [...top.flat()].filter(i => i.type !== 'label')
}])
</script>

<template>
    <UDashboardGroup unit="rem">
        <UDashboardSidebar
            id="default"
            v-model:open="sidebar"
            collapsible
            class="bg-muted dark:bg-muted/30"
            resizable
            :min-size="16"
            :default-size="20"
            :ui="{ root: 'divide-y divide-default' }"
        >
            <template #header="{ collapsed }">
                <UButton
                    v-if="!collapsed"
                    variant="soft"
                    color="neutral"
                    square
                    to="/"
                    icon="i-custom-brand"
                />
                <AppOrganizationSwitcher
                    :collapsed="collapsed"
                    class="truncate"
                />
                <UColorModeButton v-if="!collapsed" />
            </template>
            <template #resize-handle="{ onMouseDown, onTouchStart, onDoubleClick }">
                <UDashboardResizeHandle
                    class="after:absolute after:inset-y-0 after:right-0 after:w-px hover:after:bg-accented after:transition"
                    @mousedown="onMouseDown"
                    @touchstart="onTouchStart"
                    @dblclick="onDoubleClick"
                />
            </template>
            <template #default="{ collapsed }">
                <div :class="['flex items-center gap-2', collapsed && 'flex-col']">
                    <UDashboardSearchButton
                        :collapsed="collapsed"
                        variant="subtle"
                        class="w-full"
                    />
                    <UTooltip
                        text="Create something"
                        :content="{ side: 'right' }"
                    >
                        <UButton
                            icon="i-lucide-plus"
                            variant="solid"
                            :square="collapsed"
                        />
                    </UTooltip>
                </div>
                <UNavigationMenu
                    :collapsed="collapsed"
                    :items="top"
                    orientation="vertical"
                    color="neutral"
                    tooltip
                    popover
                />
                <div class="grow" />
                <UPageCard
                    v-if="!collapsed"
                    title="Ask AI"
                    description="Get instant answers and insights"
                    :ui="{ description: 'text-sm', container: 'lg:p-5' }"
                    spotlight
                >
                    <UButton
                        icon="i-lucide-bot"
                        color="primary"
                        variant="soft"
                        label="Ask Now"
                        class="w-min"
                        to="/ai"
                    />
                </UPageCard>
                <UTooltip
                    v-else
                    text="Ask AI"
                    :delay-duration="0"
                    :content="{ side: 'right' }"
                    to="/ai"
                >
                    <UButton
                        icon="i-lucide-bot"
                        color="primary"
                        variant="soft"
                        :square="true"
                        :aria-label="'Ask AI'"
                        class="w-min"
                    />
                </UTooltip>
                <UColorModeButton v-if="collapsed" />
            </template>
            <template #footer="{ collapsed }">
                <UDropdownMenu
                    :items="accounts"
                    :content="{ align: 'center', side: 'top', collisionPadding: 12 }"
                    :ui="{ content: collapsed ? 'w-40' : 'w-(--reka-dropdown-menu-trigger-width)' }"
                >
                    <UButton
                        color="neutral"
                        variant="soft"
                        block
                        class="justify-start text-start"
                        :icon="collapsed ? 'i-lucide-user' : undefined"
                        :square="collapsed"
                    >
                        <UUser
                            v-if="!collapsed"
                            :name="auth.user.name"
                            description="Owner"
                            :avatar="{
                                src: auth.user.image || undefined,
                                icon: 'i-lucide-user'
                            }"
                        />
                    </UButton>
                </UDropdownMenu>
            </template>
        </UDashboardSidebar>
        <UDashboardSearch :groups="groups" />
        <slot />
    </UDashboardGroup>
</template>
