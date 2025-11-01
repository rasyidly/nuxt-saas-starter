import type { EmailProvider, SendEmailOptions, EmailResponse, EmailAttachment } from '../../../../types'

export class ResendProvider implements EmailProvider {
    private apiKey: string

    constructor(apiKey: string) {
        this.apiKey = apiKey
    }

    async send(options: SendEmailOptions): Promise<EmailResponse> {
        try {
            const payload = {
                from: options.from,
                to: Array.isArray(options.to) ? options.to : [options.to],
                cc: options.cc ? (Array.isArray(options.cc) ? options.cc : [options.cc]) : undefined,
                bcc: options.bcc ? (Array.isArray(options.bcc) ? options.bcc : [options.bcc]) : undefined,
                subject: options.subject,
                html: options.html,
                text: options.text,
                attachments: options.attachments?.map((att: EmailAttachment) => ({
                    filename: att.filename,
                    content: att.content
                }))
            }

            const response = await $fetch<{ id: string }>('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: payload
            })

            return {
                success: true,
                messageId: response.id
            }
        } catch (error) {
            console.error('Resend email error:', error)
            return {
                success: false,
                error: (error as { message?: string })?.message || 'Failed to send email via Resend'
            }
        }
    }
}
