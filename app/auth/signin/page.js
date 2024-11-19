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

      window.dispatchEvent(new Event('auth-change'));
      router.push('/dashboard');
    } catch (err) {
      console.error('Signin error:', err);
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 relative">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-white/5 rounded-full filter blur-3xl animate-pulse animation-delay-4000" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-md">
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to home
          </button>

          <div className="space-y-8 bg-white/5 p-8 rounded-2xl border border-white/10">
            <div>
              <h1 className="text-2xl font-bold text-white">
                EmailGeneratorGPT
              </h1>
              <h2 className="mt-4 text-3xl font-bold text-white">Welcome back</h2>
              <p className="mt-2 text-white/70">
                Don&apos;t have an account?{' '}
                <Link href="/auth/signup" className="text-white hover:text-white/80 transition-colors">
                  Sign up
                </Link>
              </p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-white focus:ring-1 focus:ring-white transition-colors"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white/70 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-white focus:ring-1 focus:ring-white transition-colors"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 bg-white/5 border-white/10 rounded text-white focus:ring-white/20"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-white/70">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link href="/auth/forgot-password" className="text-white hover:text-white/80 transition-colors">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-white text-black rounded-xl hover:shadow-lg hover:shadow-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:-translate-y-0.5 font-medium"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Right side - Features */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full filter blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-12">
          <div className="text-center space-y-4 mb-12">
            <h3 className="text-4xl font-bold text-white tracking-tight">
              Welcome to EmailGeneratorGPT
            </h3>
            <p className="text-lg text-white/70 max-w-md font-light leading-relaxed">
              Sign in to access your AI-powered email assistant
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 max-w-2xl w-full">
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-300 group">
              <h4 className="font-medium text-white mb-2">Multiple Email Types</h4>
              <p className="text-sm text-white/70 leading-relaxed">
                From business proposals to personal messages
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-300 group">
              <h4 className="font-medium text-white mb-2">Smart Suggestions</h4>
              <p className="text-sm text-white/70 leading-relaxed">
                AI-powered tone and content recommendations
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-300 group">
              <h4 className="font-medium text-white mb-2">One-Click Generation</h4>
              <p className="text-sm text-white/70 leading-relaxed">
                Get perfect emails in seconds
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-300 group">
              <h4 className="font-medium text-white mb-2">Email History</h4>
              <p className="text-sm text-white/70 leading-relaxed">
                Access and reuse your previous emails
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}