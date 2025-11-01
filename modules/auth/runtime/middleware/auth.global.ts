import { defu } from 'defu'
import type { RouteLocationRaw } from 'vue-router'
import { defineNuxtRouteMiddleware } from '#app'

type MiddlewareOptions = false | {
    /**
     * Only apply auth middleware to guest or user
     */
    only?: 'guest' | 'user'
    /**
     * Redirect authenticated user to this route
     */
    redirectUserTo?: RouteLocationRaw | string
    /**
     * Redirect guest to this route
     */
    redirectGuestTo?: RouteLocationRaw | string
}

declare module '#app' {
    interface PageMeta {
        auth?: MiddlewareOptions
    }
}

declare module 'vue-router' {
    interface RouteMeta {
        auth?: MiddlewareOptions
    }
}

export default defineNuxtRouteMiddleware(async (to) => {
    const { loggedIn, organization } = useAuth()

    // If auth is disabled, skip middleware
    if (to.meta?.auth === false) {
        return
    }

    const { only, redirectUserTo, redirectGuestTo } = defu(to.meta?.auth, {
        redirectUserTo: '/',
        redirectGuestTo: '/auth/signin'
    })

    // If guest mode, redirect if authenticated
    if (only === 'guest' && loggedIn.value) {
        // Avoid infinite redirect
        if (to.path === redirectUserTo) {
            return
        }
        return navigateTo(redirectUserTo)
    }

    // Defuault is user mode, redirect if not authenticated
    if (!loggedIn.value) {
        // Avoid infinite redirect
        if (to.path === redirectGuestTo) {
            return
        }
        return navigateTo(redirectGuestTo)
    }

    if (!organization.value) {
        // Avoid infinite redirect
        if (to.path === '/auth/organization/create') {
            return
        }
        return navigateTo('/auth/organization/create')
    }
})
