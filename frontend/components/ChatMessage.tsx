import React from 'react';
import type { ChatMessage } from '../types';
import { Logo } from './Logo';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessageProps {
  message: ChatMessage;
}

const ChatMessageComponent: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  const markdownComponents = {
    table: ({node, ...props}: any) => <div className="overflow-x-auto"><table className="w-full my-4 border-collapse border border-gray-300 dark:border-gray-600" {...props} /></div>,
    thead: ({node, ...props}: any) => <thead className="bg-gray-100 dark:bg-gray-800" {...props} />,
    th: ({node, ...props}: any) => <th className="p-2 border border-gray-300 dark:border-gray-600 text-left font-semibold" {...props} />,
    td: ({node, ...props}: any) => <td className="p-2 border border-gray-300 dark:border-gray-600" {...props} />,
    p: ({node, ...props}: any) => <p className="mb-2 last:mb-0" {...props} />,
    ul: ({node, ...props}: any) => <ul className="list-disc list-inside mb-2 pl-4" {...props} />,
    ol: ({node, ...props}: any) => <ol className="list-decimal list-inside mb-2 pl-4" {...props} />,
    li: ({node, ...props}: any) => <li className="mb-1" {...props} />,
    a: ({node, ...props}: any) => <a className="text-brand-green hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
  };

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-10 h-10 rounded-full bg-brand-green-light flex-shrink-0 flex items-center justify-center shadow-md">
          <Logo className="w-8 h-8" />
        </div>
      )}
      <div 
        className={`max-w-xl px-4 py-3 rounded-2xl shadow-md ${
          isUser 
            ? 'bg-brand-green text-white rounded-br-none' 
            : 'bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text rounded-bl-none'
        }`}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {message.text}
            </ReactMarkdown>
            {message.isStreaming && message.text.length === 0 && <span className="inline-block w-2 h-2 ml-1 bg-current rounded-full animate-bounce"></span>}
        </div>
      </div>
    </div>
  );
};

export default ChatMessageComponent;
