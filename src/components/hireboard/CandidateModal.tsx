'use client'
import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Badge } from '../ui/Badge'

interface Candidate {
  id: string
  name: string
  role: string
  email: string
  stage: 'applied' | 'screened' | 'interviewed' | 'offered' | 'rejected'
}

interface CandidateModalProps {
  candidate: Candidate | null
  open: boolean
  onClose: () => void
}

export const CandidateModal = ({ candidate, open, onClose }: CandidateModalProps) => {
  if (!candidate) return null

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Dialog.Content
          className="
            fixed left-1/2 top-1/2 z-50
            -translate-x-1/2 -translate-y-1/2
            bg-white rounded-2xl shadow-xl
            w-full max-w-md p-6
            focus:outline-none
          "
          aria-describedby="candidate-details"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <Dialog.Title className="text-lg font-semibold text-gray-900">
                {candidate.name}
              </Dialog.Title>
              <Dialog.Description className="text-sm text-gray-500 mt-0.5">
                {candidate.role}
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label="Close candidate details"
              className="
                text-gray-400 hover:text-gray-600
                rounded-lg p-1 transition-colors
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
            >
              ✕
            </Dialog.Close>
          </div>

          <div id="candidate-details" className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Status</span>
              <Badge variant={candidate.stage} />
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Email</span>
              <span className="text-sm text-gray-900">{candidate.email}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Applied for</span>
              <span className="text-sm text-gray-900">{candidate.role}</span>
            </div>
          </div>

          <div className="mt-6 flex gap-2 justify-end">
            <Dialog.Close className="
              px-4 py-2 text-sm text-gray-600
              border border-gray-200 rounded-lg
              hover:bg-gray-50 transition-colors
              focus:outline-none focus:ring-2 focus:ring-blue-500
            ">
              Close
            </Dialog.Close>
            <button className="
              px-4 py-2 text-sm text-white
              bg-blue-600 rounded-lg
              hover:bg-blue-700 transition-colors
              focus:outline-none focus:ring-2 focus:ring-blue-500
            ">
              Schedule Interview
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default CandidateModal