

import React from 'react';
import { HubPage, ResourceCard } from '../../components/HubPage';

const FirstJobPage: React.FC = () => {
    return (
        <HubPage
            title="First Job Vibes 💼"
            subtitle="Secured the bag! Congrats on the new job. Now, let's make that first paycheck work for you. Here's what to focus on."
            backLink={{ to: "/wiki", text: "Back to Bunny Wiki" }}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ResourceCard 
                    to="/taxes-paychecks"
                    title="Understand Your Paycheck"
                    description="What are taxes? What's a W-4? Learn to decode your pay stub so you know where your money is going."
                />
                 <ResourceCard 
                    to="/budget-planner"
                    title="Create a Paycheck Budget"
                    description="Now that you have income, it's time for a budget. Plan your spending, saving, and fun money."
                />
                 <ResourceCard 
                    to="/credit-debt"
                    title="Start Building Credit"
                    description="Having a job makes it easier to get your first credit card. Learn how to use it responsibly to build a great score."
                />
                 <ResourceCard 
                    to="/investing-wealth"
                    title="Intro to Investing"
                    description="It's never too early to start investing. Learn the basics of how to make your money grow."
                />
            </div>
        </HubPage>
    );
};

export default FirstJobPage;
