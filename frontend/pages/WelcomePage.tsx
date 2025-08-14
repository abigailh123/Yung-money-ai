
import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';

const ArrowRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;
const ZapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>;
const BarChartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>;
const ShieldCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>;
const ActivityIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>;


interface MoneyElement {
  id: string;
  emoji: string;
  left: number;
  size: number;
  rotation: number;
  duration: number;
}

const WelcomePage: React.FC = () => {
  const [showContent, setShowContent] = useState(false);
  const [moneyElements, setMoneyElements] = useState<MoneyElement[]>([]);

  useEffect(() => {
    const bills: MoneyElement[] = [];
    const emojis = ['💵', '🪙', '💰', '💸', '💎', '📈'];
    for (let i = 0; i < 30; i++) {
      bills.push({
        id: `money-${i}`,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        left: Math.random() * 100,
        size: 20 + Math.random() * 20,
        rotation: Math.random() * 360,
        duration: 4 + Math.random() * 4,
      });
    }
    setMoneyElements(bills);

    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Falling Money Animation */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        {moneyElements.map((bill) => (
          <div
            key={bill.id}
            className="absolute -top-20 animate-fall"
            style={{
              left: `${bill.left}%`,
              fontSize: `${bill.size}px`,
              transform: `rotate(${bill.rotation}deg)`,
              animationDuration: `${bill.duration}s`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: '0.7'
            }}
          >
            {bill.emoji}
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center">
          <div className={`transition-all duration-1000 transform ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-yellow-light">
                Get Your Money Right.
              </span>
              <span className="block text-light-text dark:text-dark-text mt-2">
                No cap.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-500 dark:text-gray-400">
              BucksBunny is your AI homie for getting that bag 💰. Learn to budget, save, and invest with advice that's actually useful.
            </p>
            <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
              <ReactRouterDOM.Link
                to="/chat"
                className="group w-full sm:w-auto flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-full text-white bg-brand-green hover:bg-brand-green-dark md:py-4 md:text-lg md:px-10 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Start Chatting Now
                <div className="ml-3 -mr-1 h-5 w-5 transition-transform group-hover:translate-x-1"><ArrowRightIcon /></div>
              </ReactRouterDOM.Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className={`mt-24 transition-opacity duration-1000 delay-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
                <ReactRouterDOM.Link to="/markets" className="group block text-center p-6 bg-light-surface dark:bg-dark-surface rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 col-span-1 sm:col-span-2 lg:col-span-2">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-500 text-white mx-auto">
                        <ActivityIcon />
                    </div>
                    <h3 className="mt-6 text-2xl font-bold">New! Live Markets</h3>
                    <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                        Track top stocks and get AI-powered news updates on what's poppin' in the markets.
                    </p>
                    <div className="mt-4 font-bold text-indigo-500 dark:text-indigo-400 group-hover:underline">
                        Check it out &rarr;
                    </div>
                </ReactRouterDOM.Link>
            </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            <div className="text-center p-6 bg-light-surface dark:bg-dark-surface rounded-2xl shadow-lg">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-brand-green-light text-white mx-auto">
                <ZapIcon />
              </div>
              <h3 className="mt-6 text-xl font-bold">Real-Time Advice</h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                Get quick, clear answers to your money questions, anytime. No more waiting or confusion.
              </p>
            </div>
            <div className="text-center p-6 bg-light-surface dark:bg-dark-surface rounded-2xl shadow-lg">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-brand-yellow text-white mx-auto">
                <BarChartIcon />
              </div>
              <h3 className="mt-6 text-xl font-bold">Personalized Plans</h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                From budgeting to investing, get custom plans that fit your goals and your life.
              </p>
            </div>
            <div className="text-center p-6 bg-light-surface dark:bg-dark-surface rounded-2xl shadow-lg">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-pink-500 text-white mx-auto">
                <ShieldCheckIcon />
              </div>
              <h3 className="mt-6 text-xl font-bold">Safe & Secure</h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                Your conversations are private. We're here to help you learn, not to sell your data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
