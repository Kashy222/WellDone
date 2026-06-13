'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="w-full flex justify-between items-center py-6 px-8 mb-4">
      <div>
        <h1 className="text-3xl font-light tracking-tight text-aura-text-primary">
          Good morning{user ? `, ${user.name.split(' ')[0]}` : ''}.
        </h1>
        <p className="text-aura-text-secondary mt-1">Take a deep breath. You&apos;re doing great.</p>
      </div>
      
      {user && (
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-aura-sage-light text-aura-text-primary font-medium text-lg shadow-sm border border-white cursor-pointer hover:bg-aura-sage transition-colors duration-300">
          {user.initials}
        </div>
      )}
    </header>
  );
}
