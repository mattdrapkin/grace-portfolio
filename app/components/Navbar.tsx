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
  ];

  return (
    <>
      <nav className="fixed w-full bg-[#fafafa]/90 backdrop-blur-sm z-50 p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-light hover:text-[#ff4d4d] transition-colors duration-300">
            GRACE McKENNA
          </Link>
          
          <div className="hidden md:flex space-x-6">
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
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div 
        className={`fixed top-0 right-0 h-full w-[300px] bg-[#fafafa] z-50 md:hidden transform transition-transform duration-300 ease-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <Link 
              href="/" 
              className="text-2xl font-light"
              onClick={() => setIsMenuOpen(false)}
            >
              GRACE McKENNA
            </Link>
            <button 
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
              className="p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-lg tracking-wide transition-colors duration-300 hover:text-[#ff4d4d] ${
                  pathname === item.path ? 'text-[#ff4d4d]' : 'text-gray-800'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
