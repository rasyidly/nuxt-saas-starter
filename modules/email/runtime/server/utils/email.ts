import type { EmailProvider, SendEmailOptions, EmailResponse, EmailProviderType } from '../../../types'
import { ResendProvider } from './providers/resend'
import { SMTPProvider } from './providers/smtp'

// Email provider registry
const emailProviders = new Map<EmailProviderType, EmailProvider>()

// Initialize email provider based on configuration
function initializeEmailProvider(): EmailProvider {
    const provider = process.env.MAIL_PROVIDER as EmailProviderType || 'resend'

    if (emailProviders.has(provider)) {
        return emailProviders.get(provider)!
    }

    let providerInstance: EmailProvider

    switch (provider) {
        case 'resend': {
            const resendKey = process.env.MAIL_RESEND_KEY
            if (!resendKey) {
                throw new Error('MAIL_RESEND_KEY is required when using resend provider')
            }
            providerInstance = new ResendProvider(resendKey)
            break
        }

        case 'smtp': {
            const smtpConfig = {
                host: process.env.MAIL_SMTP_HOST || 'localhost',
                port: parseInt(process.env.MAIL_SMTP_PORT || '587'),
                username: process.env.MAIL_SMTP_USERNAME || '',
                password: process.env.MAIL_SMTP_PASSWORD || '',
                secure: process.env.MAIL_SMTP_SECURE === 'true'
            }
            providerInstance = new SMTPProvider(smtpConfig)
            break
        }

        default:
            throw new Error(`Unsupported email provider: ${provider}`)
    }

    emailProviders.set(provider, providerInstance)
    return providerInstance
}

/**
 * Send email using the configured provider
 */
export async function sendEmail(options: SendEmailOptions): Promise<EmailResponse> {
    try {
        // Use default from address if not provided
        const fromAddress = options.from || process.env.MAIL_FROM

        if (!fromAddress) {
            throw new Error('From address is required')
        }

        const emailOptions: SendEmailOptions = {
            ...options,
            from: fromAddress
        }

        const provider = initializeEmailProvider()
        return await provider.send(emailOptions)
    } catch (error) {
        console.error('Email send error:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to send email'
        }
    }
}

// Export types for external use
export type { SendEmailOptions, EmailResponse, EmailAttachment } from '../../../types'
