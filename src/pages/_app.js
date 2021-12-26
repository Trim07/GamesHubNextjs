import '../../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css'; 
import Head from "next/head";
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
