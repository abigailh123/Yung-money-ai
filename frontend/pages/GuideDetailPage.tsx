
import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { startChat } from '../services/geminiService';
import type { ChatMessage as ChatMessageType } from '../types';
import ChatMessage from '../components/ChatMessage';
import type { Chat } from '@google/genai';
import { COURSE_MODULES } from '../constants/courses';
import { BUCKSBUNNY_SYSTEM_PROMPT } from '../constants/prompts';

const SendIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>;
const ArrowLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;
const SparklesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.93 13.5A7.14 7.14 0 0 1 2.86 6.43l.51.51M2.35 7l.51-.51A7.14 7.14 0 0 1 10.5 9.07l.51-.51"/><path d="m13.5 10.5.51.51a7.14 7.14 0 0 1 7.07 7.07l-.51.51"/><path d="M17 21.65l-.51-.51a7.14 7.14 0 0 1-7.64-7.64l-.51-.51"/><path d="M12 3v4"/><path d="M12 17v4"/><path d="M3 12h4"/><path d="M17 12h4"/></svg>;

const GuideDetailPage: React.FC = () => {
  const { id } = ReactRouterDOM.useParams<{ id: string }>();
  const module = COURSE_MODULES.find(m => m.id === id);

  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chat, setChat] = useState<Chat | null>(null);
  const [guideSystemPrompt, setGuideSystemPrompt] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getSystemPrompt = useCallback(() => {
    if (!module) return '';
    return `
      ${BUCKSBUNNY_SYSTEM_PROMPT}

      You are currently teaching a learning guide titled: "${module.title}".
      Module Description: ${module.description}
      The key learning goals for the user are: ${module.goals.join(', ')}.
      Key concepts to cover: ${module.keyConcepts.join(', ')}.

      Your primary role now is to be a teacher for this specific guide. Guide the user through the topics, answer their questions related to the module, and help them achieve the learning goals. Start by introducing yourself and the guide, then encourage them to ask a question.
    `;
  }, [module]);

  const resetChatSession = useCallback(() => {
    if (!module) return;

    const systemPrompt = getSystemPrompt();
    setGuideSystemPrompt(systemPrompt);
    setChat(startChat({ systemInstruction: systemPrompt }));
    
    const initialMessage: ChatMessageType = {
      id: 'initial-ai-message',
      sender: 'ai',
      text: `Awrite! Welcome to the guide on **${module.title}**. I'm BucksBunny, and I'll be your guide. This is where we get smart about our money, one topic at a time. Ready to jump in? Ask me anything about this topic to get started, like "What's the first thing I should know?"`,
      timestamp: Date.now(),
    };
    setMessages([initialMessage]);
  }, [module, getSystemPrompt]);
  
  useEffect(() => {
    if (module) {
      const systemPrompt = getSystemPrompt();
      setGuideSystemPrompt(systemPrompt);
      
      const chatHistoryKey = `bucksBunny_chatHistory_guide_${module.id}`;
      const savedHistoryRaw = localStorage.getItem(chatHistoryKey);

      if (savedHistoryRaw) {
        try {
          const savedHistory: ChatMessageType[] = JSON.parse(savedHistoryRaw);
          if (Array.isArray(savedHistory) && savedHistory.length > 0) {
            setMessages(savedHistory);
            const geminiHistory = savedHistory.map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'model',
              parts: [{ text: msg.text }]
            })).filter(msg => msg.parts[0].text);
            setChat(startChat({ systemInstruction: systemPrompt, history: geminiHistory }));
            return;
          }
        } catch(e) {
          console.error("Failed to parse chat history:", e);
          localStorage.removeItem(chatHistoryKey);
        }
      }
      resetChatSession();
    }
  }, [id, module, resetChatSession, getSystemPrompt]);

  useEffect(() => {
    if (!module || messages.length <= 1 || messages.some(m => m.isStreaming)) {
        return;
    }
    const chatHistoryKey = `bucksBunny_chatHistory_guide_${module.id}`;
    const savableMessages = messages.map(({ id, sender, text, timestamp }) => ({ id, sender, text, timestamp }));
    localStorage.setItem(chatHistoryKey, JSON.stringify(savableMessages));
  }, [messages, module]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !chat) return;

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
      const stream = await chat.sendMessageStream({ message: currentInput });
      let fullText = '';
      for await (const chunk of stream) {
        const chunkText = chunk.text;
        if (chunkText) {
            fullText += chunkText;
            setMessages(prev => prev.map(msg => 
              msg.id === aiResponseId ? { ...msg, text: fullText } : msg
            ));
        }
      }
      setMessages(prev => prev.map(msg => 
        msg.id === aiResponseId ? { ...msg, isStreaming: false } : msg
      ));
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setMessages(prev => prev.filter(msg => msg.id !== aiResponseId));
      if (module) {
         setChat(startChat({ systemInstruction: guideSystemPrompt })); // Reset chat context on error
      }
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, chat, module, guideSystemPrompt, messages]);
  
  const handleNewChat = () => {
    if (!module) return;
    localStorage.removeItem(`bucksBunny_chatHistory_guide_${module.id}`);
    resetChatSession();
    setError(null);
  };

  if (!module) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Guide Not Found</h1>
        <ReactRouterDOM.Link to="/learning-guides" className="mt-4 inline-block text-brand-green hover:underline">
          Back to Learning Guides
        </ReactRouterDOM.Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto w-full bg-light-bg dark:bg-dark-bg">
       <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
         <ReactRouterDOM.Link to="/learning-guides" className="inline-flex items-center gap-2 text-brand-green hover:underline">
            <ArrowLeftIcon />
            Back to all Learning Guides
        </ReactRouterDOM.Link>
         {messages.length > 1 && (
            <button onClick={handleNewChat} className="flex items-center gap-2 px-3 py-1 text-sm font-semibold rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="Start a new conversation">
                <SparklesIcon />
                New Chat
            </button>
        )}
       </div>
      <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-6">
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
            placeholder={`Ask about ${module.title}...`}
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

export default GuideDetailPage;