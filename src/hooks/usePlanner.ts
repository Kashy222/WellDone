import { useState } from 'react';

export type EventType = 'class' | 'self-study' | 'break' | 'empty';

export type TimeSlot = {
  id: string;
  time: string;
  title: string;
  type: EventType;
  durationMinutes: number;
};

const initialSchedule: TimeSlot[] = [
  { id: '1', time: '08:00 AM', title: 'Wake up & Routine', type: 'break', durationMinutes: 60 },
  { id: '2', time: '09:00 AM', title: 'Physics Webinar', type: 'class', durationMinutes: 120 },
  { id: '3', time: '11:00 AM', title: 'Available for Self-Study', type: 'empty', durationMinutes: 120 },
  { id: '4', time: '01:00 PM', title: 'Lunch Break', type: 'break', durationMinutes: 60 },
  { id: '5', time: '02:00 PM', title: 'Chemistry Mock Test', type: 'class', durationMinutes: 180 },
  { id: '6', time: '05:00 PM', title: 'Available for Self-Study', type: 'empty', durationMinutes: 120 },
  { id: '7', time: '07:00 PM', title: 'Dinner & Relax', type: 'break', durationMinutes: 60 },
];

export function usePlanner() {
  const [schedule, setSchedule] = useState<TimeSlot[]>(initialSchedule);

  const blockForSelfStudy = (id: string, subject: string) => {
    setSchedule(prev => prev.map(slot => 
      slot.id === id 
        ? { ...slot, type: 'self-study', title: `Self-Study: ${subject}` }
        : slot
    ));
  };

  const getUpcomingClass = () => {
    return schedule.find(slot => slot.type === 'class');
  };

  return { schedule, blockForSelfStudy, getUpcomingClass };
}
