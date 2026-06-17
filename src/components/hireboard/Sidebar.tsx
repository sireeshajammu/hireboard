'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { label: 'Overview', href: '/', icon: '▦' },
  { label: 'Jobs', href: '/jobs', icon: '💼' },
  { label: 'Candidates', href: '/candidates', icon: '👤' },
  { label: 'Applications', href: '/applications', icon: '📋' },
  { label: 'Interviews', href: '/interviews', icon: '📅' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      style={{ backgroundColor: '#0F1117', width: '240px', minHeight: '100vh' }}
      className="flex flex-col py-6 px-4 flex-shrink-0"
    >
      <div className="mb-8 px-2">
        <h1 className="text-white text-xl font-bold tracking-tight">
          ⬡ HireBoard
        </h1>
        <p className="text-gray-500 text-xs mt-1">Recruitment Platform</p>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors
                ${isActive
                  ? 'text-white font-medium'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }
              `}
              style={isActive ? { backgroundColor: '#6C63FF' } : {}}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto px-2">
        <div className="flex items-center gap-3 py-3 border-t border-white/10">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
            style={{ backgroundColor: '#6C63FF' }}
          >
            SJ
          </div>
          <div>
            <p className="text-white text-sm font-medium">Sarah Johnson</p>
            <p className="text-gray-500 text-xs">Recruiter</p>
          </div>
        </div>
      </div>
    </aside>
  )
}