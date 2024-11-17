'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/check');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
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

  useEffect(() => {
    checkAuth();

    // Add event listener for storage changes
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
        // Dispatch auth change event
        window.dispatchEvent(new Event('auth-change'));
        // Redirect to signin page
        window.location.href = '/auth/signin';
      }
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
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
            <Link href="/history" className="text-gray-600 hover:text-gray-900">
              History
            </Link>
            {!loading && (
              <>
                {user ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-600">{user.email}</span>
                    <button 
                      onClick={handleSignOut}
                      className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link 
                    href="/auth/signin"
                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                  >
                    Sign In
                  </Link>
                )}
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}