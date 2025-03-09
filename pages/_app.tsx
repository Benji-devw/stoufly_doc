import '../styles/globals.css'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { useThemeContext } from '@/contexts/ThemeContext'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

// Fonction pour créer le thème MUI basé sur le mode
const getDesignTokens = (mode: 'light' | 'dark') => ({
  palette: {
    mode,
    primary: {
      main: '#ea580c',
      light: '#f97316',
      dark: '#9a3412',
      contrastText: '#fff',
    },
    secondary: {
      main: '#0ceaba',
      light: '#1693f9',
      dark: '#9a3412',
      contrastText: '#fff',
    },
    background: { 
      default: mode === 'light' ? '#f8fafc' : '#0d1117',
      paper: mode === 'light' ? '#F5F5F5' : '#0d1117',
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
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#ea580c',
        },
      },
    },
  },
})

// Composant wrapper pour appliquer le thème MUI
const MuiThemeWrapper = ({ children }: { children: ReactNode }) => {
  const { mode } = useThemeContext();
  const theme = createTheme(getDesignTokens(mode));
  
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Utiliser le layout personnalisé du composant s'il existe
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider>
        <MuiThemeWrapper>
          {getLayout(<Component {...pageProps} />)}
        </MuiThemeWrapper>
      </ThemeProvider>
    </SessionProvider>
  );
}
