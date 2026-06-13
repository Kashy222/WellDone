'use client';

import React, { useEffect, useState } from 'react';
import LiquidOrb from '@/components/UI/LiquidOrb';

export default function Bhramari() {
  const [phase, setPhase] = useState<'Inhale' | 'Retain' | 'Exhale/Hum'>('Inhale');
  const [countdown, setCountdown] = useState(4); // 4s Inhale, 2s Retain, 6s Exhale

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (phase === 'Inhale' && countdown === 0) {
      setPhase('Retain');
      setCountdown(2);
    } else if (phase === 'Retain' && countdown === 0) {
      setPhase('Exhale/Hum');
      setCountdown(6);
    } else if (phase === 'Exhale/Hum' && countdown === 0) {
      setPhase('Inhale');
      setCountdown(4);
    }

    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    }

    return () => clearTimeout(timer);
  }, [countdown, phase]);

  // SVG path expansion scale based on phase
  const scale = phase === 'Inhale' ? 1.5 : phase === 'Retain' ? 1.5 : 0.8;

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="relative w-64 h-64 flex items-center justify-center mb-12">
        <div 
          className="absolute inset-0 transition-transform duration-[4000ms] ease-in-out origin-center"
          style={{ transform: `scale(${scale})` }}
        >
          <LiquidOrb className="w-full h-full" colors={['#A3B1A6', '#C9D6CE', '#D98A6C']} isPulsing={phase === 'Exhale/Hum'} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-10 flex-col drop-shadow-md">
           <span className="text-2xl font-medium text-aura-text-primary tracking-widest bg-white/40 px-3 py-1 rounded-full backdrop-blur-sm mb-1">{phase}</span>
           <span className="text-4xl font-bold text-aura-text-primary bg-white/40 w-16 h-16 flex items-center justify-center rounded-full backdrop-blur-sm">{countdown}</span>
        </div>
      </div>
      <p className="text-aura-text-secondary text-lg font-light tracking-wide max-w-sm text-center">
        {phase === 'Inhale' && "Breathe in deeply through the nose."}
        {phase === 'Retain' && "Hold the breath gently."}
        {phase === 'Exhale/Hum' && "Exhale slowly while making a deep humming sound like a bee."}
      </p>
    </div>
  );
}
