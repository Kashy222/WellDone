'use client';

import React, { useState } from 'react';
import BottomNav from '@/components/Navigation/BottomNav';
import WellnessTracker from '@/components/Dashboard/WellnessTracker';
import ConversationFeed from '@/components/Dashboard/ConversationFeed';
import InputEngine from '@/components/Dashboard/InputEngine';
import PlannerView from '@/components/Planner/PlannerView';
import SyllabusView from '@/components/Syllabus/SyllabusView';
import WaveLogo from '@/components/UI/WaveLogo';

type Tab = 'wellness' | 'planner' | 'syllabus';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('wellness');

  return (
    <div className="w-full min-h-screen lg:h-screen flex flex-col bg-transparent font-sans lg:overflow-hidden overflow-y-auto">
      
      {/* Global Header */}
      <header className="flex items-center justify-between px-6 py-4 shrink-0 bg-white/30 backdrop-blur-xl z-20 border-b border-white/40 shadow-sm sticky top-0">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <WaveLogo className="w-10 h-6 text-aura-text-primary" />
            <h1 className="text-xl font-medium tracking-wide text-aura-text-primary hidden">WellDone</h1>
          </div>
          <span className="text-[10px] font-semibold text-aura-sage-dark tracking-wider uppercase">Target: NEET 2026</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/60 backdrop-blur-md flex items-center justify-center border border-white/50 shadow-sm">
          <span className="text-xs font-semibold text-aura-text-secondary">JD</span>
        </div>
      </header>

      {/* Main Content Area - Split Pane */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-8 py-6 flex flex-col lg:flex-row gap-8 relative z-10 pb-32 lg:pb-6 lg:min-h-0">
        
        {/* Left Pane: Widgets & Tabs */}
        <div className="w-full lg:w-7/12 xl:w-2/3 flex flex-col lg:h-full lg:overflow-y-auto hide-scrollbar lg:pr-2 min-h-[400px]">
          {activeTab === 'wellness' && <WellnessTracker />}
          {activeTab === 'planner' && <PlannerView />}
          {activeTab === 'syllabus' && <SyllabusView />}
        </div>

        {/* Right Pane: AI Voice Chat Assistant */}
        <div className="flex w-full lg:w-5/12 xl:w-1/3 flex-col bg-white/20 backdrop-blur-3xl border border-white/40 rounded-3xl p-4 shadow-[0_8px_32px_rgba(31,38,135,0.05)] h-[600px] lg:h-full">
           <h2 className="text-sm font-semibold text-aura-text-secondary uppercase tracking-wider mb-4 px-2">Voice AI Assistant</h2>
           <div className="flex-1 overflow-y-auto hide-scrollbar mb-4">
             <ConversationFeed />
           </div>
           <div className="shrink-0">
             <InputEngine />
           </div>
        </div>

      </main>

      {/* Persistent Bottom Navigation */}
      <div className="fixed lg:absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}
