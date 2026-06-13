import React from 'react';

export default function WaveLogo({ className = "w-8 h-8 text-aura-text-primary" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 50" fill="currentColor" preserveAspectRatio="xMidYMid meet">
      <path d="M 0 25 C 10 25, 15 25, 20 20 C 25 10, 30 10, 35 20 C 40 30, 45 30, 50 20 C 60 0, 70 0, 85 20 C 90 25, 95 25, 100 25 L 100 25 C 95 25, 90 25, 80 40 C 70 55, 60 55, 50 40 C 45 30, 40 30, 35 40 C 30 50, 25 50, 20 40 C 15 30, 10 25, 0 25 Z" />
    </svg>
  );
}
