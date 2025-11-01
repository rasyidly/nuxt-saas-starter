<template>
    <UContainer class="max-w-4xl lg:py-4 space-y-6 xl:space-y-12">
        <UPageCard
            title="Organization Profile"
            description="Update your organization's profile information and logo."
            variant="naked"
        >
            <AppOrganizationEditForm />
        </UPageCard>
        <UPageCard
            title="Members"
            description="Manage your organization members."
            :ui="{ container: 'max-w-full' }"
            variant="naked"
        >
            <AppOrganizationMemberList />
        </UPageCard>
        <UPageCard
            title="Invitations"
            description="Invite new members to your organization."
            :ui="{ container: 'max-w-full' }"
            variant="naked"
        >
            <AppOrganizationMemberInvitationForm @on-success="refreshNuxtData('organization:member:invitation')" />
            <AppOrganizationMemberInvitationList />
        </UPageCard>
        <UPageCard
            title="Danger Zone"
            description="Delete or transfer your organization."
            variant="naked"
        >
            <USeparator />
            <AppOrganizationDangerZone />
        </UPageCard>
    </UContainer>
</template>
