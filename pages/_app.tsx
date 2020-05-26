import React, { useContext } from 'react'
import { AppProps } from 'next/app';
import Head from 'next/head';
import { GlobalContext } from '../context/GlobalState';

import AuthLayout from '../components/auth/Layout';
import PublicLayout from '../components/public/Layout';

import '../styles.css';

const App = ({ Component, pageProps }: AppProps) => {
    const { user } = useContext(GlobalContext);

    return (
        <>
            <Head>
                <title>iHappy</title>
            </Head>

            {
                user ? <AuthLayout>
                        <Component {...pageProps} />
                    </AuthLayout>
                    : <PublicLayout>
                        <Component {...pageProps} />
                    </PublicLayout>
            }

        </>
    );
}

export default App
