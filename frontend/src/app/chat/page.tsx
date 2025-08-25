'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Logo } from '../../components/Logo';
import type { ChatMessage } from '../../types';
import { fetchChatHistory, sendChatMessage, type BackendHistoryMessage } from '../../services/chatService';
import { ChatInput, ChatInputTextArea, ChatInputSubmit } from '../../components/ui/chat-input';
import { ChatMessage as ChatMessageComponent } from '../../components/chat-message';
import { SuggestionPills } from '../../components/suggestion-pills';



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

  const currentSuggestions = messages.length > 0 ? followUpSuggestions : initialSuggestions;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-header">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Logo className="h-6 w-6" />
            <span className="font-bold text-xl text-brand-green dark:text-brand-yellow-light">BucksBunny</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {!hasStartedChat ? (
          /* Initial Full Screen Chat */
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] px-6">
            <div className="w-full max-w-2xl">
              <div className="text-center mb-12">
                <div className="flex justify-center mb-6">
                  <Logo className="h-16 w-16" />
                </div>
                <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                  Hey there! 🐰
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  I&apos;m <span className="font-semibold text-brand-green dark:text-brand-yellow-light">BucksBunny</span>, your friendly AI financial coach for St. Kitts & Nevis!
                </p>
                <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
                  What money question can I help you with today? 💰
                </p>
              </div>

              <div className="space-y-6">
                <SuggestionPills suggestions={currentSuggestions} onSuggestionClick={handleSuggestionClick} />

                <div className="glass-ui p-3 max-w-2xl mx-auto">
                  <ChatInput
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onSubmit={handleSend}
                    loading={isSending}
                    className="border-0 shadow-none bg-transparent"
                  >
                    <ChatInputTextArea placeholder="Ask me about budgeting, saving, banks in SKN, or career ideas..." className="text-base bg-transparent" />
                    <ChatInputSubmit />
                  </ChatInput>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Compact Mode Layout */
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-ui p-0 sm:p-4 overflow-hidden flex flex-col min-h-[calc(100vh-8rem)]">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                {messages.length === 0 && (
                  <div className="h-full flex items-center justify-center text-center text-gray-600 dark:text-gray-400">
                    <div>
                      <div className="mx-auto mb-3 flex items-center justify-center">
                        <div className="h-9 w-9 rounded-full bg-brand-green/10 flex items-center justify-center ring-1 ring-brand-green/30">
                          <Logo className="h-6 w-6" />
                        </div>
                      </div>
                      <p className="text-sm">Ask me about budgeting, saving, banks in SKN, or career ideas.</p>
                    </div>
                  </div>
                )}
                {messages.map((message) => (
                  <ChatMessageComponent
                    key={message.id}
                    message={message.text}
                    isUser={message.sender === 'user'}
                    timestamp={new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
                          <span className="typing-dot" />
                          <span className="typing-dot" />
                          <span className="typing-dot" />
                        </div>
                        <style jsx>{`
                          .typing-dot {
                            display: inline-block;
                            width: 6px;
                            height: 6px;
                            border-radius: 9999px;
                            background-color: currentColor;
                            opacity: 0.4;
                            animation: typing-bounce 1.4s infinite ease-in-out both;
                          }
                          .typing-dot:nth-child(1) { animation-delay: -0.32s; }
                          .typing-dot:nth-child(2) { animation-delay: -0.16s; }
                          @keyframes typing-bounce {
                            0%, 80%, 100% { transform: scale(0); }
                            40% { transform: scale(1); }
                          }
                        `}</style>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={endRef} />
              </div>

              <div className="px-2 sm:px-4 pb-3 sm:pb-4 bg-transparent">
                <div className="glass-ui p-2 sm:p-3 flex items-end gap-2">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        if (!isSending && input.trim().length > 0) handleSend();
                      }
                    }}
                    rows={1}
                    placeholder="Ask BucksBunny anything about money in SKN..."
                    className="flex-1 resize-none bg-transparent outline-none placeholder:text-gray-500/70 dark:placeholder:text-gray-400/70 text-sm sm:text-base px-3 py-2 rounded-md border border-transparent focus:border-brand-green/50 min-h-[44px] max-h-[160px]"
                  />
                  <button
                    onClick={handleSend}
                    disabled={isSending || input.trim().length === 0}
                    className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${isSending || input.trim().length === 0 ? 'bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed' : 'bg-brand-green text-white hover:brightness-110'}`}
                  >
                    Send
                  </button>
                </div>
                <div className="mt-2 text-[10px] text-gray-500 dark:text-gray-400 px-1">
                  Press Enter to send • Shift+Enter for new line
                </div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="fixed bottom-4 right-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-4 py-2 rounded-md text-sm">
            {error}
          </div>
        )}
      </main>
    </div>
  );
}


