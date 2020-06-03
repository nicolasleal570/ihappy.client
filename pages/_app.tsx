import React from 'react'
import { AppProps } from 'next/app';
import Head from 'next/head';

import AuthLayout from '../components/auth/Layout';
import PublicLayout from '../components/public/Layout';
import '../styles.css';

import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import store from '../store/store';


const App = ({ Component, pageProps }: AppProps) => {

    return (
        <>
            <Head>
                <title>iHappy</title>
            </Head>

            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>

        </>
    );
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(App);
