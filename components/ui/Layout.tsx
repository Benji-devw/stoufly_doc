import Head from 'next/head'
import { Container, Box } from '@mui/material'
import Footer from './Footer'
import Header from './Header'

interface LayoutProps {
  children: React.ReactNode;
  page: string;
  toggleColorMode?: () => void;
  currentTheme?: 'light' | 'dark';
}

const Layout = ({ children, page, toggleColorMode, currentTheme }: LayoutProps) => {
  
  return (
    <>
      <Head>
        <title>{page}</title>
        <meta name="description" content="Stouflydoc - Bibliothèque de samples" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header toggleColorMode={toggleColorMode} currentTheme={currentTheme} />
      <Box 
        component="main" 
        sx={{ 
          minHeight: 'calc(100vh - 140px)', // Hauteur de l'écran moins header et footer
          py: 4,
          animation: 'fadeIn 0.5s ease-in-out',
          '@keyframes fadeIn': {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
        }}
      >
        <Container maxWidth="xl">
          {children}
        </Container>
      </Box>
      <Footer />
    </>
  )
}

export default Layout