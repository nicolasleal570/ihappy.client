import React from 'react'
import { AppProps } from 'next/app';
import Head from 'next/head';

import AuthLayout from '../components/auth/Layout';
import PublicLayout from '../components/public/Layout';
import '../styles.css';

import { Provider, useSelector, useDispatch } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import store from '../store/store';
import { authCheckState } from '../store/actions/authAction';


const App = ({ Component, pageProps }: AppProps) => {
    const { user } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(authCheckState())
    }, [])

    return (
        <>
            <Head>
                <title>iHappy</title>
            </Head>

            <Provider store={store}>
                {
                    user ? <AuthLayout>
                        <Component {...pageProps} />
                    </AuthLayout>
                        : <PublicLayout>
                            <Component {...pageProps} />
                        </PublicLayout>
                }
            </Provider>

        </>
    );
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(App);
