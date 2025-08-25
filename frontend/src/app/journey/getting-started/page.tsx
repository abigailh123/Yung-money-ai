import React from 'react';
import Link from 'next/link';

export default function GettingStartedPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Just Getting Started 🌱
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Welcome to your financial journey! Let&apos;s start with the basics and build your money confidence step by step.
          </p>
        </div>

        <div className="space-y-8">
          <div className="glass-ui p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Your First Steps 👣
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Week 1: Understanding Money</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-brand-green mr-2">•</span>
                    Learn about the EC dollar and why it&apos;s pegged to USD
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-green mr-2">•</span>
                    Understand needs vs wants
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-green mr-2">•</span>
                    Start tracking where your money goes
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Week 2: Your First Account</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-brand-green mr-2">•</span>
                    Learn about SKNANB and other local banks
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-green mr-2">•</span>
                    Understand what documents you need
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-green mr-2">•</span>
                    Open your first savings account with a parent
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="glass-ui p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Quick Start Actions 🚀
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/chat" className="block p-6 bg-brand-green/10 rounded-lg hover:bg-brand-green/20 transition-colors">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Ask BucksBunny</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Start with questions like &quot;How do I open a savings account?&quot;
                </p>
              </Link>
              
              <Link href="/learning-guides" className="block p-6 bg-brand-green/10 rounded-lg hover:bg-brand-green/20 transition-colors">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Learn the Basics</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Start with &quot;Setting Financial Goals&quot; module
                </p>
              </Link>
              
              <Link href="/wiki" className="block p-6 bg-brand-green/10 rounded-lg hover:bg-brand-green/20 transition-colors">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Browse Wiki</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Look up financial terms and local banking info
                </p>
              </Link>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready for the next level? 📈
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Once you&apos;ve got the basics down, explore our other learning paths!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/journey/first-job"
                className="px-6 py-3 bg-brand-green hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
              >
                First Job Journey
              </Link>
              <Link
                href="/journey/college"
                className="px-6 py-3 border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white font-semibold rounded-lg transition-colors"
              >
                College Journey
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
