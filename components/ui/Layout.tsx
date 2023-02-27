import Head from 'next/head'
import Footer from './Footer'
import Header from './Header'

const Layout = ({children, page}: any) => {
  
  return (
    <>
      <Head>
        <title>{page}</title>
        <meta name="description" content="Samples - Boucles - Loops - Bibliothèque de samples - Banque de sons - partage - stock - vente" />
        <link rel="icon" href="/StouflyDoc_Logo.svg" />
      </Head>

      <Header />
      <main className={'main mx-auto fadeIn min-h-screen flex-col'}>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout