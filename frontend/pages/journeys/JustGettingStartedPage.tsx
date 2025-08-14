

import React from 'react';
import { HubPage, ResourceCard } from '../../components/HubPage';

const JustGettingStartedPage: React.FC = () => {
    return (
        <HubPage
            title="Just Getting Started? 🐣"
            subtitle="Awesome! Taking the first step is the most important part. Here are the best places to begin your money journey."
            backLink={{ to: "/wiki", text: "Back to Bunny Wiki" }}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ResourceCard 
                    to="/banking-basics"
                    title="Learn Banking Basics"
                    description="What's a checking account? How do banks work? Start with the absolute fundamentals here."
                />
                 <ResourceCard 
                    to="/budget-planner"
                    title="Build Your First Budget"
                    description="Tell our AI your situation and get a simple, actionable budget. This is your roadmap to financial control."
                />
                 <ResourceCard 
                    to="/guide/setting-financial-goals"
                    title="Set Financial Goals"
                    description="What do you want to do with your money? This guide helps you define your goals and make a plan to reach them."
                />
                <ResourceCard 
                    to="/mental-money-health"
                    title="Improve Your Money Mindset"
                    description="Your relationship with money matters. Learn how to manage stress and build healthy financial habits."
                />
            </div>
        </HubPage>
    );
};

export default JustGettingStartedPage;
