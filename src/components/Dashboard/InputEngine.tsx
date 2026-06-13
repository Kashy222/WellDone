'use client';

import React, { useState } from 'react';
import { useWellnessEngine } from '@/hooks/useWellnessEngine';
import LiquidOrb from '@/components/UI/LiquidOrb';

export default function InputEngine() {
  const { processJournalEntry, state } = useWellnessEngine();
  const [text, setText] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!text.trim() || state.isProcessing) return;
    
    processJournalEntry(text);
    setText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-4 shadow-[0_8px_32px_rgba(31,38,135,0.05)] relative overflow-hidden transition-all duration-300">
      {/* GenAI Parsing Indicator */}
      <div 
        className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-aura-sage-light via-aura-terracotta-light to-aura-emerald-light transition-all duration-500 ease-emil ${state.isProcessing ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}
      >
        <div className="w-full h-full bg-white/50 animate-pulse" />
      </div>

      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Dump your thoughts here..."
          disabled={state.isProcessing}
          className="flex-1 bg-transparent resize-none outline-none text-aura-text-primary placeholder:text-aura-text-secondary/60 text-lg min-h-[60px] max-h-[120px] py-2 disabled:opacity-50"
        />
        
        <div className="flex flex-col items-center shrink-0 mb-1">
          <div className="relative w-12 h-12 flex items-center justify-center">
            {state.isProcessing && (
              <div className="absolute inset-0">
                <LiquidOrb className="w-full h-full" colors={['#FFB088', '#FF5E00', '#D64000']} isPulsing={true} />
              </div>
            )}
            <button 
              type={text.trim() ? "submit" : "button"}
              className={`relative flex items-center justify-center w-full h-full rounded-full transition-all duration-300 shadow-sm z-10 ${state.isProcessing ? 'text-white' : 'bg-white/60 text-aura-sage-dark hover:bg-white group border border-white/40'}`}
              disabled={state.isProcessing}
              title={text.trim() ? "Send Message" : "Tap to Vent / Audio Journal"}
            >
              {/* Subtle ambient glow behind the idle mic blob */}
              {!state.isProcessing && !text.trim() && (
                <div className="absolute inset-0 rounded-full bg-aura-sage-light/30 blur-md animate-pulse" />
              )}
              
              {text.trim() ? (
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform text-aura-text-primary relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              ) : (
                <svg className={`w-5 h-5 relative z-10 ${state.isProcessing ? 'animate-pulse' : 'animate-[pulse_3s_ease-in-out_infinite] group-hover:scale-110 transition-transform'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
