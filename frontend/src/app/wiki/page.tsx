import React from 'react';

export default function WikiPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Bunny Wiki 📖
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Your comprehensive guide to financial terms, local banking info, and money wisdom for St. Kitts & Nevis.
          </p>
          <div className="glass-ui p-8 rounded-2xl">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              🚧 Coming soon! This will be your go-to resource for all things money in the federation. 
              In the meantime, chat with BucksBunny for answers to any financial questions!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
