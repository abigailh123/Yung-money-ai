

import React from 'react';
import { HubPage, InfoCard, ToolCard } from '../components/HubPage';

const GraduationCapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.7 3 3 6 3s6-1.3 6-3v-5"/></svg>;
const FileTextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const BankIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 18-0"/><path d="M5 18v-6h4v6"/><path d="M15 18v-6h4v6"/><path d="m3 6 9-4 9 4"/><path d="M12 18V6"/></svg>;

const FinancialAidPage: React.FC = () => {
    return (
        <HubPage
            title="Financial Aid & College 🎓"
            subtitle="College is expensive, but there are tons of ways to get help paying for it. Let's explore your options in St. Kitts & Nevis."
            backLink={{ to: "/wiki", text: "Back to Bunny Wiki" }}
        >
            <section className="mb-12">
                <h2 className="text-3xl font-bold text-center mb-8">Key Concepts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoCard icon={<BankIcon />} title="Student Loans in SKN">
                        The Development Bank of St. Kitts and Nevis is the main place for student loans. They offer financing for tuition, books, and even living expenses. Commercial banks also offer loans, but Development Bank often has better terms for students.
                    </InfoCard>
                    <InfoCard icon={<GraduationCapIcon />} title="Scholarships vs. Grants">
                        Both are FREE MONEY for college! In SKN, look for government scholarships from the Ministry of Education. <span className="font-bold">Grants</span> are usually based on financial need. <span className="font-bold">Scholarships</span> are based on merit—like good grades, sports, or community service.
                    </InfoCard>
                    <InfoCard icon={<SearchIcon />} title="Where to Find Scholarships">
                        Look everywhere! Start with the Ministry of Education's website. Also, check with local companies, credit unions, and community groups (like Rotary or Lions clubs) as they often give out annual scholarships.
                    </InfoCard>
                    <InfoCard icon={<FileTextIcon />} title="Understanding Loan Terms">
                        A loan is borrowed money you must pay back with interest. Before you sign, understand the interest rate, the repayment period (how long you have to pay it back), and if payments are deferred (paused) while you're in school.
                    </InfoCard>
                </div>
            </section>
             <section>
                <h2 className="text-3xl font-bold text-center mb-8">Tools & Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-2xl mx-auto">
                    <ToolCard icon={<BankIcon />} title="Development Bank of SKN" description="The official website for the Development Bank. Find info on their student loan programs and application forms here." to="https://www.skndb.com/" isExternal />
                </div>
            </section>
        </HubPage>
    );
};

export default FinancialAidPage;
