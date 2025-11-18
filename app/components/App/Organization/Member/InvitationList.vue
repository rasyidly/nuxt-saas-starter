<script lang="ts" setup>
import type { ColumnDef } from '@tanstack/vue-table'

const { client, organization } = useAuth()
const UBadge = resolveComponent('UBadge')
const toast = useToast()

type Invitation = typeof client.$Infer.Invitation

const { data: invitations, refresh } = await useAsyncData('organization:member:invitation', async () => {
    const { data } = await client.organization.listInvitations({
        query: {
            organizationId: organization.value?.id
        }
    })
    return (data || []) as Invitation[]
}, {
    watch: [organization]
})

const columns: ColumnDef<Invitation>[] = [
    {
        accessorKey: 'email',
        header: 'Email'
    },
    {
        accessorKey: 'role', header: 'Role', cell: ({ row }) => h('div', { class: 'flex items-center gap-1' }, row.original.role.split(',').map(role => h(UBadge, { ...useEnum(Enum.OrganizationRoles, role), variant: 'soft' })))
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => h(UBadge, {
            color: row.original.status === 'pending' ? 'warning' : 'neutral',
            variant: 'soft',
            label: row.original.status
        })
    },
    {
        accessorKey: 'expiresAt',
        header: 'Expires',
        cell: ({ row }) => row.original.status === 'pending' ? useTimeAgo(row.original.expiresAt).value : '-'
    },
    {
        id: 'actions',
        header: '',
        meta: { class: { td: 'text-end py-2' } }
    }
]

async function cancelInvitation(invitation: Invitation) {
    const { error } = await client.organization.cancelInvitation({
        invitationId: invitation.id
    })

    if (error) return toast.add({ title: 'Failed to cancel invitation', color: 'error' })

    toast.add({ title: 'Invitation cancelled', icon: 'i-lucide-check' })

    await refresh()
}
</script>

<template>
    <UTable
        v-if="invitations?.length"
        :columns="columns"
        :data="invitations"
    >
        <template #actions-cell="{ row }">
            <UButton
                v-if="row.original.status === 'pending'"
                size="sm"
                variant="ghost"
                color="error"
                label="Cancel"
                @click="cancelInvitation(row.original)"
            />
        </template>
    </UTable>
    <UEmpty
        v-else
        icon="i-lucide-mail"
        title="No pending invitations"
        description="You have not sent any invitations yet."
    />
</template>
