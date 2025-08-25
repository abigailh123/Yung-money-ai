"use client"

import { Logo } from "./Logo"

interface ChatMessageProps {
  message: string
  isUser: boolean
  timestamp: string
}

const AvatarAI: React.FC = () => (
  <div className="h-9 w-9 rounded-full bg-brand-green/10 flex items-center justify-center ring-1 ring-brand-green/30">
    <Logo className="h-6 w-6" />
  </div>
);

const AvatarUser: React.FC = () => (
  <div className="h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-semibold text-gray-700 dark:text-gray-200 ring-1 ring-gray-300/60 dark:ring-gray-600/60">
    You
  </div>
);

export function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  return (
    <div className={`flex w-full gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && <AvatarAI />}
      <div className={`${isUser ? 'bg-brand-green text-white' : 'bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text'} max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-3 shadow-sm ring-1 ${isUser ? 'ring-brand-green/40' : 'ring-gray-200 dark:ring-gray-700'}`}>
        <div className="whitespace-pre-wrap leading-relaxed text-sm sm:text-base">{message}</div>
        <div className={`mt-1 text-[10px] ${isUser ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'}`}>{timestamp}</div>
      </div>
      {isUser && <AvatarUser />}
    </div>
  )
}
