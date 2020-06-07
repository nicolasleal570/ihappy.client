import React from 'react'
import { AppProps } from 'next/app';
import Head from 'next/head';

import '../tailwind.css';

import { Provider, useSelector, useDispatch } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import store from '../store/store';
import { authCheckState } from '../store/actions/authAction';


const App = ({ Component, pageProps }: AppProps) => {

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(authCheckState())
    }, [pageProps]);

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
