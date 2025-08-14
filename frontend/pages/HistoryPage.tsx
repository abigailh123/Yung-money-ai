

import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { HubPage } from '../components/HubPage';
import type { ChatMessage } from '../types';
import { COURSE_MODULES } from '../constants/courses';

const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;
const ArchiveIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="22" height="5" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><line x1="10" y1="12" x2="14" y2="12"/></svg>;

interface ChatSummary {
  key: string;
  title: string;
  lastMessage: string;
  lastUpdated: number;
  path: string;
}

const HistoryPage: React.FC = () => {
    const [chatSummaries, setChatSummaries] = useState<ChatSummary[]>([]);
    const navigate = ReactRouterDOM.useNavigate();

    useEffect(() => {
        const loadHistories = () => {
            const histories: ChatSummary[] = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('bucksBunny_chatHistory_')) {
                    try {
                        const savedHistoryRaw = localStorage.getItem(key);
                        if (!savedHistoryRaw) continue;

                        const savedHistory: ChatMessage[] = JSON.parse(savedHistoryRaw);
                        if (!Array.isArray(savedHistory) || savedHistory.length === 0) continue;
                        
                        const lastMessage = savedHistory[savedHistory.length - 1];
                        let title = "General Chat";
                        let path = "/chat";

                        if (key.startsWith('bucksBunny_chatHistory_guide_')) {
                            const guideId = key.replace('bucksBunny_chatHistory_guide_', '');
                            const module = COURSE_MODULES.find(m => m.id === guideId);
                            title = module ? `Guide: ${module.title}` : "Archived Guide";
                            path = `/guide/${guideId}`;
                        }
                        
                        const lastUpdated = lastMessage.timestamp || (parseInt(lastMessage.id, 10) || 0);

                        histories.push({
                            key,
                            title,
                            lastMessage: lastMessage.text,
                            lastUpdated: lastUpdated,
                            path
                        });

                    } catch (e) {
                        console.error(`Failed to parse history for key ${key}:`, e);
                    }
                }
            }
            histories.sort((a, b) => b.lastUpdated - a.lastUpdated);
            setChatSummaries(histories);
        };

        loadHistories();
        // Re-check on focus in case another tab deleted history
        window.addEventListener('focus', loadHistories);
        return () => window.removeEventListener('focus', loadHistories);
    }, []);

    const handleDelete = (key: string, e: React.MouseEvent) => {
        e.stopPropagation(); 
        if (window.confirm("Are you sure you want to delete this chat history? This cannot be undone.")) {
            localStorage.removeItem(key);
            setChatSummaries(prev => prev.filter(summary => summary.key !== key));
        }
    };

    return (
        <HubPage
            title="My Conversation History 📖"
            subtitle="Pick up where you left off. Here are all the chats you've had with BucksBunny."
        >
            {chatSummaries.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {chatSummaries.map(summary => (
                        <div key={summary.key} onClick={() => navigate(summary.path)} className="group bg-light-surface dark:bg-dark-surface p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between">
                           <div>
                                <h3 className="font-bold text-xl mb-2 text-light-text dark:text-dark-text group-hover:text-brand-green dark:group-hover:text-brand-yellow-light transition-colors">{summary.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 italic break-words line-clamp-3">
                                    "{summary.lastMessage}"
                                </p>
                           </div>
                           <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                                <span className="text-xs text-gray-400 dark:text-gray-500">
                                    {new Date(summary.lastUpdated).toLocaleString()}
                                </span>
                                <button
                                    onClick={(e) => handleDelete(summary.key, e)}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full transition-colors"
                                    aria-label="Delete chat history"
                                >
                                    <TrashIcon />
                                </button>
                           </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-light-surface dark:bg-dark-surface rounded-2xl">
                    <div className="text-5xl mb-4 inline-block text-gray-400"><ArchiveIcon /></div>
                    <h2 className="text-2xl font-bold">No History Yet!</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Start a conversation in the <ReactRouterDOM.Link to="/chat" className="text-brand-green hover:underline">main chat</ReactRouterDOM.Link> or in a <ReactRouterDOM.Link to="/learning-guides" className="text-brand-green hover:underline">Learning Guide</ReactRouterDOM.Link> to see it here.</p>
                </div>
            )}
        </HubPage>
    );
};

export default HistoryPage;
