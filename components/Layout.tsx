import Head from 'next/head'
import Footer from './ui/Footer'
import Header from './ui/Header'

const Layout = ({children, page}: any) => {
  
  return (
    <>
      <Head>
        <title>{page}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className={'main container mx-auto fadeIn min-h-screen flex-col'}>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout