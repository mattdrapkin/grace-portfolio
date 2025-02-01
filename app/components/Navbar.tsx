'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();
  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'HEADSHOTS & RESUME', path: '/headshots-resume' },
    { name: 'GALLERY', path: '/gallery' },
  ];

  return (
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

        <button className="md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
