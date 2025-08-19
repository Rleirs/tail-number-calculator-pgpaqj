
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Theme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  backgroundAlt: string;
  text: string;
  textSecondary: string;
  grey: string;
  card: string;
  border: string;
  success: string;
  warning: string;
  error: string;
}

export const lightTheme: Theme = {
  primary: '#2563eb',
  secondary: '#1d4ed8',
  accent: '#3b82f6',
  background: '#ffffff',
  backgroundAlt: '#f8fafc',
  text: '#1f2937',
  textSecondary: '#6b7280',
  grey: '#e5e7eb',
  card: '#ffffff',
  border: '#d1d5db',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
};

export const darkTheme: Theme = {
  primary: '#3b82f6',
  secondary: '#2563eb',
  accent: '#60a5fa',
  background: '#111827',
  backgroundAlt: '#1f2937',
  text: '#f9fafb',
  textSecondary: '#9ca3af',
  grey: '#374151',
  card: '#1f2937',
  border: '#374151',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
};

interface ThemeContextType {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'app_theme_mode';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme !== null) {
        setIsDarkMode(savedTheme === 'dark');
        console.log('Loaded theme preference:', savedTheme);
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };

  const saveThemePreference = async (isDark: boolean) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
      console.log('Saved theme preference:', isDark ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const toggleTheme = () => {
    const newIsDarkMode = !isDarkMode;
    setIsDarkMode(newIsDarkMode);
    saveThemePreference(newIsDarkMode);
    console.log('Theme toggled to:', newIsDarkMode ? 'dark' : 'light');
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
