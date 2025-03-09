import Head from 'next/head'
import { Container, Box } from '@mui/material'
import Footer from './Footer'
import Header from './Header'

interface LayoutProps {
  children: React.ReactNode;
  page: string;
}

const Layout = ({ children, page }: LayoutProps) => {
  
  return (
    <>
      <Head>
        <title>{page}</title>
        <meta name="description" content="Stouflydoc - Bibliothèque de samples" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Box 
        component="main" 
        sx={{ 
          minHeight: 'calc(100vh - 140px)',
          py: 4,
          bgcolor: (theme) => theme.palette.background.default,
          // animation: 'fadeIn 0.5s ease-in-out',
          // '@keyframes fadeIn': {
          //   '0%': { opacity: 0 },
          //   '100%': { opacity: 1 },
          // },
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