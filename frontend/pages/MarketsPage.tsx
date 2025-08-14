
import React, { useState, useEffect } from 'react';
import { useMarketData, useForexData } from '../hooks/useMarketData';
import type { TickerData, NewsArticle, ForexData } from '../types';
import { generateContent, generateJsonContent } from '../services/geminiService';
import { getTickerExplanationPrompt, getNewsCommentaryPrompt, getForexExplanationPrompt } from '../constants/prompts';
import { Type } from '@google/genai';

const ActivityIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>;
const RssIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle></svg>;
const GlobeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>;
const SwapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3L4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;


const Sparkline: React.FC<{ data: number[], color: string }> = ({ data, color }) => {
    if (data.length < 2) return null;
    const width = 100;
    const height = 30;
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min === 0 ? 1 : max - min;

    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((d - min) / range) * height;
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-8 overflow-visible">
            <polyline
                fill="none"
                stroke={color}
                strokeWidth="2"
                points={points}
            />
        </svg>
    );
};

const TickerCard: React.FC<{ ticker: TickerData }> = ({ ticker }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [explanation, setExplanation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    const isUp = ticker.change >= 0;

    const handleCardClick = async () => {
        setIsModalOpen(true);
        if (explanation) return;

        setIsLoading(true);
        setError('');
        try {
            const prompt = getTickerExplanationPrompt(ticker.symbol, ticker.name, ticker.bunnyTag);
            const result = await generateContent(prompt);
            setExplanation(result);
        } catch (e: any) {
            setError(e.message || "Failed to get explanation.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div onClick={handleCardClick} className="bg-light-surface dark:bg-dark-surface p-4 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 cursor-pointer">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="font-bold text-xl">{ticker.symbol}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{ticker.bunnyTag}</div>
                    </div>
                    <div className={`text-xl font-bold ${isUp ? 'text-green-500' : 'text-red-500'}`}>
                        EC${ticker.price.toFixed(2)}
                    </div>
                </div>
                <div className="mt-2 flex justify-between items-end">
                    <div className="w-2/3">
                        <Sparkline data={ticker.history} color={isUp ? '#22c55e' : '#ef4444'} />
                    </div>
                    <div className={`text-sm font-semibold text-right ${isUp ? 'text-green-500' : 'text-red-500'}`}>
                        {isUp ? '+' : ''}{ticker.change.toFixed(2)} ({ticker.changePercent.toFixed(2)}%)
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-light-surface dark:bg-dark-surface rounded-2xl shadow-2xl p-6 w-full max-w-md relative animate-fade-in">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
                            <XIcon />
                        </button>
                        <h3 className="text-2xl font-bold mb-4">{ticker.symbol} - {ticker.name}</h3>
                        {isLoading && <p className="animate-pulse">BucksBunny is thinking...</p>}
                        {error && <p className="text-red-500">{error}</p>}
                        {explanation && <p className="text-gray-600 dark:text-gray-300">{explanation}</p>}
                    </div>
                </div>
            )}
        </>
    );
};

const ForexCard: React.FC<{ forex: ForexData }> = ({ forex }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [explanation, setExplanation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    const isUp = forex.change >= 0;

    const handleCardClick = async () => {
        setIsModalOpen(true);
        if (explanation) return;

        setIsLoading(true);
        setError('');
        try {
            const prompt = getForexExplanationPrompt(forex.pair, forex.description);
            const result = await generateContent(prompt);
            setExplanation(result);
        } catch (e: any) {
            setError(e.message || "Failed to get explanation.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div onClick={handleCardClick} className="bg-light-surface dark:bg-dark-surface p-4 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 cursor-pointer">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="font-bold text-xl">{forex.pair}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{forex.bunnyTag}</div>
                    </div>
                    <div className={`text-xl font-bold ${isUp ? 'text-green-500' : 'text-red-500'}`}>
                        {forex.rate.toFixed(4)}
                    </div>
                </div>
                <div className="mt-2 flex justify-between items-end">
                    <div className="w-2/3">
                        <Sparkline data={forex.history} color={isUp ? '#22c55e' : '#ef4444'} />
                    </div>
                    <div className={`text-sm font-semibold text-right ${isUp ? 'text-green-500' : 'text-red-500'}`}>
                        {isUp ? '+' : ''}{forex.change.toFixed(4)} ({forex.changePercent.toFixed(2)}%)
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-light-surface dark:bg-dark-surface rounded-2xl shadow-2xl p-6 w-full max-w-md relative animate-fade-in">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
                            <XIcon />
                        </button>
                        <h3 className="text-2xl font-bold mb-4">{forex.pair} - {forex.description}</h3>
                        {isLoading && <p className="animate-pulse">BucksBunny is thinking...</p>}
                        {error && <p className="text-red-500">{error}</p>}
                        {explanation && <p className="text-gray-600 dark:text-gray-300">{explanation}</p>}
                    </div>
                </div>
            )}
        </>
    );
};

const NewsCard: React.FC<{ article: NewsArticle }> = ({ article }) => {
    const [commentary, setCommentary] = useState<{ bunnyBlurb: string, walletImpact: string, pollQuestion: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [voted, setVoted] = useState(false);

    const handleGenerateCommentary = async () => {
        if (commentary) return;
        setIsLoading(true);
        setError('');

        try {
            const prompt = getNewsCommentaryPrompt(article.headline);
            const schema = {
                type: Type.OBJECT,
                properties: {
                    bunnyBlurb: { type: Type.STRING },
                    walletImpact: { type: Type.STRING },
                    pollQuestion: { type: Type.STRING },
                },
                required: ["bunnyBlurb", "walletImpact", "pollQuestion"]
            };
            const result = await generateJsonContent(prompt, schema);
            setCommentary(result);
        } catch (e: any) {
            setError(e.message || "Failed to load commentary.");
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-xl shadow-md">
            <p className="text-xs text-gray-500 dark:text-gray-400">{article.source}</p>
            <h4 className="font-bold text-lg mt-1 mb-4">{article.headline}</h4>
            
            {!commentary && !isLoading && (
                 <button onClick={handleGenerateCommentary} className="font-semibold text-brand-green hover:underline">
                    See BucksBunny's Take &rarr;
                </button>
            )}

            {isLoading && <p className="animate-pulse text-sm">Cooking up a hot take...</p>}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {commentary && (
                <div className="space-y-4 text-sm animate-fade-in">
                    <p className="border-l-4 border-brand-yellow-light pl-3 italic">"{commentary.bunnyBlurb}" 🐰</p>
                    <div>
                        <p className="font-bold">What this means for your wallet:</p>
                        <p>{commentary.walletImpact}</p>
                    </div>
                    <div>
                        <p className="font-bold text-center mb-2">{commentary.pollQuestion}</p>
                        {!voted ? (
                            <div className="flex gap-2 justify-center">
                                <button onClick={() => setVoted(true)} className="flex-1 py-2 px-4 rounded-full bg-green-500 text-white font-bold hover:bg-green-600 transition">Cap</button>
                                <button onClick={() => setVoted(true)} className="flex-1 py-2 px-4 rounded-full bg-blue-500 text-white font-bold hover:bg-blue-600 transition">Fact</button>
                            </div>
                        ) : (
                            <p className="text-center font-bold text-brand-green">Thanks for voting!</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

const CurrencyConverter = () => {
    const currencies = ['XCD', 'USD', 'CAD', 'GBP', 'EUR'];
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('XCD');
    const [amount, setAmount] = useState('100');
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    const handleConvert = async () => {
        if (!amount || Number(amount) <= 0) {
            setError('Please enter a valid amount.');
            return;
        }
        setIsLoading(true);
        setError('');
        setResult('');

        try {
            // Special case for pegged currency for instant result
            if ((fromCurrency === 'USD' && toCurrency === 'XCD')) {
                 setResult((Number(amount) * 2.70).toFixed(2));
            } else if (fromCurrency === 'XCD' && toCurrency === 'USD') {
                 setResult((Number(amount) / 2.70).toFixed(2));
            } else if (fromCurrency === toCurrency) {
                 setResult(Number(amount).toFixed(2));
            }
            else {
                 const prompt = `How many ${toCurrency} is 1 ${fromCurrency}? Provide the answer as a JSON object with a single key "rate" which is a number.`;
                 const schema = {
                    type: Type.OBJECT,
                    properties: {
                        rate: { type: Type.NUMBER, description: 'The numerical exchange rate.' }
                    },
                    required: ["rate"]
                };
                const response = await generateJsonContent(prompt, schema);
                const rate = response.rate;
                if (typeof rate !== 'number') {
                    throw new Error('Could not retrieve a valid exchange rate.');
                }
                setResult((Number(amount) * rate).toFixed(2));
            }

        } catch (e: any) {
            setError(e.message || "Failed to get exchange rate.");
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        if (fromCurrency === 'USD' && toCurrency === 'XCD') {
            setResult((Number(amount) * 2.70).toFixed(2));
        }
    },[]);

    return (
        <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-xl shadow-md">
            <div className="grid grid-cols-5 items-center gap-4">
                <div className="col-span-2 space-y-2">
                    <label htmlFor="from-amount" className="text-sm font-bold">You Have</label>
                    <input id="from-amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-light-bg dark:bg-dark-bg focus:ring-2 focus:ring-brand-green"/>
                    <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-light-bg dark:bg-dark-bg focus:ring-2 focus:ring-brand-green">
                        {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div className="col-span-1 text-center">
                    <button onClick={handleSwap} className="p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="Swap currencies">
                        <SwapIcon/>
                    </button>
                </div>
                <div className="col-span-2 space-y-2">
                    <label htmlFor="to-amount" className="text-sm font-bold">You Get</label>
                    <div id="to-amount" className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-lg font-bold h-[46px] flex items-center">{result}</div>
                     <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-light-bg dark:bg-dark-bg focus:ring-2 focus:ring-brand-green">
                        {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
            </div>
            <div className="mt-4">
                 <button onClick={handleConvert} disabled={isLoading} className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-bold rounded-full text-white bg-brand-green hover:bg-brand-green-dark disabled:bg-gray-400">
                    {isLoading ? <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div> : 'Convert'}
                </button>
            </div>
            <div className="text-center mt-3 h-4">
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {!error && <p className="text-xs text-gray-400">Rates are AI-provided estimates.</p>}
            </div>
        </div>
    );
};


const MarketsPage: React.FC = () => {
    const tickers = useMarketData();
    const forexData = useForexData();

    const sampleNews: NewsArticle[] = [
        { id: '1', headline: 'Government Announces Changes to CBI Programme Investment Options', source: 'SKN Observer', topic: 'CBI SKN economy investment' },
        { id: '2', headline: 'SKELEC Fuel Surcharge Increase to Affect Monthly Electricity Bills', source: 'ZIZ News', topic: 'utilities cost of living skelex' },
        { id: '3', headline: 'Nevis Culturama Festival Boosts Local Small Business Sales', source: 'NNC', topic: 'nevis culture business economy' },
        { id: '4', headline: 'ECSE Reports Growth in Regional Banking Stocks', source: 'ECCB Connects', topic: 'ecse banking stocks regional finance' },
        { id: '5', headline: 'Flow vs. Digicel: Who Has the Best Data Plan for Teens?', source: 'Local Chatter', topic: 'consumer telecom data plans' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <header className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-light-text dark:text-dark-text">
                    Live from the Bunny Burrow
                </h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500 dark:text-gray-400">
                    What's poppin' in the markets and in the news. All the finance tea, none of the boring talk.
                </p>
            </header>

            <main className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                    <section>
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <ActivityIcon />
                            The Bunny Board
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {tickers.map(ticker => <TickerCard key={ticker.symbol} ticker={ticker} />)}
                        </div>
                    </section>
                    
                    <section>
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <GlobeIcon />
                            Regional Forex Watch
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {forexData.map(forex => <ForexCard key={forex.pair} forex={forex} />)}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            💱 Currency Converter
                        </h2>
                        <CurrencyConverter />
                    </section>
                </div>
                
                <aside className="lg:col-span-1">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <RssIcon />
                        Bunny Broadcasts
                    </h2>
                    <div className="space-y-4">
                        {sampleNews.map(article => <NewsCard key={article.id} article={article} />)}
                    </div>
                </aside>
            </main>
        </div>
    );
};

export default MarketsPage;