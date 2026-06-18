'use client'
import React, { useState, useEffect } from 'react'

interface Candidate {
  id: string
  name: string
  email: string
  phone?: string
  techStack?: string
  yearsOfExperience?: number
  stage: string
}

function SkeletonRow() {
  return (
    <tr className="border-b border-gray-100">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
        </div>
      </td>
      <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded animate-pulse w-40"></div></td>
      <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded animate-pulse w-48"></div></td>
      <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div></td>
      <td className="px-4 py-3"><div className="h-6 bg-gray-200 rounded-full animate-pulse w-20"></div></td>
    </tr>
  )
}

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('https://hireboard-production-178c.up.railway.app/api/candidates')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      })
      .then(data => { setCandidates(data); setLoading(false) })
      .catch(() => {
        setError('Failed to load candidates. Make sure the server is running.')
        setLoading(false)
      })
  }, [])

  const stageColors: Record<string, string> = {
    applied: 'bg-blue-50 text-blue-700',
    screened: 'bg-yellow-50 text-yellow-700',
    interviewed: 'bg-purple-50 text-purple-700',
    offered: 'bg-green-50 text-green-700',
    rejected: 'bg-red-50 text-red-700',
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Candidates</h1>
          <p className="text-sm text-gray-500 mt-1">
            {loading ? 'Loading...' : `${candidates.length} total candidates`}
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center justify-between">
          {error}
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600">✕</button>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Name</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Email</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Tech Stack</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Experience</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Stage</th>
            </tr>
          </thead>
          <tbody>
            {loading && [1,2,3,4,5].map(i => <SkeletonRow key={i} />)}

            {!loading && candidates.map((candidate) => (
              <tr key={candidate.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0"
                      style={{ backgroundColor: '#6C63FF' }}
                    >
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{candidate.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">{candidate.email}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{candidate.techStack || '—'}</td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {candidate.yearsOfExperience ? `${candidate.yearsOfExperience} yrs` : '—'}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${stageColors[candidate.stage?.toLowerCase()] || 'bg-gray-100 text-gray-600'}`}>
                    {candidate.stage?.toLowerCase() || 'applied'}
                  </span>
                </td>
              </tr>
            ))}

            {!loading && candidates.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-gray-400 text-sm">
                  No candidates yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
