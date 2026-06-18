'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

const navItems = [
  { label: 'Overview', href: '/', icon: '▦' },
  { label: 'Jobs', href: '/jobs', icon: '💼' },
  { label: 'Candidates', href: '/candidates', icon: '👤' },
  { label: 'Applications', href: '/applications', icon: '📋' },
  { label: 'Interviews', href: '/interviews', icon: '📅' },
]

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  if (pathname === '/login') return null

  return (
    <>
      <div
        style={{ backgroundColor: '#0F1117' }}
        className="flex items-center justify-between px-4 py-3"
      >
        <h1 className="text-white font-bold">⬡ HireBoard</h1>
        <button
          onClick={() => setOpen(!open)}
          className="text-white text-xl"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {open && (
        <div
          style={{ backgroundColor: '#0F1117' }}
          className="flex flex-col px-4 pb-4 gap-1"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive ? 'text-white font-medium' : 'text-gray-400'
                }`}
                style={isActive ? { backgroundColor: '#6C63FF' } : {}}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            )
          })}
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="text-left px-3 py-2.5 text-gray-400 text-sm"
          >
            → Sign out
          </button>
        </div>
      )}
    </>
  )
}