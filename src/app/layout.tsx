import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/hireboard/Sidebar'
import SessionProvider from '@/components/SessionProvider'
import MobileNav from '@/components/hireboard/MobileNav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HireBoard',
  description: 'Modern Recruitment Tracking System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={null}>
          <div className="flex h-screen bg-gray-50">
            <div className="hidden md:block">
              <Sidebar />
            </div>
            <div className="flex flex-col flex-1 overflow-hidden">
              <div className="md:hidden">
                <MobileNav />
              </div>
              <main className="flex-1 overflow-y-auto">
                {children}
              </main>
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}
