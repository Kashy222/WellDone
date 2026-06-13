import { useState } from 'react';

export type Chapter = {
  id: string;
  name: string;
  completed: boolean;
};

export type Subject = {
  id: string;
  name: string;
  chapters: Chapter[];
};

const initialSyllabus: Subject[] = [
  {
    id: 's1',
    name: 'Physics',
    chapters: [
      { id: 'p1', name: 'Kinematics', completed: true },
      { id: 'p2', name: 'Laws of Motion', completed: true },
      { id: 'p3', name: 'Work, Energy, and Power', completed: false },
      { id: 'p4', name: 'Rotational Motion', completed: false },
    ]
  },
  {
    id: 's2',
    name: 'Chemistry',
    chapters: [
      { id: 'c1', name: 'Atomic Structure', completed: true },
      { id: 'c2', name: 'Chemical Bonding', completed: false },
      { id: 'c3', name: 'Thermodynamics', completed: false },
    ]
  },
  {
    id: 's3',
    name: 'Biology',
    chapters: [
      { id: 'b1', name: 'Cell Structure and Function', completed: true },
      { id: 'b2', name: 'Human Physiology', completed: true },
      { id: 'b3', name: 'Genetics and Evolution', completed: false },
      { id: 'b4', name: 'Ecology', completed: false },
    ]
  }
];

export function useSyllabus() {
  const [syllabus, setSyllabus] = useState<Subject[]>(initialSyllabus);

  const toggleChapter = (subjectId: string, chapterId: string) => {
    setSyllabus(prev => prev.map(subject => {
      if (subject.id !== subjectId) return subject;
      return {
        ...subject,
        chapters: subject.chapters.map(chapter => 
          chapter.id === chapterId 
            ? { ...chapter, completed: !chapter.completed }
            : chapter
        )
      };
    }));
  };

  const getOverallProgress = () => {
    let total = 0;
    let completed = 0;
    syllabus.forEach(subject => {
      subject.chapters.forEach(chapter => {
        total++;
        if (chapter.completed) completed++;
      });
    });
    return { total, completed, percentage: total === 0 ? 0 : Math.round((completed / total) * 100) };
  };

  return { syllabus, toggleChapter, getOverallProgress };
}
