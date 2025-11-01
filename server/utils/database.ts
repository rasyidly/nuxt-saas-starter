import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
import { schema } from '../database/schema'
import { credentials } from '../../drizzle.config'

export const tables = schema

export function useDb() {
    return drizzle({
        client: mysql.createPool((
            credentials.url
                ? {
                        uri: credentials.url
                    }
                : credentials) as mysql.PoolOptions
        ),
        schema,
        mode: 'default'
    })
}
