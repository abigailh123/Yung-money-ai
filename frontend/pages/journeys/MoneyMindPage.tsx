

import React from 'react';
import { HubPage, ResourceCard } from '../../components/HubPage';

const MoneyMindPage: React.FC = () => {
    return (
        <HubPage
            title="Healing My Money Mind 🧘‍♀️"
            subtitle="Your relationship with money is just as important as the numbers. Let's work on building a healthy, positive money mindset."
            backLink={{ to: "/wiki", text: "Back to Bunny Wiki" }}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ResourceCard 
                    to="/mental-money-health"
                    title="Tackle Money Anxiety"
                    description="Feeling stressed about finances is normal. Learn techniques to regain control and reduce anxiety."
                />
                 <ResourceCard 
                    to="/guide/setting-financial-goals"
                    title="Define Your 'Why'"
                    description="Connect your financial goals to your personal values. This guide gives your money a purpose beyond just numbers."
                />
                 <ResourceCard 
                    to="/debt-calculator"
                    title="Make a Debt Plan"
                    description="Debt can be a huge source of stress. Use our tool to create a clear, actionable plan to pay it off."
                />
                 <ResourceCard 
                    to="/chat"
                    title="Talk It Out"
                    description="Sometimes you just need to talk. Ask BucksBunny for advice or encouragement in a safe, non-judgmental space."
                />
            </div>
        </HubPage>
    );
};

export default MoneyMindPage;
