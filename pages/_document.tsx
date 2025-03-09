import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="fr">
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700&display=swap"
          />
        </Head>
        <body>
          {/* Script pour éviter le flash du thème clair */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  try {
                    var mode = localStorage.getItem('theme');
                    if (mode === 'dark' || (!mode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                      document.documentElement.classList.add('dark');
                      document.body.style.backgroundColor = '#0d1117';
                    } else {
                      document.documentElement.classList.remove('dark');
                      document.body.style.backgroundColor = '#f8fafc';
                    }
                  } catch (e) {}
                })();
              `,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument; 