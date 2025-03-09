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
        <meta name="description" content="Samples - Boucles - Loops - Bibliothèque de samples - Banque de sons - partage - stock - vente" />
        <link rel="icon" href="/StouflyDoc_Logo.svg" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700&display=swap"
        />
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