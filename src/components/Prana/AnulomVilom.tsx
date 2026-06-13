'use client';

import React, { useEffect, useState } from 'react';
import LiquidOrb from '@/components/UI/LiquidOrb';

export default function AnulomVilom() {
  const [phase, setPhase] = useState<'Left Inhale' | 'Right Exhale' | 'Right Inhale' | 'Left Exhale'>('Left Inhale');
  
  useEffect(() => {
    const sequence = ['Left Inhale', 'Right Exhale', 'Right Inhale', 'Left Exhale'] as const;
    let idx = 0;
    
    const interval = setInterval(() => {
      idx = (idx + 1) % sequence.length;
      setPhase(sequence[idx]);
    }, 4000); // 4 seconds per phase

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="flex gap-16 mb-12">
        {/* Left Nostril Pacer */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <div className={`absolute inset-0 transition-all duration-1000 ease-emil ${phase.includes('Left') ? 'opacity-100 scale-110' : 'opacity-0 scale-90'}`}>
              <LiquidOrb className="w-full h-full" colors={['#A3B1A6', '#C9D6CE', '#82A392']} isPulsing={true} />
            </div>
            <div className={`w-24 h-24 rounded-full border border-aura-cream bg-white transition-all duration-1000 ease-emil ${phase.includes('Left') ? 'opacity-0' : 'opacity-100'}`} />
          </div>
          <span className="text-sm font-medium text-aura-text-secondary">Left Nostril</span>
        </div>
        
        {/* Right Nostril Pacer */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <div className={`absolute inset-0 transition-all duration-1000 ease-emil ${phase.includes('Right') ? 'opacity-100 scale-110' : 'opacity-0 scale-90'}`}>
              <LiquidOrb className="w-full h-full" colors={['#D98A6C', '#E6B09E', '#A3B1A6']} isPulsing={true} />
            </div>
            <div className={`w-24 h-24 rounded-full border border-aura-cream bg-white transition-all duration-1000 ease-emil ${phase.includes('Right') ? 'opacity-0' : 'opacity-100'}`} />
          </div>
          <span className="text-sm font-medium text-aura-text-secondary">Right Nostril</span>
        </div>
      </div>
      
      <p className="text-2xl font-light text-aura-text-primary tracking-wide mb-4">
        {phase}
      </p>
      <p className="text-aura-text-secondary text-center max-w-sm">
        Close the opposite nostril and breathe deeply for 4 seconds.
      </p>
    </div>
  );
}
