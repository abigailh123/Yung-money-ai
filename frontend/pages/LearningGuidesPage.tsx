
import React from 'react';
import { COURSE_MODULES } from '../constants/courses';
import * as ReactRouterDOM from 'react-router-dom';

const BookOpenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>;
const ArrowRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;

const LearningGuidesPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-light-text dark:text-dark-text">
          Learning Guides
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
          Level up your money game. Pick a topic and start learning the essentials with our AI-powered guides.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {COURSE_MODULES.map((module, index) => (
          <ReactRouterDOM.Link 
            to={`/guide/${module.id}`} 
            key={module.id} 
            className="group block bg-light-surface dark:bg-dark-surface p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-brand-green-light text-white mb-6">
              <BookOpenIcon />
            </div>
            <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-2">
              <span className="text-brand-green dark:text-brand-yellow-light mr-2">{(index + 1).toString().padStart(2, '0')}</span>
              {module.title}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6 h-24 overflow-hidden">
              {module.description}
            </p>
            <div className="flex items-center font-semibold text-brand-green dark:text-brand-yellow-light">
              Start Learning
              <div className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"><ArrowRightIcon /></div>
            </div>
          </ReactRouterDOM.Link>
        ))}
      </div>
    </div>
  );
};

export default LearningGuidesPage;