'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import EmailGenerator from '@/components/email/EmailGenerator';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/check');
        if (!res.ok) {
          router.push('/auth/signin');
        }
      } catch (error) {
        router.push('/auth/signin');
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.push('/')}
            className="flex items-center text-white hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Back to Home</span>
          </button>
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-8">Email Generator</h1>
        <EmailGenerator />
      </div>
    </div>
  );
}