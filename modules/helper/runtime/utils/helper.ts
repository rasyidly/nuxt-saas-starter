import type { UseDateFormatOptions } from '@vueuse/core'

export function useEnum<T extends readonly { value: string | boolean }[]>(
    enumArray: T,
    value: string | boolean
): T[number] | undefined {
    return enumArray.find(item => item.value === value)
}

export function isPast(date: string): boolean {
    return new Date(date) < new Date()
}

export function formatCurrency(amount: string | number, options?: Intl.NumberFormatOptions): string {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        ...options
    }).format(num)
}

export function formatDate(date: string | Date, format: string = 'DD MMM YYYY', options?: UseDateFormatOptions): string {
    return useDateFormat(date, format, {
        locales: 'id-ID',
        ...options
    }).value
}

export function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '')
}
