<template>
    <UContainer class="max-w-4xl lg:py-4 space-y-6 xl:space-y-12">
        <UPageCard
            title="My Profile"
            description="Update your personal information and profile settings."
            variant="naked"
        >
            <AppAccountUpdateProfileForm />
        </UPageCard>
        <UPageCard
            title="Change Email"
            description="Update your account email address."
            variant="naked"
            class="mt-6"
        >
            <AppAccountUpdateEmailForm />
        </UPageCard>
        <UPageCard
            title="Change Password"
            description="Update your account password."
            variant="naked"
            class="mt-6"
        >
            <AppAccountUpdatePasswordForm />
        </UPageCard>
        <UPageCard
            title="Danger Zone"
            description="Delete or transfer your organization."
            variant="naked"
        >
            <USeparator />
            <AppAccountDangerZone />
        </UPageCard>
    </UContainer>
</template>
