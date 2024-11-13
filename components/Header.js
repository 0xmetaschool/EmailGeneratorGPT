'use client'

import Link from 'next/link'

const Header = () => {
  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="font-bold text-xl">
            Email Generator
          </Link>
          
          <nav className="flex items-center space-x-4">
            <Link 
              href="/dashboard" 
              className="px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              href="/templates" 
              className="px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
            >
              Templates
            </Link>
            <Link 
              href="/signin"
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Sign In
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header