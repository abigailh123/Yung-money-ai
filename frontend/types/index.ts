
export type Theme = 'light' | 'dark';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: number;
  isStreaming?: boolean;
}

export interface CourseContent {
  type: 'Lecture Video' | 'Reading' | 'Discussion Prompt' | 'Vignette Video' | 'Interview' | 'Quiz' | 'Use Case' | 'Street Interview Video' | 'Optional Peer-Review' | 'Loan Denial Testimonial';
  title: string;
  duration: string;
}

export interface CourseModule {
  id:string;
  title: string;
  description: string;
  goals: string[];
  keyConcepts: string[];
  contents: CourseContent[];
}

export interface Expense {
  id: string;
  name: string;
  amount: string;
}

export interface Debt {
  id: string;
  name: string;
  balance: string;
  apr: string;
  minPayment: string;
}

export interface TickerData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  bunnyTag: string;
  history: number[];
}

export interface ForexData {
  pair: string;
  description: string;
  rate: number;
  change: number;
  changePercent: number;
  bunnyTag: string;
  history: number[];
}

export interface NewsArticle {
  id: string;
  headline: string;
  source: string;
  topic: string; // for Gemini prompt context
}

export interface AtmLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  feeLevel: 'free' | 'low' | 'high';
  address: string;
}