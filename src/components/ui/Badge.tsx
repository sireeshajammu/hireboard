import React from 'react'

type BadgeVariant = 'applied' | 'screened' | 'interviewed' | 'offered' | 'rejected'

interface BadgeProps {
  variant: BadgeVariant
  label?: string
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  applied: 'bg-blue-100 text-blue-800 border-blue-200',
  screened: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  interviewed: 'bg-purple-100 text-purple-800 border-purple-200',
  offered: 'bg-green-100 text-green-800 border-green-200',
  rejected: 'bg-red-100 text-red-800 border-red-200',
}

const variantLabels: Record<BadgeVariant, string> = {
  applied: 'Applied',
  screened: 'Screened',
  interviewed: 'Interviewed',
  offered: 'Offered',
  rejected: 'Rejected',
}

export const Badge = ({ variant, label, className = '' }: BadgeProps) => {
  return (
    <span
      role="status"
      aria-label={`Candidate status: ${label ?? variantLabels[variant]}`}
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        border ${variantStyles[variant]} ${className}
      `}
    >
      {label ?? variantLabels[variant]}
    </span>
  )
}

export default Badge
