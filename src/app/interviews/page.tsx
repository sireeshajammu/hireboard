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

export default function InterviewsPage() {
  const [interviews, setInterviews] = useState<Interview[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:4000/api/interviews')
      .then(res => res.json())
      .then(data => { setInterviews(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="p-6">Loading...</div>

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Interviews</h1>
        <p className="text-sm text-gray-500 mt-1">{interviews.length} scheduled</p>
      </div>

      <div className="grid gap-4">
        {interviews.map((interview) => (
          <div key={interview.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium"
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
              <span className="text-xs px-2 py-1 rounded-full bg-purple-50 text-purple-700 capitalize">
                {interview.type}
              </span>
            </div>
          </div>
        ))}
        {interviews.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400">
            No interviews scheduled yet
          </div>
        )}
      </div>
    </div>
  )
}