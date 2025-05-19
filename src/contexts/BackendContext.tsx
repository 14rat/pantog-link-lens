
import React, { createContext, useContext, useState, useEffect } from 'react';

// Types for our data models
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
}

export interface LinkData {
  id: string;
  originalUrl: string;
  shortUrl: string;
  title?: string;
  createdAt: string;
  expiresAt?: string;
  clicks: number;
  tags?: string[];
  userId: string;
}

export interface AnalyticsData {
  totalClicks: number;
  dailyClicks: Record<string, number>;
  devices: Record<string, number>;
  browsers: Record<string, number>;
  locations: Record<string, number>;
  referrers: Record<string, number>;
}

interface BackendContextType {
  // Auth
  isAuthenticated: boolean;
  userProfile: UserProfile | null;
  loginStatus: 'idle' | 'loading' | 'success' | 'error';
  loginError: string | null;
  
  // Data
  links: LinkData[];
  linksStatus: 'idle' | 'loading' | 'success' | 'error';
  linksError: string | null;
  
  // Analytics
  analytics: AnalyticsData | null;
  analyticsStatus: 'idle' | 'loading' | 'success' | 'error';
  analyticsError: string | null;
  
  // Status
  isOnline: boolean;
  lastSync: Date | null;
}

// Create context with default values
const BackendContext = createContext<BackendContextType>({
  isAuthenticated: false,
  userProfile: null,
  loginStatus: 'idle',
  loginError: null,
  
  links: [],
  linksStatus: 'idle',
  linksError: null,
  
  analytics: null,
  analyticsStatus: 'idle',
  analyticsError: null,
  
  isOnline: navigator.onLine,
  lastSync: null,
});

// Provider component
export const BackendProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loginStatus, setLoginStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [loginError, setLoginError] = useState<string | null>(null);
  
  const [links, setLinks] = useState<LinkData[]>([]);
  const [linksStatus, setLinksStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [linksError, setLinksError] = useState<string | null>(null);
  
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [analyticsStatus, setAnalyticsStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [analyticsError, setAnalyticsError] = useState<string | null>(null);
  
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  
  // Network status detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // In a real implementation, this would fetch data from APIs
  // For now, we're just setting up the structure
  
  const contextValue = {
    isAuthenticated,
    userProfile,
    loginStatus,
    loginError,
    
    links,
    linksStatus,
    linksError,
    
    analytics,
    analyticsStatus,
    analyticsError,
    
    isOnline,
    lastSync,
  };
  
  return (
    <BackendContext.Provider value={contextValue}>
      {children}
    </BackendContext.Provider>
  );
};

// Custom hook for using the context
export const useBackend = () => useContext(BackendContext);
