
import React from 'react';

// --- ICONS ---
const TargetIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
const MessageSquareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const LibraryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 6h4"/><path d="M16 12h4"/><path d="M12 18H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2"/><path d="M20 12v6a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-8"/></svg>;
const WrenchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>;


const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-light-surface dark:bg-dark-surface p-8 rounded-2xl shadow-lg flex flex-col items-center text-center transform hover:-translate-y-1 transition-transform duration-300">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-brand-green-light text-white mb-6">
            {icon}
        </div>
        <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-3">
            {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 flex-grow">{children}</p>
    </div>
);


const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-6xl font-extrabold">
           <span className="block text-light-text dark:text-dark-text">Our Mission</span>
           <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-yellow-light mt-2">
            Make Money Make Sense.
           </span>
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-gray-500 dark:text-gray-400">
          Financial education is often boring, intimidating, or just plain out of touch. We're here to change that. BucksBunny was built to give every young person, especially in the Caribbean, a financial coach in their pocket—one that's friendly, smart, and actually gets it.
        </p>
      </div>

      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-light-text dark:text-dark-text mb-4">How We Help You Win With Money</h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
            We combine AI-powered guidance with practical, hands-on tools to create a complete financial literacy experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        
        <FeatureCard icon={<MessageSquareIcon />} title="Your AI Money Coach">
            Meet BucksBunny, your 24/7 financial guide. Ask anything from "how do I make a budget?" to "what's an ETF?" and get quick, clear answers in a language you can understand. No judgment, ever.
        </FeatureCard>

        <FeatureCard icon={<LibraryIcon />} title="The Bunny Wiki">
            Explore a massive wiki of financial topics, broken down into simple, easy-to-digest articles and guides. It’s your one-stop-shop for getting smarter with your bucks.
        </FeatureCard>

        <FeatureCard icon={<WrenchIcon />} title="Interactive Tools & Simulators">
            Learn by doing. Use our AI Budget Planner, Debt Repayment Calculator, and Compound Interest Simulator to apply what you've learned and see the real-world impact of your financial decisions in a safe space.
        </FeatureCard>

        <FeatureCard icon={<TargetIcon />} title="Guided Learning Journeys">
            Not sure where to start? Our "Choose Your Path" feature provides curated resource bundles for every stage of life, whether you're getting your first job, heading to college, or just starting out.
        </FeatureCard>

      </div>

       <div className="text-center mt-20 bg-light-surface dark:bg-dark-surface p-10 rounded-2xl shadow-inner">
        <h2 className="text-3xl font-bold text-light-text dark:text-dark-text">Our Promise To You</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
            Your financial journey is personal. We are committed to providing a private, secure, and supportive environment for you to learn and grow. We're not here to sell you products; we're here to empower you with knowledge.
        </p>
      </div>

    </div>
  );
};

export default AboutPage;
