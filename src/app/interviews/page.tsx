'use client'
import React, { useState, useEffect } from 'react'

interface Interview {
  id: string
  date: string
  type: string
  application: {
    candidate: { name: string; email: string }
    job: { title: string }
  }
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
        <div>
          <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
      <div className="text-right">
        <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
        <div className="h-5 bg-gray-200 rounded-full w-20"></div>
      </div>
    </div>
  )
}

const typeColors: Record<string, string> = {
  phone: 'bg-blue-50 text-blue-700',
  technical: 'bg-purple-50 text-purple-700',
  final: 'bg-green-50 text-green-700',
}

export default function InterviewsPage() {
  const [interviews, setInterviews] = useState<Interview[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('http://localhost:4000/api/interviews')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      })
      .then(data => { setInterviews(data); setLoading(false) })
      .catch(() => {
        setError('Failed to load interviews. Make sure the server is running.')
        setLoading(false)
      })
  }, [])

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Interviews</h1>
        <p className="text-sm text-gray-500 mt-1">
          {loading ? 'Loading...' : `${interviews.length} scheduled`}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center justify-between">
          {error}
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600">✕</button>
        </div>
      )}

      <div className="grid gap-3">
        {loading && [1,2,3,4].map(i => <SkeletonCard key={i} />)}

        {!loading && interviews.map((interview) => (
          <div key={interview.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between hover:shadow-sm transition">
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0"
                style={{ backgroundColor: '#6C63FF' }}
              >
                {interview.application?.candidate?.name?.split(' ').map((n: string) => n[0]).join('')}
              </div>
              <div>
                <p className="font-medium text-gray-900">{interview.application?.candidate?.name}</p>
                <p className="text-sm text-gray-500">{interview.application?.job?.title}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {new Date(interview.date).toLocaleDateString('en-US', {
                  month: 'short', day: 'numeric', year: 'numeric'
                })}
              </p>
              <span className={`text-xs px-2 py-1 rounded-full capitalize ${typeColors[interview.type] || 'bg-gray-100 text-gray-600'}`}>
                {interview.type}
              </span>
            </div>
          </div>
        ))}

        {!loading && interviews.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400">
            No interviews scheduled yet
          </div>
        )}
      </div>
    </div>
  )
}