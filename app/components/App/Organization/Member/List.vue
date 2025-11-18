<script lang="ts" setup>
import type { ColumnDef } from '@tanstack/vue-table'
import { LazyAppOrganizationMemberChangeRoleModal } from '#components'

const { client, organization } = useAuth()
const overlay = useOverlay()

type Member = typeof client.$Infer.Member

// State for listing members
const page = useRouteQuery('page', 1)
const search = useRouteQuery('search', '')
const debouncedSearch = useDebounce(search, 800)

const UBadge = resolveComponent('UBadge')

const query = computed(() => ({
    organizationId: organization.value?.id,
    limit: 100,
    offset: (Number(page.value) - 1) * 100
}))

const { data: members, refresh } = await useAsyncData(async () => {
    const { data } = await client.organization.listMembers({
        query: query.value
    })
    return (data?.members || []) as Member[]
}, {
    watch: [organization, query, debouncedSearch],
    transform: data => data.filter(member =>
        member.user.name.toLowerCase().includes(debouncedSearch.value.toLowerCase())
        || member.user.email.toLowerCase().includes(debouncedSearch.value.toLowerCase())
    )
})

const columns: ColumnDef<Member>[] = [
    {
        accessorKey: 'user.name',
        header: () => 'Name',
        cell: ({ row }) => h('div', [
            h('div', { class: 'font-medium text-default' }, row.original.user.name),
            h('div', { class: 'text-sm text-muted' }, `Joined ${useTimeAgo(row.original.createdAt).value}`)
        ])
    },
    { accessorKey: 'user.email', header: () => 'Email' },
    { accessorKey: 'role', header: () => 'Role', cell: ({ row }) => h('div', { class: 'flex items-center gap-2' }, row.original.role.split(',').map(role => h(UBadge, { ...useEnum(Enum.OrganizationRoles, role), variant: 'soft' }))) },
    {
        id: 'actions',
        header: '',
        meta: { class: { td: 'text-end' } }
    }
]

async function openChangeRoleModal(member: Member) {
    overlay.create(LazyAppOrganizationMemberChangeRoleModal, {
        props: {
            member,
            onSuccess: async () => await refresh()
        },
        defaultOpen: true
    })
}
</script>

<template>
    <div class="space-y-4 flex flex-col">
        <UInput
            v-model="search"
            icon="i-lucide-search"
        />
        <UTable
            v-if="members?.length"
            class="flex-1"
            :columns="columns"
            :data="members"
        >
            <template #actions-cell="{ row }">
                <UButton
                    v-if="row.original.role !== 'owner' && members?.length > 1"
                    label="Change Role"
                    size="sm"
                    variant="ghost"
                    @click="openChangeRoleModal(row.original)"
                />
            </template>
        </UTable>
        <UEmpty
            v-else
            icon="i-lucide-users"
            title="No members found"
            description="There are no members in this organization."
        />
    </div>
</template>
