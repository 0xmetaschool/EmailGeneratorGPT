'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Mail, Sparkles, Zap, History } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="pt-4">
          <button
            onClick={() => router.back()}
            className="flex items-center text-white hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Back</span>
          </button>
        </div>

        {/* Rest of your homepage content */}
        <div className="pt-16 pb-16">
          <div className="text-center space-y-8">
            {/* Your existing content */}
            <div className="inline-block">
              <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 text-sm backdrop-blur-sm">
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered Email Generation</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-white animate-gradient">
              Write Perfect Emails
              <br />
              with AI Magic
            </h1>

            <p className="max-w-2xl mx-auto text-xl text-gray-300">
              Transform your email communication with our AI-powered email generator. 
              Professional, personalized, and perfect every time.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
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
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20">
          {/* Your existing features section */}
        </div>
      </div>
    </main>
  );
}