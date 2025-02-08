import Link from 'next/link'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold">Mini CMS</span>
              </Link>
            </div>
            <div className="flex items-center">
              <Link href="/login" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md">
                Login
              </Link>
              <Link href="/blogs" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md">
                Blogs
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
