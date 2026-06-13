'use client';

import React from 'react';
import { usePlanner, TimeSlot } from '@/hooks/usePlanner';

export default function PlannerView() {
  const { schedule, blockForSelfStudy, getUpcomingClass } = usePlanner();
  const upcomingClass = getUpcomingClass();

  const handleBlockSlot = (id: string) => {
    const subject = prompt("What subject will you study?");
    if (subject) {
      blockForSelfStudy(id, subject);
    }
  };

  const getSlotColor = (type: TimeSlot['type']) => {
    switch (type) {
      case 'class': return 'bg-aura-terracotta-light/20 border-white/50 text-aura-terracotta backdrop-blur-sm';
      case 'self-study': return 'bg-aura-sage-light/30 border-white/50 text-aura-sage-dark backdrop-blur-sm';
      case 'break': return 'bg-white/40 border-white/50 text-aura-text-secondary backdrop-blur-sm';
      case 'empty': return 'bg-white/20 border-dashed border-white/60 text-aura-text-secondary hover:bg-white/40 cursor-pointer transition-colors backdrop-blur-sm';
      default: return 'bg-white/40 border-white/50 backdrop-blur-sm';
    }
  };

  return (
    <div className="flex-1 w-full overflow-y-auto pb-24 pt-6 px-2 hide-scrollbar">
      
      {/* Upcoming Widget */}
      {upcomingClass && (
        <div className="mb-8 bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl p-5 shadow-[0_8px_32px_rgba(31,38,135,0.05)]">
          <h2 className="text-sm font-semibold text-aura-text-secondary uppercase tracking-wider mb-3">Up Next</h2>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-aura-terracotta-light/30 text-aura-terracotta flex items-center justify-center shrink-0">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </div>
            <div>
              <p className="font-medium text-lg text-aura-text-primary">{upcomingClass.title}</p>
              <p className="text-sm text-aura-text-secondary">{upcomingClass.time} ({upcomingClass.durationMinutes} mins)</p>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-xl font-light text-aura-text-primary mb-6 px-1">Today&apos;s Schedule</h2>

      {/* Timeline */}
      <div className="relative border-l border-aura-cream ml-4 space-y-6">
        {schedule.map((slot) => (
          <div key={slot.id} className="relative pl-6">
            {/* Timeline Dot */}
            <div className={`absolute -left-1.5 top-2 w-3 h-3 rounded-full border-2 border-white ${slot.type === 'empty' ? 'bg-aura-cream' : slot.type === 'class' ? 'bg-aura-terracotta' : slot.type === 'self-study' ? 'bg-aura-sage-dark' : 'bg-aura-accent'}`} />
            
            <div className="flex flex-col">
              <span className="text-xs font-medium text-aura-text-secondary mb-1">{slot.time}</span>
              <div 
                onClick={() => slot.type === 'empty' && handleBlockSlot(slot.id)}
                className={`border rounded-2xl p-4 ${getSlotColor(slot.type)}`}
              >
                <h3 className="font-medium">{slot.title}</h3>
                {slot.type === 'empty' && (
                  <p className="text-sm mt-1 opacity-80">+ Tap to block for self-study</p>
                )}
                {slot.type === 'self-study' && (
                  <p className="text-sm mt-1 opacity-80">Focused session</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
