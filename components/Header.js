// components/Header.js
'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="font-bold text-xl">
            Email Generator
          </Link>
          
          <nav className="flex items-center space-x-8">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
              Dashboard
            </Link>
            <Link href="/templates" className="text-gray-600 hover:text-gray-900">
              Templates
            </Link>
            <Link 
              href="/auth/signin"
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
            >
              Sign In
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}