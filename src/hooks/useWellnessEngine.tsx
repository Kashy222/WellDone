'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type InterventionType = 'bhramari' | 'anulom' | 'scribble' | null;

export type Message = {
  id: string;
  role: 'user' | 'ai';
  content: string;
  intervention?: InterventionType;
};

export type TelemetryData = {
  syllabusAnxiety: number;
  burnoutProbability: number;
  peerComparison: number;
};

type WellnessState = {
  telemetry: TelemetryData;
  uncoveredTriggers: string[];
  messages: Message[];
  isProcessing: boolean;
};

type WellnessContextType = {
  state: WellnessState;
  processJournalEntry: (text: string) => void;
};

const initialState: WellnessState = {
  telemetry: {
    syllabusAnxiety: 72,
    burnoutProbability: 65,
    peerComparison: 80,
  },
  uncoveredTriggers: ["Mock Test Drop Panic", "Parental Expectation Weight"],
  messages: [],
  isProcessing: false,
};

const WellnessContext = createContext<WellnessContextType | undefined>(undefined);

export function WellnessProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WellnessState>(initialState);

  const processJournalEntry = (text: string) => {
    // Add user message
    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: text };
    setState(prev => ({ 
      ...prev, 
      messages: [...prev.messages, userMessage],
      isProcessing: true 
    }));

    // Simulate GenAI Engine parsing and surfacing triggers
    setTimeout(() => {
      let aiResponseContent = "I hear you. That sounds incredibly stressful.";
      let intervention: InterventionType = null;
      let newTrigger = "";
      
      const lowerText = text.toLowerCase();

      // Simple heuristic for hackathon MVP
      if (lowerText.includes('panic') || lowerText.includes('anxious') || lowerText.includes('breathe')) {
        aiResponseContent = "It sounds like your anxiety is spiking right now. Let's ground your nervous system. Try this quick Bhramari breathing exercise with me.";
        intervention = 'bhramari';
      } else if (lowerText.includes('fried') || lowerText.includes('brain dead') || lowerText.includes('break')) {
        aiResponseContent = "Your cognitive load is maxed out. You have severe burnout probability right now. Let's break the lockup. Just scribble on this pad for a minute to reset your focus.";
        intervention = 'scribble';
      } else if (lowerText.includes('behind') || lowerText.includes('syllabus') || lowerText.includes('physics')) {
        aiResponseContent = "You're feeling overwhelmed by the syllabus backlog. Let's do some Anulom Vilom to balance your hemispheres before you tackle the next chapter.";
        intervention = 'anulom';
        newTrigger = "Late-Night Physics Backlog Stress";
      } else {
        aiResponseContent = "I'm tracking this. Keep venting if you need to, I'm here. It's completely normal to feel this way during peak exam season.";
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: aiResponseContent,
        intervention
      };

      setState(prev => {
        const triggers = newTrigger && !prev.uncoveredTriggers.includes(newTrigger) 
          ? [...prev.uncoveredTriggers, newTrigger] 
          : prev.uncoveredTriggers;
        
        // Randomly fluctuate telemetry a bit for the demo to show it's "alive"
        const newTelemetry = {
          syllabusAnxiety: Math.max(10, Math.min(100, prev.telemetry.syllabusAnxiety + (Math.random() > 0.5 ? 5 : -5))),
          burnoutProbability: Math.max(10, Math.min(100, prev.telemetry.burnoutProbability + (Math.random() > 0.5 ? 5 : -5))),
          peerComparison: Math.max(10, Math.min(100, prev.telemetry.peerComparison + (Math.random() > 0.5 ? 5 : -5))),
        };

        return {
          ...prev,
          messages: [...prev.messages, aiMessage],
          uncoveredTriggers: triggers,
          telemetry: newTelemetry,
          isProcessing: false
        };
      });
    }, 2500); // Simulate processing delay
  };

  return (
    <WellnessContext.Provider value={{ state, processJournalEntry }}>
      {children}
    </WellnessContext.Provider>
  );
}

export function useWellnessEngine() {
  const context = useContext(WellnessContext);
  if (!context) {
    throw new Error('useWellnessEngine must be used within a WellnessProvider');
  }
  return context;
}
