import { useValidatedBody, z } from 'h3-zod'

export default defineEventHandler(async (event) => {
    const { files } = await useValidatedBody(event, z.object({
        files: z.array(z.any()).min(1, 'At least one file is required')
    }))

    const fileNames: string[] = []

    for (const file of files) {
        const filename = await storeFileLocally(file, 24, '/organizations')
        fileNames.push(`${event.node.req.headers.origin}/storage/organizations/${filename}`)
    }

    return fileNames
})
