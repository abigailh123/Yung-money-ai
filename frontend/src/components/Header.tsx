'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../contexts/ThemeContext';
import { Logo } from './Logo';

const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>;
const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>;
const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinkClass = (path: string) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      pathname === path
        ? 'bg-brand-green text-white'
        : 'text-light-text dark:text-dark-text hover:bg-gray-200/50 dark:hover:bg-gray-700/50'
    }`;
  
  const mobileNavLinkClass = (path: string) =>
    `block px-3 py-2 rounded-md text-base font-medium ${
      pathname === path
        ? 'bg-brand-green text-white'
        : 'text-light-text dark:text-dark-text hover:bg-gray-200/50 dark:hover:bg-gray-700/50'
    }`;

  return (
    <header className="glass-header sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <Logo className="h-10 w-10" />
              <span className="font-bold text-xl hidden sm:block text-brand-green dark:text-brand-yellow-light">BucksBunny</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className={navLinkClass('/')}>Home</Link>
              <Link href="/about" className={navLinkClass('/about')}>About</Link>
              <Link href="/learning-guides" className={navLinkClass('/learning-guides')}>Guides</Link>
              <Link href="/wiki" className={navLinkClass('/wiki')}>Bunny Wiki</Link>
              <Link href="/markets" className={navLinkClass('/markets')}>Markets</Link>
              <Link href="/chat" className={navLinkClass('/chat')}>Chat</Link>
            </div>
          </div>
          <div className="flex items-center">
             <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </button>
            <div className="md:hidden ml-2">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 focus:outline-none"
              >
                {isMenuOpen ? <XIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden glass-ui mx-2 my-2 rounded-lg border-none">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className={mobileNavLinkClass('/')} onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="/about" className={mobileNavLinkClass('/about')} onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link href="/learning-guides" className={mobileNavLinkClass('/learning-guides')} onClick={() => setIsMenuOpen(false)}>Guides</Link>
            <Link href="/wiki" className={mobileNavLinkClass('/wiki')} onClick={() => setIsMenuOpen(false)}>Bunny Wiki</Link>
            <Link href="/markets" className={mobileNavLinkClass('/markets')} onClick={() => setIsMenuOpen(false)}>Markets</Link>
            <Link href="/chat" className={mobileNavLinkClass('/chat')} onClick={() => setIsMenuOpen(false)}>Chat</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

