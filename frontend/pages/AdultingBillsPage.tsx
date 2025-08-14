

import React from 'react';
import { HubPage, InfoCard, ToolCard } from '../components/HubPage';

const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const ShieldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;
const FileTextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>;
const ZapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>;
const CalculatorIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="12" x2="12" y1="10" y2="18"/><line x1="8" x2="16" y1="14" y2="14"/></svg>;

const AdultingBillsPage: React.FC = () => {
    return (
        <HubPage
            title="Adulting & Bills 🏠"
            subtitle="Welcome to adulting! It's mostly just paying bills. Here's how to handle it without the stress."
            backLink={{ to: "/wiki", text: "Back to Bunny Wiki" }}
        >
            <section className="mb-12">
                <h2 className="text-3xl font-bold text-center mb-8">Key Concepts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoCard icon={<ZapIcon />} title="Utilities Breakdown">
                        Utilities are the essential services for your home, like electricity, water, gas, and internet. When you rent an apartment, you'll usually be responsible for setting these up and paying for them monthly.
                    </InfoCard>
                    <InfoCard icon={<HomeIcon />} title="Rent & Leases">
                        Rent is your biggest monthly bill. A lease is the legal contract you sign with your landlord. Read it carefully before signing! It outlines all the rules, costs, and your responsibilities as a tenant.
                    </InfoCard>
                    <InfoCard icon={<ShieldIcon />} title="Building an Emergency Fund">
                        This is a must-have! An emergency fund is a stash of cash (ideally 3-6 months of living expenses) set aside for unexpected events, like a car repair or losing your job. It's your financial safety net.
                    </InfoCard>
                    <InfoCard icon={<ShieldIcon />} title="Why You Need Insurance">
                        Insurance protects you from financial disaster. For example, renter's insurance covers your belongings in case of theft or fire, and car insurance is required by law to cover accidents.
                    </InfoCard>
                </div>
            </section>
             <section>
                <h2 className="text-3xl font-bold text-center mb-8">Tools & Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-lg mx-auto">
                    <ToolCard icon={<CalculatorIcon />} title="Budget Planner" description="The best way to handle bills is to plan for them. Use our AI budget planner to track your income and expenses." to="/budget-planner" />
                </div>
            </section>
        </HubPage>
    );
};

export default AdultingBillsPage;
