import { defineConfig } from 'drizzle-kit'
import type { SslOptions } from 'mysql2'

export const credentials = {
    url: process.env.DATABASE_URL!
} satisfies {
    host: string
    port?: number
    user?: string
    password?: string
    database: string
    ssl?: string | SslOptions
} | {
    url: string
}

export default defineConfig({
    schema: './server/database/schema',
    out: './server/database/migrations',
    dialect: 'mysql',
    dbCredentials: credentials
})
