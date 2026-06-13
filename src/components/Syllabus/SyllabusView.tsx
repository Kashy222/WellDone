'use client';

import React, { useState } from 'react';
import { useSyllabus } from '@/hooks/useSyllabus';

export default function SyllabusView() {
  const { syllabus, toggleChapter, getOverallProgress } = useSyllabus();
  const progress = getOverallProgress();
  const [expandedSubject, setExpandedSubject] = useState<string | null>(syllabus[0]?.id || null);

  return (
    <div className="flex-1 w-full overflow-y-auto pb-24 pt-6 px-2 hide-scrollbar">
      
      {/* Overall Progress Widget */}
      <div className="mb-8 bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_rgba(31,38,135,0.05)] flex flex-col items-center">
        <h2 className="text-sm font-semibold text-aura-text-secondary uppercase tracking-wider mb-6">Overall Progress</h2>
        
        {/* Circular Progress */}
        <div className="relative w-32 h-32 flex items-center justify-center mb-4">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="64" cy="64" r="56" fill="none" stroke="#F5F2EB" strokeWidth="12" />
            <circle 
              cx="64" cy="64" r="56" 
              fill="none" 
              stroke="#A3B1A6" 
              strokeWidth="12" 
              strokeLinecap="round"
              strokeDasharray={351.8} /* 2 * pi * 56 */
              strokeDashoffset={351.8 - (351.8 * progress.percentage) / 100}
              className="transition-all duration-1000 ease-emil"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-light text-aura-text-primary">{progress.percentage}%</span>
          </div>
        </div>
        <p className="text-sm text-aura-text-secondary">{progress.completed} of {progress.total} chapters completed</p>
      </div>

      <h2 className="text-xl font-light text-aura-text-primary mb-6 px-1">Subjects</h2>

      {/* Subjects Accordion */}
      <div className="space-y-4">
        {syllabus.map(subject => {
          const isExpanded = expandedSubject === subject.id;
          const completedCount = subject.chapters.filter(c => c.completed).length;
          const totalCount = subject.chapters.length;

          return (
            <div key={subject.id} className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(31,38,135,0.05)] transition-all duration-300">
              <button 
                onClick={() => setExpandedSubject(isExpanded ? null : subject.id)}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-aura-shift transition-colors"
              >
                <div className="flex items-center gap-4">
                  <h3 className="font-medium text-lg text-aura-text-primary">{subject.name}</h3>
                  <span className="text-xs font-medium px-2 py-1 bg-aura-cream text-aura-text-secondary rounded-full">
                    {completedCount}/{totalCount}
                  </span>
                </div>
                <svg className={`w-5 h-5 text-aura-text-secondary transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>

              {/* Chapters List */}
              <div className={`transition-all duration-500 ease-emil overflow-hidden ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-5 pt-2 space-y-3">
                  {subject.chapters.map(chapter => (
                    <label key={chapter.id} className="flex items-center gap-4 group cursor-pointer">
                      <div className="relative flex items-center justify-center">
                        <input 
                          type="checkbox" 
                          checked={chapter.completed}
                          onChange={() => toggleChapter(subject.id, chapter.id)}
                          className="peer appearance-none w-6 h-6 border-2 border-aura-cream rounded-full checked:border-aura-sage-dark checked:bg-aura-sage-light/30 transition-all cursor-pointer"
                        />
                        <svg className="absolute w-3.5 h-3.5 text-aura-sage-dark opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <span className={`text-sm transition-colors ${chapter.completed ? 'text-aura-text-secondary line-through' : 'text-aura-text-primary group-hover:text-aura-sage-dark'}`}>
                        {chapter.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
