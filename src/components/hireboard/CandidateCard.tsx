import React from 'react'
import * as Avatar from '@radix-ui/react-avatar'
import { Badge } from '../ui/Badge'

type Stage = 'applied' | 'screened' | 'interviewed' | 'offered' | 'rejected'

interface CandidateCardProps {
  name: string
  role: string
  email: string
  stage: Stage
  avatarUrl?: string
  onClick?: () => void
}

export const CandidateCard = ({
  name,
  role,
  email,
  stage,
  avatarUrl,
  onClick,
}: CandidateCardProps) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <article
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Candidate ${name} applying for ${role}`}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      className="
        bg-white border border-gray-200 rounded-xl p-4
        flex items-start gap-3 cursor-pointer
        hover:shadow-md hover:border-gray-300
        transition-all duration-150 focus:outline-none
        focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
      "
    >
      <Avatar.Root className="w-10 h-10 rounded-full flex-shrink-0">
        <Avatar.Image
          src={avatarUrl}
          alt={name}
          className="w-full h-full rounded-full object-cover"
        />
        <Avatar.Fallback
          className="
            w-10 h-10 rounded-full bg-blue-100 text-blue-700
            flex items-center justify-center text-sm font-medium
          "
        >
          {initials}
        </Avatar.Fallback>
      </Avatar.Root>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-medium text-gray-900 truncate">{name}</h3>
          <Badge variant={stage} />
        </div>
        <p className="text-xs text-gray-500 truncate mt-0.5">{role}</p>
        <p className="text-xs text-gray-400 truncate">{email}</p>
      </div>
    </article>
  )
}

export default CandidateCard