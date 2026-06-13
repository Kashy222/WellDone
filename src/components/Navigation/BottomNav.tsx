import React from 'react';

type Tab = 'wellness' | 'planner' | 'syllabus';

interface BottomNavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex items-center justify-between gap-2 px-3 py-2 bg-aura-text-primary/95 backdrop-blur-md border border-white/10 rounded-full shadow-lg">
        
        <button 
          onClick={() => setActiveTab('planner')}
          className={`flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-300 ${activeTab === 'planner' ? 'bg-white/15 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white/90'}`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          {activeTab === 'planner' && <span className="text-xs font-semibold tracking-wide">Planner</span>}
        </button>

        <button 
          onClick={() => setActiveTab('wellness')}
          className={`flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-300 ${activeTab === 'wellness' ? 'bg-white/15 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white/90'}`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
          </svg>
          {activeTab === 'wellness' && <span className="text-xs font-semibold tracking-wide">Wellness</span>}
        </button>

        <button 
          onClick={() => setActiveTab('syllabus')}
          className={`flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-300 ${activeTab === 'syllabus' ? 'bg-white/15 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white/90'}`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            <line x1="9" y1="14" x2="15" y2="14"></line>
          </svg>
          {activeTab === 'syllabus' && <span className="text-xs font-semibold tracking-wide">Tracker</span>}
        </button>

      </nav>
    </div>
  );
}
