import React from 'react';
import { Logo } from '../../components/Logo';

export default function AboutPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <Logo className="h-24 w-24" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About BucksBunny
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your friendly AI financial coach, designed specifically for teens in St. Kitts & Nevis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Who is BucksBunny? 🐰
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Awrite! I&apos;m BucksBunny, your AI financial coach who knows the ins and outs of money in 
              St. Kitts and Nevis. I speak like a local because I understand our culture, our banks, 
              and our unique financial landscape.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              From understanding the ASPIRE Programme to knowing which banks offer the best student 
              accounts, I&apos;m here to make money topics fun, relevant, and stress-free for teenagers 
              in the federation.
            </p>
          </div>
          <div className="glass-ui p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              What makes me different?
            </h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-brand-green mr-2">✓</span>
                I know local banks like SKNANB, BON, and credit unions
              </li>
              <li className="flex items-start">
                <span className="text-brand-green mr-2">✓</span>
                I understand the EC dollar and our fixed exchange rate
              </li>
              <li className="flex items-start">
                <span className="text-brand-green mr-2">✓</span>
                I speak Caribbean English with Kittitian/Nevisian slang
              </li>
              <li className="flex items-start">
                <span className="text-brand-green mr-2">✓</span>
                I know about government programs and local opportunities
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-brand-green/10 to-brand-yellow-light/10 p-8 rounded-2xl mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            My Mission 🎯
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto">
            To make financial education accessible, fun, and relevant for every teenager in 
            St. Kitts & Nevis. Whether you&apos;re just starting to think about money or you&apos;re 
            ready to plan for your future, I&apos;m here to guide you every step of the way.
          </p>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to get started? 🚀
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Jump into a conversation with me or explore our learning guides to begin your financial journey!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/chat"
              className="inline-flex items-center px-8 py-4 bg-brand-green hover:bg-green-600 text-white font-semibold rounded-full transition-all transform hover:scale-105 shadow-lg"
            >
              Start Chatting
            </a>
            <a
              href="/learning-guides"
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-brand-green text-brand-green dark:text-brand-yellow-light hover:bg-brand-green hover:text-white font-semibold rounded-full transition-all"
            >
              Explore Guides
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
