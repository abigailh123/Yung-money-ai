
import React, { useState } from 'react';
import { generateContent } from '../services/geminiService';
import type { Expense } from '../types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;

const BudgetPlannerPage: React.FC = () => {
    const [income, setIncome] = useState('');
    const [expenses, setExpenses] = useState<Expense[]>([
        { id: 'exp1', name: 'Phone Top-up', amount: '' },
        { id: 'exp2', name: 'Lunches/Snacks', amount: '' },
        { id: 'exp3', name: 'Bus Fare', amount: '' },
    ]);
    const [goals, setGoals] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [generatedPlan, setGeneratedPlan] = useState('');

    const handleAddExpense = () => {
        setExpenses([...expenses, { id: `exp${Date.now()}`, name: '', amount: '' }]);
    };

    const handleRemoveExpense = (id: string) => {
        setExpenses(expenses.filter(exp => exp.id !== id));
    };

    const handleExpenseChange = (id: string, field: 'name' | 'amount', value: string) => {
        setExpenses(expenses.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setGeneratedPlan('');

        const totalExpenses = expenses.reduce((acc, exp) => acc + (parseFloat(exp.amount) || 0), 0);
        
        const prompt = `
            As BucksBunny, create a personalized budget plan for a teen in St. Kitts and Nevis with the following details:
            - Monthly Income: EC$${income || 'not specified'}
            - Monthly Expenses: ${expenses.filter(e => e.name && e.amount).map(e => `${e.name}: EC$${e.amount}`).join(', ')} (Total: EC$${totalExpenses})
            - Financial Goals: ${goals || 'not specified'}

            Please do the following:
            1.  Start with a friendly, encouraging opening using some Kittitian/Nevisian slang.
            2.  Create a clear budget plan in a markdown table. Columns should be: 'Category', 'Budgeted Amount (EC$)', 'Actual (EC$)', and 'Notes/Tips'. Pre-fill the 'Category' and 'Budgeted Amount' columns. Add categories for savings and investments based on their goals.
            3.  Provide 3-5 actionable, simple tips in a bulleted list on how they can stick to this budget and reach their goals. The tips should be highly relevant to a teen's lifestyle in St. Kitts and Nevis (e.g., saving on bus fare, finding cheaper food spots, etc.).
            4.  Keep the entire tone positive, using emojis and relatable slang where appropriate.
        `;

        try {
            const plan = await generateContent(prompt);
            setGeneratedPlan(plan);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const markdownComponents = {
        table: ({node, ...props}: any) => <div className="overflow-x-auto my-4"><table className="w-full border-collapse border border-gray-300 dark:border-gray-600" {...props} /></div>,
        thead: ({node, ...props}: any) => <thead className="bg-gray-100 dark:bg-gray-800" {...props} />,
        th: ({node, ...props}: any) => <th className="p-3 border border-gray-300 dark:border-gray-600 text-left font-semibold" {...props} />,
        td: ({node, ...props}: any) => <td className="p-3 border border-gray-300 dark:border-gray-600" {...props} />,
        p: ({node, ...props}: any) => <p className="mb-4 last:mb-0" {...props} />,
        ul: ({node, ...props}: any) => <ul className="list-disc list-inside mb-4 pl-4 space-y-2" {...props} />,
        ol: ({node, ...props}: any) => <ol className="list-decimal list-inside mb-4 pl-4 space-y-2" {...props} />,
        li: ({node, ...props}: any) => <li className="mb-1" {...props} />,
        h1: ({node, ...props}: any) => <h1 className="text-3xl font-bold mb-4" {...props} />,
        h2: ({node, ...props}: any) => <h2 className="text-2xl font-bold mb-3" {...props} />,
        h3: ({node, ...props}: any) => <h3 className="text-xl font-bold mb-3" {...props} />,
        a: ({node, ...props}: any) => <a className="text-brand-green hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-light-text dark:text-dark-text">
                    AI Budget Planner
                </h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500 dark:text-gray-400">
                    Tell me your money situation, and I'll help you cook up a solid plan to get that bread right. No cap.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Input Form */}
                <div className="bg-light-surface dark:bg-dark-surface p-8 rounded-2xl shadow-lg">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="income" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Monthly Income (EC$)</label>
                                <input type="text" inputMode="decimal" name="income" id="income" value={income} onChange={e => setIncome(e.target.value)} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-light-bg dark:bg-dark-bg focus:ring-2 focus:ring-brand-green focus:outline-none" placeholder="e.g., 500" />
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Monthly Expenses (EC$)</h3>
                                <div className="space-y-3">
                                    {expenses.map((exp, index) => (
                                        <div key={exp.id} className="flex items-center gap-2">
                                            <input type="text" value={exp.name} onChange={e => handleExpenseChange(exp.id, 'name', e.target.value)} className="w-1/2 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-light-bg dark:bg-dark-bg focus:ring-2 focus:ring-brand-green focus:outline-none" placeholder="Expense Name" />
                                            <input type="text" inputMode="decimal" value={exp.amount} onChange={e => handleExpenseChange(exp.id, 'amount', e.target.value)} className="w-1/2 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-light-bg dark:bg-dark-bg focus:ring-2 focus:ring-brand-green focus:outline-none" placeholder="Amount" />
                                            <button type="button" onClick={() => handleRemoveExpense(exp.id)} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full" aria-label="Remove expense"><TrashIcon /></button>
                                        </div>
                                    ))}
                                </div>
                                <button type="button" onClick={handleAddExpense} className="mt-4 flex items-center gap-2 text-sm font-semibold text-brand-green hover:underline">
                                    <PlusIcon /> Add Expense
                                </button>
                            </div>
                            
                            <div>
                                <label htmlFor="goals" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Financial Goals</label>
                                <textarea name="goals" id="goals" value={goals} onChange={e => setGoals(e.target.value)} rows={3} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-light-bg dark:bg-dark-bg focus:ring-2 focus:ring-brand-green focus:outline-none" placeholder="e.g., Save for a new phone, invest EC$50/month"></textarea>
                            </div>

                            <div>
                                <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-full text-white bg-brand-green hover:bg-brand-green-dark disabled:bg-gray-400 disabled:cursor-not-allowed md:py-4 md:text-lg md:px-10 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                                    {isLoading ? <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div> : "Generate My Plan"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Output Area */}
                <div className="bg-light-surface dark:bg-dark-surface p-8 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Your AI-Powered Budget</h2>
                    {error && <div className="text-red-500 text-center p-2 bg-red-100 dark:bg-red-900/30 rounded-md">{error}</div>}
                    {isLoading && (
                        <div className="flex justify-center items-center h-full">
                            <div className="text-center">
                                <p className="text-lg font-semibold animate-pulse">BucksBunny is cooking up your plan...</p>
                                <p className="text-4xl mt-4 animate-bounce-slow">💰</p>
                            </div>
                        </div>
                    )}
                    {generatedPlan ? (
                         <div className="prose prose-sm dark:prose-invert max-w-none">
                            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                                {generatedPlan}
                            </ReactMarkdown>
                        </div>
                    ) : !isLoading && (
                        <div className="text-center text-gray-500 dark:text-gray-400 h-full flex items-center justify-center">
                            <p>Fill out the form to see your personalized budget plan here!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BudgetPlannerPage;