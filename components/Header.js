'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Menu } from 'lucide-react';

export default function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <div className="flex items-center space-x-6">
              <button
                onClick={() => router.push('/dashboard')}
                className="bg-white text-black px-6 py-2.5 rounded-xl hover:shadow-lg hover:shadow-white/20 transition-all duration-300 hover:-translate-y-1 font-medium"
              >
                Get Started
              </button>
            </div>
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
          <div className="py-4 space-y-4">
            <div className="px-4 space-y-2">
              <button
                onClick={() => router.push('/dashboard')}
                className="block w-full bg-white text-black px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-white/20 transition-all duration-300 text-center font-medium"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}