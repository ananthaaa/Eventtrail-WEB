import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type UserRole = 'student' | 'club_admin' | 'campus_staff';

export interface User {
  sub: string;
  email: string;
  name: string;
  role: UserRole;
  faculty: string;
  avatarUrl?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isMockMode: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signup: (data: { name: string; email: string; password?: string; role: UserRole; faculty: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  toggleMockRole: () => void;
}

const MOCK_STUDENT: User = {
  sub: 'mock-sub-student-001',
  email: 'student@campuspulse.edu',
  name: 'Alex Rivera',
  role: 'student',
  faculty: 'Engineering',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
};

const MOCK_ADMIN: User = {
  sub: 'mock-sub-admin-002',
  email: 'admin@campuspulse.edu',
  name: 'Jordan Taylor (DX Club)',
  role: 'club_admin',
  faculty: 'Computer Science',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
};

const MOCK_STAFF: User = {
  sub: 'mock-sub-staff-003',
  email: 'staff@campuspulse.edu',
  name: 'Dr. Elena Rostova',
  role: 'campus_staff',
  faculty: 'University Administration',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'campuspulse_mock_user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if live Cognito keys are configured in environment
  const cognitoPoolId = import.meta.env.VITE_COGNITO_USER_POOL_ID;
  const isMockMode = !cognitoPoolId || import.meta.env.VITE_AUTH_MOCK_MODE === 'true' || true; // Defaulting to mock fallback in dev

  useEffect(() => {
    // Bootstrap initial session from localStorage in mock mode
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    } else if (isMockMode) {
      // Seed default student persona for immediate UI testing
      setUser(MOCK_STUDENT);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_STUDENT));
    }
    setIsLoading(false);
  }, [isMockMode]);

  const login = async (email: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 400)); // Simulate network latency

    if (email.toLowerCase().includes('admin') || email.toLowerCase().includes('club')) {
      setUser(MOCK_ADMIN);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_ADMIN));
    } else if (email.toLowerCase().includes('staff')) {
      setUser(MOCK_STAFF);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_STAFF));
    } else {
      const customUser: User = {
        ...MOCK_STUDENT,
        email,
        name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      };
      setUser(customUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customUser));
    }

    setIsLoading(false);
    return { success: true };
  };

  const signup = async (data: { name: string; email: string; role: UserRole; faculty: string }): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 500)); // Simulate registration latency

    const newUser: User = {
      sub: `mock-sub-${Date.now()}`,
      email: data.email,
      name: data.name,
      role: data.role,
      faculty: data.faculty || 'General Campus',
      avatarUrl: data.role === 'club_admin' ? MOCK_ADMIN.avatarUrl : MOCK_STUDENT.avatarUrl,
    };

    setUser(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const toggleMockRole = () => {
    if (!user || user.role === 'student') {
      setUser(MOCK_ADMIN);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_ADMIN));
    } else if (user.role === 'club_admin') {
      setUser(MOCK_STAFF);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_STAFF));
    } else {
      setUser(MOCK_STUDENT);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_STUDENT));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isMockMode,
        login,
        signup,
        logout,
        toggleMockRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
