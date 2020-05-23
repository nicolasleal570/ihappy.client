import React from 'react'
import { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '../components/Layout';

import '../styles.css';

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Head>
                <title>iHappy</title>
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}

export default App
