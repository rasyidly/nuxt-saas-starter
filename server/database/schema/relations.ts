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
import {
    customers,
    orders,
    orderStatusTemplates,
    orderEvents,
    attachments,
    notifications
} from './core'

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
    invitations: many(invitations),
    customers: many(customers),
    orders: many(orders),
    orderStatusTemplates: many(orderStatusTemplates),
    orderEvents: many(orderEvents),
    attachments: many(attachments),
    notifications: many(notifications)
}))

export const customersRelations = relations(customers, ({ many, one }) => ({
    orders: many(orders),
    organization: one(organizations, {
        fields: [customers.organizationId],
        references: [organizations.id]
    })
}))

export const ordersRelations = relations(orders, ({ many, one }) => ({
    events: many(orderEvents),
    attachments: many(attachments),
    customer: one(customers, {
        fields: [orders.customerId],
        references: [customers.id]
    }),
    organization: one(organizations, {
        fields: [orders.organizationId],
        references: [organizations.id]
    })
}))

export const orderStatusTemplatesRelations = relations(orderStatusTemplates, ({ one }) => ({
    organization: one(organizations, {
        fields: [orderStatusTemplates.organizationId],
        references: [organizations.id]
    })
}))

export const orderEventsRelations = relations(orderEvents, ({ one }) => ({
    order: one(orders, {
        fields: [orderEvents.orderId],
        references: [orders.id]
    }),
    statusTemplate: one(orderStatusTemplates, {
        fields: [orderEvents.statusTemplateId],
        references: [orderStatusTemplates.id]
    }),
    creator: one(users, {
        fields: [orderEvents.createdBy],
        references: [users.id]
    })
}))

export const attachmentsRelations = relations(attachments, ({ one }) => ({
    organization: one(organizations, {
        fields: [attachments.organizationId],
        references: [organizations.id]
    }),
    order: one(orders, {
        fields: [attachments.orderId],
        references: [orders.id]
    })
}))

export const notificationsRelations = relations(notifications, ({ one }) => ({
    organization: one(organizations, {
        fields: [notifications.organizationId],
        references: [organizations.id]
    }),
    user: one(users, {
        fields: [notifications.userId],
        references: [users.id]
    }),
    order: one(orders, {
        fields: [notifications.orderId],
        references: [orders.id]
    })
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
