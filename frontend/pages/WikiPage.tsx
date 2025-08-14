
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

// --- ICONS ---
const IconWrapper: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <div className={`flex items-center justify-center h-12 w-12 rounded-xl text-white ${className}`}>
        {children}
    </div>
);
const SproutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10"/><path d="M10 20c0-4.4-3.6-8-8-8"/><path d="M14 20c0-4.4 3.6-8 8-8"/><path d="M12 2a4 4 0 0 0-4 4c0 2.2 1.8 4 4 4s4-1.8 4-4a4 4 0 0 0-4-4z"/></svg>;
const BriefcaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
const GraduationCapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.7 3 3 6 3s6-1.3 6-3v-5"/></svg>;
const HeartHandIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.82 2.94 0l.96-.96.96.96c.82.82 2.13.82 2.94 0v0a2.17 2.17 0 0 0 0-3.08L12 5Z"/></svg>;
const BankIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 18-0"/><path d="M5 18v-6h4v6"/><path d="M15 18v-6h4v6"/><path d="m3 6 9-4 9 4"/><path d="M12 18V6"/></svg>;
const CreditCardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>;
const TrendingUpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;
const FileTextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>;
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const ChatIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;


// --- SUB-COMPONENTS ---
const Section: React.FC<{ title: string, children: React.ReactNode, className?: string }> = ({ title, children, className = '' }) => (
    <section className={`py-12 ${className}`}>
        <h2 className="text-3xl font-extrabold text-center mb-8">{title}</h2>
        {children}
    </section>
);

const PathCard: React.FC<{ icon: React.ReactNode, title: string, description: string, color: string, to: string }> = ({ icon, title, description, color, to }) => (
    <ReactRouterDOM.Link to={to} className="group block text-center p-6 bg-light-surface dark:bg-dark-surface rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
        <IconWrapper className={`mx-auto mb-4 ${color}`}>{icon}</IconWrapper>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </ReactRouterDOM.Link>
);

const CategoryCard: React.FC<{ icon: React.ReactNode, title: string, to: string }> = ({ icon, title, to }) => (
    <ReactRouterDOM.Link to={to} className="group flex items-center p-4 bg-light-surface dark:bg-dark-surface rounded-2xl shadow-md hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105">
        <div className="flex-shrink-0">{icon}</div>
        <span className="ml-4 font-bold">{title}</span>
    </ReactRouterDOM.Link>
);

const ResourceLink: React.FC<{ title: string, description: string, to: string, isDownload?: boolean }> = ({ title, description, to, isDownload }) => {
    const commonClasses = "group block p-6 bg-light-bg dark:bg-dark-bg rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300";
    
    const content = (
      <>
        <h4 className="font-bold text-brand-green dark:text-brand-yellow-light group-hover:underline">{title}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
      </>
    );

    if (isDownload) {
        return (
            <a href={to} download className={commonClasses}>
                {content}
            </a>
        );
    }

    return (
        <ReactRouterDOM.Link to={to} className={commonClasses}>
            {content}
        </ReactRouterDOM.Link>
    );
};

const WikiPage: React.FC = () => {
    return (
        <div className="bg-light-bg dark:bg-dark-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <header className="text-center mb-16">
                    <h1 className="text-4xl sm:text-6xl font-extrabold">
                        <span className="block text-light-text dark:text-dark-text">The Bunny Wiki</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-yellow-light mt-2">
                            Your Financial Encyclopedia.
                        </span>
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-gray-500 dark:text-gray-400">
                        Everything you need to know about money, all in one place. Not sure where to start? Choose a path below, or explore topics on your own.
                    </p>
                </header>

                <Section title="Choose Your Path">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <PathCard to="/journey/getting-started" icon={<SproutIcon />} title="Just Getting Started?" description="New to money stuff? Start here." color="bg-green-500" />
                        <PathCard to="/journey/first-job" icon={<BriefcaseIcon />} title="Got Your First Job?" description="Turn that paycheck into a plan." color="bg-blue-500" />
                        <PathCard to="/journey/college" icon={<GraduationCapIcon />} title="Heading to College?" description="Navigate student loans &amp; budgeting." color="bg-indigo-500" />
                        <PathCard to="/journey/money-mind" icon={<HeartHandIcon />} title="Healing My Money Mind" description="Fix your relationship with money." color="bg-pink-500" />
                    </div>
                </Section>
                
                <Section title="Explore by Category" className="bg-light-surface dark:bg-dark-surface rounded-2xl shadow-inner mt-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <CategoryCard icon={<IconWrapper className="bg-green-500"><BankIcon/></IconWrapper>} title="Banking Basics" to="/banking-basics" />
                        <CategoryCard icon={<IconWrapper className="bg-blue-500"><CreditCardIcon/></IconWrapper>} title="Credit & Debt" to="/credit-debt" />
                        <CategoryCard icon={<IconWrapper className="bg-indigo-500"><TrendingUpIcon/></IconWrapper>} title="Investing & Wealth" to="/investing-wealth" />
                        <CategoryCard icon={<IconWrapper className="bg-purple-500"><BriefcaseIcon/></IconWrapper>} title="Jobs & Side Hustles" to="/jobs-side-hustles" />
                        <CategoryCard icon={<IconWrapper className="bg-pink-500"><FileTextIcon/></IconWrapper>} title="Taxes & Paychecks" to="/taxes-paychecks" />
                        <CategoryCard icon={<IconWrapper className="bg-yellow-500"><GraduationCapIcon/></IconWrapper>} title="Financial Aid & College" to="/financial-aid" />
                        <CategoryCard icon={<IconWrapper className="bg-red-500"><HomeIcon/></IconWrapper>} title="Adulting & Bills" to="/adulting-bills" />
                        <CategoryCard icon={<IconWrapper className="bg-teal-500"><HeartHandIcon/></IconWrapper>} title="Mental Money Health" to="/mental-money-health" />
                    </div>
                </Section>

                <Section title="Tools, Templates & Downloads">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <ResourceLink title="AI Budget Planner" description="Get a personalized budget from BucksBunny." to="/budget-planner" />
                        <ResourceLink title="Debt Repayment Calculator" description="Compare strategies to pay off debt fast." to="/debt-calculator" />
                        <ResourceLink title="Compound Interest Simulator" description="See how your money can grow over time." to="/compound-interest-simulator" />
                        <ResourceLink title="ATM & Fee Finder" description="Find low-fee ATMs in St. Kitts & Nevis." to="/atm-finder" />
                        <ResourceLink title="50/30/20 Budget Worksheet" description="A simple worksheet to plan your spending." to="/downloads/50-30-20-Worksheet.md" isDownload />
                        <ResourceLink title="Resume Template" description="A professional resume to land your first job." to="/downloads/Resume-Template.md" isDownload />
                    </div>
                </Section>
                 <Section title="Conversation History">
                   <div className="text-center">
                    <ReactRouterDOM.Link to="/history" className="group inline-flex items-center p-4 bg-light-surface dark:bg-dark-surface rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                        <IconWrapper className="bg-gray-500"><ChatIcon/></IconWrapper>
                        <span className="ml-4 font-bold text-lg">View My Past Conversations</span>
                    </ReactRouterDOM.Link>
                    </div>
                </Section>
            </div>
        </div>
    );
};

export default WikiPage;
