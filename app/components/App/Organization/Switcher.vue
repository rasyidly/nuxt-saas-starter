<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui'

const props = withDefaults(defineProps<{
    variant?: 'solid' | 'outline' | 'soft' | 'subtle' | 'ghost' | 'link'
    collapsed?: boolean
}>(), {
    variant: 'ghost',
    collapsed: false
})

const { organizations, organization, setActiveOrganization } = useAuth<'user'>()

const tenants = computed<DropdownMenuItem[][]>(() => [
    organizations.value.map<DropdownMenuItem>(org => ({
        label: org.name,
        avatar: { src: org.logo || undefined, icon: 'i-lucide-building', class: '*:size-4' },
        active: org.id === organization.value?.id,
        onSelect: async () => await setActiveOrganization({ organizationId: org.id })
    })), [
        { label: 'Create New', icon: 'i-lucide-plus', to: '/auth/organization/create' }
    ]])

watch([organization], async () => {
    await refreshNuxtData()
})
</script>

<template>
    <UDropdownMenu
        :items="tenants"
        :content="{ align: 'center', collisionPadding: 12 }"
        :ui="{ content: collapsed ? 'w-40' : 'w-(--reka-dropdown-menu-trigger-width)' }"
    >
        <slot>
            <UButton
                v-bind="{
                    avatar: { src: organization?.logo || undefined, icon: 'i-lucide-building', ui: { icon: 'size-4' } },
                    label: collapsed ? undefined : organization?.name,
                    variant: collapsed ? 'soft' : props.variant
                }"
                color="neutral"
                block
                :square="collapsed"
                class="data-[state=open]:bg-elevated"
            />
        </slot>
    </UDropdownMenu>
</template>
