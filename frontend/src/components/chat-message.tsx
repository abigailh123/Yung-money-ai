"use client"

import { useState } from "react"
import { Logo } from "./Logo"

interface ChatMessageProps {
  message: string
  isUser: boolean
  timestamp: string
  onPlayAudio?: (text: string) => Promise<void>
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

const SpeakerIcon = ({ isPlaying }: { isPlaying: boolean }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={isPlaying ? "animate-pulse" : ""}
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
  </svg>
);

export function ChatMessage({ message, isUser, timestamp, onPlayAudio }: ChatMessageProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handlePlayAudio = async () => {
    if (!onPlayAudio || isPlayingAudio) return;
    
    setIsPlayingAudio(true);
    try {
      await onPlayAudio(message);
    } catch (error) {
      console.error('Error playing audio:', error);
    } finally {
      setIsPlayingAudio(false);
    }
  };

  return (
    <div className={`flex w-full gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && <AvatarAI />}
      <div className={`${isUser ? 'bg-brand-green text-white' : 'bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text'} max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-3 shadow-sm ring-1 ${isUser ? 'ring-brand-green/40' : 'ring-gray-200 dark:ring-gray-700'}`}>
        <div className="whitespace-pre-wrap leading-relaxed text-sm sm:text-base">{message}</div>
        <div className={`mt-2 flex items-center justify-between ${isUser ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'}`}>
          <div className="text-[10px]">{timestamp}</div>
          {!isUser && onPlayAudio && (
            <button
              onClick={handlePlayAudio}
              disabled={isPlayingAudio}
              className={`ml-2 p-1.5 rounded-full transition-colors ${
                isPlayingAudio 
                  ? 'bg-brand-green/20 text-brand-green cursor-not-allowed' 
                  : 'hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400 hover:text-brand-green dark:hover:text-brand-yellow-light'
              }`}
              title={isPlayingAudio ? 'Playing audio...' : 'Play audio'}
            >
              <SpeakerIcon isPlaying={isPlayingAudio} />
            </button>
          )}
        </div>
      </div>
      {isUser && <AvatarUser />}
    </div>
  )
}
