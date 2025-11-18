import type { Color } from '~~/shared/types'

type EnumItem<T = string> = {
    value: T
    label: string
    color: Color
    icon?: string
    description?: string
}

export const Enum = {
    OrganizationRoles: [
        { value: 'owner', label: 'Owner', color: 'primary', icon: 'i-lucide-shield-check', description: 'Full access to all settings and data.' },
        { value: 'admin', label: 'Admin', color: 'success', icon: 'i-lucide-user-check', description: 'Can manage settings and users.' },
        { value: 'member', label: 'Member', color: 'info', icon: 'i-lucide-user', description: 'As student, can view content and participate in discussions.' }
    ] satisfies EnumItem[]
}
