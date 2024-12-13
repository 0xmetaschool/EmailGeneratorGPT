// app/not-found.js
'use client';

import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-white/70 mb-8">Page not found</p>
        <button
          onClick={() => router.push('/')}
          className="bg-white text-black px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-white/20 transition-all duration-300 hover:-translate-y-1"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}