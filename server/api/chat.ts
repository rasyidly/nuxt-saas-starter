import type { UIMessage } from 'ai'
import { streamText, convertToModelMessages } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'

export default defineLazyEventHandler(async () => {
    const apiKey = useRuntimeConfig().openaiApiKey

    if (!apiKey) throw new Error('Missing OpenAI API key')

    const openai = createOpenAI({
        apiKey: apiKey
    })

    return defineEventHandler(async (event) => {
        const { messages }: {
            messages: UIMessage[]
        } = await readBody(event)

        const result = streamText({
            model: openai('gpt-4o-mini'),
            messages: convertToModelMessages(messages),
            maxOutputTokens: 100 // Change this value to control the length of the response
        })

        return result.toUIMessageStreamResponse()
    })
})
