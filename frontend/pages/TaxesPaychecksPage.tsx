

import React from 'react';
import { HubPage, InfoCard, ToolCard } from '../components/HubPage';

const FileTextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>;
const HelpCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
const BriefcaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;

const TaxesPaychecksPage: React.FC = () => {
    return (
        <HubPage
            title="Taxes & Paychecks 💵"
            subtitle="Getting paid is awesome, but understanding where that money goes is even better. Let's decode your paycheck and talk taxes."
            backLink={{ to: "/wiki", text: "Back to Bunny Wiki" }}
        >
            <section className="mb-12">
                <h2 className="text-3xl font-bold text-center mb-8">Key Concepts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoCard icon={<FileTextIcon />} title="Reading Your Pay Stub">
                        Your pay stub shows more than just your total pay. "Gross pay" is the full amount you earned. "Net pay" (or take-home pay) is what's left after deductions like taxes.
                    </InfoCard>
                    <InfoCard icon={<HelpCircleIcon />} title="What Are Taxes?">
                        Taxes are money you pay to the government to fund public services like roads, schools, and parks. When you work, a portion of your income is set aside for federal and (sometimes) state taxes.
                    </InfoCard>
                    <InfoCard icon={<FileTextIcon />} title="W-4 and W-2 Forms">
                        When you start a job, you'll fill out a <span className="font-bold">W-4</span> to tell your employer how much tax to withhold. At the end of the year, you'll get a <span className="font-bold">W-2</span> showing how much you earned and how much tax you paid. You use the W-2 to file your taxes.
                    </InfoCard>
                    <InfoCard icon={<BriefcaseIcon />} title="Taxes for Gig Workers">
                        If you're a freelancer or have a side hustle, you're a gig worker! You likely won't have taxes automatically taken out, so you need to set aside money (usually ~25-30% of your income) to pay taxes yourself.
                    </InfoCard>
                </div>
            </section>
             <section>
                <h2 className="text-3xl font-bold text-center mb-8">Tools & Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                    <ToolCard icon={<FileTextIcon />} title="IRS Free File" description="The official IRS website where you can file your federal taxes for free if you meet certain income requirements. A great way to save money!" to="https://www.irs.gov/filing/free-file-do-your-federal-taxes-for-free" isExternal />
                </div>
            </section>
        </HubPage>
    );
};

export default TaxesPaychecksPage;
