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

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:4000/api/candidates')
      .then(res => res.json())
      .then(data => { setCandidates(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="p-6">Loading...</div>

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Candidates</h1>
        <span className="text-sm text-gray-500">{candidates.length} total</span>
      </div>

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
            {candidates.map((candidate) => (
              <tr key={candidate.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium"
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
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                    {candidate.stage?.toLowerCase() || 'applied'}
                  </span>
                </td>
              </tr>
            ))}
            {candidates.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-400 text-sm">
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