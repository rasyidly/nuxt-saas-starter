import { createError } from 'h3'
import type { H3Event } from 'h3'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { admin, twoFactor, organization } from 'better-auth/plugins'
import { useDb } from '~~/server/utils/database'
import { render } from '@vue-email/render'
import { ulid } from 'ulid'

export const auth = betterAuth({
    database: drizzleAdapter(useDb(), {
        provider: 'mysql',
        usePlural: true
    }),
    emailVerification: {
        sendVerificationEmail: async ({ user, url }) => {
            const { default: WelcomeMail } = await import('~~/server/emails/WelcomeMail.vue')
            const html = await render(WelcomeMail, {
                user,
                url
            }, {
                pretty: true
            })

            await sendEmail({
                to: user.email,
                subject: 'Verify your email address',
                html
            })
        },
        sendOnSignUp: process.env.NODE_ENV === 'production',
        autoSignInAfterVerification: true,
        expiresIn: 3600 // 1 hour
    },
    plugins: [
        twoFactor(),
        admin(),
        organization({
            schema: {
                organization: {
                    additionalFields: {}
                },
                member: {
                    additionalFields: {}
                },
                invitation: {
                    additionalFields: {}
                }
            }
        })
    ],
    user: {
        changeEmail: {
            enabled: true
        }
    },
    rateLimit: {
        enabled: true
    },
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({ user, url }) => {
            const { default: ResetPasswordMail } = await import('~~/server/emails/ResetPasswordMail.vue')
            const html = await render(ResetPasswordMail, {
                user,
                url
            }, {
                pretty: true
            })

            await sendEmail({
                to: user.email,
                subject: 'Reset your password',
                html
            })
        },
        disableSignUp: false,
        requireEmailVerification: false
    },
    telemetry: {
        enabled: false
    },
    advanced: {
        database: {
            generateId: () => ulid()
        },
        cookies: {
            session_token: {
                name: 'auth_session'
            }
        }
    }
})

type Session = typeof auth.$Infer.Session | null

declare module 'h3' {
    interface H3EventContext {
        auth?: Session
    }
}

export const useAuthServer = () => auth

export const useAuthSession = async (event: H3Event) => {
    const session = await auth.api.getSession({
        headers: event.headers
    })

    if (!session || !session.user) throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
    })

    if (!session.session.activeOrganizationId) throw createError({
        statusCode: 403,
        statusMessage: 'No active organization. Please select an organization first.'
    })

    return session as typeof session & { session: { activeOrganizationId: string } }
}

export default auth
