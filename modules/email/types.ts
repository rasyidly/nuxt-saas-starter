// Email provider interface
export interface SendEmailOptions {
    from?: string
    to: string | string[]
    cc?: string | string[]
    bcc?: string | string[]
    subject: string
    html: string
    text?: string
    attachments?: EmailAttachment[]
}

export interface EmailAttachment {
    filename: string
    content: string | Buffer
    contentType?: string
}

export interface EmailProvider {
    send(options: SendEmailOptions): Promise<EmailResponse>
}

export interface EmailResponse {
    success: boolean
    messageId?: string
    error?: string
}

export type EmailProviderType = 'resend' | 'smtp'
