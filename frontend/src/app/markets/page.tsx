import React from 'react';

export default function MarketsPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Markets 📈
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Stay updated on the Eastern Caribbean Stock Exchange and forex rates that matter to you.
          </p>
          <div className="glass-ui p-8 rounded-2xl">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              📊 Market data and analysis coming soon! This will include live ECSE data, 
              EC dollar exchange rates, and BucksBunny&apos;s commentary on what it all means for your wallet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
