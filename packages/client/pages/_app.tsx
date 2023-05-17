import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import Link from 'next/link';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to client!</title>
        <Link href="/dist/output.css" rel="stylesheet" />
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
