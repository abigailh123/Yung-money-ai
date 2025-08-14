
import React, { useState } from 'react';
import { generateContent } from '../services/geminiService';
import type { Debt } from '../types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;

const DebtCalculatorPage: React.FC = () => {
    const [debts, setDebts] = useState<Debt[]>([
        { id: `debt${Date.now()}`, name: 'Credit Card', balance: '2500', apr: '22.9', minPayment: '75' },
    ]);
    const [extraPayment, setExtraPayment] = useState('100');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [generatedPlan, setGeneratedPlan] = useState('');

    const handleAddDebt = () => {
        setDebts([...debts, { id: `debt${Date.now()}`, name: '', balance: '', apr: '', minPayment: '' }]);
    };

    const handleRemoveDebt = (id: string) => {
        setDebts(debts.filter(debt => debt.id !== id));
    };

    const handleDebtChange = (id: string, field: keyof Omit<Debt, 'id'>, value: string) => {
        setDebts(debts.map(debt => debt.id === id ? { ...debt, [field]: value } : debt));
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setGeneratedPlan('');

        const prompt = `
            As BucksBunny, create a debt repayment plan for a teen in St. Kitts and Nevis. Here's their situation:
            - Debts: ${debts.filter(d => d.name && d.balance && d.apr && d.minPayment).map(d => `Name: ${d.name}, Balance: EC$${d.balance}, APR: ${d.apr}%, Minimum Payment: EC$${d.minPayment}`).join('; ')}
            - Extra monthly payment I can afford: EC$${extraPayment || '0'}

            Please do the following:
            1.  Start with a super encouraging and friendly opening using local slang. Make them feel like they can do this!
            2.  Briefly explain the Debt Snowball method (paying off smallest balance first for quick wins).
            3.  Briefly explain the Debt Avalanche method (paying off highest APR first to save money on interest).
            4.  For BOTH methods, calculate and present a summary that includes:
                - The order the debts will be paid off.
                - The total interest you'll pay (in EC$).
                - How long it'll take to be completely debt-free (in months or years/months).
                Present this summary in a clear, easy-to-compare format, maybe using markdown tables.
            5.  Create a "My Recommendation" section. Based on their debts, recommend either the Snowball or Avalanche method and explain WHY in simple terms (e.g., "Go with Snowball for motivation!" or "Pick Avalanche to save max cash!").
            6.  Give 3 actionable, simple tips for paying off debt faster that are relevant to life in St. Kitts & Nevis.
            7.  Maintain your signature positive, supportive, and relatable persona. Use emojis and slang where it fits!
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
        h1: ({node, ...props}: any) => <h1 className="text-3xl font-bold mb-4" {...props} />,
        h2: ({node, ...props}: any) => <h2 className="text-2xl font-bold mb-3" {...props} />,
        h3: ({node, ...props}: any) => <h3 className="text-xl font-bold mb-3" {...props} />,
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-light-text dark:text-dark-text">
                    AI Debt Repayment Calculator
                </h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500 dark:text-gray-400">
                    Got debt? No sweat. Let's make a plan to knock it out. Tell me what you owe, and I'll show you the way.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="bg-light-surface dark:bg-dark-surface p-8 rounded-2xl shadow-lg">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">List Your Debts</h3>
                            <div className="space-y-4">
                                {debts.map((debt, index) => (
                                    <div key={debt.id} className="grid grid-cols-2 gap-3 p-4 bg-light-bg dark:bg-dark-bg rounded-lg relative">
                                        <input type="text" value={debt.name} onChange={e => handleDebtChange(debt.id, 'name', e.target.value)} className="col-span-2 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-light-surface dark:bg-dark-surface focus:ring-2 focus:ring-brand-green" placeholder="Debt Name (e.g., Credit Card)" />
                                        <input type="text" inputMode="decimal" value={debt.balance} onChange={e => handleDebtChange(debt.id, 'balance', e.target.value)} className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-light-surface dark:bg-dark-surface focus:ring-2 focus:ring-brand-green" placeholder="Balance (EC$)" />
                                        <input type="text" inputMode="decimal" value={debt.apr} onChange={e => handleDebtChange(debt.id, 'apr', e.target.value)} className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-light-surface dark:bg-dark-surface focus:ring-2 focus:ring-brand-green" placeholder="APR (%)" />
                                        <input type="text" inputMode="decimal" value={debt.minPayment} onChange={e => handleDebtChange(debt.id, 'minPayment', e.target.value)} className="col-span-2 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-light-surface dark:bg-dark-surface focus:ring-2 focus:ring-brand-green" placeholder="Minimum Monthly Payment (EC$)" />
                                        <button type="button" onClick={() => handleRemoveDebt(debt.id)} className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full" aria-label="Remove debt"><TrashIcon /></button>
                                    </div>
                                ))}
                            </div>
                            <button type="button" onClick={handleAddDebt} className="mt-4 flex items-center gap-2 text-sm font-semibold text-brand-green hover:underline">
                                <PlusIcon /> Add Another Debt
                            </button>
                        </div>
                        
                        <div>
                            <label htmlFor="extraPayment" className="block text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">Extra Monthly Payment (EC$)</label>
                            <input type="text" inputMode="decimal" name="extraPayment" id="extraPayment" value={extraPayment} onChange={e => setExtraPayment(e.target.value)} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-light-bg dark:bg-dark-bg focus:ring-2 focus:ring-brand-green focus:outline-none" placeholder="e.g., 100" />
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Any amount you can pay above the minimums will speed things up!</p>
                        </div>

                        <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-full text-white bg-brand-green hover:bg-brand-green-dark disabled:bg-gray-400 disabled:cursor-not-allowed md:py-4 md:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                            {isLoading ? <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div> : "Create My Debt-Free Plan"}
                        </button>
                    </form>
                </div>

                <div className="bg-light-surface dark:bg-dark-surface p-8 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Your Debt-Free Blueprint</h2>
                    {error && <div className="text-red-500 text-center p-2 bg-red-100 dark:bg-red-900/30 rounded-md">{error}</div>}
                    {isLoading && (
                        <div className="flex justify-center items-center h-full">
                            <div className="text-center">
                                <p className="text-lg font-semibold animate-pulse">BucksBunny is running the numbers...</p>
                                <p className="text-4xl mt-4 animate-bounce-slow">🧮</p>
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
                            <p>Fill out the form to see your personalized debt repayment plan here!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DebtCalculatorPage;