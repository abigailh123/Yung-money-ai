

import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { HubPage, InfoCard, ToolCard } from '../components/HubPage';

const BriefcaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
const FileTextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>;
const ZapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>;

const JobsSideHustlesPage: React.FC = () => {
    return (
        <HubPage
            title="Jobs & Side Hustles 💼"
            subtitle="Time to get that bag! Whether it's your first job or a cool side hustle, we've got the info you need to start earning."
            backLink={{ to: "/wiki", text: "Back to Bunny Wiki" }}
        >
            <section className="mb-12">
                <h2 className="text-3xl font-bold text-center mb-8">Getting Started</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoCard icon={<BriefcaseIcon />} title="Your First Job Guide">
                        Landing your first job is a big deal! Focus on being reliable, having a positive attitude, and being eager to learn. These qualities are often more important than experience for entry-level roles.
                    </InfoCard>
                    <InfoCard icon={<ZapIcon />} title="Finding a Side Hustle">
                        What are you good at? What do you enjoy? You can turn hobbies like gaming, art, or social media into a way to make extra cash. Think about what problems you can solve for people.
                    </InfoCard>
                </div>
            </section>

             <section>
                <h2 className="text-3xl font-bold text-center mb-8">Tools & Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="group block bg-light-bg dark:bg-dark-bg p-6 rounded-xl shadow-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-all h-full">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="text-brand-green dark:text-brand-yellow-light"><FileTextIcon /></div>
                            <h3 className="text-xl font-bold">Resume Template</h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">A clean, professional template to help you land your first job. Just fill in your details and you're ready to apply!</p>
                        <a href="/downloads/Resume-Template.md" download className="flex items-center font-semibold text-brand-green dark:text-brand-yellow-light">
                            Download Template
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 9.707a1 1 0 011.414 0L9 11.086V3a1 1 0 112 0v8.086l1.293-1.379a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        </a>
                    </div>
                    <ToolCard icon={<BriefcaseIcon />} title="Hustle Idea Generator" description="Stuck for ideas? Chat with BucksBunny to get personalized side hustle suggestions based on your skills and interests." to="/chat" />
                </div>
            </section>
        </HubPage>
    );
};

export default JobsSideHustlesPage;
