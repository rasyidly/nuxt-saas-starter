import {
    mysqlTable,
    varchar,
    text,
    timestamp
} from 'drizzle-orm/mysql-core'
import { ulid } from 'ulid'

export const customers = mysqlTable('customers', {
    id: varchar('id', { length: 36 }).primaryKey().$defaultFn(ulid),
    name: text('name').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
        .defaultNow()
        .onUpdateNow()
        .notNull()
})
