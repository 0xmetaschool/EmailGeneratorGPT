'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to sign in');
      }

      router.push('/dashboard');
    } catch (err) {
      console.error('Signin error:', err);
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 bg-white">
        {/* Back Button */}
        <div className="w-full max-w-md">
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </button>
        </div>

        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold">MagicMail</h1>
            <h2 className="mt-6 text-3xl font-bold">Welcome back</h2>
            <p className="mt-2 text-sm text-gray-600">
              Don't have an account yet?{' '}
              <Link href="/auth/signup" className="font-medium text-black hover:text-gray-800">
                Create an account
              </Link>
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link href="/auth/forgot-password" className="font-medium text-black hover:text-gray-800">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Features */}
      <div className="hidden md:block w-1/2 bg-black p-8">
        <div className="h-full flex flex-col items-center justify-center text-white space-y-12">
          <div className="text-center space-y-4">
            <h3 className="text-4xl font-bold tracking-tight">Welcome back to MagicMail</h3>
            <p className="text-lg text-gray-300 max-w-md font-light leading-relaxed">
              Sign in to access your AI-powered email assistant
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 max-w-2xl w-full">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-lg hover:bg-white/15 transition-colors duration-300">
              <h4 className="font-semibold mb-3 text-lg tracking-wide">9 Unique Tones</h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                From professional to friendly, craft your perfect email voice
              </p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-lg hover:bg-white/15 transition-colors duration-300">
              <h4 className="font-semibold mb-3 text-lg tracking-wide">9 Email Types</h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                Templates for every situation, from follow-ups to proposals
              </p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-lg hover:bg-white/15 transition-colors duration-300">
              <h4 className="font-semibold mb-3 text-lg tracking-wide">Smart Length Control</h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                Adjust email length to fit your needs - short, medium, or detailed
              </p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-lg hover:bg-white/15 transition-colors duration-300">
              <h4 className="font-semibold mb-3 text-lg tracking-wide">Email History</h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                Access and reuse your previous emails for consistent communication
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}