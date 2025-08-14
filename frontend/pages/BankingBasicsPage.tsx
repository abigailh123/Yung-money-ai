

import React from 'react';
import { HubPage, InfoCard, ToolCard } from '../components/HubPage';

const BankIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 18-0"/><path d="M5 18v-6h4v6"/><path d="M15 18v-6h4v6"/><path d="m3 6 9-4 9 4"/><path d="M12 18V6"/></svg>;
const CreditCardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>;
const SmartphoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>;
const HelpCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;

const BankingBasicsPage: React.FC = () => {
    return (
        <HubPage
            title="Banking Basics 🏦"
            subtitle="Understanding how banks work is the first step to managing your money like a boss. Let's get into it."
            backLink={{ to: "/wiki", text: "Back to Bunny Wiki" }}
        >
            <section className="mb-12">
                <h2 className="text-3xl font-bold text-center mb-8">Key Concepts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoCard icon={<HelpCircleIcon />} title="What is a Bank Account?">
                        It's a safe place to keep your money. You can use it to get paid, pay bills, and save for your goals. It's way more secure than keeping cash under your mattress!
                    </InfoCard>
                    <InfoCard icon={<BankIcon />} title="Checking vs. Savings">
                        A <span className="font-bold">Checking Account</span> is for daily spending, like buying lunch or paying bills. A <span className="font-bold">Savings Account</span> is for stashing money away for the future, like for an emergency or a big purchase. Savings accounts also pay you a little bit of interest!
                    </InfoCard>
                    <InfoCard icon={<CreditCardIcon />} title="Debit Card vs. Credit Card">
                        A <span className="font-bold">Debit Card</span> pulls money directly from your checking account. You can only spend what you have. A <span className="font-bold">Credit Card</span> lets you borrow money that you have to pay back later. Use it wisely!
                    </InfoCard>
                    <InfoCard icon={<SmartphoneIcon />} title="Fees to Watch Out For">
                        Banks can charge fees for different things. Look out for "overdraft fees" (when you spend more than you have) and "monthly maintenance fees." Ask how to avoid them!
                    </InfoCard>
                </div>
            </section>
        </HubPage>
    );
};

export default BankingBasicsPage;
