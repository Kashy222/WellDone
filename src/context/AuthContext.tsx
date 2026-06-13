'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserProfile = {
  id: string;
  name: string;
  initials: string;
  email: string;
};

type AuthContextType = {
  user: UserProfile | null;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Mock Google Authentication state
  const [user, setUser] = useState<UserProfile | null>({
    id: 'mock-123',
    name: 'Jane Doe',
    initials: 'JD',
    email: 'jane.doe@student.edu',
  });

  const login = () => {
    setUser({
      id: 'mock-123',
      name: 'Jane Doe',
      initials: 'JD',
      email: 'jane.doe@student.edu',
    });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
