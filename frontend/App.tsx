


import React, { useState, createContext, useMemo, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import ChatPage from './pages/ChatPage';
import LearningGuidesPage from './pages/LearningGuidesPage';
import GuideDetailPage from './pages/GuideDetailPage';
import BudgetPlannerPage from './pages/BudgetPlannerPage';
import AboutPage from './pages/AboutPage';
import Header from './components/Header';
import Footer from './components/Footer';
import WikiPage from './pages/WikiPage';
import CreditDebtPage from './pages/CreditDebtPage';
import DebtCalculatorPage from './pages/DebtCalculatorPage';
import BankingBasicsPage from './pages/BankingBasicsPage';
import JobsSideHustlesPage from './pages/JobsSideHustlesPage';
import InvestingWealthPage from './pages/InvestingWealthPage';
import FinancialAidPage from './pages/FinancialAidPage';
import TaxesPaychecksPage from './pages/TaxesPaychecksPage';
import AdultingBillsPage from './pages/AdultingBillsPage';
import MentalMoneyHealthPage from './pages/MentalMoneyHealthPage';
import CompoundInterestSimulatorPage from './pages/CompoundInterestSimulatorPage';
import JustGettingStartedPage from './pages/journeys/JustGettingStartedPage';
import FirstJobPage from './pages/journeys/FirstJobPage';
import CollegePage from './pages/journeys/CollegePage';
import MoneyMindPage from './pages/journeys/MoneyMindPage';
import MarketsPage from './pages/MarketsPage';
import AtmFinderPage from './pages/AtmFinderPage';

export const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
});

function App() {
  const [theme, setTheme] = useState('dark');
  
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);


  const toggleTheme = () => {
    setTheme(prevTheme => {
        const newTheme = prevTheme === 'light' ? 'dark' : 'light';
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        return newTheme;
    });
  };

  const themeValue = useMemo(() => ({ theme, toggleTheme }), [theme]);
  
  return (
    <ThemeContext.Provider value={themeValue}>
      <ReactRouterDOM.HashRouter>
        <div className={`flex flex-col min-h-screen font-sans bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-300`}>
          <Header />
          <main className="flex-grow">
            <ReactRouterDOM.Routes>
              <ReactRouterDOM.Route path="/" element={<WelcomePage />} />
              <ReactRouterDOM.Route path="/about" element={<AboutPage />} />
              <ReactRouterDOM.Route path="/learning-guides" element={<LearningGuidesPage />} />
              <ReactRouterDOM.Route path="/guide/:id" element={<GuideDetailPage />} />
              <ReactRouterDOM.Route path="/budget-planner" element={<BudgetPlannerPage />} />
              <ReactRouterDOM.Route path="/chat" element={<ChatPage />} />
              <ReactRouterDOM.Route path="/wiki" element={<WikiPage />} />
              <ReactRouterDOM.Route path="/markets" element={<MarketsPage />} />
              <ReactRouterDOM.Route path="/credit-debt" element={<CreditDebtPage />} />
              <ReactRouterDOM.Route path="/debt-calculator" element={<DebtCalculatorPage />} />
              <ReactRouterDOM.Route path="/atm-finder" element={<AtmFinderPage />} />
              <ReactRouterDOM.Route path="/banking-basics" element={<BankingBasicsPage />} />
              <ReactRouterDOM.Route path="/jobs-side-hustles" element={<JobsSideHustlesPage />} />
              <ReactRouterDOM.Route path="/investing-wealth" element={<InvestingWealthPage />} />
              <ReactRouterDOM.Route path="/financial-aid" element={<FinancialAidPage />} />
              <ReactRouterDOM.Route path="/taxes-paychecks" element={<TaxesPaychecksPage />} />
              <ReactRouterDOM.Route path="/adulting-bills" element={<AdultingBillsPage />} />
              <ReactRouterDOM.Route path="/mental-money-health" element={<MentalMoneyHealthPage />} />
              <ReactRouterDOM.Route path="/compound-interest-simulator" element={<CompoundInterestSimulatorPage />} />
              <ReactRouterDOM.Route path="/journey/getting-started" element={<JustGettingStartedPage />} />
              <ReactRouterDOM.Route path="/journey/first-job" element={<FirstJobPage />} />
              <ReactRouterDOM.Route path="/journey/college" element={<CollegePage />} />
              <ReactRouterDOM.Route path="/journey/money-mind" element={<MoneyMindPage />} />
            </ReactRouterDOM.Routes>
          </main>
          <Footer />
        </div>
      </ReactRouterDOM.HashRouter>
    </ThemeContext.Provider>
  );
}

export default App;