'use client'
import React, { useState, useEffect } from 'react'

interface Job {
  id: string
  title: string
  department: string
  description?: string
  salary?: string
  status: string
  applications?: any[]
}

interface FormErrors {
  title?: string
  department?: string
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({ title: '', department: '', description: '', salary: '', status: 'open' })
  const [formErrors, setFormErrors] = useState<FormErrors>({})

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/jobs')
      if (!response.ok) throw new Error('Failed to fetch jobs')
      const data = await response.json()
      setJobs(data)
    } catch (err) {
      setError('Failed to load jobs. Make sure the server is running.')
    } finally {
      setLoading(false)
    }
  }

  const validate = () => {
    const errors: FormErrors = {}
    if (!formData.title.trim()) errors.title = 'Job title is required'
    if (!formData.department.trim()) errors.department = 'Department is required'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    try {
      const response = await fetch('http://localhost:4000/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (!response.ok) throw new Error('Failed to create job')
      const newJob = await response.json()
      setJobs([...jobs, newJob])
      setFormData({ title: '', department: '', description: '', salary: '', status: 'open' })
      setFormErrors({})
      setShowForm(false)
    } catch (err) {
      setError('Failed to create job. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteJob = async (jobId: string) => {
    try {
      const response = await fetch(`http://localhost:4000/api/jobs/${jobId}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Failed to delete job')
      setJobs(jobs.filter(j => j.id !== jobId))
    } catch (err) {
      setError('Failed to delete job. Please try again.')
    }
  }

  if (loading) return (
    <div className="p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-48"></div>
        {[1,2,3].map(i => (
          <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Job Openings</h1>
          <p className="text-sm text-gray-500 mt-1">{jobs.length} active positions</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setFormErrors({}) }}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-medium"
        >
          {showForm ? 'Cancel' : '+ Post New Job'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center justify-between">
          {error}
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600">✕</button>
        </div>
      )}

      {showForm && (
        <form onSubmit={handleCreateJob} className="mb-6 p-5 bg-white rounded-xl shadow-sm border border-gray-200">
          <h2 className="font-semibold text-gray-900 mb-4">New Job Posting</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Senior Frontend Engineer"
                value={formData.title}
                onChange={(e) => { setFormData({...formData, title: e.target.value}); setFormErrors({...formErrors, title: undefined}) }}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${formErrors.title ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
              />
              {formErrors.title && <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Engineering"
                value={formData.department}
                onChange={(e) => { setFormData({...formData, department: e.target.value}); setFormErrors({...formErrors, department: undefined}) }}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${formErrors.department ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
              />
              {formErrors.department && <p className="text-red-500 text-xs mt-1">{formErrors.department}</p>}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              placeholder="Describe the role, responsibilities, and requirements..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
            <input
              type="text"
              placeholder="e.g. $100k-120k"
              value={formData.salary}
              onChange={(e) => setFormData({...formData, salary: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition text-sm font-medium disabled:opacity-50"
          >
            {submitting ? 'Posting...' : 'Post Job'}
          </button>
        </form>
      )}

      <div className="grid gap-3">
        {jobs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-400 text-sm">No job openings yet.</p>
            <button onClick={() => setShowForm(true)} className="mt-2 text-indigo-600 text-sm hover:underline">
              Post your first job →
            </button>
          </div>
        )}
        {jobs.map((job) => (
          <div key={job.id} className="p-5 bg-white rounded-xl border border-gray-200 hover:shadow-sm transition">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900">{job.title}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">
                    {job.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{job.department}</p>
                {job.description && <p className="text-sm text-gray-600 mt-2">{job.description}</p>}
                <div className="flex items-center gap-4 mt-3">
                  {job.salary && <span className="text-sm text-gray-500">💰 {job.salary}</span>}
                  <span className="text-sm text-gray-500">👥 {job.applications?.length || 0} applicants</span>
                </div>
              </div>
              <button
                onClick={() => handleDeleteJob(job.id)}
                className="ml-4 px-3 py-1 text-sm text-red-500 hover:bg-red-50 rounded-lg transition"
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