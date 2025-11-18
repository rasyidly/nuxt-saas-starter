import { LazyConfirmationModal } from '#components'
import type { ButtonProps } from '@nuxt/ui'

type Action = {
    onConfirm?: () => void
    onCancel?: () => void
    close?: ButtonProps
    confirm?: ButtonProps
    color?: Color
    icon?: string
    title?: string
    description?: string
}

export function useConfirmation(props: Action) {
    const overlay = useOverlay()

    return overlay.create(LazyConfirmationModal, {
        props: {
            onConfirm: props.onConfirm,
            onCancel: props.onCancel,
            color: props.color || 'warning',
            title: props.title || 'Are you sure?',
            description: props.description || 'This action cannot be undone.',
            icon: props.icon || 'i-lucide-alert-triangle',
            close: props.close,
            confirm: props.confirm
        },
        defaultOpen: true
    })
}
