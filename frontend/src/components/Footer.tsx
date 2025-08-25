import React from 'react';
import { Logo } from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-light-surface dark:bg-dark-surface border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <Logo className="h-8 w-8" />
            <span className="font-bold text-gray-700 dark:text-gray-300">BucksBunny</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} BucksBunny. All rights reserved. For educational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

