// app/page.js
'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/auth/signin');
  };

  return (
    <>
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="font-bold text-xl">
              MagicMail
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
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-all duration-200"
              >
                Sign In
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="pt-16 pb-12 text-center">
            {/* Decorative circles in the background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[800px] h-[800px] bg-gradient-to-r from-blue-50 to-purple-50 rounded-full opacity-20 blur-3xl"></div>
            </div>

            {/* Email Icon */}
            <div className="mx-auto w-24 h-24 mb-8">
              <svg viewBox="0 0 24 24" className="w-full h-full stroke-current">
                <path 
                  fill="none" 
                  strokeWidth="1.5"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  className="animate-[draw_3s_ease-in-out_infinite]"
                />
                <circle 
                  cx="12" 
                  cy="12" 
                  r="3" 
                  fill="none" 
                  strokeWidth="1.5"
                  className="animate-[pulse_2s_ease-in-out_infinite]"
                />
              </svg>
            </div>

            <h1 className="font-extrabold tracking-tight text-6xl sm:text-7xl text-gray-900 mb-4 font-['Inter'] leading-tight">
              Generate Perfect Emails<br/>with AI
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 mb-8">
              Create professional emails in seconds. Perfect for business, sales, or personal communication.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleGetStarted}
                className="rounded-lg bg-black px-10 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-gray-800 transition-all duration-200 transform hover:scale-105"
              >
                Get Started
              </button>
              <Link
                href="/templates"
                className="rounded-lg bg-white px-10 py-3.5 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 transition-all duration-200"
              >
                View Templates
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-black rounded-xl p-8 text-white transform transition-all duration-200 hover:scale-105 hover:rotate-1">
              <div className="mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Templates</h3>
              <p className="text-gray-300">Choose from various pre-built professional email templates</p>
            </div>

            <div className="bg-black rounded-xl p-8 text-white transform transition-all duration-200 hover:scale-105 hover:rotate-1">
              <div className="mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Generation</h3>
              <p className="text-gray-300">Powered by advanced AI technology for natural-sounding emails</p>
            </div>

            <div className="bg-black rounded-xl p-8 text-white transform transition-all duration-200 hover:scale-105 hover:rotate-1">
              <div className="mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick & Easy</h3>
              <p className="text-gray-300">Generate professional emails in just a few clicks</p>
            </div>
          </div>

          {/* Preview Section */}
          <div className="mx-auto max-w-5xl bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-20 transform transition-all duration-500 hover:shadow-2xl">
            <div className="p-8">
              <div className="flex gap-2 mb-8">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Email Type</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-gray-200 hover:border-black transition-colors cursor-pointer">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-blue-500">📧</span>
                        <span className="font-medium">Business Email</span>
                      </div>
                      <p className="text-sm text-gray-600">Professional communication for business purposes</p>
                    </div>
                    <div className="p-4 rounded-xl border border-gray-200 hover:border-black transition-colors cursor-pointer">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-red-500">🎯</span>
                        <span className="font-medium">Sales Pitch</span>
                      </div>
                      <p className="text-sm text-gray-600">Persuasive emails to promote products or services</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}