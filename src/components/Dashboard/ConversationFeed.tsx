'use client';

import React, { useEffect, useRef } from 'react';
import { useWellnessEngine } from '@/hooks/useWellnessEngine';
import ScribbleCopilot from '@/components/Interventions/ScribbleCopilot';
import Bhramari from '@/components/Prana/Bhramari';
import AnulomVilom from '@/components/Prana/AnulomVilom';

export default function ConversationFeed() {
  const { state } = useWellnessEngine();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages, state.isProcessing]);

  return (
    <div className="w-full flex-1 overflow-y-auto px-2 py-4 space-y-6 min-h-[300px] no-scrollbar">
      {state.messages.map((msg) => (
        <div key={msg.id} className={`w-full flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-[85%] rounded-3xl p-5 ${msg.role === 'user' ? 'bg-aura-text-primary text-white rounded-br-sm shadow-[0_8px_32px_rgba(31,38,135,0.15)]' : 'bg-white/40 backdrop-blur-2xl border border-white/50 text-aura-text-primary rounded-bl-sm shadow-[0_8px_32px_rgba(31,38,135,0.05)]'}`}>
            <p className="text-lg leading-relaxed font-light whitespace-pre-wrap">{msg.content}</p>
            
            {/* Inline Interventions */}
            {msg.intervention === 'scribble' && (
              <div className="mt-4 w-full">
                <ScribbleCopilot />
              </div>
            )}
            
            {msg.intervention === 'bhramari' && (
              <div className="mt-4 w-full bg-aura-sage-light/20 p-4 rounded-2xl relative overflow-hidden min-h-[300px]">
                <Bhramari />
              </div>
            )}
            
            {msg.intervention === 'anulom' && (
              <div className="mt-4 w-full bg-aura-emerald-light/20 p-4 rounded-2xl relative overflow-hidden min-h-[300px]">
                <AnulomVilom />
              </div>
            )}
          </div>
        </div>
      ))}
      
      {state.isProcessing && (
        <div className="w-full flex justify-start">
          <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl rounded-bl-sm p-4 shadow-[0_8px_32px_rgba(31,38,135,0.05)] flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-aura-sage-dark animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 rounded-full bg-aura-sage-dark animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 rounded-full bg-aura-sage-dark animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      )}
      <div ref={bottomRef} className="h-4" />
    </div>
  );
}
