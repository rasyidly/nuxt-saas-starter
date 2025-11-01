import { LazyConfirmationModal } from '#components'

type Action = {
    onConfirm?: () => void
    onCancel?: () => void
    confirm?: {
        text?: string
        color?: Color
        icon?: string
    }
    color?: Color
    icon?: string
    title?: string
    description?: string
}

export default function useConfirmation(props: Action) {
    const overlay = useOverlay()

    return overlay.create(LazyConfirmationModal, {
        props: {
            onConfirm: props.onConfirm,
            onCancel: props.onCancel,
            color: props.color || 'warning',
            title: props.title || 'Are you sure?',
            description: props.description || 'This action cannot be undone.',
            icon: props.icon || 'i-lucide-alert-triangle',
            confirm: props.confirm
        },
        defaultOpen: true
    })
}
