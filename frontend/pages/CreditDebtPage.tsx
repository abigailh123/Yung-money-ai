

import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

const ArrowLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;
const BookOpenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>;
const TrendingUpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;
const ShieldAlertIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>;
const CalculatorIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="12" x2="12" y1="10" y2="18"/><line x1="8" x2="16" y1="14" y2="14"/></svg>;
const ArrowRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;

const InfoCard: React.FC<{ icon: React.ReactNode, title: string, children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-light-bg dark:bg-dark-bg p-6 rounded-xl shadow-md">
        <div className="flex items-center gap-4 mb-3">
            <div className="text-brand-green dark:text-brand-yellow-light">{icon}</div>
            <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400">{children}</p>
    </div>
);

const ToolCard: React.FC<{ icon: React.ReactNode, title: string, description: string, to: string, isExternal?: boolean }> = ({ icon, title, description, to, isExternal }) => (
    <ReactRouterDOM.Link to={to} target={isExternal ? '_blank' : ''} className="group block bg-light-bg dark:bg-dark-bg p-6 rounded-xl shadow-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-all">
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


const CreditDebtPage: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
                <ReactRouterDOM.Link to="/wiki" className="inline-flex items-center gap-2 text-brand-green hover:underline font-semibold">
                    <ArrowLeftIcon />
                    Back to Bunny Wiki
                </ReactRouterDOM.Link>
            </div>

            <header className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-light-text dark:text-dark-text">
                    Credit & Debt Decoded 💳
                </h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500 dark:text-gray-400">
                    Your credit score is your financial passport, and managing debt is the key to unlocking your future. Let's break it all down.
                </p>
            </header>

            <section className="bg-light-surface dark:bg-dark-surface p-8 rounded-2xl shadow-lg mb-12">
                <h2 className="text-3xl font-bold text-center mb-8">Key Concepts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoCard icon={<BookOpenIcon />} title="What is Credit?">
                        Credit is your reputation as a borrower. It's a system lenders use to decide if you're a safe bet to lend money to. A good credit history opens doors to better loans, lower interest rates, and more.
                    </InfoCard>
                    <InfoCard icon={<TrendingUpIcon />} title="Building a Good Score">
                        Start small and be consistent. Use a credit card for small purchases and pay it off in full every month. On-time payments are the #1 factor in building a strong credit score.
                    </InfoCard>
                    <InfoCard icon={<ShieldAlertIcon />} title="Good Debt vs. Bad Debt">
                        Not all debt is bad! Good debt helps you build wealth (like a student loan for a degree or a mortgage for a house). Bad debt is typically for things that lose value and comes with high interest (like credit card debt for luxury items).
                    </InfoCard>
                    <InfoCard icon={<BookOpenIcon />} title="Understanding Interest (APR)">
                        The Annual Percentage Rate (APR) is the price you pay for borrowing money. A lower APR means you pay less over time. Always check the APR before taking on any new debt!
                    </InfoCard>
                </div>
            </section>

            <section>
                <h2 className="text-3xl font-bold text-center mb-8">Tools & Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ToolCard icon={<CalculatorIcon />} title="Debt Repayment Calculator" description="Got some debt? Use this AI tool to compare the Snowball and Avalanche methods and see which one gets you debt-free faster." to="/debt-calculator" />
                    <ToolCard icon={<TrendingUpIcon />} title="Credit Score Simulator" description="See how different actions—like paying off a card or missing a payment—could affect your credit score. (Coming Soon!)" to="#" />
                </div>
            </section>
        </div>
    );
};

export default CreditDebtPage;
