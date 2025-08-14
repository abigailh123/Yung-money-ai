import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { ChatMessage as ChatMessageType } from '../types';
import ChatMessage from '../components/ChatMessage';
import { v4 as uuidv4 } from 'uuid'; // Install with: npm install uuid

const SendIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>;
const SparklesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.93 13.5A7.14 7.14 0 0 1 2.86 6.43l.51.51M2.35 7l.51-.51A7.14 7.14 0 0 1 10.5 9.07l.51-.51"/><path d="m13.5 10.5.51.51a7.14 7.14 0 0 1 7.07 7.07l-.51.51"/><path d="M17 21.65l-.51-.51a7.14 7.14 0 0 1-7.64-7.64l-.51-.51"/><path d="M12 3v4"/><path d="M12 17v4"/><path d="M3 12h4"/><path d="M17 12h4"/></svg>;

const CHAT_HISTORY_KEY = 'bucksBunny_chatHistory_general';
const SESSION_ID_KEY = 'bucksBunny_session_id';

// Helper to get or create a session ID
function getSessionId() {
  let sessionId = localStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [sessionId, setSessionId] = useState<string>(getSessionId());

  useEffect(() => {
    const savedHistoryRaw = localStorage.getItem(CHAT_HISTORY_KEY);
    if (savedHistoryRaw) {
      try {
        const savedHistory: ChatMessageType[] = JSON.parse(savedHistoryRaw);
        if (Array.isArray(savedHistory)) setMessages(savedHistory);
      } catch (e) {
        localStorage.removeItem(CHAT_HISTORY_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0 && !messages.some(m => m.isStreaming)) {
      const savableMessages = messages.map(({ id, sender, text, timestamp }) => ({ id, sender, text, timestamp }));
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(savableMessages));
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const now = Date.now();
    const userInput: ChatMessageType = { id: now.toString(), sender: 'user', text: input, timestamp: now };
    setMessages(prev => [...prev, userInput]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);
    setError(null);

    const aiResponseTimestamp = Date.now() + 1;
    const aiResponseId = aiResponseTimestamp.toString();
    setMessages(prev => [...prev, { id: aiResponseId, sender: 'ai', text: '', isStreaming: true, timestamp: aiResponseTimestamp }]);

    try {
      const res = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: currentInput, session_id: sessionId }),
      });
      if (!res.ok) throw new Error('Failed to get response from server');
      const data = await res.json();
      setMessages(prev => prev.map(msg =>
        msg.id === aiResponseId ? { ...msg, text: data.output, isStreaming: false } : msg
      ));
      if (data.session_id && data.session_id !== sessionId) {
        setSessionId(data.session_id);
        localStorage.setItem(SESSION_ID_KEY, data.session_id);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setMessages(prev => prev.filter(msg => msg.id !== aiResponseId));
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, sessionId]);
  
  const handleNewChat = () => {
    localStorage.removeItem(CHAT_HISTORY_KEY);
    const newSessionId = uuidv4();
    setSessionId(newSessionId);
    localStorage.setItem(SESSION_ID_KEY, newSessionId);
    setMessages([]);
    setError(null);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto w-full bg-light-bg dark:bg-dark-bg">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-bold">Chat with BucksBunny</h2>
            {messages.length > 0 && (
                <button onClick={handleNewChat} className="flex items-center gap-2 px-3 py-1 text-sm font-semibold rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="Start a new conversation">
                    <SparklesIcon />
                    New Chat
                </button>
            )}
        </div>
      <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
            <h2 className="text-2xl font-bold">Welcome!</h2>
            <p className="mt-2">Your conversation is saved automatically. Ask me anything about money, like "How do I make a budget?"</p>
          </div>
        )}
        {messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        {error && <div className="text-red-500 text-center p-2 bg-red-100 dark:bg-red-900/30 rounded-md">{error}</div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 md:p-6 bg-light-surface/80 dark:bg-dark-surface/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSendMessage} className="relative">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e as any);
              }
            }}
            placeholder="Ask BucksBunny a question... (Press Enter to send)"
            className="w-full p-4 pr-20 rounded-xl border border-gray-300 dark:border-gray-600 bg-light-surface dark:bg-dark-surface focus:ring-2 focus:ring-brand-green focus:outline-none resize-none transition-all duration-200"
            rows={1}
            disabled={isLoading}
            style={{ minHeight: '52px', maxHeight: '200px' }}
            onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = `${target.scrollHeight}px`;
            }}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-brand-green text-white disabled:bg-gray-400 dark:disabled:bg-gray-500 disabled:cursor-not-allowed transition-all hover:bg-brand-green-dark"
            aria-label="Send message"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
            ) : (
              <SendIcon />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;