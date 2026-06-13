'use client';

import React from 'react';
import { useWellnessEngine } from '@/hooks/useWellnessEngine';

function ProgressBar({ label, percentage, colorClass }: { label: string, percentage: number, colorClass: string }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs font-medium text-aura-text-secondary mb-1">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full h-3 bg-white border border-aura-cream rounded-full overflow-hidden">
        <div 
          className={`h-full ${colorClass} transition-all duration-1000 ease-emil`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default function WellnessTracker() {
  const { state } = useWellnessEngine();
  const { telemetry, uncoveredTriggers } = state;

  return (
    <div className="w-full bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_rgba(31,38,135,0.05)] mb-6">
      <h2 className="text-xl font-medium tracking-wide mb-6 text-aura-text-primary">
        Your Academic Wellness Trends
      </h2>
      
      {/* Telemetry Variables */}
      <div className="mb-8">
        <ProgressBar label="Syllabus Anxiety" percentage={telemetry.syllabusAnxiety} colorClass="bg-aura-terracotta" />
        <ProgressBar label="Burnout Probability" percentage={telemetry.burnoutProbability} colorClass="bg-aura-sage-dark" />
        <ProgressBar label="Peer Comparison Index" percentage={telemetry.peerComparison} colorClass="bg-aura-emerald" />
      </div>

      {/* AI Insights - Uncovered Triggers */}
      <div>
        <h3 className="text-xs font-semibold text-aura-text-secondary uppercase tracking-wider mb-3">
          Uncovered Triggers
        </h3>
        <div className="flex flex-wrap gap-2">
          {uncoveredTriggers.map((trigger, idx) => (
            <span 
              key={idx} 
              className="inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-aura-terracotta-light text-aura-terracotta text-sm font-medium shadow-sm animate-fade-in"
            >
              <svg className="w-3.5 h-3.5 mr-1.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              {trigger}
            </span>
          ))}
          {uncoveredTriggers.length === 0 && (
            <span className="text-sm text-aura-text-secondary italic">No hidden triggers detected yet.</span>
          )}
        </div>
      </div>
    </div>
  );
}
