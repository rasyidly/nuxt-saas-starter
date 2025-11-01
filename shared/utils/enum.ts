import type { Color } from '~~/shared/types'

export const Enum = {
    OrganizationRoles: [
        { value: 'owner', label: 'Owner', color: 'primary', icon: 'i-lucide-shield-check', description: 'Full access to all settings and data.' },
        { value: 'admin', label: 'Admin', color: 'success', icon: 'i-lucide-user-check', description: 'Can manage settings and users.' },
        { value: 'member', label: 'Member', color: 'info', icon: 'i-lucide-user', description: 'As student, can view content and participate in discussions.' }
    ],
    YearStatus: [
        { value: true, label: 'Active', color: 'success', icon: 'i-lucide-check-circle' },
        { value: false, label: 'Inactive', color: 'neutral', icon: 'i-lucide-x-circle' }
    ] satisfies { value: boolean, label: string, color: Color, icon: string }[],
    PeriodStatus: [
        { value: true, label: 'Active', color: 'success', icon: 'i-lucide-check-circle' },
        { value: false, label: 'Inactive', color: 'neutral', icon: 'i-lucide-x-circle' }
    ] satisfies { value: boolean, label: string, color: Color, icon: string }[],
    StudentStatus: [
        { value: 'active', label: 'Active', color: 'success', icon: 'i-lucide-check-circle' },
        { value: 'graduated', label: 'Graduated', color: 'primary', icon: 'i-lucide-graduation-cap' },
        { value: 'dropped_out', label: 'Dropout', color: 'error', icon: 'i-lucide-user-x' },
        { value: 'transferred', label: 'Transferred', color: 'warning', icon: 'i-lucide-arrow-right-left' },
        { value: 'suspended', label: 'Suspended', color: 'error', icon: 'i-lucide-pause-circle' }
    ] satisfies { value: string, label: string, color: Color, icon: string }[],
    Gender: [
        { value: 'L', label: 'Male', color: 'primary', icon: 'i-lucide-mars' },
        { value: 'P', label: 'Female', color: 'primary', icon: 'i-lucide-venus' }
    ] satisfies { value: string, label: string, color: Color, icon: string }[],
    AbsenceType: [
        { value: 'absent', label: 'Absent', color: 'error', icon: 'i-lucide-x-circle' },
        { value: 'sick', label: 'Sick', color: 'warning', icon: 'i-lucide-activity' },
        { value: 'permission', label: 'Permission', color: 'info', icon: 'i-lucide-check-circle' },
        { value: 'late', label: 'Late', color: 'warning', icon: 'i-lucide-clock' }
    ] satisfies { value: string, label: string, color: Color, icon: string }[],
    ActivityType: [
        { value: 'learning', label: 'Learning', color: 'primary', icon: 'i-lucide-book-open' },
        { value: 'ceremony', label: 'Ceremony', color: 'success', icon: 'i-lucide-flag' },
        { value: 'extracurricular', label: 'Extracurricular', color: 'info', icon: 'i-lucide-users' },
        { value: 'examination', label: 'Examination', color: 'warning', icon: 'i-lucide-file-text' },
        { value: 'event', label: 'Event', color: 'primary', icon: 'i-lucide-calendar' },
        { value: 'other', label: 'Other', color: 'neutral', icon: 'i-lucide-more-horizontal' }
    ] satisfies { value: string, label: string, color: Color, icon: string }[]
}
