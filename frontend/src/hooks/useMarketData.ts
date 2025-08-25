import { useState, useEffect } from 'react';
import type { TickerData, ForexData } from '../types';

// Helper function to generate a slightly varied history, looking like a random walk
const generateInitialHistory = (baseValue: number, count: number, volatility: number): number[] => {
  if (volatility === 0) {
    return Array(count).fill(baseValue);
  }

  const history: number[] = [];
  let currentValue = baseValue;
  
  // Generate history going backwards from the last point
  for (let i = 0; i < count; i++) {
    history.unshift(currentValue);
    // Introduce a random change
    currentValue = currentValue * (1 + (Math.random() - 0.5) * volatility);
  }
  
  // Normalize the array so the last value is exactly the baseValue
  const lastValue = history[count - 1];
  if (lastValue === 0) return Array(count).fill(baseValue); // Avoid division by zero
  const adjustment = baseValue / lastValue;
  return history.map(v => Math.max(0.01, v * adjustment)); // Ensure no negative or zero prices
};


const rawTickers = [
  { symbol: 'SKNANB', name: 'St. Kitts-Nevis-Anguilla National Bank Ltd', price: 2.50, bunnyTag: 'Big Bank on D Block 🏦', volatility: 0.03 },
  { symbol: 'BON', name: 'The Bank of Nevis Ltd', price: 3.00, bunnyTag: 'Nevis Money Moves 🏝️', volatility: 0.04 },
  { symbol: 'SLH', name: 'S. L. Horsford & Company Ltd', price: 15.00, bunnyTag: 'De Everything Store 🛒', volatility: 0.02 },
  { symbol: 'ECFH', name: 'East Caribbean Financial Holding Co. Ltd', price: 4.20, bunnyTag: 'Whole Region Vibes ✨', volatility: 0.05 },
  { symbol: ' TDC', name: 'TDC Group Ltd', price: 1.10, bunnyTag: 'From Cars to Insurance 🚗', volatility: 0.06 },
  { symbol: 'ECCB', name: 'ECCB Gov T-Bill', price: 99.85, bunnyTag: 'EC Money Secure 🔒', volatility: 0.002 },
];

const initialTickers: TickerData[] = rawTickers.map(t => {
    const history = generateInitialHistory(t.price, 30, t.volatility);
    const change = t.price - history[0];
    const changePercent = (change / history[0]) * 100;
    return {
        symbol: t.symbol,
        name: t.name,
        price: t.price,
        bunnyTag: t.bunnyTag,
        history,
        change,
        changePercent,
    };
});

const rawForex = [
  { pair: 'USD/XCD', description: 'US Dollar to EC Dollar', rate: 2.70, bunnyTag: 'The Official Rate  peg', volatility: 0 },
  { pair: 'CAD/XCD', description: 'Canadian Dollar to EC Dollar', rate: 2.05, bunnyTag: 'For the Canada Crew 🍁', volatility: 0.01 },
  { pair: 'GBP/XCD', description: 'British Pound to EC Dollar', rate: 3.42, bunnyTag: 'Pounds to Paradise 💷', volatility: 0.015 },
  { pair: 'EUR/XCD', description: 'Euro to EC Dollar', rate: 2.91, bunnyTag: 'Euro Trip Money 🇪🇺', volatility: 0.012 },
];

const initialForex: ForexData[] = rawForex.map(f => {
    const history = generateInitialHistory(f.rate, 30, f.volatility);
    const change = f.rate - history[0];
    const changePercent = (change / history[0]) * 100;
    return {
        pair: f.pair,
        description: f.description,
        rate: f.rate,
        bunnyTag: f.bunnyTag,
        history,
        change,
        changePercent,
    };
});


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
          
          const sessionStartPrice = newHistory[0];
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

                    const sessionStartRate = newHistory[0];
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

