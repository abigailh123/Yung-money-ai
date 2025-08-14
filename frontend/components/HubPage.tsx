
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

const ArrowLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;
const ArrowRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;


interface HubPageProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  backLink?: { to: string; text: string };
}

export const HubPage: React.FC<HubPageProps> = ({ title, subtitle, children, backLink }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {backLink && (
        <div className="mb-8">
          <ReactRouterDOM.Link to={backLink.to} className="inline-flex items-center gap-2 text-brand-green hover:underline font-semibold">
            <ArrowLeftIcon />
            {backLink.text}
          </ReactRouterDOM.Link>
        </div>
      )}
      <header className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-light-text dark:text-dark-text" dangerouslySetInnerHTML={{ __html: title }}>
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500 dark:text-gray-400">
          {subtitle}
        </p>
      </header>
      {children}
    </div>
  );
};

export const InfoCard: React.FC<{ icon: React.ReactNode, title: string, children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-light-bg dark:bg-dark-bg p-6 rounded-xl shadow-md h-full">
        <div className="flex items-center gap-4 mb-3">
            <div className="text-brand-green dark:text-brand-yellow-light">{icon}</div>
            <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400">{children}</p>
    </div>
);

export const ToolCard: React.FC<{ icon: React.ReactNode, title: string, description: string, to: string, isExternal?: boolean }> = ({ icon, title, description, to, isExternal }) => (
    <ReactRouterDOM.Link to={to} target={isExternal ? '_blank' : ''} className="group block bg-light-bg dark:bg-dark-bg p-6 rounded-xl shadow-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-all h-full">
        <div className="flex items-center gap-4 mb-3">
            <div className="text-brand-green dark:text-brand-yellow-light">{icon}</div>
            <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
        <div className="flex items-center font-semibold text-brand-green dark:text-brand-yellow-light">
            {isExternal ? 'Visit Tool' : 'Launch Tool'}
            <div className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"><ArrowRightIcon /></div>
        </div>
    </ReactRouterDOM.Link>
);

export const ResourceCard: React.FC<{ to: string, title: string, description: string }> = ({ to, title, description }) => (
  <ReactRouterDOM.Link to={to} className="group block p-6 bg-light-surface dark:bg-dark-surface rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
    <h3 className="text-xl font-bold text-brand-green dark:text-brand-yellow-light mb-2">{title}</h3>
    <p className="text-gray-500 dark:text-gray-400 mb-4">{description}</p>
    <div className="flex items-center font-semibold text-light-text dark:text-dark-text">
      Learn More
      <div className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 text-brand-green dark:text-brand-yellow-light"><ArrowRightIcon /></div>
    </div>
  </ReactRouterDOM.Link>
);
