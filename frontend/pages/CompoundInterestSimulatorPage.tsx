

import React, { useState, useMemo } from 'react';
import { HubPage } from '../components/HubPage';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

const CompoundInterestSimulatorPage: React.FC = () => {
    const [principal, setPrincipal] = useState(1000);
    const [contribution, setContribution] = useState(100);
    const [rate, setRate] = useState(7);
    const [years, setYears] = useState(10);

    const calculation = useMemo(() => {
        const p = principal;
        const c = contribution * 12; // Annual contribution
        const r = rate / 100;
        const t = years;

        let futureValue = p;
        const data = [];
        let totalContributions = p;

        for (let i = 1; i <= t; i++) {
            totalContributions += c;
            futureValue = (futureValue + c) * (1 + r);
            data.push({
                year: i,
                value: futureValue,
                contributions: totalContributions
            });
        }
        
        const totalGrowth = futureValue - totalContributions;

        return { futureValue, totalContributions, totalGrowth, data };
    }, [principal, contribution, rate, years]);

    return (
        <HubPage
            title="Compound Interest Simulator ✨"
            subtitle="See the magic of compounding in real-time. Adjust the sliders to see how small changes can lead to huge growth over time."
            backLink={{ to: "/wiki", text: "Back to Bunny Wiki" }}
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Controls */}
                <div className="lg:col-span-1 bg-light-surface dark:bg-dark-surface p-8 rounded-2xl shadow-lg space-y-6">
                    <div>
                        <label htmlFor="principal" className="block text-sm font-bold text-gray-700 dark:text-gray-300">Initial Investment</label>
                        <input id="principal" type="range" min="0" max="10000" step="100" value={principal} onChange={e => setPrincipal(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                        <div className="text-center font-bold text-lg mt-1">{formatCurrency(principal)}</div>
                    </div>
                    <div>
                        <label htmlFor="contribution" className="block text-sm font-bold text-gray-700 dark:text-gray-300">Monthly Contribution</label>
                        <input id="contribution" type="range" min="0" max="1000" step="25" value={contribution} onChange={e => setContribution(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                        <div className="text-center font-bold text-lg mt-1">{formatCurrency(contribution)} / month</div>
                    </div>
                     <div>
                        <label htmlFor="rate" className="block text-sm font-bold text-gray-700 dark:text-gray-300">Annual Interest Rate</label>
                        <input id="rate" type="range" min="1" max="15" step="0.5" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                        <div className="text-center font-bold text-lg mt-1">{rate.toFixed(1)}%</div>
                    </div>
                    <div>
                        <label htmlFor="years" className="block text-sm font-bold text-gray-700 dark:text-gray-300">Years to Grow</label>
                        <input id="years" type="range" min="1" max="50" step="1" value={years} onChange={e => setYears(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                        <div className="text-center font-bold text-lg mt-1">{years} years</div>
                    </div>
                </div>

                {/* Results */}
                <div className="lg:col-span-2 bg-light-surface dark:bg-dark-surface p-8 rounded-2xl shadow-lg flex flex-col justify-center items-center">
                    <div className="text-center">
                        <p className="text-lg text-gray-500 dark:text-gray-400">In {years} years, you could have...</p>
                        <p className="text-5xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-yellow-light my-4">
                            {formatCurrency(calculation.futureValue)}
                        </p>
                    </div>
                    <div className="w-full max-w-md mt-6 space-y-2 text-center">
                        <div className="flex justify-between text-lg">
                            <span className="font-semibold">Total Contributions:</span>
                            <span>{formatCurrency(calculation.totalContributions)}</span>
                        </div>
                        <div className="flex justify-between text-lg">
                             <span className="font-semibold">Total Interest Growth:</span>
                            <span className="text-brand-green font-bold">{formatCurrency(calculation.totalGrowth)}</span>
                        </div>
                    </div>
                     <div className="w-full max-w-md mt-8">
                        <div className="flex items-end h-40 border-b-2 border-gray-400">
                             {calculation.data.map(d => {
                                const height = (d.value / calculation.futureValue) * 100;
                                const contributionHeight = (d.contributions / d.value) * 100;
                                return (
                                    <div key={d.year} className="flex-1 h-full flex items-end" title={`Year ${d.year}: ${formatCurrency(d.value)}`}>
                                        <div style={{ height: `${height}%`}} className="w-full bg-gray-300 dark:bg-gray-600 rounded-t-md hover:opacity-80 transition-opacity flex flex-col justify-end">
                                            <div style={{height: `${contributionHeight}%`}} className="bg-brand-green-light rounded-t-md"></div>
                                        </div>
                                    </div>
                                )
                             })}
                        </div>
                         <div className="text-xs text-center mt-2 text-gray-500 dark:text-gray-400">
                            <span className="inline-block w-3 h-3 bg-brand-green-light rounded-sm mr-1"></span> Contributions 
                            <span className="inline-block w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-sm ml-4 mr-1"></span> Interest
                        </div>
                    </div>
                </div>
            </div>
        </HubPage>
    );
};

export default CompoundInterestSimulatorPage;
