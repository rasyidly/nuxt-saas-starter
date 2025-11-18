import { LazyConfirmationModal } from '#components'
import type { ButtonProps, ModalProps } from '@nuxt/ui'

type Action = {
    onConfirm?: ButtonProps['onClick']
    onCancel?: ButtonProps['onClick']
    modal?: ModalProps
    cancel?: ButtonProps
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
            color: props.color || 'warning',
            title: props.title || 'Are you sure?',
            description: props.description || 'This action cannot be undone.',
            icon: props.icon || 'i-lucide-alert-triangle',
            modal: {
                title: 'Please Confirm',
                ...props.modal
            },
            cancel: {
                label: 'Cancel',
                variant: 'outline',
                onClick: props.onCancel,
                ...props.cancel
            },
            confirm: {
                onClick: props.onConfirm,
                label: 'Confirm',
                variant: 'solid',
                ...props.confirm
            }
        },
        defaultOpen: true
    })
}
