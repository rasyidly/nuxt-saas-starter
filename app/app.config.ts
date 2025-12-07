export default defineAppConfig({
    ui: {
        colors: {
            primary: 'teal',
            neutral: 'zinc'
        },
        button: {
            defaultVariants: {
                color: 'neutral'
            }
        },
        toast: {
            defaultVariants: {
                color: 'neutral'
            }
        },
        checkbox: {
            defaultVariants: {
                color: 'neutral'
            }
        },
        input: {
            slots: {
                root: 'w-full'
            }
        },
        select: {
            slots: {
                base: 'w-full',
                content: 'min-w-fit'
            }
        },
        selectMenu: {
            slots: {
                base: 'w-full'
            }
        },
        textarea: {
            slots: {
                root: 'w-full'
            }
        },
        formField: {
            slots: {
                label: 'text-xs text-muted'
            }
        },
        checkboxGroup: {
            variants: {
                size: {
                    xs: {
                        item: 'first-of-type:rounded-s-md! last-of-type:rounded-e-md!'
                    }
                }
            }
        },
        modal: {
            slots: {
                overlay: 'backdrop-blur-xs bg-muted/40'
            }
        },
        table: {
            defaultVariants: {
                loadingColor: 'neutral'
            },
            slots: {
                root: 'shrink-0',
                thead: 'bg-muted text-nowrap',
                th: 'first:rounded-s-md last:rounded-e-md',
                separator: 'hidden'
            }
        },
        empty: {
            slots: {
                header: 'max-w-xl',
                body: 'max-w-xl'
            }
        }
    }
})
