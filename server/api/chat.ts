import type { UIMessage } from 'ai'
import { streamText, convertToModelMessages } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { sql as dsql } from 'drizzle-orm'
import { useDb } from '../utils/database'
import { z } from 'h3-zod'

export default defineLazyEventHandler(async () => {
    const apiKey = useRuntimeConfig().openaiApiKey

    if (!apiKey) throw new Error('Missing OpenAI API key')

    const openai = createOpenAI({
        apiKey: apiKey
    })

    return defineEventHandler(async (event) => {
        const db = useDb()

        const { messages }: {
            messages: UIMessage[]
        } = await readBody(event)

        const result = streamText({
            model: openai('gpt-4o-mini'),
            system: 'You are a helpful assistant.',
            messages: convertToModelMessages(messages),
            maxOutputTokens: 500,
            tools: {
                query_sql: {
                    description: 'Run READ-ONLY SQL queries (SELECT only). Use for reading data. The SQL query must not end with a semicolon (;).',
                    inputSchema: z.object({
                        sql: z.string().min(1, 'SQL cannot be empty').describe('Valid SELECT SQL query without ";" at the end.')
                    }),
                    execute: async ({ sql }: { sql: string }) => {
                        try {
                            const rows = await db.execute(dsql.raw(sql))
                            return { ok: true, rows }
                        } catch (error) {
                            return { ok: false, error: (error as { message?: string })?.message || 'Gagal mengeksekusi query' }
                        }
                    }
                }
            }
        })

        return result.toUIMessageStreamResponse()
    })
})
