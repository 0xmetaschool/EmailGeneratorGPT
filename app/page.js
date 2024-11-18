'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Mail, Sparkles, Zap, History } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="pt-16 pb-16">
          <div className="text-center space-y-8 relative">
            {/* Background Decoration */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-blue-500/10 animate-pulse" />
              <div className="absolute top-40 right-20 w-16 h-16 rounded-full bg-purple-500/10 animate-pulse delay-300" />
              <div className="absolute bottom-10 left-1/4 w-24 h-24 rounded-full bg-indigo-500/10 animate-pulse delay-500" />
              <svg className="absolute top-1/4 right-1/4 w-64 h-64 text-gray-800/20 animate-[spin_30s_linear_infinite]" viewBox="0 0 24 24" fill="none">
                <path d="M21.2 8.4c-.5-1.2-1.3-2.3-2.3-3.2-.9-1-2-1.8-3.2-2.3-1.2-.5-2.5-.8-3.8-.8s-2.6.3-3.8.8c-1.2.5-2.3 1.3-3.2 2.3-1 .9-1.8 2-2.3 3.2-.5 1.2-.8 2.5-.8 3.8s.3 2.6.8 3.8c.5 1.2 1.3 2.3 2.3 3.2.9 1 2 1.8 3.2 2.3 1.2.5 2.5.8 3.8.8s2.6-.3 3.8-.8c1.2-.5 2.3-1.3 3.2-2.3 1-.9 1.8-2 2.3-3.2.5-1.2.8-2.5.8-3.8s-.3-2.6-.8-3.8z" stroke="currentColor" strokeWidth="2" />
                <path className="opacity-50" d="M16.2 8.4c-.3-.8-.8-1.5-1.4-2.1-.6-.6-1.3-1.1-2.1-1.4-.8-.3-1.6-.5-2.5-.5s-1.7.2-2.5.5c-.8.3-1.5.8-2.1 1.4-.6.6-1.1 1.3-1.4 2.1-.3.8-.5 1.6-.5 2.5s.2 1.7.5 2.5c.3.8.8 1.5 1.4 2.1.6.6 1.3 1.1 2.1 1.4.8.3 1.6.5 2.5.5s1.7-.2 2.5-.5c.8-.3 1.5-.8 2.1-1.4.6-.6 1.1-1.3 1.4-2.1.3-.8.5-1.6.5-2.5s-.2-1.7-.5-2.5z" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>

            <div className="inline-block relative z-10">
              <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 text-sm backdrop-blur-sm">
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered Email Generation</span>
              </div>
            </div>

            <h1 className="relative z-10">
              <span className="text-5xl md:text-7xl font-light bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-white animate-gradient tracking-wide">
                Write Perfect Emails
              </span>
              <br />
              <span className="text-4xl md:text-6xl font-extralight text-gray-300 tracking-wider">
                with AI Magic
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-xl text-gray-300 relative z-10 font-light tracking-wide leading-relaxed">
              Transform your email communication with our 
              <span className="font-medium text-blue-300"> AI-powered </span> 
              email generator. 
              <span className="block mt-2 italic font-extralight">
                Professional, personalized, and perfect every time.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 relative z-10">
              <button 
                onClick={() => router.push('/dashboard')}
                className="group relative px-8 py-4 bg-white text-black rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                Get Started
              </button>
              
              <button 
                onClick={() => router.push('/history')}
                className="px-8 py-4 border border-white/30 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300"
              >
                View History
              </button>
            </div>

            {/* Animated Mail Icon */}
            <div className="absolute bottom-[-100px] left-1/2 transform -translate-x-1/2 opacity-20">
              <svg className="w-64 h-64 animate-float" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}