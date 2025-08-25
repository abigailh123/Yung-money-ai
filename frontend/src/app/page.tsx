'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Logo } from '../components/Logo';

const ArrowRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;
const ZapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>;
const BarChartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>;
const ShieldCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>;
const ActivityIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>;

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="text-center p-6 glass-ui card-hover-glow">
    <div className="relative">
      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-brand-green text-white mx-auto mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="mt-6 text-xl font-bold">{title}</h3>
      <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
        {children}
      </p>
    </div>
  </div>
);

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100);

    const handleMouseMove = (e: MouseEvent) => {
        if (!heroRef.current) return;
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth) * 100;
        const y = (clientY / window.innerHeight) * 100;
        heroRef.current.style.setProperty('--mouse-x', `${x}%`);
        heroRef.current.style.setProperty('--mouse-y', `${y}%`);
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
        clearTimeout(timer);
        window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative overflow-hidden py-20 lg:py-32"
        style={{
          background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(34, 197, 94, 0.15) 0%, transparent 50%), 
                       radial-gradient(circle at 80% 20%, rgba(251, 191, 36, 0.1) 0%, transparent 50%)`
        }}
      >
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <Logo className="h-24 w-24 sm:h-32 sm:w-32" />
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Hey, I&apos;m{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-yellow-light">
                BucksBunny
              </span>
              ! 🐰
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Your friendly AI financial coach for{' '}
              <span className="font-semibold text-brand-green dark:text-brand-yellow-light">St. Kitts & Nevis</span>.
              Making money simple, fun, and local! 💰✨
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link
                href="/chat"
                className="inline-flex items-center px-8 py-4 bg-brand-green hover:bg-green-600 text-white font-semibold rounded-full transition-all transform hover:scale-105 shadow-lg"
              >
                Start Chatting
                <ArrowRightIcon />
              </Link>
              <Link
                href="/learning-guides"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-brand-green text-brand-green dark:text-brand-yellow-light hover:bg-brand-green hover:text-white font-semibold rounded-full transition-all"
              >
                Explore Guides
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need to get that bread! 🍞
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              From saving your first EC dollars to understanding the markets—I got you covered!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard icon={<ZapIcon />} title="Instant Answers">
              Chat with me about any money question—from opening your first SKNANB account to understanding compound interest!
            </FeatureCard>
            
            <FeatureCard icon={<BarChartIcon />} title="Local Markets">
              Stay updated on the Eastern Caribbean stock exchange and forex rates that matter to you.
            </FeatureCard>
            
            <FeatureCard icon={<ShieldCheckIcon />} title="Trusted Guidance">
              Get advice specifically designed for St. Kitts & Nevis—no generic American content here!
            </FeatureCard>
            
            <FeatureCard icon={<ActivityIcon />} title="Interactive Tools">
              Budget planners, debt calculators, and simulators to help you practice smart money moves.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to level up your money game?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Pick your starting point and let&apos;s get this money! 💪
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/journey/getting-started" className="block p-8 glass-ui card-hover-glow text-center">
              <h3 className="text-2xl font-bold mb-4">Just Getting Started</h3>
              <p className="text-gray-600 dark:text-gray-300">
                New to money? Perfect! We&apos;ll start with the basics and get you confident with your first savings account.
              </p>
            </Link>
            
            <Link href="/journey/first-job" className="block p-8 glass-ui card-hover-glow text-center">
              <h3 className="text-2xl font-bold mb-4">First Job Vibes</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Got your first paycheck coming? Let&apos;s make sure you know how to handle it like a pro!
              </p>
            </Link>
            
            <Link href="/journey/college" className="block p-8 glass-ui card-hover-glow text-center">
              <h3 className="text-2xl font-bold mb-4">College Bound</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Planning for college or already there? I&apos;ll help you manage money while hitting the books.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
