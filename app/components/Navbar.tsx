'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'HEADSHOTS & RESUME', path: '/headshots-resume' },
    { name: 'GALLERY', path: '/gallery' },
    { name: 'MEDIA', path: '/media' },
  ];

  return (
    <>
      <nav className="fixed w-full bg-[#fafafa]/90 backdrop-blur-sm z-50 p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-light hover:text-[#ff4d4d] transition-colors duration-300">
            GRACE McKENNA
          </Link>
          
          <div className="hidden md:flex space-x-6 items-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm tracking-wide transition-colors duration-300 hover:text-[#ff4d4d] ${
                  pathname === item.path ? 'text-[#ff4d4d]' : 'text-gray-800'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-800 hover:text-[#ff4d4d] transition-colors duration-300"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#fafafa] md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`text-lg tracking-wide transition-colors duration-300 hover:text-[#ff4d4d] ${
                  pathname === item.path ? 'text-[#ff4d4d]' : 'text-gray-800'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
