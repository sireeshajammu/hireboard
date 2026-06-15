'use client'
import React from 'react'
import { useCandidateStore } from '../../store/candidateStore'
import { CandidateCard } from './CandidateCard'

type Stage = 'applied' | 'screened' | 'interviewed' | 'offered' | 'rejected'

const stages: { id: Stage; label: string; color: string }[] = [
  { id: 'applied', label: 'Applied', color: 'border-t-blue-400' },
  { id: 'screened', label: 'Screened', color: 'border-t-yellow-400' },
  { id: 'interviewed', label: 'Interviewed', color: 'border-t-purple-400' },
  { id: 'offered', label: 'Offered', color: 'border-t-green-400' },
  { id: 'rejected', label: 'Rejected', color: 'border-t-red-400' },
]

export const PipelineBoard = () => {
  const { candidates, moveCandidate } = useCandidateStore()

  const handleDragStart = (e: React.DragEvent, candidateId: string) => {
    e.dataTransfer.setData('candidateId', candidateId)
  }

  const handleDrop = (e: React.DragEvent, stage: Stage) => {
    e.preventDefault()
    const candidateId = e.dataTransfer.getData('candidateId')
    moveCandidate(candidateId, stage)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Recruitment Pipeline</h1>
        <p className="text-sm text-gray-500 mt-1">
          {candidates.length} candidates · drag to move between stages
        </p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => {
          const stageCandidates = candidates.filter((c) => c.stage === stage.id)

          return (
            <div
              key={stage.id}
              onDrop={(e) => handleDrop(e, stage.id)}
              onDragOver={handleDragOver}
              className={`
                flex-shrink-0 w-72 bg-white rounded-xl border border-gray-200
                border-t-4 ${stage.color} shadow-sm
              `}
            >
              <div className="p-3 border-b border-gray-100 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{stage.label}</span>
                <span className="text-xs bg-gray-100 text-gray-500 rounded-full px-2 py-0.5">
                  {stageCandidates.length}
                </span>
              </div>

              <div className="p-2 flex flex-col gap-2 min-h-32">
                {stageCandidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, candidate.id)}
                    className="cursor-grab active:cursor-grabbing"
                  >
                    <CandidateCard
                      name={candidate.name}
                      role={candidate.role}
                      email={candidate.email}
                      stage={candidate.stage}
                    />
                  </div>
                ))}

                {stageCandidates.length === 0 && (
                  <div className="flex items-center justify-center h-24 border-2 border-dashed border-gray-200 rounded-lg">
                    <p className="text-xs text-gray-400">Drop candidates here</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PipelineBoard