

import React from 'react';
import { HubPage, ResourceCard } from '../../components/HubPage';

const CollegePage: React.FC = () => {
    return (
        <HubPage
            title="Heading to College 🎓"
            subtitle="Big moves! College is a huge investment in your future. Let's make sure you're set up for financial success."
            backLink={{ to: "/wiki", text: "Back to Bunny Wiki" }}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ResourceCard 
                    to="/financial-aid"
                    title="Navigate Financial Aid"
                    description="FAFSA, scholarships, grants, oh my! Break down all the ways to get free money for school."
                />
                 <ResourceCard 
                    to="/credit-debt"
                    title="Understand Student Loans"
                    description="Most students need loans. Learn the difference between federal and private loans and how to borrow smartly."
                />
                 <ResourceCard 
                    to="/budget-planner"
                    title="Budget for School Life"
                    description="Create a budget that covers tuition, books, housing, and yes, even pizza nights."
                />
                  <ResourceCard 
                    to="/jobs-side-hustles"
                    title="Find Campus Jobs & Hustles"
                    description="Need extra cash? Get tips on finding part-time jobs or side hustles that fit a student schedule."
                />
            </div>
        </HubPage>
    );
};

export default CollegePage;
