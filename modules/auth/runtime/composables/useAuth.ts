import { useState, useRequestHeaders, navigateTo } from '#imports'
import { computed } from 'vue'
import { createAuthClient } from 'better-auth/vue'
import { twoFactorClient, adminClient, organizationClient, inferOrgAdditionalFields } from 'better-auth/client/plugins'
import type { auth as Auth } from '#auth'
import type { RouteLocationRaw } from 'vue-router'

type Session<T extends boolean | 'user' | 'guest' | undefined>
    = T extends 'guest' ? null
        : T extends false ? (typeof Auth.$Infer.Session | null) : typeof Auth.$Infer.Session

type ActiveOrganization<T extends boolean | 'user' | 'guest' | undefined>
    = T extends 'guest' ? null
        : T extends false ? (typeof Auth.$Infer.ActiveOrganization | null) : typeof Auth.$Infer.ActiveOrganization

type Organization<T extends boolean | 'user' | 'guest' | undefined>
    = T extends 'guest' ? null
        : T extends false ? (typeof Auth.$Infer.Organization | null) : typeof Auth.$Infer.Organization

export function useAuth<T extends boolean | 'user' | 'guest' | undefined = undefined>() {
    const url = useRequestURL()
    const headers = import.meta.server ? useRequestHeaders(['cookie', 'authorization', 'user-agent', 'host', 'referer']) : undefined

    const client = createAuthClient({
        baseURL: url.origin,
        fetchOptions: { headers },
        plugins: [
            twoFactorClient(),
            adminClient(),
            organizationClient({
                schema: inferOrgAdditionalFields<typeof Auth>()
            })
        ]
    })

    const auth = useState<Session<T>>(`auth:session`, () => null as Session<T>)

    const loggedIn = computed(() => !!auth.value)

    const organizations = useState<Organization<T>[]>('auth:organizations', () => [])
    const organization = useState<ActiveOrganization<T>>('auth:activeOrganization', () => null as ActiveOrganization<T>)

    const sessionFetching = import.meta.server ? ref(false) : useState('auth:sessionFetching', () => false)

    async function signOut({ redirectTo = '/' }: { redirectTo?: RouteLocationRaw | string } = {}) {
        await client.signOut({
            fetchOptions: {
                onSuccess: () => {
                    auth.value = null as Session<T>
                    navigateTo(redirectTo)
                }
            }
        })
    }

    async function setActiveOrganization(org: { organizationId?: string, organizationSlug?: string }) {
        const { data } = await client.organization.setActive(org)
        organization.value = data as ActiveOrganization<T>
    }

    async function setup() {
        if (sessionFetching.value) {
            return
        }
        sessionFetching.value = true

        const { data } = await client.getSession()
        auth.value = data as Session<T>

        if (auth.value) {
            const { data: orgs } = await client.organization.list()
            organizations.value = orgs as Organization<T>[]

            if (organizations.value?.length) {
                const orgId = data?.session.activeOrganizationId || organizations.value[0]?.id
                await setActiveOrganization({ organizationId: orgId })
            } else {
                // Automatically redirect to create organization page via middleware
                organization.value = null as ActiveOrganization<T>
            }
        }

        sessionFetching.value = false
        return auth.value
    }

    if (import.meta.client) {
        client.$store.listen('$sessionSignal', async (signal) => {
            if (!signal) return
            await setup()
        })
    }

    return {
        client,
        organizations,
        organization,
        setActiveOrganization,
        setup,
        auth,
        loggedIn,
        signOut
    }
}
