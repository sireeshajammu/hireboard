'use client'
import React, { useState, useEffect } from 'react'

interface Job {
  id: string
  title: string
  department: string
  description?: string
  salary?: string
  status: string
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ title: '', department: '', description: '', salary: '', status: 'open' })

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/jobs')
      const data = await response.json()
      setJobs(data)
    } catch (error) {
      console.error('Failed to fetch jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:4000/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const newJob = await response.json()
      setJobs([...jobs, newJob])
      setFormData({ title: '', department: '', description: '', salary: '', status: 'open' })
      setShowForm(false)
    } catch (error) {
      console.error('Failed to create job:', error)
    }
  }

  const handleDeleteJob = async (jobId: string) => {
    try {
      await fetch(`http://localhost:4000/api/jobs/${jobId}`, { method: 'DELETE' })
      setJobs(jobs.filter(j => j.id !== jobId))
    } catch (error) {
      console.error('Failed to delete job:', error)
    }
  }

  if (loading) return <div className="p-6">Loading...</div>

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Job Openings</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {showForm ? 'Cancel' : 'Post New Job'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreateJob} className="mb-6 p-4 bg-white rounded-lg shadow border border-gray-200">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Job Title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="border border-gray-300 rounded px-3 py-2"
              required
            />
            <input
              type="text"
              placeholder="Department"
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
              className="border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          />
          <input
            type="text"
            placeholder="Salary (optional)"
            value={formData.salary}
            onChange={(e) => setFormData({...formData, salary: e.target.value})}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Post Job
          </button>
        </form>
      )}

      <div className="grid gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="p-4 bg-white rounded-lg shadow border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                <p className="text-sm text-gray-500">{job.department}</p>
                {job.description && <p className="text-sm text-gray-600 mt-1">{job.description}</p>}
                {job.salary && <p className="text-sm text-gray-600">{job.salary}</p>}
              </div>
              <button
                onClick={() => handleDeleteJob(job.id)}
                className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}