

import React from 'react';
import { HubPage, InfoCard, ToolCard } from '../components/HubPage';

const HeartHandIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.82 2.94 0l.96-.96.96.96c.82.82 2.13.82 2.94 0v0a2.17 2.17 0 0 0 0-3.08L12 5Z"/></svg>;
const MessageCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path></svg>;
const ShieldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;

const MentalMoneyHealthPage: React.FC = () => {
    return (
        <HubPage
            title="Mental Money Health 🧠❤️"
            subtitle="How you feel about money matters. Your financial health and your mental health are connected."
            backLink={{ to: "/wiki", text: "Back to Bunny Wiki" }}
        >
            <section className="mb-12">
                <h2 className="text-3xl font-bold text-center mb-8">Key Concepts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoCard icon={<HeartHandIcon />} title="Money Anxiety is Real">
                        Feeling stressed about money is super common. The best way to fight it is with a plan. Knowing where your money is going and having a budget can give you a powerful sense of control.
                    </InfoCard>
                    <InfoCard icon={<ShieldIcon />} title="Money and Self-Worth">
                        Your net worth does not equal your self-worth. It's easy to compare yourself to others on social media, but remember that everyone's financial journey is different. Focus on your own progress.
                    </InfoCard>
                     <InfoCard icon={<MessageCircleIcon />} title="Having 'The Money Talk'">
                        Talking about money with family or partners can be awkward, but it's important. Being open about financial goals and struggles can build trust and get everyone on the same page.
                    </InfoCard>
                    <InfoCard icon={<HeartHandIcon />} title="Practice Mindful Spending">
                        Before you buy something, ask yourself: "Do I really need this? Will it make me happy long-term?" Being intentional with your spending can reduce impulse buys and buyer's remorse.
                    </InfoCard>
                </div>
            </section>
             <section>
                <h2 className="text-3xl font-bold text-center mb-8">Tools & Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                     <ToolCard icon={<MessageCircleIcon />} title="Talk to BucksBunny" description="Feeling stressed? Sometimes just talking it out can help. Chat with BucksBunny to ask questions or get some encouragement. You got this!" to="/chat" />
                </div>
            </section>
        </HubPage>
    );
};

export default MentalMoneyHealthPage;
