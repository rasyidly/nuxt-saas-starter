import { relations } from 'drizzle-orm'
import {
    users,
    sessions,
    accounts,
    twoFactors,
    organizations,
    members,
    invitations
} from './auth'

export const usersRelations = relations(users, ({ many }) => ({
    sessions: many(sessions),
    accounts: many(accounts),
    twoFactors: many(twoFactors),
    members: many(members),
    invitations: many(invitations)
}))

export const sessionsRelations = relations(sessions, ({ one }) => ({
    user: one(users, {
        fields: [sessions.userId],
        references: [users.id]
    })
}))

export const accountsRelations = relations(accounts, ({ one }) => ({
    user: one(users, {
        fields: [accounts.userId],
        references: [users.id]
    })
}))

export const twoFactorRelations = relations(twoFactors, ({ one }) => ({
    user: one(users, {
        fields: [twoFactors.userId],
        references: [users.id]
    })
}))

export const organizationsRelations = relations(organizations, ({ many }) => ({
    members: many(members),
    invitations: many(invitations)
}))

export const membersRelations = relations(members, ({ one }) => ({
    organization: one(organizations, {
        fields: [members.organizationId],
        references: [organizations.id]
    }),
    user: one(users, {
        fields: [members.userId],
        references: [users.id]
    })
}))

export const invitationsRelations = relations(invitations, ({ one }) => ({
    organization: one(organizations, {
        fields: [invitations.organizationId],
        references: [organizations.id]
    }),
    inviter: one(users, {
        fields: [invitations.inviterId],
        references: [users.id]
    })
}))
