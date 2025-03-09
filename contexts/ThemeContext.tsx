import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PaletteMode } from '@mui/material';

interface ThemeContextType {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

// Fonction pour obtenir le thème initial
const getInitialTheme = (): PaletteMode => {
  if (typeof window !== 'undefined') {
    // Côté client
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    
    // Vérifier les préférences du système
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  
  // Valeur par défaut
  return 'light';
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<PaletteMode>('light'); // Valeur par défaut
  const [mounted, setMounted] = useState(false);
  
  // Effet pour initialiser le thème après le montage
  useEffect(() => {
    setMode(getInitialTheme());
    setMounted(true);
  }, []);
  
  // Effet pour appliquer les classes CSS quand le mode change
  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle('dark', mode === 'dark');
      document.body.style.backgroundColor = mode === 'dark' ? '#0f172a' : '#f8fafc';
      localStorage.setItem('theme', mode);
    }
  }, [mode, mounted]);
  
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };
  
  // Rendu conditionnel pour éviter le flash
  if (!mounted) {
    return null; // Ou un placeholder
  }
  
  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}; 