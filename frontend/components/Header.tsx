



import React, { useContext, useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { ThemeContext } from '../App';
import { Logo } from './Logo';

const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>;
const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>;
const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;


const Header: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-brand-green text-white'
        : 'text-light-text dark:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-700'
    }`;
  
  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block px-3 py-2 rounded-md text-base font-medium ${
    isActive
      ? 'bg-brand-green text-white'
      : 'text-light-text dark:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-700'
  }`;

  return (
    <header className="bg-light-surface dark:bg-dark-surface shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <ReactRouterDOM.NavLink to="/" className="flex-shrink-0 flex items-center gap-2">
              <Logo className="h-10 w-10" />
              <span className="font-bold text-xl hidden sm:block text-brand-green dark:text-brand-yellow-light">BucksBunny</span>
            </ReactRouterDOM.NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <ReactRouterDOM.NavLink to="/" className={navLinkClass}>Home</ReactRouterDOM.NavLink>
              <ReactRouterDOM.NavLink to="/about" className={navLinkClass}>About</ReactRouterDOM.NavLink>
              <ReactRouterDOM.NavLink to="/learning-guides" className={navLinkClass}>Guides</ReactRouterDOM.NavLink>
              <ReactRouterDOM.NavLink to="/wiki" className={navLinkClass}>Bunny Wiki</ReactRouterDOM.NavLink>
              <ReactRouterDOM.NavLink to="/markets" className={navLinkClass}>Markets</ReactRouterDOM.NavLink>
              <ReactRouterDOM.NavLink to="/chat" className={navLinkClass}>Chat</ReactRouterDOM.NavLink>
            </div>
          </div>
          <div className="flex items-center">
             <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </button>
            <div className="md:hidden ml-2">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
              >
                {isMenuOpen ? <XIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <ReactRouterDOM.NavLink to="/" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>Home</ReactRouterDOM.NavLink>
            <ReactRouterDOM.NavLink to="/about" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>About</ReactRouterDOM.NavLink>
            <ReactRouterDOM.NavLink to="/learning-guides" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>Guides</ReactRouterDOM.NavLink>
            <ReactRouterDOM.NavLink to="/wiki" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>Bunny Wiki</ReactRouterDOM.NavLink>
            <ReactRouterDOM.NavLink to="/markets" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>Markets</ReactRouterDOM.NavLink>
            <ReactRouterDOM.NavLink to="/chat" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>Chat</ReactRouterDOM.NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;