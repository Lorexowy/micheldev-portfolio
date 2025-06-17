/* === src/components/Navbar.tsx === */
'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Home, User, LayoutGrid, FileText, Image } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const links = [
  { href: '#', label: '', icon: <Home size={20} /> },
  { href: '#o-mnie', label: 'O mnie', icon: <User size={20} /> },
  { href: '#projekty', label: 'Projekty', icon: <LayoutGrid size={20} /> },
  { href: '#wspolpraca', label: 'Blog', icon: <FileText size={20} /> },
  { href: '#dlaczego-ja', label: 'Galeria', icon: <Image size={20} /> },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="fixed inset-x-0 top-4 flex justify-center z-50 pointer-events-none transition-all duration-300 ${scrolled ? 'top-0' : 'top-4'}">
      <div
        className={
          `pointer-events-auto flex items-center gap-4 px-5 py-2 rounded-full max-w-max mx-auto transition-all duration-300
          bg-white/20 dark:bg-black/70 backdrop-filter backdrop-blur-xl backdrop-saturate-150 backdrop-hue-rotate-10
          ${scrolled ? 'backdrop-blur-3xl backdrop-saturate-200 backdrop-hue-rotate-15 bg-white/30 dark:bg-black/40 shadow-md' : 'shadow-none'}`
        }
      >
        {links.map((link, idx) => (
          <Link
            key={idx}
            href={link.href}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white hover:bg-white/25 transition-colors ${
              idx === 0 ? 'bg-white/25 dark:bg-black/50' : ''
            }`}
          >
            {link.icon}
            {link.label && <span className="hidden sm:inline">{link.label}</span>}
          </Link>
        ))}
        <div className="pl-3 border-l border-white/40">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
