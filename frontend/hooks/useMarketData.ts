
import { useState, useEffect } from 'react';
import type { TickerData, ForexData } from '../types';

const initialTickers: TickerData[] = [
  { symbol: 'SKNANB', name: 'St. Kitts-Nevis-Anguilla National Bank Ltd', price: 2.50, change: 0, changePercent: 0, bunnyTag: 'Big Bank on D Block 🏦', history: Array(30).fill(2.50) },
  { symbol: 'BON', name: 'The Bank of Nevis Ltd', price: 3.00, change: 0, changePercent: 0, bunnyTag: 'Nevis Money Moves 🏝️', history: Array(30).fill(3.00) },
  { symbol: 'SLH', name: 'S. L. Horsford & Company Ltd', price: 15.00, change: 0, changePercent: 0, bunnyTag: 'De Everything Store 🛒', history: Array(30).fill(15.00) },
  { symbol: 'ECFH', name: 'East Caribbean Financial Holding Co. Ltd', price: 4.20, change: 0, changePercent: 0, bunnyTag: 'Whole Region Vibes ✨', history: Array(30).fill(4.20) },
  { symbol: ' TDC', name: 'TDC Group Ltd', price: 1.10, change: 0, changePercent: 0, bunnyTag: 'From Cars to Insurance 🚗', history: Array(30).fill(1.10) },
  { symbol: 'ECCB', name: 'ECCB Gov T-Bill', price: 99.85, change: 0, changePercent: 0, bunnyTag: 'EC Money Secure 🔒', history: Array(30).fill(99.85) },
];

const initialForex: ForexData[] = [
  { pair: 'USD/XCD', description: 'US Dollar to EC Dollar', rate: 2.70, change: 0, changePercent: 0, bunnyTag: 'The Official Rate  peg', history: Array(30).fill(2.70) },
  { pair: 'CAD/XCD', description: 'Canadian Dollar to EC Dollar', rate: 2.05, change: 0, changePercent: 0, bunnyTag: 'For the Canada Crew 🍁', history: Array(30).fill(2.05) },
  { pair: 'GBP/XCD', description: 'British Pound to EC Dollar', rate: 3.42, change: 0, changePercent: 0, bunnyTag: 'Pounds to Paradise 💷', history: Array(30).fill(3.42) },
  { pair: 'EUR/XCD', description: 'Euro to EC Dollar', rate: 2.91, change: 0, changePercent: 0, bunnyTag: 'Euro Trip Money 🇪🇺', history: Array(30).fill(2.91) },
];


export function useMarketData() {
  const [tickers, setTickers] = useState<TickerData[]>(initialTickers);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickers(currentTickers => 
        currentTickers.map(ticker => {
          const changeFactor = 0.01;
          const change = (Math.random() - 0.49) * (ticker.price * changeFactor);
          const newPrice = Math.max(0, ticker.price + change);
          
          const newHistory = [...ticker.history.slice(1), newPrice];
          
          const sessionStartPrice = ticker.history[0];
          const priceChangeSinceStart = newPrice - sessionStartPrice;
          const percentChangeSinceStart = (priceChangeSinceStart / sessionStartPrice) * 100;

          return {
            ...ticker,
            price: newPrice,
            change: priceChangeSinceStart,
            changePercent: percentChangeSinceStart,
            history: newHistory,
          };
        })
      );
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return tickers;
}

export function useForexData() {
    const [forex, setForex] = useState<ForexData[]>(initialForex);

    useEffect(() => {
        const interval = setInterval(() => {
            setForex(currentForex =>
                currentForex.map(pair => {
                    // Keep USD/XCD pegged
                    if (pair.pair === 'USD/XCD') return pair;

                    const changeFactor = 0.005; // Forex is less volatile in this sim
                    const change = (Math.random() - 0.5) * (pair.rate * changeFactor);
                    const newRate = Math.max(0, pair.rate + change);
                    
                    const newHistory = [...pair.history.slice(1), newRate];

                    const sessionStartRate = pair.history[0];
                    const rateChangeSinceStart = newRate - sessionStartRate;
                    const percentChangeSinceStart = (rateChangeSinceStart / sessionStartRate) * 100;

                    return {
                        ...pair,
                        rate: newRate,
                        change: rateChangeSinceStart,
                        changePercent: percentChangeSinceStart,
                        history: newHistory,
                    };
                })
            );
        }, 2500); // Update every 2.5 seconds

        return () => clearInterval(interval);
    }, []);

    return forex;
}