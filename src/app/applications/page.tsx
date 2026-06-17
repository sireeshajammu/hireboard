'use client'
import React, { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/Badge'

interface Job {
  id: string
  title: string
  department: string
  applications: Application[]
}

interface Application {
  id: string
  candidateId: string
  candidate: { name: string; email: string }
  status: string
}

const stages = ['applied', 'screened', 'interviewed', 'offered', 'rejected']

export default function ApplicationsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/jobs')
      const data = await response.json()
      setJobs(data)
      if (data.length > 0) setSelectedJobId(data[0].id)
    } catch (error) {
      console.error('Failed to fetch jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDragStart = (e: React.DragEvent, appId: string) => {
    e.dataTransfer.setData('applicationId', appId)
  }

  const handleDrop = async (e: React.DragEvent, newStatus: string) => {
    e.preventDefault()
    const appId = e.dataTransfer.getData('applicationId')
    
    try {
      await fetch(`http://localhost:4000/api/applications/${appId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      fetchJobs()
    } catch (error) {
      console.error('Failed to update application:', error)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  if (loading) return <div className="p-6">Loading...</div>

  const selectedJob = jobs.find(j => j.id === selectedJobId)

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Applications Pipeline</h1>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {jobs.map((job) => (
          <button
            key={job.id}
            onClick={() => setSelectedJobId(job.id)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              selectedJobId === job.id
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {job.title} ({job.applications?.length || 0})
          </button>
        ))}
      </div>

      {selectedJob && (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {stages.map((stage) => {
            const stageApps = selectedJob.applications?.filter(
              a => a.status === stage
            ) || []

            return (
              <div
                key={stage}
                onDrop={(e) => handleDrop(e, stage)}
                onDragOver={handleDragOver}
                className="flex-shrink-0 w-72 bg-white rounded-xl border border-gray-200 shadow-sm p-4"
              >
                <h3 className="font-semibold text-gray-900 capitalize mb-3">
                  {stage} ({stageApps.length})
                </h3>

                <div className="space-y-2 min-h-48">
                  {stageApps.map((app) => (
                    <div
                      key={app.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, app.id)}
                      className="p-3 bg-gray-50 border border-gray-200 rounded-lg cursor-grab hover:shadow-md transition"
                    >
                      <p className="font-medium text-gray-900">{app.candidate.name}</p>
                      <p className="text-xs text-gray-500">{app.candidate.email}</p>
                    </div>
                  ))}

                  {stageApps.length === 0 && (
                    <div className="flex items-center justify-center h-24 border-2 border-dashed border-gray-200 rounded text-gray-400 text-sm">
                      Drop here
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}