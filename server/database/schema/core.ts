import {
    mysqlTable,
    varchar,
    text,
    timestamp,
    boolean,
    decimal,
    int,
    json
} from 'drizzle-orm/mysql-core'
import { users, organizations } from './auth'

export const customers = mysqlTable('customers', {
    id: varchar('id', { length: 36 }).primaryKey(),
    organizationId: varchar('organization_id', { length: 36 })
        .notNull()
        .references(() => organizations.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    email: varchar('email', { length: 255 }),
    phone: varchar('phone', { length: 50 }),
    metadata: json('metadata'),
    createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { fsp: 3 })
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull()
})

export const orders = mysqlTable('orders', {
    id: varchar('id', { length: 36 }).primaryKey(),
    organizationId: varchar('organization_id', { length: 36 })
        .notNull()
        .references(() => organizations.id, { onDelete: 'cascade' }),
    orderNumber: varchar('order_number', { length: 255 }).notNull(),
    customerId: varchar('customer_id', { length: 36 }).references(() => customers.id, { onDelete: 'set null' }),
    status: text('status').default('pending').notNull(),
    eta: timestamp('eta', { fsp: 3 }),
    totalAmount: decimal('total_amount', { precision: 14, scale: 2 }),
    currency: varchar('currency', { length: 10 }).default('IDR').notNull(),
    metadata: json('metadata'),
    createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { fsp: 3 })
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull()
})

export const orderStatusTemplates = mysqlTable('order_status_templates', {
    id: varchar('id', { length: 36 }).primaryKey(),
    organizationId: varchar('organization_id', { length: 36 })
        .notNull()
        .references(() => organizations.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    color: varchar('color', { length: 50 }),
    isFinal: boolean('is_final').default(false).notNull(),
    sortOrder: int('sort_order').default(0).notNull(),
    createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull()
})

export const orderEvents = mysqlTable('order_events', {
    id: varchar('id', { length: 36 }).primaryKey(),
    orderId: varchar('order_id', { length: 36 })
        .notNull()
        .references(() => orders.id, { onDelete: 'cascade' }),
    statusTemplateId: varchar('status_template_id', { length: 36 }).references(() => orderStatusTemplates.id, { onDelete: 'set null' }),
    note: text('note'),
    createdBy: varchar('created_by', { length: 36 }).references(() => users.id, { onDelete: 'set null' }),
    attachments: json('attachments'),
    createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull()
})

export const attachments = mysqlTable('attachments', {
    id: varchar('id', { length: 36 }).primaryKey(),
    organizationId: varchar('organization_id', { length: 36 })
        .notNull()
        .references(() => organizations.id, { onDelete: 'cascade' }),
    orderId: varchar('order_id', { length: 36 }).references(() => orders.id, { onDelete: 'cascade' }),
    url: text('url').notNull(),
    filename: text('filename'),
    mimeType: text('mime_type'),
    size: int('size'),
    createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull()
})

export const notifications = mysqlTable('notifications', {
    id: varchar('id', { length: 36 }).primaryKey(),
    organizationId: varchar('organization_id', { length: 36 })
        .notNull()
        .references(() => organizations.id, { onDelete: 'cascade' }),
    userId: varchar('user_id', { length: 36 }).references(() => users.id, { onDelete: 'set null' }),
    orderId: varchar('order_id', { length: 36 }).references(() => orders.id, { onDelete: 'set null' }),
    type: text('type'),
    channel: text('channel'),
    payload: json('payload'),
    read: boolean('read').default(false).notNull(),
    sentAt: timestamp('sent_at', { fsp: 3 }),
    createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull()
})
