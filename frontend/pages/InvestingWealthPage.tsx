

import React from 'react';
import { HubPage, InfoCard, ToolCard } from '../components/HubPage';

const TrendingUpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;
const ZapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>;
const BookOpenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>;
const CalculatorIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="12" x2="12" y1="10" y2="18"/><line x1="8" x2="16" y1="14" y2="14"/></svg>;

const InvestingWealthPage: React.FC = () => {
    return (
        <HubPage
            title="Investing & Wealth 📈"
            subtitle="Investing is how you make your money work for you. It might seem complicated, but the basics are simpler than you think."
            backLink={{ to: "/wiki", text: "Back to Bunny Wiki" }}
        >
            <section className="mb-12">
                <h2 className="text-3xl font-bold text-center mb-8">Key Concepts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoCard icon={<BookOpenIcon />} title="What is Investing?">
                        It's buying assets—like stocks or real estate—that you expect to grow in value over time. Instead of just saving money, you're giving it the chance to grow into more money.
                    </InfoCard>
                    <InfoCard icon={<ZapIcon />} title="The Magic of Compound Interest">
                        This is the #1 rule of wealth building. When you earn interest on your money, that interest then starts earning its own interest. Over time, this snowballs into huge growth. The earlier you start, the more powerful it is!
                    </InfoCard>
                    <InfoCard icon={<TrendingUpIcon />} title="What are Stocks and ETFs?">
                        A <span className="font-bold">Stock</span> is a small piece of ownership in a single company (like Apple). An <span className="font-bold">ETF</span> (Exchange-Traded Fund) is a bundle of many different stocks, which makes it a much safer and easier way to start investing.
                    </InfoCard>
                    <InfoCard icon={<TrendingUpIcon />} title="Risk vs. Reward">
                        Generally, the higher the potential reward from an investment, the higher the risk. The key is to not put all your eggs in one basket (that's called diversification) and to invest for the long term.
                    </InfoCard>
                </div>
            </section>

            <section>
                <h2 className="text-3xl font-bold text-center mb-8">Tools & Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ToolCard icon={<CalculatorIcon />} title="Compound Interest Simulator" description="See the magic of compounding in action! See how much your money could grow over time with our simple calculator." to="/compound-interest-simulator" />
                    <ToolCard icon={<BookOpenIcon />} title="Investing Guide" description="Ready to dive deeper? Our 'Investing' guide walks you through everything from stocks to retirement plans." to="/guide/investing" />
                </div>
            </section>
        </HubPage>
    );
};

export default InvestingWealthPage;
