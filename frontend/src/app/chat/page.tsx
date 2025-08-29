'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Logo } from '../../components/Logo';
import type { ChatMessage } from '../../types';
import { fetchChatHistory, sendChatMessage, type BackendHistoryMessage } from '../../services/chatService';
import { ChatInput, ChatInputTextArea, ChatInputSubmit } from '../../components/ui/chat-input';
import { ChatMessage as ChatMessageComponent } from '../../components/chat-message';
import { SuggestionPills } from '../../components/suggestion-pills';
import { ttsService } from '../../services/ttsService';

const initialSuggestions = [
  "How do I open my first SKNANB savings account?",
  "Help me create a budget for living in St. Kitts", 
  "What are the best investment options in the Caribbean?",
  "Show me how to save for college tuition",
];

const followUpSuggestions = [
  "How much should I save each month?",
  "Tell me about local banks and credit unions",
  "What's a good emergency fund amount?", 
  "How do I start investing with small amounts?",
];

function generateSessionId(): string {
  return `bunny_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function newId(): string {
  try {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return (crypto as unknown as { randomUUID: () => string }).randomUUID();
    }
  } catch {}
  return `${Math.random().toString(36).slice(2)}_${Date.now().toString(36)}`;
}

export default function ChatPage() {
  const [sessionId, setSessionId] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [hasStartedChat, setHasStartedChat] = useState<boolean>(false);

  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem('chat_session_id') : null;
    const id = saved || generateSessionId();
    if (!saved) {
      try { window.localStorage.setItem('chat_session_id', id); } catch {}
    }
    setSessionId(id);
  }, []);

  useEffect(() => {
    if (!sessionId) return;
    let isCancelled = false;
    (async () => {
      try {
        const res = await fetchChatHistory(sessionId);
        if (isCancelled) return;
        const mapped: ChatMessage[] = res.messages.map((m: BackendHistoryMessage) => ({
          id: m.id,
          sender: m.role === 'assistant' ? 'ai' : 'user',
          text: m.content,
          timestamp: Date.now(),
        }));
        setMessages(mapped);
        if (mapped.length > 0) {
          setHasStartedChat(true);
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to load history';
        setError(message);
      }
    })();
    return () => { isCancelled = true; };
  }, [sessionId]);

  useEffect(() => {
    if (messages.length > 0 && endRef.current) {
      endRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [messages]);

  // Cleanup TTS cache on component unmount
  useEffect(() => {
    return () => {
      ttsService.clearCache();
    };
  }, []);

  const canSend = useMemo(() => input.trim().length > 0 && !isSending && !!sessionId, [input, isSending, sessionId]);

  const handleSend = useCallback(async () => {
    if (!canSend) return;
    setError('');
    const userMessage: ChatMessage = {
      id: newId(),
      sender: 'user',
      text: input.trim(),
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsSending(true);

    if (!hasStartedChat) {
      setHasStartedChat(true);
    }

    try {
      const res = await sendChatMessage(userMessage.text, sessionId);
      const aiMessage: ChatMessage = {
        id: newId(),
        sender: 'ai',
        text: res.output,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong sending your message';
      setError(message);
    } finally {
      setIsSending(false);
    }
  }, [canSend, input, sessionId, hasStartedChat]);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setInput(suggestion);
  }, []);

  const handlePlayAudio = useCallback(async (text: string) => {
    try {
      await ttsService.playAudio(text);
    } catch (error) {
      console.error('Error playing audio:', error);
      setError('Failed to play audio. Please try again.');
      // Clear error after 3 seconds
      setTimeout(() => setError(''), 3000);
    }
  }, []);

  const currentSuggestions = messages.length > 0 ? followUpSuggestions : initialSuggestions;

  return (
    <div className="w-full">
      {!hasStartedChat ? (
        /* Initial Welcome Screen */
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <Logo className="h-20 w-20 sm:h-24 sm:w-24" />
                  <div className="absolute -inset-4 bg-gradient-to-r from-brand-green/20 to-brand-yellow-light/20 rounded-full blur-xl animate-pulse"></div>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
                Hey there! 🐰
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-4">
                I&apos;m <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-yellow-light">BucksBunny</span>, your friendly AI financial coach!
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                Ready to level up your money game in St. Kitts & Nevis? 💰✨
              </p>
            </div>

            <div className="space-y-8">
              <div className="mb-8">
                <SuggestionPills suggestions={currentSuggestions} onSuggestionClick={handleSuggestionClick} />
              </div>

              <div className="glass-ui p-4 max-w-3xl mx-auto">
                <ChatInput
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onSubmit={handleSend}
                  loading={isSending}
                  className="border-0 shadow-none bg-transparent"
                >
                  <ChatInputTextArea 
                    placeholder="Ask me about budgeting, saving, banks in SKN, or career ideas..." 
                    className="text-base bg-transparent resize-none min-h-[60px]" 
                  />
                  <ChatInputSubmit />
                </ChatInput>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Chat Interface */
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="glass-ui overflow-hidden flex flex-col h-[calc(100vh-12rem)]">
            {/* Chat Header */}
            <div className="flex items-center gap-3 p-4 border-b border-white/10 dark:border-gray-700/50">
              <div className="h-10 w-10 rounded-full bg-brand-green/10 flex items-center justify-center ring-1 ring-brand-green/30">
                <Logo className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white">BucksBunny</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Your AI Financial Coach</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {messages.length === 0 && (
                <div className="h-full flex items-center justify-center text-center">
                  <div className="max-w-md">
                    <div className="mx-auto mb-4 flex items-center justify-center">
                      <div className="h-12 w-12 rounded-full bg-brand-green/10 flex items-center justify-center ring-1 ring-brand-green/30">
                        <Logo className="h-8 w-8" />
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Start the conversation! Ask me about budgeting, saving, banks in SKN, or career ideas.
                    </p>
                  </div>
                </div>
              )}
              
              {messages.map((message) => (
                <ChatMessageComponent
                  key={message.id}
                  message={message.text}
                  isUser={message.sender === 'user'}
                  timestamp={new Date(message.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                  onPlayAudio={message.sender === 'ai' ? handlePlayAudio : undefined}
                />
              ))}
              
              {isSending && (
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-brand-green/10 flex items-center justify-center ring-1 ring-brand-green/30">
                    <Logo className="h-6 w-6" />
                  </div>
                  <div className="bg-light-surface dark:bg-dark-surface rounded-2xl px-4 py-3 ring-1 ring-gray-200 dark:ring-gray-700">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <span className="sr-only">BucksBunny is typing</span>
                      <div className="flex items-center gap-1">
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Suggestions (only show if no messages yet) */}
            {messages.length === 0 && (
              <div className="px-4 pb-2">
                <SuggestionPills 
                  suggestions={followUpSuggestions.slice(0, 2)} 
                  onSuggestionClick={handleSuggestionClick}
                />
              </div>
            )}

            {/* Chat Input */}
            <div className="p-4 border-t border-white/10 dark:border-gray-700/50">
              <ChatInput
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onSubmit={handleSend}
                loading={isSending}
                className="bg-transparent border-gray-200/50 dark:border-gray-700/50 focus-within:border-brand-green/50"
              >
                <ChatInputTextArea 
                  placeholder="Ask BucksBunny anything about money in SKN..." 
                  className="text-base bg-transparent" 
                />
                <ChatInputSubmit />
              </ChatInput>
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
                Press Enter to send • Shift+Enter for new line
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Toast */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg shadow-lg border border-red-200 dark:border-red-700 max-w-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-sm font-medium">{error}</span>
          </div>
        </div>
      )}

      {/* Typing Animation Styles */}
      <style jsx>{`
        .typing-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: currentColor;
          opacity: 0.4;
          animation: typing-bounce 1.4s infinite ease-in-out both;
        }
        .typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-dot:nth-child(2) { animation-delay: -0.16s; }
        @keyframes typing-bounce {
          0%, 80%, 100% { 
            transform: scale(0); 
            opacity: 0.4;
          }
          40% { 
            transform: scale(1); 
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}