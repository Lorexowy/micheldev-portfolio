/* === src/components/Navbar.tsx === */
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Home,
  User,
  LayoutGrid,
  FileText,
  Image as ImageIcon,
  Sun,
  Moon,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion, Variants } from 'framer-motion';

const links = [
  { href: '#',        label: '',       icon: <Home size={20} /> },
  { href: '#uslugi',  label: 'Usługi', icon: <LayoutGrid size={20} /> },
  { href: '#projekty',label: 'Projekty',icon: <ImageIcon size={20} /> },
  { href: '#o-mnie',  label: 'O mnie', icon: <User size={20} /> },
  { href: '#wspolpraca', label: 'Proces', icon: <FileText size={20} /> },
  { href: '#kontakt', label: 'Kontakt',icon: <Home size={20} /> },
];

const navVariants: Variants = {
  hidden:  { y: -50, opacity: 0 },
  visible: {
    y: 0, opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 30, when: 'beforeChildren', staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } }
};

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number|null>(null);
  const { theme, setTheme }         = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <>
      {/* gradient w defs */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <linearGradient id="nav-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#6366F1" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </svg>

      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className="fixed inset-x-0 top-4 flex justify-center z-50 pointer-events-none"
      >
        <motion.div
          className={`
            pointer-events-auto flex items-center gap-4 px-5 py-2 rounded-full max-w-max mx-auto
            bg-white/20 dark:bg-black/70
            backdrop-filter backdrop-blur-xl backdrop-saturate-150 backdrop-hue-rotate-10
            transition-all duration-300 ease-out
            ${scrolled
              ? 'backdrop-blur-3xl backdrop-saturate-200 backdrop-hue-rotate-15 bg-white/30 dark:bg-black/40 shadow-md'
              : 'shadow-none'}
          `}
        >
          {links.map((link, idx) => {
            const defaultIcon = React.cloneElement(link.icon, { stroke: '#ffffff' });
            const hoverIcon   = React.cloneElement(link.icon, { stroke: 'url(#nav-gradient)' });

            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="rounded-full"
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full
                              text-sm font-medium transition-all duration-200 ease-out
                              ${idx === 0 ? 'bg-white/25 dark:bg-black/50' : ''}`}
                >
                  <span
                    className={`flex items-center gap-2 ${
                      hoveredIdx === idx
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500'
                        : 'text-white'
                    }`}
                  >
                    {hoveredIdx === idx ? hoverIcon : defaultIcon}
                    {link.label && <span className="hidden sm:inline">{link.label}</span>}
                  </span>
                </Link>
              </motion.div>
            );
          })}

          {/* ThemeToggle */}
          <motion.div
            variants={itemVariants}
            onMouseEnter={() => setHoveredIdx(links.length)}
            onMouseLeave={() => setHoveredIdx(null)}
            className="pl-3 border-l border-white/40 dark:border-white/20 rounded-full"
          >
            <button
              onClick={toggleTheme}
              className="flex items-center p-2 rounded-full transition-all duration-200 ease-out"
            >
              {theme === 'dark' ? (
                <Sun
                  size={20}
                  stroke={hoveredIdx === links.length ? 'url(#nav-gradient)' : '#ffffff'}
                  strokeWidth={2}
                  fill="none"
                />
              ) : (
                <Moon
                  size={20}
                  stroke={hoveredIdx === links.length ? 'url(#nav-gradient)' : '#ffffff'}
                  strokeWidth={2}
                  fill="none"
                />
              )}
            </button>
          </motion.div>
        </motion.div>
      </motion.nav>
    </>
  );
}
