'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalCandidates: 0,
    totalInterviews: 0,
    totalApplications: 0
  })
  const [recentCandidates, setRecentCandidates] = useState<any[]>([])
  const [recentInterviews, setRecentInterviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('https://hireboard-production-178c.up.railway.app/api/jobs').then(r => r.json()),
      fetch('https://hireboard-production-178c.up.railway.app/api/candidates').then(r => r.json()),
      fetch('https://hireboard-production-178c.up.railway.app/api/interviews').then(r => r.json()),
      fetch('https://hireboard-production-178c.up.railway.app/api/applications').then(r => r.json()),
    ]).then(([jobs, candidates, interviews, applications]) => {
      setStats({
        totalJobs: jobs.length,
        totalCandidates: candidates.length,
        totalInterviews: interviews.length,
        totalApplications: applications.length
      })
      setRecentCandidates(candidates.slice(0, 5))
      setRecentInterviews(interviews.slice(0, 5))
      setLoading(false)
    })
  }, [])

  if (loading) return <div className="p-6">Loading...</div>

  const kpis = [
    { label: 'Open Jobs', value: stats.totalJobs, color: '#6C63FF', bg: '#EEF2FF', href: '/jobs' },
    { label: 'Candidates', value: stats.totalCandidates, color: '#0EA5E9', bg: '#F0F9FF', href: '/candidates' },
    { label: 'Applications', value: stats.totalApplications, color: '#10B981', bg: '#ECFDF5', href: '/applications' },
    { label: 'Interviews', value: stats.totalInterviews, color: '#F59E0B', bg: '#FFFBEB', href: '/interviews' },
  ]

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Welcome back, Sarah 👋</h1>
        <p className="text-gray-500 text-sm mt-1">Here's what's happening with your recruitment pipeline today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi) => (
          <Link href={kpi.href} key={kpi.label}>
            <div
              className="rounded-xl p-4 border border-gray-100 hover:shadow-md transition cursor-pointer"
              style={{ backgroundColor: kpi.bg }}
            >
              <p className="text-sm text-gray-500 mb-2">{kpi.label}</p>
              <p className="text-3xl font-bold" style={{ color: kpi.color }}>{kpi.value}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Recent Candidates */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Recent Candidates</h2>
            <Link href="/candidates" className="text-sm text-indigo-600 hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {recentCandidates.length === 0 && (
              <p className="text-sm text-gray-400">No candidates yet</p>
            )}
            {recentCandidates.map((candidate) => (
              <div key={candidate.id} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0"
                  style={{ backgroundColor: '#6C63FF' }}
                >
                  {candidate.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{candidate.name}</p>
                  <p className="text-xs text-gray-500">{candidate.email}</p>
                </div>
                <span className="ml-auto text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 capitalize">
                  {candidate.stage?.toLowerCase() || 'applied'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Interviews */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Upcoming Interviews</h2>
            <Link href="/interviews" className="text-sm text-indigo-600 hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {recentInterviews.length === 0 && (
              <p className="text-sm text-gray-400">No interviews scheduled yet</p>
            )}
            {recentInterviews.map((interview) => (
              <div key={interview.id} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0"
                  style={{ backgroundColor: '#F59E0B' }}
                >
                  {interview.application?.candidate?.name?.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{interview.application?.candidate?.name}</p>
                  <p className="text-xs text-gray-500">{interview.application?.job?.title}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-xs font-medium text-gray-900">
                    {new Date(interview.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{interview.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
