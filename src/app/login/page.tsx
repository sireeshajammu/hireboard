'use client'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.trim()) { setError('Email is required'); return }
    if (!password.trim()) { setError('Password is required'); return }

    setLoading(true)
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        router.push('/')
        router.refresh()
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#0F1117' }}>
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">⬡ HireBoard</h1>
            <p className="text-gray-400">Sign in to your recruitment dashboard</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Welcome back</h2>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sarah.johnson@hireboard.io"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-lg text-white font-medium transition disabled:opacity-50"
                style={{ backgroundColor: '#6C63FF' }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 font-medium mb-1">Demo credentials:</p>
              <p className="text-xs text-gray-600">Email: sarah.johnson@hireboard.io</p>
              <p className="text-xs text-gray-600">Password: hireboard123</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="hidden lg:flex flex-1 items-center justify-center p-12"
        style={{ backgroundColor: '#6C63FF' }}
      >
        <div className="text-white max-w-md">
          <h2 className="text-4xl font-bold mb-4">Modern Recruitment, Simplified</h2>
          <p className="text-indigo-200 text-lg">Track candidates, schedule interviews, and manage your entire hiring pipeline in one place.</p>
          <div className="mt-8 space-y-3">
            {['Drag-drop candidate pipeline', 'Interview scheduling', 'Real-time dashboard', 'Multi-job tracking'].map(feature => (
              <div key={feature} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</div>
                <span className="text-indigo-100">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
