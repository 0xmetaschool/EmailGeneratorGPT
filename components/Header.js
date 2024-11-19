'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/check');
      if (res.ok) {
        const data = await res.json();
        setUser(data.authenticated);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  console.log(user);

  useEffect(() => {
    checkAuth();
    window.addEventListener('auth-change', checkAuth);
    return () => {
      window.removeEventListener('auth-change', checkAuth);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/auth/signout', {
        method: 'POST'
      });

      if (res.ok) {
        setUser(null);
        window.dispatchEvent(new Event('auth-change'));
        window.location.href = '/auth/signin';
      }
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <header className="border-b border-white/10 bg-black/50 backdrop-blur-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl group relative">
            <span className="text-white group-hover:opacity-0 transition-opacity duration-300 absolute">
              EmailGeneratorGPT
            </span>
            <span className="text-transparent bg-gradient-to-r from-white via-white to-white bg-clip-text opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              EmailGeneratorGPT
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {!loading && (
              <>
                {user ? (
                  <>
                    <Link 
                      href="/dashboard" 
                      className="text-white/70 hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                    >
                      Dashboard
                    </Link>
                    <div className="flex items-center space-x-4">
                      <span className="text-white/70">{user.email}</span>
                      <button 
                        onClick={handleSignOut}
                        className="bg-white text-black px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-white/20 transition-all duration-300 hover:-translate-y-0.5 font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center space-x-6">
                    <Link
                      href="/auth/signup"
                      className="bg-white text-black px-6 py-2.5 rounded-xl hover:shadow-lg hover:shadow-white/20 transition-all duration-300 hover:-translate-y-1 font-medium"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {!loading && (
            <div className="py-4 space-y-4">
              {user ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className="block px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/history" 
                    className="block px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                  >
                    History
                  </Link>
                  <div className="px-4 pt-4 border-t border-white/10">
                    <div className="space-y-4">
                      <div className="text-white/70">{user.email}</div>
                      <button 
                        onClick={handleSignOut}
                        className="w-full bg-white text-black px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-white/20 transition-all duration-300 font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="px-4 space-y-2">
                  <Link
                    href="/auth/signup"
                    className="block w-full bg-white text-black px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-white/20 transition-all duration-300 text-center font-medium"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}