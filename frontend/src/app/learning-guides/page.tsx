import React from 'react';
import Link from 'next/link';
import { COURSE_MODULES } from '../../constants/courses';

export default function LearningGuidesPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Learning Guides 📚
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master your money skills with these step-by-step guides designed specifically 
            for young people in St. Kitts & Nevis.
          </p>
        </div>

        {/* Course Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COURSE_MODULES.map((module, index) => (
            <div
              key={module.id}
              className="glass-ui card-hover-glow p-8 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-brand-green bg-brand-green/10 px-3 py-1 rounded-full">
                  Module {index + 1}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {module.contents.length} lessons
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {module.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {module.description}
              </p>
              
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Learning Goals:
                </h4>
                <ul className="space-y-1">
                  {module.goals.slice(0, 3).map((goal, goalIndex) => (
                    <li key={goalIndex} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                      <span className="text-brand-green mr-2 mt-0.5">•</span>
                      {goal}
                    </li>
                  ))}
                  {module.goals.length > 3 && (
                    <li className="text-sm text-gray-500 dark:text-gray-400">
                      +{module.goals.length - 3} more goals
                    </li>
                  )}
                </ul>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Key Concepts:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {module.keyConcepts.slice(0, 4).map((concept, conceptIndex) => (
                    <span
                      key={conceptIndex}
                      className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
                    >
                      {concept}
                    </span>
                  ))}
                  {module.keyConcepts.length > 4 && (
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-1 rounded">
                      +{module.keyConcepts.length - 4} more
                    </span>
                  )}
                </div>
              </div>
              
              <Link
                href={`/learning-guides/${module.id}`}
                className="block w-full text-center px-6 py-3 bg-brand-green hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
              >
                Start Learning
              </Link>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center glass-ui p-8 rounded-2xl">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Need Help Getting Started? 🤔
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Not sure which module to start with? Chat with BucksBunny for personalized recommendations!
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center px-8 py-4 bg-brand-green hover:bg-green-600 text-white font-semibold rounded-full transition-all transform hover:scale-105 shadow-lg"
          >
            Ask BucksBunny
          </Link>
        </div>
      </div>
    </div>
  );
}
