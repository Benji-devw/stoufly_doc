import '../styles/globals.css'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { PaletteMode } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { useState, useEffect } from 'react'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

// Création d'un thème Material UI personnalisé
const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      main: '#ea580c',
      light: '#f97316',
      dark: '#9a3412',
      contrastText: '#fff',
    },
    secondary: {
      main: '#0f172a',
      light: '#1e293b',
      dark: '#020617',
      contrastText: '#fff',
    },
    background: {
      default: mode === 'light' ? '#f8fafc' : '#0f172a',
      paper: mode === 'light' ? '#ffffff' : '#1e293b',
    },
    text: {
      primary: mode === 'light' ? '#0f172a' : '#f8fafc',
      secondary: mode === 'light' ? '#475569' : '#94a3b8',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none' as const,
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: mode === 'light' 
            ? '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
            : '0 4px 6px -1px rgb(0 0 0 / 0.2), 0 2px 4px -2px rgb(0 0 0 / 0.2)',
        },
      },
    },
  },
})

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Détection du mode sombre
  const [mode, setMode] = useState<PaletteMode>('light')
  
  useEffect(() => {
    // Vérifier si le mode sombre est activé dans le localStorage ou les préférences système
    const savedMode = localStorage.getItem('theme')
    if (savedMode) {
      setMode(savedMode as PaletteMode)
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setMode('dark')
    }
    
    // Ajouter la classe au body pour Tailwind (pour la transition)
    document.body.classList.toggle('dark', mode === 'dark')
  }, [mode])
  
  // Création du thème
  const theme = createTheme(getDesignTokens(mode))
  
  // Fonction pour changer le thème
  const toggleColorMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light'
    setMode(newMode)
    localStorage.setItem('theme', newMode)
  }
  
  // Utiliser le layout personnalisé du composant s'il existe
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {getLayout(
        <Component 
          {...pageProps} 
          toggleColorMode={toggleColorMode} 
          currentTheme={mode} 
        />
      )}
    </ThemeProvider>
  )
}
