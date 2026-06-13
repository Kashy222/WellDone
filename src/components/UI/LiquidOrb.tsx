'use client';

import React from 'react';

type LiquidOrbProps = {
  className?: string;
  colors?: [string, string, string]; // CSS color values
  isPulsing?: boolean;
};

export default function LiquidOrb({ 
  className = '', 
  colors = ['#4A90E2', '#9013FE', '#50E3C2'], 
  isPulsing = false 
}: LiquidOrbProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div 
        className={`absolute w-full h-full rounded-full blur-[8px] opacity-70 animate-spin-slow mix-blend-multiply ${isPulsing ? 'scale-110' : 'scale-100'} transition-transform duration-1000`}
        style={{
          background: `conic-gradient(from 0deg, ${colors[0]}, ${colors[1]}, ${colors[2]}, ${colors[0]})`
        }}
      />
      <div 
        className={`relative w-full h-full rounded-[40%_60%_70%_30%/40%_50%_60%_50%] animate-blob overflow-hidden bg-white ${isPulsing ? 'scale-[1.05]' : 'scale-100'} transition-transform duration-700`}
      >
        <div 
          className="absolute inset-[-50%] w-[200%] h-[200%] animate-spin-slow opacity-90 mix-blend-screen"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${colors[0]} 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${colors[1]} 0%, transparent 50%), radial-gradient(circle at 20% 80%, ${colors[2]} 0%, transparent 50%)`
          }}
        />
        {/* Glossy overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 to-white/40 shadow-[inset_0_-10px_20px_rgba(0,0,0,0.1)] mix-blend-overlay pointer-events-none" />
      </div>
    </div>
  );
}
